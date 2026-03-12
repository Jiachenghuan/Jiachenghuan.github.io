import {
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type PointerEvent,
} from 'react';
import { Link } from 'react-router-dom';
import { lifeSections } from '../content/lifeSections';
import { useLocale } from '../i18n/LocaleContext';
import { HomeContent, LifeCard } from '../types/content';

interface LifeFlowPanelProps {
  content: LifeCard[];
  home: HomeContent;
}

interface FlowMenuItem {
  id: string;
  image: string;
  label: string;
  path: string;
  subtitle: string;
  title: string;
}

export function LifeFlowPanel({ content, home }: LifeFlowPanelProps) {
  const { locale } = useLocale();
  const panelRef = useRef<HTMLDivElement>(null);
  const previewItems = content.slice(0, 2).map((item) => item.title);
  const flowMenuItems = useMemo<FlowMenuItem[]>(
    () =>
      lifeSections.map((section, index) => {
        const sourceCard = content[index] ?? content[content.length - 1] ?? content[0];

        return {
          id: section.id,
          image: sourceCard?.image ?? section.image,
          label: section.label,
          path: section.path,
          subtitle: section.subtitle,
          title: sourceCard?.title ?? section.subtitle,
        };
      }),
    [content],
  );
  const [activeId, setActiveId] = useState(flowMenuItems[0]?.id ?? '');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeItem = flowMenuItems.find((item) => item.id === activeId) ?? flowMenuItems[0];
  const hoverHint = locale === 'zh' ? '\u60ac\u505c\u540e\u9009\u62e9\u5206\u533a' : 'Hover to choose a section';
  const openSectionLabel = locale === 'zh' ? '\u6253\u5f00\u5206\u533a' : 'Open section';

  const setPreviewPosition = (clientX: number, clientY: number, rect: DOMRect) => {
    if (!panelRef.current) {
      return;
    }

    const x = Math.min(82, Math.max(58, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.min(76, Math.max(24, ((clientY - rect.top) / rect.height) * 100));

    panelRef.current.style.setProperty('--life-preview-x', `${x}%`);
    panelRef.current.style.setProperty('--life-preview-y', `${y}%`);
  };

  const handlePanelPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    setPreviewPosition(event.clientX, event.clientY, event.currentTarget.getBoundingClientRect());
  };

  const handlePanelFocus = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsMenuOpen(true);
    }

    if (event.target === event.currentTarget) {
      setActiveId(flowMenuItems[0]?.id ?? '');
    }
  };

  const handlePanelBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsMenuOpen(false);
      setActiveId(flowMenuItems[0]?.id ?? '');
    }
  };

  return (
    <div
      ref={panelRef}
      className="glass-panel glass-panel-life life-flow-panel fade-in"
      role="group"
      tabIndex={0}
      aria-label={home.previews.life.title}
      onBlur={handlePanelBlur}
      onFocus={handlePanelFocus}
      onMouseEnter={() => {
        setIsMenuOpen(true);
        setActiveId(flowMenuItems[0]?.id ?? '');
      }}
      onMouseLeave={() => {
        setIsMenuOpen(false);
        setActiveId(flowMenuItems[0]?.id ?? '');
      }}
      onPointerMove={handlePanelPointerMove}
    >
      <div className="life-flow-default">
        <div className="glass-panel-center">
          <h2>{home.previews.life.title}</h2>
        </div>
        <div className="glass-panel-footer">
          <p>{home.previews.life.summary}</p>
          <div className="glass-panel-meta">
            <div className="glass-panel-tags">
              {previewItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <span className="glass-panel-cta life-flow-hint">{hoverHint}</span>
          </div>
          <div className="life-flow-mobile-links">
            {flowMenuItems.map((item) => (
              <Link key={item.id} to={item.path}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="life-flow-overlay">
        <div
          className={`life-flow-preview${activeItem ? ' is-visible' : ''}`}
          style={{ '--life-preview-image': activeItem ? `url(${activeItem.image})` : 'none' } as CSSProperties}
        >
          {activeItem ? (
            <>
              <span className="life-flow-preview-kicker">{activeItem.label}</span>
              <strong>{activeItem.title}</strong>
            </>
          ) : null}
        </div>

        <div className="life-flow-list">
          {flowMenuItems.map((item, index) => {
            const isActive = item.id === activeItem?.id;

            return (
              <Link
                key={item.id}
                to={item.path}
                className={`life-flow-item${isActive ? ' is-active' : ''}`}
                onFocus={() => {
                  setIsMenuOpen(true);
                  setActiveId(item.id);
                }}
                onMouseEnter={() => setActiveId(item.id)}
                tabIndex={isMenuOpen ? 0 : -1}
              >
                <span className="life-flow-index">{String(index + 1).padStart(2, '0')}</span>
                <div className="life-flow-copy">
                  <div className="life-flow-track" aria-hidden="true">
                    <span>{item.label}</span>
                    <span>{item.label}</span>
                    <span>{item.label}</span>
                  </div>
                  <span className="life-flow-item-title">{item.label}</span>
                  <span className="life-flow-item-meta">{item.subtitle}</span>
                </div>
                <span className="life-flow-action">{openSectionLabel}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
