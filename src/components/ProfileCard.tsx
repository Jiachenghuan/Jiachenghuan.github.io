import { CSSProperties, memo, useCallback, useEffect, useMemo, useRef } from 'react';
import './ProfileCard.css';

const DEFAULT_INNER_GRADIENT = 'linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)';

const ANIMATION_CONFIG = {
  DEVICE_BETA_OFFSET: 20,
  ENTER_TRANSITION_MS: 180,
  INITIAL_DURATION: 1200,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
};

const clamp = (value: number, min = 0, max = 100) => Math.min(Math.max(value, min), max);
const round = (value: number, precision = 3) => Number.parseFloat(value.toFixed(precision));
const adjust = (value: number, fromMin: number, fromMax: number, toMin: number, toMax: number) =>
  round(toMin + ((toMax - toMin) * (value - fromMin)) / (fromMax - fromMin));

interface TiltPosition {
  tx: number;
  ty: number;
  x: number;
  y: number;
}

interface TiltEngine {
  beginInitial: (durationMs: number) => void;
  cancel: () => void;
  getCurrent: () => TiltPosition;
  setImmediate: (x: number, y: number) => void;
  setTarget: (x: number, y: number) => void;
  toCenter: () => void;
}

interface ProfileCardProps {
  avatarUrl: string;
  behindGlowColor?: string;
  behindGlowEnabled?: boolean;
  behindGlowSize?: string;
  className?: string;
  contactText?: string;
  enableMobileTilt?: boolean;
  enableTilt?: boolean;
  grainUrl?: string;
  handle?: string;
  iconUrl?: string;
  innerGradient?: string;
  miniAvatarUrl?: string;
  mobileTiltSensitivity?: number;
  name?: string;
  onContactClick?: () => void;
  showUserInfo?: boolean;
  status?: string;
  title?: string;
}

interface DeviceMotionPermissionApi {
  requestPermission?: () => Promise<'granted' | 'denied'>;
}

function ProfileCardComponent({
  avatarUrl,
  behindGlowColor,
  behindGlowEnabled = true,
  behindGlowSize,
  className = '',
  contactText = 'Contact',
  enableMobileTilt = false,
  enableTilt = true,
  grainUrl,
  handle = 'profile',
  iconUrl,
  innerGradient,
  miniAvatarUrl,
  mobileTiltSensitivity = 5,
  name = 'Your Name',
  onContactClick,
  showUserInfo = true,
  status = 'Available',
  title = 'Personal Website',
}: ProfileCardProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const enterTimerRef = useRef<number | null>(null);
  const leaveRafRef = useRef<number | null>(null);

  const tiltEngine = useMemo<TiltEngine | null>(() => {
    if (!enableTilt) {
      return null;
    }

    let animationFrame: number | null = null;
    let running = false;
    let lastTimestamp = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    const defaultTau = 0.14;
    const initialTau = 0.6;
    let initialUntil = 0;

    const setVarsFromXY = (x: number, y: number) => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap) {
        return;
      }

      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;
      const percentX = clamp((100 / width) * x);
      const percentY = clamp((100 / height) * y);
      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties: Record<string, string> = {
        '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
        '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
        '--pointer-from-center': `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        '--pointer-from-left': `${percentX / 100}`,
        '--pointer-from-top': `${percentY / 100}`,
        '--pointer-x': `${percentX}%`,
        '--pointer-y': `${percentY}%`,
        '--rotate-x': `${round(-(centerX / 5))}deg`,
        '--rotate-y': `${round(centerY / 4)}deg`,
      };

      Object.entries(properties).forEach(([key, value]) => {
        wrap.style.setProperty(key, value);
      });
    };

    const step = (timestamp: number) => {
      if (!running) {
        return;
      }

      if (lastTimestamp === 0) {
        lastTimestamp = timestamp;
      }

      const deltaTime = (timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;
      const tau = timestamp < initialUntil ? initialTau : defaultTau;
      const interpolation = 1 - Math.exp(-deltaTime / tau);

      currentX += (targetX - currentX) * interpolation;
      currentY += (targetY - currentY) * interpolation;

      setVarsFromXY(currentX, currentY);

      const stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;
      if (stillFar || document.hasFocus()) {
        animationFrame = window.requestAnimationFrame(step);
      } else {
        running = false;
        lastTimestamp = 0;
        if (animationFrame) {
          window.cancelAnimationFrame(animationFrame);
          animationFrame = null;
        }
      }
    };

    const start = () => {
      if (running) {
        return;
      }

      running = true;
      lastTimestamp = 0;
      animationFrame = window.requestAnimationFrame(step);
    };

    return {
      beginInitial(durationMs: number) {
        initialUntil = performance.now() + durationMs;
        start();
      },
      cancel() {
        if (animationFrame) {
          window.cancelAnimationFrame(animationFrame);
        }
        animationFrame = null;
        running = false;
        lastTimestamp = 0;
      },
      getCurrent() {
        return { tx: targetX, ty: targetY, x: currentX, y: currentY };
      },
      setImmediate(x: number, y: number) {
        currentX = x;
        currentY = y;
        setVarsFromXY(currentX, currentY);
      },
      setTarget(x: number, y: number) {
        targetX = x;
        targetY = y;
        start();
      },
      toCenter() {
        const shell = shellRef.current;
        if (!shell) {
          return;
        }
        this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
      },
    };
  }, [enableTilt]);

  const getOffsets = (event: PointerEvent, element: HTMLDivElement) => {
    const rect = element.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) {
        return;
      }
      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine],
  );

  const handlePointerEnter = useCallback(
    (event: PointerEvent) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) {
        return;
      }

      shell.classList.add('active');
      shell.classList.add('entering');
      if (enterTimerRef.current) {
        window.clearTimeout(enterTimerRef.current);
      }
      enterTimerRef.current = window.setTimeout(() => {
        shell.classList.remove('entering');
      }, ANIMATION_CONFIG.ENTER_TRANSITION_MS);

      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine],
  );

  const handlePointerLeave = useCallback(() => {
    const shell = shellRef.current;
    if (!shell || !tiltEngine) {
      return;
    }

    tiltEngine.toCenter();

    const checkSettle = () => {
      const { x, y, tx, ty } = tiltEngine.getCurrent();
      const settled = Math.hypot(tx - x, ty - y) < 0.6;
      if (settled) {
        shell.classList.remove('active');
        leaveRafRef.current = null;
      } else {
        leaveRafRef.current = window.requestAnimationFrame(checkSettle);
      }
    };

    if (leaveRafRef.current) {
      window.cancelAnimationFrame(leaveRafRef.current);
    }
    leaveRafRef.current = window.requestAnimationFrame(checkSettle);
  }, [tiltEngine]);

  const handleDeviceOrientation = useCallback(
    (event: DeviceOrientationEvent) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine) {
        return;
      }

      const { beta, gamma } = event;
      if (beta == null || gamma == null) {
        return;
      }

      const centerX = shell.clientWidth / 2;
      const centerY = shell.clientHeight / 2;
      const x = clamp(centerX + gamma * mobileTiltSensitivity, 0, shell.clientWidth);
      const y = clamp(
        centerY + (beta - ANIMATION_CONFIG.DEVICE_BETA_OFFSET) * mobileTiltSensitivity,
        0,
        shell.clientHeight,
      );

      tiltEngine.setTarget(x, y);
    },
    [mobileTiltSensitivity, tiltEngine],
  );

  useEffect(() => {
    if (!enableTilt || !tiltEngine) {
      return;
    }

    const shell = shellRef.current;
    if (!shell) {
      return;
    }

    const pointerMoveHandler = handlePointerMove;
    const pointerEnterHandler = handlePointerEnter;
    const pointerLeaveHandler = handlePointerLeave;
    const deviceOrientationHandler = handleDeviceOrientation;

    shell.addEventListener('pointerenter', pointerEnterHandler);
    shell.addEventListener('pointermove', pointerMoveHandler);
    shell.addEventListener('pointerleave', pointerLeaveHandler);

    const handleClick = () => {
      if (!enableMobileTilt || window.location.protocol !== 'https:') {
        return;
      }

      const motionApi = window.DeviceMotionEvent as unknown as DeviceMotionPermissionApi | undefined;
      if (motionApi && typeof motionApi.requestPermission === 'function') {
        motionApi
          .requestPermission()
          .then((state) => {
            if (state === 'granted') {
              window.addEventListener('deviceorientation', deviceOrientationHandler);
            }
          })
          .catch(console.error);
      } else {
        window.addEventListener('deviceorientation', deviceOrientationHandler);
      }
    };

    shell.addEventListener('click', handleClick);

    const initialX = (shell.clientWidth || 0) - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
    tiltEngine.setImmediate(initialX, initialY);
    tiltEngine.toCenter();
    tiltEngine.beginInitial(ANIMATION_CONFIG.INITIAL_DURATION);

    return () => {
      shell.removeEventListener('pointerenter', pointerEnterHandler);
      shell.removeEventListener('pointermove', pointerMoveHandler);
      shell.removeEventListener('pointerleave', pointerLeaveHandler);
      shell.removeEventListener('click', handleClick);
      window.removeEventListener('deviceorientation', deviceOrientationHandler);

      if (enterTimerRef.current) {
        window.clearTimeout(enterTimerRef.current);
      }
      if (leaveRafRef.current) {
        window.cancelAnimationFrame(leaveRafRef.current);
      }

      tiltEngine.cancel();
      shell.classList.remove('entering');
    };
  }, [
    enableMobileTilt,
    enableTilt,
    handleDeviceOrientation,
    handlePointerEnter,
    handlePointerLeave,
    handlePointerMove,
    tiltEngine,
  ]);

  const cardStyle = useMemo(
    () =>
      ({
        '--behind-glow-color': behindGlowColor ?? 'rgba(125, 190, 255, 0.67)',
        '--behind-glow-size': behindGlowSize ?? '50%',
        '--grain': grainUrl ? `url(${grainUrl})` : 'none',
        '--icon': iconUrl ? `url(${iconUrl})` : 'none',
        '--inner-gradient': innerGradient ?? DEFAULT_INNER_GRADIENT,
      }) as CSSProperties,
    [behindGlowColor, behindGlowSize, grainUrl, iconUrl, innerGradient],
  );

  const handleContactClick = useCallback(() => {
    onContactClick?.();
  }, [onContactClick]);

  return (
    <div ref={wrapRef} className={`pc-card-wrapper ${className}`.trim()} style={cardStyle}>
      {behindGlowEnabled ? <div className="pc-behind" /> : null}
      <div ref={shellRef} className="pc-card-shell">
        <section className="pc-card">
          <div className="pc-inside">
            <div className="pc-shine" />
            <div className="pc-glare" />
            <div className="pc-content pc-avatar-content">
              <img
                className="avatar"
                src={avatarUrl}
                alt={`${name || 'User'} avatar`}
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.style.display = 'none';
                }}
              />
              {showUserInfo ? (
                <div className="pc-user-info">
                  <div className="pc-user-details">
                    <div className="pc-mini-avatar">
                      <img
                        src={miniAvatarUrl || avatarUrl}
                        alt={`${name || 'User'} mini avatar`}
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.style.opacity = '0.5';
                          event.currentTarget.src = avatarUrl;
                        }}
                      />
                    </div>
                    <div className="pc-user-text">
                      <div className="pc-handle">@{handle}</div>
                      <div className="pc-status">{status}</div>
                    </div>
                  </div>
                  <button
                    className="pc-contact-btn"
                    onClick={handleContactClick}
                    style={{ pointerEvents: 'auto' }}
                    type="button"
                    aria-label={`Contact ${name || 'user'}`}
                  >
                    {contactText}
                  </button>
                </div>
              ) : null}
            </div>
            <div className="pc-content">
              <div className="pc-details">
                <h3>{name}</h3>
                <p>{title}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

const ProfileCard = memo(ProfileCardComponent);

export default ProfileCard;