import {useEffect} from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import {useLocale} from '../i18n/LocaleContext';
import {HomeContent} from '../types/content';
import LightRays from './LightRays/LightRays';
import PrismaticBurst from './PrismaticBurst/PrismaticBurst';

interface LayoutProps {
  home: HomeContent;
}

function HashScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
      return;
    }

    const sectionId = decodeURIComponent(location.hash.slice(1));
    let animationFrame = 0;
    let attempts = 0;

    const scrollToSection = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({behavior: 'smooth', block: 'start'});
        return;
      }

      if (attempts < 20) {
        attempts += 1;
        animationFrame = window.requestAnimationFrame(scrollToSection);
      }
    };

    scrollToSection();

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [location.hash, location.pathname]);

  return null;
}

export function Layout({home}: LayoutProps) {
  const {locale, setLocale} = useLocale();
  const location = useLocation();
  const isHomeRoute = location.pathname === '/';
  const isArchiveRoute =
    location.pathname.startsWith('/learning') || location.pathname.startsWith('/literature-art');
  const isResearchRoute = location.pathname.startsWith('/research');

  const showFooter = !isHomeRoute && !isArchiveRoute && !isResearchRoute;
  const showLocaleSwitch = !isArchiveRoute;

  useEffect(() => {
    document.documentElement.lang = isArchiveRoute ? 'zh-CN' : locale === 'zh' ? 'zh-CN' : 'en';
  }, [isArchiveRoute, locale]);

  return (
    <div
      className={`site-shell${isHomeRoute ? ' site-shell-home' : ''}${isArchiveRoute ? ' site-shell-archive' : ''}${isResearchRoute ? ' site-shell-research' : ''}`}>
      <HashScrollManager />
      {isArchiveRoute ? (
        <div className="site-shell-archive-background" aria-hidden="true">
          <div className="site-shell-archive-background-frame">
            <LightRays
              raysOrigin="top-center"
              raysColor="#ffffff"
              raysSpeed={1}
              lightSpread={0.5}
              rayLength={3}
              followMouse
              mouseInfluence={0.1}
              noiseAmount={0}
              distortion={0}
              className="site-shell-archive-background-rays"
              pulsating={false}
              fadeDistance={1}
              saturation={1}
            />
          </div>
        </div>
      ) : null}
      {isResearchRoute ? (
        <div className="site-shell-research-background" aria-hidden="true">
          <div className="site-shell-research-background-frame">
            <PrismaticBurst
              animationType="rotate3d"
              intensity={1.3}
              speed={0.5}
              distort={0}
              paused={false}
              offset={{x: 0, y: 0}}
              hoverDampness={0.25}
              rayCount={0}
              mixBlendMode="lighten"
              colors={['#8a6324', '#c96d1e', '#3f7d4f', '#2e57d6', '#5b3fc9', '#cfd8d2']}
              color0=""
              color1=""
              color2=""
            />
          </div>
        </div>
      ) : null}
      {showLocaleSwitch ? (
        <div
          className={`locale-switch locale-switch-floating${isHomeRoute ? ' locale-switch-home' : ''}${isResearchRoute ? ' locale-switch-research' : ''}`}
          aria-label="Language switcher">
          <button type="button" className={locale === 'zh' ? 'active' : ''} onClick={() => setLocale('zh')}>
            {'\u4e2d\u6587'}
          </button>
          <button type="button" className={locale === 'en' ? 'active' : ''} onClick={() => setLocale('en')}>
            EN
          </button>
        </div>
      ) : null}
      <main
        className={`page-frame${isHomeRoute ? ' page-frame-home' : ''}${isArchiveRoute ? ' page-frame-archive' : ''}${isResearchRoute ? ' page-frame-research' : ''}`}>
        <Outlet />
      </main>
      {showFooter ? (
        <footer className={`site-footer${isArchiveRoute ? ' site-footer-archive' : ''}${isResearchRoute ? ' site-footer-research' : ''}`}>
          <p>{home.footerNote}</p>
        </footer>
      ) : null}
    </div>
  );
}





