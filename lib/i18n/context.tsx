"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { SupportedLocale, DEFAULT_LOCALE, LOCALES, LocaleInfo } from './types';
import { Dictionary, dictionaries } from './dictionaries';

interface LanguageContextType {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  dict: Dictionary;
  t: (path: string, fallback?: string) => string;
  dir: 'rtl' | 'ltr';
  isRTL: boolean;
  localeInfo: LocaleInfo;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const STORAGE_KEY = 'noavaran_locale';
const COOKIE_NAME = 'NEXT_LOCALE';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<SupportedLocale>(DEFAULT_LOCALE);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      // 1. Check URL query param ?lang=...
      const urlParams = new URLSearchParams(window.location.search);
      const queryLang = urlParams.get('lang') as SupportedLocale | null;
      if (queryLang && (queryLang === 'fa' || queryLang === 'en' || queryLang === 'ar')) {
        setLocaleState(queryLang);
        return;
      }

      // 2. Check localStorage
      const saved = localStorage.getItem(STORAGE_KEY) as SupportedLocale | null;
      if (saved && (saved === 'fa' || saved === 'en' || saved === 'ar')) {
        setLocaleState(saved);
        return;
      }

      // 3. Check Cookie
      const match = document.cookie.match(new RegExp('(^|;)\\s*' + COOKIE_NAME + '=([^;]+)'));
      const cookieLang = match ? (match[2] as SupportedLocale) : null;
      if (cookieLang && (cookieLang === 'fa' || cookieLang === 'en' || cookieLang === 'ar')) {
        setLocaleState(cookieLang);
      }
    } catch {
      // Ignore in restricted environments
    }
  }, []);

  const setLocale = (newLocale: SupportedLocale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
      document.cookie = `${COOKIE_NAME}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // Ignore
    }

    if (typeof document !== 'undefined') {
      const dir = LOCALES[newLocale].dir;
      document.documentElement.lang = newLocale;
      document.documentElement.dir = dir;

      // Update html class for typography
      document.documentElement.classList.remove('lang-fa', 'lang-en', 'lang-ar');
      document.documentElement.classList.add(`lang-${newLocale}`);
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const dir = LOCALES[locale].dir;
      document.documentElement.lang = locale;
      document.documentElement.dir = dir;
      document.documentElement.classList.remove('lang-fa', 'lang-en', 'lang-ar');
      document.documentElement.classList.add(`lang-${locale}`);
    }
  }, [locale]);

  const dict = useMemo(() => dictionaries[locale] || dictionaries[DEFAULT_LOCALE], [locale]);

  const t = (path: string, fallback?: string): string => {
    const keys = path.split('.');
    let current: any = dict;
    for (const k of keys) {
      if (current === undefined || current === null) break;
      current = current[k];
    }
    if (typeof current === 'string') return current;
    return fallback || path;
  };

  const value = useMemo<LanguageContextType>(() => ({
    locale,
    setLocale,
    dict,
    t,
    dir: LOCALES[locale].dir,
    isRTL: LOCALES[locale].dir === 'rtl',
    localeInfo: LOCALES[locale],
  }), [locale, dict]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Return safe fallback if used outside provider (e.g. static build or admin)
    return {
      locale: DEFAULT_LOCALE,
      setLocale: () => {},
      dict: dictionaries[DEFAULT_LOCALE],
      t: (path: string, fallback?: string) => fallback || path,
      dir: 'rtl' as const,
      isRTL: true,
      localeInfo: LOCALES[DEFAULT_LOCALE],
    };
  }
  return context;
}
