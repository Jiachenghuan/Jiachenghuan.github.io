import { NavLink, Outlet } from 'react-router-dom';
import { useLocale } from '../i18n/LocaleContext';
import { HomeContent } from '../types/content';

interface LayoutProps {
  home: HomeContent;
}

export function Layout({ home }: LayoutProps) {
  const { locale, setLocale } = useLocale();

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-brand">
          <span className="site-brand-mark">Home</span>
          <p>{home.badge}</p>
        </div>
        <nav className="site-nav" aria-label="Primary">
          <NavLink to="/" end>
            {home.navigation.home}
          </NavLink>
          <NavLink to="/life">{home.navigation.life}</NavLink>
          <NavLink to="/research">{home.navigation.research}</NavLink>
          <NavLink to="/contact">{home.navigation.contact}</NavLink>
        </nav>
        <div className="locale-switch" aria-label="Language switcher">
          <button
            type="button"
            className={locale === 'zh' ? 'active' : ''}
            onClick={() => setLocale('zh')}
          >
            中文
          </button>
          <button
            type="button"
            className={locale === 'en' ? 'active' : ''}
            onClick={() => setLocale('en')}
          >
            EN
          </button>
        </div>
      </header>
      <main className="page-frame">
        <Outlet />
      </main>
      <footer className="site-footer">
        <p>{home.footerNote}</p>
      </footer>
    </div>
  );
}
