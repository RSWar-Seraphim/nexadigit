// ──────────────────────────────────────────
// src/components/Header.ts   (versión mobile+desktop)
// ──────────────────────────────────────────
import { t, getLang, setLang, onLangChange } from './i18n'

declare global {
  interface Window { __moveNavHighlight?: (id: string) => void }
}

export function Header() {
  const headerEl = document.createElement('header')
  headerEl.setAttribute('role', 'banner')
  headerEl.className =
    'fixed top-0 left-0 w-full z-50 bg-black/70 text-white text-xs md:text-sm font-montserrat'

  const render = () => {
    const lang   = getLang()
    const flag   = lang === 'es'
      ? '/src/assets/top-bar-icon-dominican-flag.svg'
      : '/src/assets/top-bar-icon-usa-flag.svg'
    const navGap = lang === 'en' ? 'gap-[140px]' : 'gap-[125px]'

    /* SEO dinámico */
    document.title = t('page_title')
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta) }
    meta!.content = t('meta_description')

    /* ---------- plantilla ---------- */
    headerEl.innerHTML = `
      <!-- MOBILE NAVBAR -->
      <div class="relative flex items-center h-14 bg-[#006E49]/50 lg:hidden">
        <!-- Burger -->
        <button id="burger-btn" class="p-3">
          <img src="/src/assets/icon-hamburger-menu.svg" class="w-3.5 h-3.5 brightness-0 invert" />
        </button>
      
        <!-- Logo centrado absoluto -->
        <img src="/src/assets/fav-icon-logo.svg"
             class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                    w-[25px] h-[31.02px] brightness-0 invert" />
      
        <!-- Lang toggle -->
        <button id="lang-toggle-mobile" class="ml-auto flex items-center gap-1 pr-3">
          <span class="lowercase text-xs">${lang}</span>
          <img src="${flag}" class="w-[18px] h-[18px]" />
          <img src="/src/assets/top-bar-icon-double-arrow-left.svg" class="w-3 h-3 sm:w-5 sm:h-5" />
        </button>
      </div>


      <!-- DESKTOP HEADER (≥ md) ------------------------------------------- -->
      <div class="hidden lg:block">
        <!-- Top bar -->
        <div class="mt-4 w-full max-w-[1238px] mx-auto px-4 py-2 grid grid-cols-1 items-center lg:grid-cols-12 lg:px-[64px]">
          <div class="col-span-6 flex items-center gap-2">
            <img src="/src/assets/top-bar-icon-location.svg" class="w-[21px] h-[21px]"/>
            <span>${t('location_label')}</span>
          </div>
          <div class="col-span-6 flex justify-end items-center gap-1.5">
            ${['discord','linkedin','instagram','facebook'].map(s=>`
              <img data-src="/src/assets/top-bar-icon-${s}.svg"
                   data-hover="/src/assets/top-bar-icon-${s}-hover.svg"
                   src="/src/assets/top-bar-icon-${s}.svg"
                   class="social-icon w-[21px] h-[21px] cursor-pointer"/>`).join('')}
            <div id="lang-toggle" class="flex items-center gap-1 ml-3 cursor-pointer">
              <span class="lowercase">${lang}</span>
              <img src="${flag}" class="w-[21px] h-[21px]"/>
              <img src="/src/assets/top-bar-icon-double-arrow-left.svg" class="w-5 h-5"/>
            </div>
          </div>
        </div>

        <!-- Navbar -->
        <nav class="w-full max-w-[1238px] mx-auto px-[64px] pt-4 pb-2 mt-6 grid grid-cols-12 items-center">
          <ul id="nav-list"
              class="relative col-span-11 flex items-center ${navGap} font-semibold text-[18px] leading-none select-none">
            <div id="nav-highlight"
                 class="absolute top-0 left-0 w-[80px] h-[130px] bg-[#006E49] rounded-tl-[15px] transition-all duration-300 ease-in-out -z-10">
              <div class="absolute bottom-[35px] left-1/2 -translate-x-1/2 w-5 h-[3px] bg-white"></div>
            </div>

            <li data-link="home"     class="nav-item w-[80px] h-[130px] flex flex-col justify-center items-center cursor-pointer"><span>${t('nav_home')}</span></li>
            <li data-link="about"    class="nav-item cursor-pointer"><span>${t('nav_about')}</span></li>
            <li data-link="services" class="nav-item cursor-pointer"><span>${t('nav_services')}</span></li>
            <li data-link="unisync"  class="nav-item cursor-pointer"><span>${t('nav_unisync')}</span></li>
            <li data-link="contact"  class="nav-item cursor-pointer"><span>${t('nav_contact')}</span></li>
          </ul>
          <div class="col-span-1 flex justify-end">
            <img src="/src/assets/nav-bar-icon-call-button.svg" class="w-9 h-9 cursor-pointer"/>
          </div>
        </nav>
      </div>
    `

    /* ---------- listeners comunes ---------- */
    // Desktop lang toggle
    headerEl.querySelector('#lang-toggle')
      ?.addEventListener('click', () => setLang(getLang() === 'es' ? 'en' : 'es'))

    // Mobile lang toggle
    headerEl.querySelector('#lang-toggle-mobile')
      ?.addEventListener('click', () => setLang(getLang() === 'es' ? 'en' : 'es'))

    // Hover social icons
    headerEl.querySelectorAll('.social-icon').forEach(img => {
      const el = img as HTMLImageElement
      const base = el.dataset.src!, hover = el.dataset.hover!
      el.onmouseenter = () => { el.src = hover }
      el.onmouseleave = () => { el.src = base  }
    })

    /* ---------- highlight logic (desktop) ---------- */
    const navList   = headerEl.querySelector('#nav-list')      as HTMLElement | null
    const hiLight   = headerEl.querySelector('#nav-highlight') as HTMLElement | null
    if (navList && hiLight) {
      const navItems  = Array.from(headerEl.querySelectorAll<HTMLLIElement>('.nav-item'))
      const PAD_X = 16
      const HEADER_Y = 260
      let activeTab: HTMLLIElement = navItems[0]

      const paintHighlight = (el: HTMLElement) => {
        const rect = el.getBoundingClientRect()
        const list = navList.getBoundingClientRect()
        const w    = el.dataset.link === 'home' ? rect.width : rect.width + PAD_X*2
        const left = rect.left - list.left - (w - rect.width) / 2
        hiLight.style.transform = `translateX(${left}px)`
        hiLight.style.width     = `${w}px`
      }
      const setActiveClass = (el: HTMLElement) =>
        navItems.forEach(li => li.classList.toggle('active', li === el))
      const scrollToId = (id: string) => {
        const sec = document.getElementById(id)
        const top = sec ? sec.getBoundingClientRect().top + scrollY - HEADER_Y : 0
        scrollTo({ top, behavior:'smooth' })
      }
      navItems.forEach(li => {
        li.addEventListener('click', e => {
          e.preventDefault()
          const el = e.currentTarget as HTMLLIElement
          scrollToId(el.dataset.link!)
          activeTab = el
          paintHighlight(el)
          setActiveClass(el)
        })
      })
      navItems.forEach(li => {
        li.addEventListener('mouseenter', () => paintHighlight(li))
        li.addEventListener('mouseleave', () => paintHighlight(activeTab))
      })
      window.addEventListener('resize', () => paintHighlight(activeTab))

      // Expuesto para scroll.ts
      window.__moveNavHighlight = (id: string) => {
        const el = headerEl.querySelector<HTMLLIElement>(`[data-link="${id}"]`)
        if (el && el !== activeTab) {
          activeTab = el
          paintHighlight(el)
          setActiveClass(el)
        }
      }

      requestAnimationFrame(() => {
        paintHighlight(activeTab)
        setActiveClass(activeTab)
      })
    }
  } // render

  render()
  onLangChange(render)
  return headerEl
}
