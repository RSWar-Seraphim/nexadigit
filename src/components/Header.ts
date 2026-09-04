// ══════════════════════════════════════════════════════════════════════════════
// HEADER — fixed nav, transparent over the hero → frosted cream past it
// (the .scrolled toggle is driven by interactions.ts), plus the off-canvas
// mobile menu. Pure markup: burger/menu behavior lives in src/client/header.ts.
// The ES/EN switch is a plain link to the other language's URL.
// ══════════════════════════════════════════════════════════════════════════════
import { tr, otherLang, type Lang } from './i18n'
import { ROUTES } from './i18n/routes'

export const SOCIALS = [
  { key: 'discord', url: 'https://discord.gg/3sbzSSW9vd' },
  { key: 'linkedin', url: 'https://www.linkedin.com/company/107399409' },
  { key: 'instagram', url: 'https://www.instagram.com/nexadigit.io' },
]

export const NAV_ITEMS = [
  { id: 'servicios', key: 'nav_services' },
  { id: 'unisync', key: 'nav_unisync' },
  { id: 'produccion', key: 'nav_production' },
  { id: 'proceso', key: 'nav_process' },
  { id: 'contacto', key: 'nav_contact' },
] as const

const LOGO_SRC = '/assets/img/nexadigit-mark.webp'

/* Minimalist ES/EN switch, shared by the fixed header and the hero's floating
   top bar. The current language is inert text; the other one is a link. */
export function langSwitchMarkup(lang: Lang, extraClass = ''): string {
  const t = tr(lang)
  const opt = (code: Lang) =>
    code === lang
      ? `<span class="nd-lang-opt is-active" aria-current="page" lang="${code}">${code.toUpperCase()}</span>`
      : `<a href="${ROUTES.home[code]}" hreflang="${code}" lang="${code}" class="nd-lang-opt" style="text-decoration:none;">${code.toUpperCase()}</a>`
  return `<div class="nd-lang-switch ${extraClass}" role="group" aria-label="${t('a11y_lang_switch')}">${opt(
    'es'
  )}<span class="nd-lang-sep" aria-hidden="true">/</span>${opt('en')}</div>`
}

export function logoMarkup(lang: Lang, height = 42, extra = ''): string {
  const t = tr(lang)
  return `
    <a href="#top" data-link="top" class="flex items-center gap-2.5 ${extra}" aria-label="${t('a11y_home')}" style="text-decoration:none;">
      <img src="${LOGO_SRC}" width="249" height="318" alt="NexaDigit" style="height:${height}px;width:auto;display:block;">
    </a>
  `
}

export function headerMarkup(lang: Lang): string {
  const t = tr(lang)
  const other = otherLang(lang)

  return `
    <header role="banner" class="nd-header">
      <div class="nd-wrap" style="padding:0 clamp(20px,5vw,40px);height:72px;display:flex;align-items:center;justify-content:space-between;gap:20px;">
        ${logoMarkup(lang, 38)}

        <nav class="hidden lg:flex items-center" style="gap:32px;" aria-label="${t('a11y_nav_main')}">
          ${NAV_ITEMS.map(
            (item) => `<a href="#${item.id}" data-link="${item.id}" class="nd-link">${t(item.key)}</a>`
          ).join('')}
        </nav>

        <div class="flex items-center" style="gap:16px;">
          ${langSwitchMarkup(lang, 'hidden lg:flex')}
          <a href="#contacto" data-book-meeting class="nd-pill hidden sm:inline-flex">${t('cta_book_short')}</a>
          <button id="burger-btn" class="lg:hidden" style="padding:8px;margin-right:-8px;background:none;border:none;cursor:pointer;color:var(--ink);" aria-label="${t('a11y_open_menu')}" aria-controls="mobile-menu" aria-expanded="false">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>
    </header>

    <div id="mobile-menu" class="fixed inset-0 z-[100] transform -translate-x-full transition-transform duration-300 ease-out flex flex-col lg:hidden" style="background:var(--bg);">
      <div class="flex items-center justify-between" style="height:72px;padding:0 24px;border-bottom:1px solid var(--line);">
        ${logoMarkup(lang, 34)}
        <button id="close-menu-btn" style="padding:8px;margin-right:-8px;background:none;border:none;cursor:pointer;color:var(--ink);" aria-label="${t('a11y_close_menu')}">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <nav class="flex-1 flex flex-col justify-center" style="padding:0 24px;" aria-label="${t('a11y_nav_mobile')}">
        <ul class="flex flex-col" style="gap:4px;">
          ${NAV_ITEMS.map(
            (item) => `
            <li data-link="${item.id}" class="mobile-nav-item">
              <span style="display:block;padding:14px 0;font-family:var(--font-display);font-weight:600;font-size:26px;letter-spacing:-0.02em;color:var(--ink);cursor:pointer;">${t(item.key)}</span>
            </li>`
          ).join('')}
        </ul>
        <a href="#contacto" data-book-meeting class="nd-pill" style="margin-top:28px;width:100%;justify-content:center;padding:14px 20px;">${t('cta_book')}</a>
      </nav>

      <div style="padding:24px;border-top:1px solid var(--line);">
        <div class="flex items-center justify-between">
          <a href="${ROUTES.home[other]}" hreflang="${other}" lang="${other}"
             style="display:inline-block;padding:8px 14px;border:1px solid var(--line-strong);font-family:var(--font-mono);font-size:12px;color:var(--slate);text-decoration:none;"
             aria-label="${t('a11y_lang_switch')}">
            ${lang === 'es' ? 'English' : 'Español'}
          </a>
          <div class="flex" style="gap:8px;">
            ${SOCIALS.map(
              (s) => `
              <a href="${s.url}" target="_blank" rel="noopener noreferrer"
                 style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;border:1px solid var(--line-strong);color:var(--slate);font-family:var(--font-mono);font-size:12px;text-transform:uppercase;text-decoration:none;"
                 aria-label="${s.key} (${t('a11y_external')})">
                ${s.key.slice(0, 2)}
              </a>`
            ).join('')}
          </div>
        </div>
      </div>
    </div>
  `
}
