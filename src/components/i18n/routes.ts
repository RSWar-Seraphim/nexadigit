// URL map — one URL per language per page. Spanish is the default locale and
// lives at the root; English is prefixed. Blog routes join this map in Fase 3.
import type { Lang } from './index'

export type Page = 'home' | 'privacy' | 'terms'

export const SITE = 'https://nexadigit.io'

export const ROUTES: Record<Page, Record<Lang, string>> = {
  home: { es: '/', en: '/en/' },
  privacy: { es: '/privacidad/', en: '/en/privacy/' },
  terms: { es: '/terminos/', en: '/en/terms/' },
}

export const pageUrl = (page: Page, lang: Lang): string => ROUTES[page][lang]
export const absUrl = (path: string): string => SITE + path
