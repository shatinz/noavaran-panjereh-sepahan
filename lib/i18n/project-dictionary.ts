import translations from '@/data/project-translations.json';
import { SupportedLocale } from './types';

type Pair = { en: string; ar: string };
type Section = 'titles' | 'employers' | 'locations' | 'descriptions' | 'systems';

const tables = translations as unknown as Record<Section, Record<string, Pair>>;

/**
 * Normalises Persian text so that spelling variants share one key:
 * ZWNJ -> space, Arabic ي/ك -> Persian ی/ک, collapsed whitespace.
 * (The same function was used to build data/project-translations.json.)
 */
export function normalizeFa(text: string): string {
  return text
    .replace(/\u200c/g, ' ')
    .replace(/\u064a/g, '\u06cc')
    .replace(/\u0643/g, '\u06a9')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Looks up the EN/AR version of an existing Persian string; undefined when unknown. */
export function lookupProjectText(
  section: Section,
  fa: string | undefined,
  locale: SupportedLocale
): string | undefined {
  if (!fa || locale === 'fa') return undefined;
  const hit = tables[section]?.[normalizeFa(fa)];
  return hit ? hit[locale] : undefined;
}
