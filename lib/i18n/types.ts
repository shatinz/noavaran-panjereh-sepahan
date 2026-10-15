export type SupportedLocale = 'fa' | 'en' | 'ar';

export interface LocaleInfo {
  code: SupportedLocale;
  label: string;
  nativeLabel: string;
  shortCode: string;
  dir: 'rtl' | 'ltr';
  flag: string;
}

export const LOCALES: Record<SupportedLocale, LocaleInfo> = {
  fa: {
    code: 'fa',
    label: 'Persian',
    nativeLabel: 'فارسی',
    shortCode: 'فا',
    dir: 'rtl',
    flag: '🇮🇷',
  },
  en: {
    code: 'en',
    label: 'English',
    nativeLabel: 'English',
    shortCode: 'EN',
    dir: 'ltr',
    flag: '🇬🇧',
  },
  ar: {
    code: 'ar',
    label: 'Arabic',
    nativeLabel: 'العربية',
    shortCode: 'عربي',
    dir: 'rtl',
    flag: '🇦🇪',
  },
};

export const DEFAULT_LOCALE: SupportedLocale = 'fa';
