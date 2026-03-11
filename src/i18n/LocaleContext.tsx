import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Locale } from '../types/content';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const STORAGE_KEY = 'home-locale';

const LocaleContext = createContext<LocaleContextValue | null>(null);

function getInitialLocale(): Locale {
  const storedLocale = window.localStorage.getItem(STORAGE_KEY);

  if (storedLocale === 'zh' || storedLocale === 'en') {
    return storedLocale;
  }

  return 'zh';
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en';
  }, [locale]);

  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider');
  }

  return context;
}
