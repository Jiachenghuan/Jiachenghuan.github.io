import { useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useLocale } from '../i18n/LocaleContext';
import { HomeContent } from '../types/content';

interface LayoutProps {
  home: HomeContent;
}

function HashScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      return;
    }

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
  const isContactActive = isHomeRoute && location.hash === '#contact';

  const scrollToContact = () => {
    if (!isHomeRoute) {
      return;
    }

    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={`site-shell${isHomeRoute ? ' site-shell-home' : ''}`}>
      <HashScrollManager />
      <header className={`site-header${isHomeRoute ? ' site-header-home' : ''}`}>
        <Link to="/" className="site-brand" aria-label={home.navigation.home}>
          <span className="site-brand-mark">Home</span>
          <p>{home.badge}</p>
        </Link>
        <nav className="site-nav" aria-label="Primary">
          <NavLink to="/" end className={({ isActive }) => (isActive && !isContactActive ? 'active' : undefined)}>
            {home.navigation.home}
          </NavLink>
          <NavLink to="/life" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            {home.navigation.life}
          </NavLink>
          <NavLink to="/research" className={({ isActive }) => (isActive ? 'active' : undefined)}>
            {home.navigation.research}
          </NavLink>
          <Link
            to={{ pathname: '/', hash: '#contact' }}
            className={isContactActive ? 'active' : undefined}
            onClick={scrollToContact}
          >
            {home.navigation.contact}
          </Link>
        </nav>
        <div className="locale-switch" aria-label="Language switcher">
          <button type="button" className={locale === 'zh' ? 'active' : ''} onClick={() => setLocale('zh')}>
            中文
          </button>
          <button type="button" className={locale === 'en' ? 'active' : ''} onClick={() => setLocale('en')}>
            EN
          </button>
        </div>
      </header>
      <main className={`page-frame${isHomeRoute ? ' page-frame-home' : ''}`}>
        <Outlet />
      </main>
      <footer className={`site-footer${isHomeRoute ? ' site-footer-home' : ''}`}>
        <p>{home.footerNote}</p>
      </footer>
    </div>
  );
}
