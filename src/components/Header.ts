// ══════════════════════════════════════════════════════════════════════════════
// HEADER COMPONENT - Premium Dark Design
// Glass navbar with pill-style nav container
// ══════════════════════════════════════════════════════════════════════════════
import { t, getLang, setLang, onLangChange } from './i18n'

const SOCIALS = [
  { key: 'discord', url: 'https://discord.gg/XTUg2WKtZU' },
  { key: 'linkedin', url: 'https://www.linkedin.com/company/107399409' },
  { key: 'instagram', url: 'https://www.instagram.com/nexadigit.io' },
]

function ensureSkipLink() {
  if (!document.getElementById('skip-to-content')) {
    const a = document.createElement('a')
    a.id = 'skip-to-content'
    a.href = '#main'
    a.className = 'sr-only focus:not-sr-only absolute top-0 left-0 bg-black text-white p-2 z-[1000]'
    a.textContent = 'Skip to main content'
    document.body.prepend(a)
  }
}

function ensureHreflang() {
  const lang = getLang()
  const other = lang === 'es' ? 'en' : 'es'
  const base = location.origin + '/'
  ;[['canonical', lang], ['alternate', other]].forEach(([rel, l]) => {
    let link = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]${rel === 'alternate' ? `[hreflang="${l}"]` : ''}`)
    if (!link) {
      link = document.createElement('link')
      link.rel = rel
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

function updateMetaDescription(desc: string) {
  let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.name = 'description'
    document.head.appendChild(meta)
  }
  if (meta.content !== desc) meta.content = desc
}

const lockScroll = () => document.documentElement.classList.add('overflow-hidden')
const unlockScroll = () => document.documentElement.classList.remove('overflow-hidden')

export function Header() {
  ensureSkipLink()

  const headerEl = document.createElement('header')
  headerEl.setAttribute('role', 'banner')

  const mobileMenuEl = document.createElement('div')
  mobileMenuEl.id = 'mobile-menu'
  mobileMenuEl.className = `
    fixed inset-0 bg-[#050505]/95 backdrop-blur-xl z-[100]
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
    document.title = t('page_title')
    updateMetaDescription(t('meta_description'))
    ensureHreflang()

    injectJsonLdOnce('org-json', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'NexaDigit',
      url: location.origin,
      logo: location.origin + '/assets/fav-icon-logo.svg',
      telephone: t('phone_number_link'),
      sameAs: SOCIALS.map((s) => s.url),
    })

    headerEl.className = 'fixed top-0 w-full z-50 glass-nav transition-all duration-300'
    headerEl.innerHTML = `
      <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <!-- Logo -->
        <a href="#home" class="flex items-center gap-3 cursor-pointer group">
          <div class="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:border-[#14b8a6]/50 group-hover:bg-[#14b8a6]/10 transition-all shadow-lg shadow-black/20">
            <svg class="w-5 h-5 group-hover:text-[#2dd4bf] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
            </svg>
          </div>
          <div class="flex flex-col">
            <span class="font-display font-medium text-white tracking-tight leading-none">NexaDigit</span>
            <span class="text-[10px] text-gray-500 tracking-wide font-medium group-hover:text-gray-400 transition-colors">EST. 2024</span>
          </div>
        </a>

        <!-- Desktop Nav Pills -->
        <div class="hidden md:flex items-center gap-1 bg-white/5 p-1.5 rounded-full border border-white/5 backdrop-blur-md">
          <a href="#servicios" data-link="servicios" class="nav-link px-5 py-2 text-xs font-medium text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5">${lang === 'en' ? 'Solutions' : 'Soluciones'}</a>
          <a href="#metodologia" data-link="metodologia" class="nav-link px-5 py-2 text-xs font-medium text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5">${lang === 'en' ? 'Process' : 'Proceso'}</a>
          <a href="#unisync" data-link="unisync" class="nav-link px-5 py-2 text-xs font-medium text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5">UniSync AI</a>
        </div>

        <!-- Desktop Actions -->
        <div class="hidden md:flex items-center gap-6">
          <button id="lang-toggle-desktop" class="text-xs font-medium text-gray-400 hover:text-white transition-colors">
            ${lang === 'es' ? 'EN' : 'ES'}
          </button>
          <a href="#contact" data-book-meeting class="group relative px-5 py-2.5 text-xs font-semibold text-black bg-white rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200">
            <span class="relative z-10 flex items-center gap-2">
              ${lang === 'en' ? 'Get Started' : 'Comenzar'}
              <svg class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </span>
            <div class="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </a>
        </div>

        <!-- Mobile Burger -->
        <button id="burger-btn" class="md:hidden p-2 -mr-2 hover:bg-white/5 rounded-lg transition-colors" aria-label="${t('alt_burger_menu')}">
          <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    `

    mobileMenuEl.innerHTML = `
      <div class="flex items-center justify-between h-20 px-6 border-b border-white/5">
        <a href="#home" class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
            </svg>
          </div>
          <div class="flex flex-col">
            <span class="font-display font-medium text-white leading-none">NexaDigit</span>
            <span class="text-[10px] text-gray-500">EST. 2024</span>
          </div>
        </a>
        <button id="close-menu-btn" class="p-2 -mr-2 hover:bg-white/5 rounded-lg transition-colors" aria-label="${t('alt_close_menu')}">
          <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <nav class="flex-1 flex flex-col justify-center px-6">
        <ul class="flex flex-col gap-2">
          <li data-link="home" class="mobile-nav-item">
            <span class="block py-4 text-2xl font-display font-medium hover:text-[#2dd4bf] transition-colors cursor-pointer">${t('nav_home')}</span>
          </li>
          <li data-link="servicios" class="mobile-nav-item">
            <span class="block py-4 text-2xl font-display font-medium hover:text-[#2dd4bf] transition-colors cursor-pointer">${lang === 'en' ? 'Solutions' : 'Soluciones'}</span>
          </li>
          <li data-link="metodologia" class="mobile-nav-item">
            <span class="block py-4 text-2xl font-display font-medium hover:text-[#2dd4bf] transition-colors cursor-pointer">${lang === 'en' ? 'Process' : 'Proceso'}</span>
          </li>
          <li data-link="unisync" class="mobile-nav-item">
            <span class="block py-4 text-2xl font-display font-medium hover:text-[#2dd4bf] transition-colors cursor-pointer">UniSync AI</span>
          </li>
          <li data-link="contact" class="mobile-nav-item">
            <span class="block py-4 text-2xl font-display font-medium hover:text-[#2dd4bf] transition-colors cursor-pointer">${t('nav_contact')}</span>
          </li>
        </ul>
      </nav>

      <div class="p-6 border-t border-white/5">
        <div class="flex items-center justify-between mb-6">
          <span class="text-xs text-gray-500 uppercase tracking-wider">${lang === 'en' ? 'Language' : 'Idioma'}</span>
          <button id="lang-toggle-mobile-menu" class="px-3 py-1.5 text-xs font-medium text-white bg-white/10 rounded-lg border border-white/10">
            ${lang === 'es' ? 'English' : 'Español'}
          </button>
        </div>
        <div class="flex justify-center gap-4">
          ${SOCIALS.map(
            (s) => `
            <a href="${s.url}" target="_blank" rel="noopener noreferrer"
               class="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
              <img src="/assets/top-bar-icon-${s.key}.svg" class="w-5 h-5 opacity-70" alt="${s.key}" />
            </a>
          `
          ).join('')}
        </div>
      </div>
    `

    if (!document.body.contains(mobileMenuEl)) {
      document.body.appendChild(mobileMenuEl)
    }

    setupLanguageToggles()
    setupBurgerMenu()
    setupMobileNavigation()
    setupDesktopNavigation()
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
          const section = document.getElementById(id)
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' })
          }
          setTimeout(unlockScroll, 300)
        })
      })
    })
  }

  function setupDesktopNavigation() {
    const navItems = Array.from(headerEl.querySelectorAll<HTMLAnchorElement>('a.nav-link'))

    navItems.forEach((a) => {
      a.addEventListener('click', (e) => {
        e.preventDefault()
        const linkId = a.dataset.link
        if (!linkId) return

        const section = document.getElementById(linkId)
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' })
        }
      })
    })
  }

  render()
  onLangChange(render)

  return headerEl
}

declare global {
  interface Window {
    __moveNavHighlight?: (id: string) => void
    __headerDocClickListener?: (event: MouseEvent) => void
  }
}
