import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useLocation } from 'wouter';
import { translations, type Lang } from '@/i18n/translations';

type Translations = typeof translations.fr;

interface I18nContextType {
  lang: Lang;
  t: Translations;
  langPath: (path: string) => string;
  switchLang: (newLang: Lang) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

function detectLang(location: string): Lang {
  if (location.startsWith('/en')) return 'en';
  if (location.startsWith('/de')) return 'de';
  return 'fr';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const lang = detectLang(location);

  const value = useMemo<I18nContextType>(() => {
    const t = translations[lang] as Translations;
    const langPath = (path: string) => `/${lang}${path}`;
    const switchLang = (newLang: Lang) => {
      const withoutPrefix = location.replace(/^\/(fr|en|de)/, '') || '/';
      return `/${newLang}${withoutPrefix}`;
    };
    return { lang, t, langPath, switchLang };
  }, [lang, location]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
}
