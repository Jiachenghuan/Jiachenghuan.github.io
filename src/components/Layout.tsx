import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useLocale } from '../i18n/LocaleContext';
import { HomeContent } from '../types/content';

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
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

export function Layout({ home }: LayoutProps) {
  const { locale, setLocale } = useLocale();
  const location = useLocation();
  const isHomeRoute = location.pathname === '/';

  return (
    <div className={`site-shell${isHomeRoute ? ' site-shell-home' : ''}`}>
      <HashScrollManager />
      <div
        className={`locale-switch locale-switch-floating${isHomeRoute ? ' locale-switch-home' : ''}`}
        aria-label="Language switcher"
      >
        <button type="button" className={locale === 'zh' ? 'active' : ''} onClick={() => setLocale('zh')}>
          中文
        </button>
        <button type="button" className={locale === 'en' ? 'active' : ''} onClick={() => setLocale('en')}>
          EN
        </button>
      </div>
      <main className={`page-frame${isHomeRoute ? ' page-frame-home' : ''}`}>
        <Outlet />
      </main>
      {!isHomeRoute ? (
        <footer className="site-footer">
          <p>{home.footerNote}</p>
        </footer>
      ) : null}
    </div>
  );
}

