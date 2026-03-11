import { useEffect, useRef } from 'react';
import { Mesh, Program, Renderer, Triangle } from 'ogl';

type PrismAnimationType = 'rotate' | 'hover' | '3drotate';

interface PrismBackgroundProps {
  height?: number;
  baseWidth?: number;
  animationType?: PrismAnimationType;
  glow?: number;
  offset?: { x?: number; y?: number };
  noise?: number;
  transparent?: boolean;
  scale?: number;
  hueShift?: number;
  colorFrequency?: number;
  hoverStrength?: number;
  inertia?: number;
  bloom?: number;
  suspendWhenOffscreen?: boolean;
  timeScale?: number;
  className?: string;
}

type PrismContainer = HTMLDivElement & {
  __prismIO?: IntersectionObserver;
};

export function PrismBackground({
  height = 3.5,
  baseWidth = 5.5,
  animationType = 'rotate',
  glow = 1,
  offset = { x: 0, y: 0 },
  noise = 0.5,
  transparent = true,
  scale = 3.6,
  hueShift = 0,
  colorFrequency = 1,
  hoverStrength = 2,
  inertia = 0.05,
  bloom = 1,
  suspendWhenOffscreen = false,
  timeScale = 0.5,
  className,
}: PrismBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current as PrismContainer | null;
    if (!container) {
      return;
    }

    const H = Math.max(0.001, height);
    const BW = Math.max(0.001, baseWidth);
    const BASE_HALF = BW * 0.5;
    const GLOW = Math.max(0, glow);
    const NOISE = Math.max(0, noise);
    const offX = offset.x ?? 0;
    const offY = offset.y ?? 0;
    const SAT = transparent ? 1.5 : 1;
    const SCALE = Math.max(0.001, scale);
    const HUE = hueShift;
    const CFREQ = Math.max(0.001, colorFrequency);
    const BLOOM = Math.max(0, bloom);
    const TS = Math.max(0, timeScale);
    const HOVSTR = Math.max(0, hoverStrength);
    const INERT = Math.max(0, Math.min(1, inertia));
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    let renderer: Renderer;

    try {
      renderer = new Renderer({
        alpha: transparent,
        antialias: false,
        dpr,
      });
    } catch {
      return;
    }

    const gl = renderer.gl;
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.BLEND);

    Object.assign(gl.canvas.style, {
      display: 'block',
      height: '100%',
      inset: '0',
      position: 'absolute',
      width: '100%',
    } as Partial<CSSStyleDeclaration>);

    container.appendChild(gl.canvas);

    const vertex = /* glsl */ `
      attribute vec2 position;

      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragment = /* glsl */ `
      precision highp float;

      uniform vec2  iResolution;
      uniform float iTime;
      uniform float uHeight;
      uniform float uBaseHalf;
      uniform mat3  uRot;
      uniform int   uUseBaseWobble;
      uniform float uGlow;
      uniform vec2  uOffsetPx;
      uniform float uNoise;
      uniform float uSaturation;
      uniform float uHueShift;
      uniform float uColorFreq;
      uniform float uBloom;
      uniform float uCenterShift;
      uniform float uInvBaseHalf;
      uniform float uInvHeight;
      uniform float uMinAxis;
      uniform float uPxScale;
      uniform float uTimeScale;

      vec4 tanh4(vec4 x) {
        vec4 e2x = exp(2.0 * x);
        return (e2x - 1.0) / (e2x + 1.0);
      }

      float rand(vec2 co) {
        return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      float sdOctaAnisoInv(vec3 p) {
        vec3 q = vec3(abs(p.x) * uInvBaseHalf, abs(p.y) * uInvHeight, abs(p.z) * uInvBaseHalf);
        float m = q.x + q.y + q.z - 1.0;
        return m * uMinAxis * 0.5773502691896258;
      }

      float sdPyramidUpInv(vec3 p) {
        float oct = sdOctaAnisoInv(p);
        float halfSpace = -p.y;
        return max(oct, halfSpace);
      }

      mat3 hueRotation(float a) {
        float c = cos(a);
        float s = sin(a);
        mat3 W = mat3(
          0.299, 0.587, 0.114,
          0.299, 0.587, 0.114,
          0.299, 0.587, 0.114
        );
        mat3 U = mat3(
           0.701, -0.587, -0.114,
          -0.299,  0.413, -0.114,
          -0.300, -0.588,  0.886
        );
        mat3 V = mat3(
           0.168, -0.331,  0.500,
           0.328,  0.035, -0.500,
          -0.497,  0.296,  0.201
        );
        return W + U * c + V * s;
      }

      void main() {
        vec2 f = (gl_FragCoord.xy - 0.5 * iResolution.xy - uOffsetPx) * uPxScale;
        float z = 5.0;
        float d = 0.0;
        vec3 p;
        vec4 o = vec4(0.0);

        mat2 wob = mat2(1.0);
        if (uUseBaseWobble == 1) {
          float t = iTime * uTimeScale;
          float c0 = cos(t + 0.0);
          float c1 = cos(t + 33.0);
          float c2 = cos(t + 11.0);
          wob = mat2(c0, c1, c2, c0);
        }

        const int STEPS = 100;
        for (int i = 0; i < STEPS; i++) {
          p = vec3(f, z);
          p.xz = p.xz * wob;
          p = uRot * p;
          vec3 q = p;
          q.y += uCenterShift;
          d = 0.1 + 0.2 * abs(sdPyramidUpInv(q));
          z -= d;
          o += (sin((p.y + z) * uColorFreq + vec4(0.0, 1.0, 2.0, 3.0)) + 1.0) / d;
        }

        o = tanh4(o * o * (uGlow * uBloom) / 1e5);

        vec3 col = o.rgb;
        float n = rand(gl_FragCoord.xy + vec2(iTime));
        col += (n - 0.5) * uNoise;
        col = clamp(col, 0.0, 1.0);

        float luma = dot(col, vec3(0.2126, 0.7152, 0.0722));
        col = clamp(mix(vec3(luma), col, uSaturation), 0.0, 1.0);

        if (abs(uHueShift) > 0.0001) {
          col = clamp(hueRotation(uHueShift) * col, 0.0, 1.0);
        }

        gl_FragColor = vec4(col, o.a);
      }
    `;

    const geometry = new Triangle(gl);
    const resolutionBuffer = new Float32Array(2);
    const offsetBuffer = new Float32Array(2);
    const rotationBuffer = new Float32Array(9);

    const program = new Program(gl, {
      fragment,
      uniforms: {
        iResolution: { value: resolutionBuffer },
        iTime: { value: 0 },
        uBaseHalf: { value: BASE_HALF },
        uBloom: { value: BLOOM },
        uCenterShift: { value: H * 0.25 },
        uColorFreq: { value: CFREQ },
        uGlow: { value: GLOW },
        uHeight: { value: H },
        uHueShift: { value: HUE },
        uInvBaseHalf: { value: 1 / BASE_HALF },
        uInvHeight: { value: 1 / H },
        uMinAxis: { value: Math.min(BASE_HALF, H) },
        uNoise: { value: NOISE },
        uOffsetPx: { value: offsetBuffer },
        uPxScale: { value: 1 / ((gl.drawingBufferHeight || 1) * 0.1 * SCALE) },
        uRot: { value: new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]) },
        uSaturation: { value: SAT },
        uTimeScale: { value: TS },
        uUseBaseWobble: { value: 1 },
      },
      vertex,
    });
    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const width = container.clientWidth || 1;
      const heightValue = container.clientHeight || 1;
      renderer.setSize(width, heightValue);
      resolutionBuffer[0] = gl.drawingBufferWidth;
      resolutionBuffer[1] = gl.drawingBufferHeight;
      offsetBuffer[0] = offX * dpr;
      offsetBuffer[1] = offY * dpr;
      program.uniforms.uPxScale.value = 1 / ((gl.drawingBufferHeight || 1) * 0.1 * SCALE);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const setMat3FromEuler = (yawY: number, pitchX: number, rollZ: number) => {
      const cy = Math.cos(yawY);
      const sy = Math.sin(yawY);
      const cx = Math.cos(pitchX);
      const sx = Math.sin(pitchX);
      const cz = Math.cos(rollZ);
      const sz = Math.sin(rollZ);

      rotationBuffer[0] = cy * cz + sy * sx * sz;
      rotationBuffer[1] = cx * sz;
      rotationBuffer[2] = -sy * cz + cy * sx * sz;
      rotationBuffer[3] = -cy * sz + sy * sx * cz;
      rotationBuffer[4] = cx * cz;
      rotationBuffer[5] = sy * sz + cy * sx * cz;
      rotationBuffer[6] = sy * cx;
      rotationBuffer[7] = -sx;
      rotationBuffer[8] = cy * cx;

      return rotationBuffer;
    };

    const noiseIsZero = NOISE < 1e-6;
    const random = () => Math.random();
    const rotateSpeedX = 0.3 + random() * 0.6;
    const rotateSpeedY = 0.2 + random() * 0.7;
    const rotateSpeedZ = 0.1 + random() * 0.5;
    const phaseX = random() * Math.PI * 2;
    const phaseZ = random() * Math.PI * 2;

    let animationFrame = 0;
    let yaw = 0;
    let pitch = 0;
    let roll = 0;
    let targetYaw = 0;
    let targetPitch = 0;
    const initialTime = performance.now();
    const pointer = { inside: true, x: 0, y: 0 };

    const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

    const onMove = (event: PointerEvent) => {
      const width = Math.max(1, window.innerWidth);
      const heightValue = Math.max(1, window.innerHeight);
      const nextX = (event.clientX - width * 0.5) / (width * 0.5);
      const nextY = (event.clientY - heightValue * 0.5) / (heightValue * 0.5);
      pointer.x = Math.max(-1, Math.min(1, nextX));
      pointer.y = Math.max(-1, Math.min(1, nextY));
      pointer.inside = true;
    };

    const onLeave = () => {
      pointer.inside = false;
    };

    const render = (timestamp: number) => {
      const elapsed = (timestamp - initialTime) * 0.001;
      program.uniforms.iTime.value = elapsed;

      let keepAnimating = true;

      if (animationType === 'hover') {
        const maxPitch = 0.6 * HOVSTR;
        const maxYaw = 0.6 * HOVSTR;
        targetYaw = (pointer.inside ? -pointer.x : 0) * maxYaw;
        targetPitch = (pointer.inside ? pointer.y : 0) * maxPitch;
        yaw = lerp(yaw, targetYaw, INERT);
        pitch = lerp(pitch, targetPitch, INERT);
        roll = lerp(roll, 0, 0.1);
        program.uniforms.uRot.value = setMat3FromEuler(yaw, pitch, roll);

        if (noiseIsZero) {
          const isSettled =
            Math.abs(yaw - targetYaw) < 1e-4 &&
            Math.abs(pitch - targetPitch) < 1e-4 &&
            Math.abs(roll) < 1e-4;
          keepAnimating = !isSettled;
        }
      } else if (animationType === '3drotate') {
        const scaledTime = elapsed * TS;
        yaw = scaledTime * rotateSpeedY;
        pitch = Math.sin(scaledTime * rotateSpeedX + phaseX) * 0.6;
        roll = Math.sin(scaledTime * rotateSpeedZ + phaseZ) * 0.5;
        program.uniforms.uRot.value = setMat3FromEuler(yaw, pitch, roll);
        keepAnimating = TS >= 1e-6;
      } else {
        rotationBuffer[0] = 1;
        rotationBuffer[1] = 0;
        rotationBuffer[2] = 0;
        rotationBuffer[3] = 0;
        rotationBuffer[4] = 1;
        rotationBuffer[5] = 0;
        rotationBuffer[6] = 0;
        rotationBuffer[7] = 0;
        rotationBuffer[8] = 1;
        program.uniforms.uRot.value = rotationBuffer;
        keepAnimating = TS >= 1e-6;
      }

      renderer.render({ scene: mesh });

      if (keepAnimating) {
        animationFrame = window.requestAnimationFrame(render);
      } else {
        animationFrame = 0;
      }
    };

    const startAnimation = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const stopAnimation = () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    let onPointerMove: ((event: PointerEvent) => void) | null = null;
    if (animationType === 'hover') {
      onPointerMove = (event: PointerEvent) => {
        onMove(event);
        startAnimation();
      };
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('mouseleave', onLeave);
      window.addEventListener('blur', onLeave);
      program.uniforms.uUseBaseWobble.value = 0;
    } else if (animationType === '3drotate') {
      program.uniforms.uUseBaseWobble.value = 0;
    }

    if (suspendWhenOffscreen) {
      const observer = new IntersectionObserver((entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting);
        if (isVisible) {
          startAnimation();
        } else {
          stopAnimation();
        }
      });

      observer.observe(container);
      container.__prismIO = observer;
    }

    startAnimation();

    return () => {
      stopAnimation();
      resizeObserver.disconnect();

      if (onPointerMove) {
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('mouseleave', onLeave);
        window.removeEventListener('blur', onLeave);
      }

      if (container.__prismIO) {
        container.__prismIO.disconnect();
        delete container.__prismIO;
      }

      const loseContext = gl.getExtension('WEBGL_lose_context');
      loseContext?.loseContext();

      if (gl.canvas.parentElement === container) {
        container.removeChild(gl.canvas);
      }
    };
  }, [
    animationType,
    baseWidth,
    bloom,
    colorFrequency,
    glow,
    height,
    hoverStrength,
    hueShift,
    inertia,
    noise,
    offset.x,
    offset.y,
    scale,
    suspendWhenOffscreen,
    timeScale,
    transparent,
  ]);

  return <div className={['prism-container', className].filter(Boolean).join(' ')} ref={containerRef} />;
}
