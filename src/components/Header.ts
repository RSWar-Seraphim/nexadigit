// ══════════════════════════════════════════════════════════════════════════════
// HEADER — light glass nav on hairline border
// Also owns per-language SEO side effects: title, meta description, OG tags,
// canonical/hreflang and Organization JSON-LD.
// ══════════════════════════════════════════════════════════════════════════════
import { t, getLang, setLang, onLangChange } from './i18n'

const SOCIALS = [
  { key: 'discord', url: 'https://discord.gg/XTUg2WKtZU' },
  { key: 'linkedin', url: 'https://www.linkedin.com/company/107399409' },
  { key: 'instagram', url: 'https://www.instagram.com/nexadigit.io' },
]

const NAV_ITEMS = [
  { id: 'home', key: 'nav_home' },
  { id: 'servicios', key: 'nav_services' },
  { id: 'unisync', key: 'nav_unisync' },
  { id: 'activos', key: 'nav_assets' },
  { id: 'proceso', key: 'nav_process' },
  { id: 'contact', key: 'nav_contact' },
] as const

const LOGO_PATH =
  'M183.24,41.29c-11.4,0-21.81-9.24-21.81-20.65S171.84,0,183.24,0s20.64,9.24,20.64,20.64-9.24,20.65-20.64,20.65ZM163.8,136.27l-.63-89.79h40.46l.26,208.94h-40.08L55.86,95.35l-18.99-33.37,1.76,56.7.11,87.81,48.86-29.88,16.82,27.51-79.5,48.62c-7.75,4.74-17.88,2.3-22.62-5.45-1.86-3.04-2.55-6.45-2.23-9.75,0-.06,0-.12,0-1.34V.01l38.56.24,108.65,160.06,18.28,33.02-1.76-57.06Z'

function logoMarkup(extra = ''): string {
  return `
    <a href="#home" class="flex items-center gap-2.5 group ${extra}" aria-label="${t('a11y_home')}">
      <svg class="h-6 w-auto text-ink group-hover:text-accent transition-colors" viewBox="0 0 204 256" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="${LOGO_PATH}"/>
      </svg>
      <span class="font-logo font-bold text-lg tracking-tight text-ink">NexaDigit</span>
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

  const mobileMenuEl = document.createElement('div')
  mobileMenuEl.id = 'mobile-menu'
  mobileMenuEl.className = `
    fixed inset-0 bg-bg z-[100]
    transform -translate-x-full transition-transform duration-300 ease-out
    flex flex-col lg:hidden
  `

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
      logo: location.origin + '/assets/fav-icon-logo.svg',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Santo Domingo',
        addressCountry: 'DO',
      },
      sameAs: SOCIALS.map((s) => s.url),
    })

    headerEl.className = 'fixed top-0 w-full z-50 nav-glass'
    headerEl.innerHTML = `
      <div class="max-w-content mx-auto px-6 h-[72px] flex items-center justify-between gap-6">
        ${logoMarkup()}

        <!-- Desktop nav -->
        <nav class="hidden lg:flex items-center gap-7" aria-label="${t('footer_nav_label')}">
          ${NAV_ITEMS.map(
            (item) => `
            <a href="#${item.id}" data-link="${item.id}" class="nav-link">${t(item.key)}</a>
          `
          ).join('')}
        </nav>

        <!-- Desktop actions -->
        <div class="hidden lg:flex items-center gap-4">
          <button id="lang-toggle-desktop"
                  class="px-2.5 py-1.5 rounded-lg border border-line text-xs font-mono font-medium text-slate hover:text-ink hover:border-accent transition-colors"
                  aria-label="${t('a11y_lang_switch')}">
            ${lang === 'es' ? 'EN' : 'ES'}
          </button>
          <a href="#contact" data-book-meeting class="btn-primary !px-5 !py-2.5 text-sm">
            ${t('cta_book')}
          </a>
        </div>

        <!-- Mobile burger -->
        <button id="burger-btn" class="lg:hidden p-2 -mr-2 rounded-lg hover:bg-line/50 transition-colors" aria-label="${t('a11y_open_menu')}">
          <svg class="w-6 h-6 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    `

    mobileMenuEl.innerHTML = `
      <div class="flex items-center justify-between h-[72px] px-6 border-b border-line">
        ${logoMarkup()}
        <button id="close-menu-btn" class="p-2 -mr-2 rounded-lg hover:bg-line/50 transition-colors" aria-label="${t('a11y_close_menu')}">
          <svg class="w-6 h-6 text-ink" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <nav class="flex-1 flex flex-col justify-center px-6" aria-label="${t('footer_nav_label')}">
        <ul class="flex flex-col gap-1">
          ${NAV_ITEMS.map(
            (item) => `
            <li data-link="${item.id}" class="mobile-nav-item">
              <span class="block py-3.5 text-2xl font-display font-semibold text-ink hover:text-accent transition-colors cursor-pointer">${t(item.key)}</span>
            </li>
          `
          ).join('')}
        </ul>
        <a href="#contact" data-book-meeting class="btn-primary mt-8 w-full">${t('cta_book')}</a>
      </nav>

      <div class="p-6 border-t border-line">
        <div class="flex items-center justify-between">
          <button id="lang-toggle-mobile-menu"
                  class="px-3 py-2 rounded-lg border border-line text-sm font-mono font-medium text-slate hover:text-ink hover:border-accent transition-colors"
                  aria-label="${t('a11y_lang_switch')}">
            ${lang === 'es' ? 'English' : 'Español'}
          </button>
          <div class="flex gap-2">
            ${SOCIALS.map(
              (s) => `
              <a href="${s.url}" target="_blank" rel="noopener noreferrer"
                 class="w-10 h-10 flex items-center justify-center rounded-lg border border-line text-slate hover:text-accent hover:border-accent transition-colors text-xs font-mono uppercase"
                 aria-label="${s.key} (${t('a11y_external')})">
                ${s.key.slice(0, 2)}
              </a>
            `
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
    headerEl.querySelector('#lang-toggle-desktop')?.addEventListener('click', () => {
      setLang(getLang() === 'es' ? 'en' : 'es')
    })
    mobileMenuEl.querySelector('#lang-toggle-mobile-menu')?.addEventListener('click', (e) => {
      e.stopPropagation()
      setLang(getLang() === 'es' ? 'en' : 'es')
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
