// ══════════════════════════════════════════════════════════════════════════════
// i18n — pure translator. The language is decided by the URL (/ = es, /en/ = en)
// and passed explicitly, so the same code runs at build time (Astro) and in the
// browser with no localStorage, no listeners, no re-renders.
// ══════════════════════════════════════════════════════════════════════════════
import { es } from './es'
import { en } from './en'

export type Lang = 'es' | 'en'
export type Key = keyof typeof es

export const LANGS: readonly Lang[] = ['es', 'en'] as const
export const OG_LOCALE: Record<Lang, string> = { es: 'es_DO', en: 'en_US' }

const dict = { es, en } as Record<Lang, Record<Key, string>>

/** Translator for one language: `const t = tr('es'); t('hero_headline')`. */
export function tr(lang: Lang): (key: Key) => string {
  const d = dict[lang]
  return (key) => d[key] || key
}

export const otherLang = (lang: Lang): Lang => (lang === 'es' ? 'en' : 'es')
