// ══════════════════════════════════════════════════════════════════════════════
// HEADER — fixed nav, transparent over the hero → frosted cream past it
// (the .scrolled toggle is driven by interactions.ts). Owns per-language SEO
// side effects: title, meta description, OG tags, canonical/hreflang and
// Organization JSON-LD. The "Agendar consulta" pill opens the Calendly popup.
// ══════════════════════════════════════════════════════════════════════════════
import { t, getLang, setLang, onLangChange } from './i18n'

const SOCIALS = [
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

/* Minimalist ES/EN language toggle, shared by the fixed header and the hero's
   floating top bar. Clicks are wired wherever it's mounted via [data-set-lang]. */
export function langSwitchMarkup(current: 'es' | 'en', extraClass = ''): string {
  const opt = (code: 'es' | 'en') =>
    `<button type="button" data-set-lang="${code}" class="nd-lang-opt${
      current === code ? ' is-active' : ''
    }" aria-pressed="${current === code}">${code.toUpperCase()}</button>`
  return `<div class="nd-lang-switch ${extraClass}" role="group" aria-label="${t('a11y_lang_switch')}">${opt(
    'es'
  )}<span class="nd-lang-sep" aria-hidden="true">/</span>${opt('en')}</div>`
}

const LOGO_SRC = '/assets/img/nexadigit-mark.webp'

function logoMarkup(height = 42, extra = ''): string {
  return `
    <a href="#top" data-link="top" class="flex items-center gap-2.5 ${extra}" aria-label="${t('a11y_home')}" style="text-decoration:none;">
      <img src="${LOGO_SRC}" width="249" height="318" alt="NexaDigit" style="height:${height}px;width:auto;display:block;">
    </a>
  `
}

/* ── SEO side effects ────────────────────────────────────────────────────── */

function ensureSkipLink() {
  let a = document.getElementById('skip-to-content') as HTMLAnchorElement | null
  if (!a) {
    a = document.createElement('a')
    a.id = 'skip-to-content'
    a.href = '#main'
    a.className = 'skip-link'
    document.body.prepend(a)
  }
  a.textContent = t('a11y_skip')
}

function ensureHreflang() {
  const lang = getLang()
  const other = lang === 'es' ? 'en' : 'es'
  const base = location.origin + '/'
  ;[['canonical', lang], ['alternate', other]].forEach(([rel, l]) => {
    let link = document.querySelector<HTMLLinkElement>(
      `link[rel="${rel}"]${rel === 'alternate' ? `[hreflang="${l}"]` : ''}`
    )
    if (!link) {
      link = document.createElement('link')
      link.rel = rel as string
      if (rel === 'alternate') link.hreflang = l as string
      document.head.appendChild(link)
    }
    link.href = base + (l === 'es' ? 'es/' : 'en/')
  })
}

function injectJsonLdOnce(id: string, obj: Record<string, unknown>) {
  if (!document.getElementById(id)) {
    const s = document.createElement('script')
    s.id = id
    s.type = 'application/ld+json'
    s.textContent = JSON.stringify(obj)
    document.head.appendChild(s)
  }
}

function setMeta(selector: string, create: () => HTMLMetaElement, content: string) {
  let meta = document.querySelector<HTMLMetaElement>(selector)
  if (!meta) {
    meta = create()
    document.head.appendChild(meta)
  }
  if (meta.content !== content) meta.content = content
}

function updateDocumentMeta() {
  document.title = t('meta_title')

  setMeta('meta[name="description"]', () => {
    const m = document.createElement('meta')
    m.name = 'description'
    return m
  }, t('meta_description'))

  const og: Array<[string, string]> = [
    ['og:title', t('meta_title')],
    ['og:description', t('meta_description')],
    ['og:locale', getLang() === 'es' ? 'es_DO' : 'en_US'],
  ]
  og.forEach(([prop, content]) => {
    setMeta(`meta[property="${prop}"]`, () => {
      const m = document.createElement('meta')
      m.setAttribute('property', prop)
      return m
    }, content)
  })

  setMeta('meta[name="twitter:title"]', () => {
    const m = document.createElement('meta')
    m.name = 'twitter:title'
    return m
  }, t('meta_title'))
}

const lockScroll = () => document.documentElement.classList.add('overflow-hidden')
const unlockScroll = () => document.documentElement.classList.remove('overflow-hidden')

/* ── Component ───────────────────────────────────────────────────────────── */

export function Header() {
  const headerEl = document.createElement('header')
  headerEl.setAttribute('role', 'banner')
  headerEl.className = 'nd-header'

  const mobileMenuEl = document.createElement('div')
  mobileMenuEl.id = 'mobile-menu'
  mobileMenuEl.className =
    'fixed inset-0 z-[100] transform -translate-x-full transition-transform duration-300 ease-out flex flex-col lg:hidden'
  mobileMenuEl.style.background = 'var(--bg)'

  const closeMobileMenu = (cb?: () => void) => {
    mobileMenuEl.classList.add('-translate-x-full')
    mobileMenuEl.classList.remove('translate-x-0')
    if (cb) setTimeout(cb, 300)
    else setTimeout(unlockScroll, 300)
  }

  const openMobileMenu = () => {
    mobileMenuEl.classList.remove('-translate-x-full')
    mobileMenuEl.classList.add('translate-x-0')
    lockScroll()
  }

  function render() {
    const lang = getLang()

    ensureSkipLink()
    updateDocumentMeta()
    ensureHreflang()
    injectJsonLdOnce('org-json', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'NexaDigit',
      url: location.origin,
      logo: location.origin + '/assets/img/nexadigit-mark.webp',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Santo Domingo',
        addressCountry: 'DO',
      },
      sameAs: SOCIALS.map((s) => s.url),
    })

    headerEl.innerHTML = `
      <div class="nd-wrap" style="padding:0 clamp(20px,5vw,40px);height:72px;display:flex;align-items:center;justify-content:space-between;gap:20px;">
        ${logoMarkup(38)}

        <nav class="hidden lg:flex items-center" style="gap:32px;" aria-label="${t('footer_nav_label')}">
          ${NAV_ITEMS.map(
            (item) => `<a href="#${item.id}" data-link="${item.id}" class="nd-link">${t(item.key)}</a>`
          ).join('')}
        </nav>

        <div class="flex items-center" style="gap:16px;">
          ${langSwitchMarkup(lang, 'hidden lg:flex')}
          <a href="#contacto" data-book-meeting class="nd-pill hidden sm:inline-flex">${t('cta_book_short')}</a>
          <button id="burger-btn" class="lg:hidden" style="padding:8px;margin-right:-8px;background:none;border:none;cursor:pointer;color:var(--ink);" aria-label="${t('a11y_open_menu')}">
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>
    `

    mobileMenuEl.innerHTML = `
      <div class="flex items-center justify-between" style="height:72px;padding:0 24px;border-bottom:1px solid var(--line);">
        ${logoMarkup(34)}
        <button id="close-menu-btn" style="padding:8px;margin-right:-8px;background:none;border:none;cursor:pointer;color:var(--ink);" aria-label="${t('a11y_close_menu')}">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <nav class="flex-1 flex flex-col justify-center" style="padding:0 24px;" aria-label="${t('footer_nav_label')}">
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
          <button id="lang-toggle-mobile-menu"
                  style="padding:8px 14px;border:1px solid var(--line-strong);font-family:var(--font-mono);font-size:12px;color:var(--slate);background:none;cursor:pointer;"
                  aria-label="${t('a11y_lang_switch')}">
            ${lang === 'es' ? 'English' : 'Español'}
          </button>
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
    `

    if (!document.body.contains(mobileMenuEl)) {
      document.body.appendChild(mobileMenuEl)
    }

    setupLanguageToggles()
    setupBurgerMenu()
    setupMobileNavigation()
  }

  function setupLanguageToggles() {
    mobileMenuEl.querySelector('#lang-toggle-mobile-menu')?.addEventListener('click', (e) => {
      e.stopPropagation()
      setLang(getLang() === 'es' ? 'en' : 'es')
    })
    // Minimalist ES/EN switch in the fixed header (desktop).
    headerEl.querySelectorAll<HTMLElement>('[data-set-lang]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        const next = btn.dataset.setLang as 'es' | 'en'
        if (next !== getLang()) setLang(next)
      })
    })
  }

  function setupBurgerMenu() {
    headerEl.querySelector('#burger-btn')?.addEventListener('click', (e) => {
      e.stopPropagation()
      openMobileMenu()
    })
    mobileMenuEl.querySelector('#close-menu-btn')?.addEventListener('click', (e) => {
      e.stopPropagation()
      closeMobileMenu()
    })

    if (window.__headerDocClickListener) {
      document.removeEventListener('click', window.__headerDocClickListener)
    }
    window.__headerDocClickListener = (event: MouseEvent) => {
      const target = event.target as Node
      if (mobileMenuEl.classList.contains('translate-x-0') && !mobileMenuEl.contains(target)) {
        closeMobileMenu()
      }
    }
    document.addEventListener('click', window.__headerDocClickListener)
  }

  function setupMobileNavigation() {
    mobileMenuEl.querySelectorAll<HTMLLIElement>('.mobile-nav-item').forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault()
        const id = item.dataset.link
        if (!id) return
        closeMobileMenu(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
          setTimeout(unlockScroll, 300)
        })
      })
    })
  }

  render()
  onLangChange(render)

  return headerEl
}

declare global {
  interface Window {
    __headerDocClickListener?: (event: MouseEvent) => void
  }
}
