// ──────────────────────────────────────────
// src/components/Header.ts   (mobile + desktop)
// Versión: Mobile top bar se oculta al abrir menú lateral
// Actualización: 2025-05-08 – Ajustes de offset y transiciones suaves mobile
// ──────────────────────────────────────────
import { t, getLang, setLang, onLangChange } from './i18n'

declare global {
  interface Window {
    __moveNavHighlight?: (id: string) => void;
    __headerDocClickListener?: (event: MouseEvent) => void;
  }
}

export function Header() {
  const headerEl = document.createElement('header')
  headerEl.setAttribute('role', 'banner')
  headerEl.className =
    'fixed top-0 left-0 w-full z-50 bg-black/70 text-white text-xs md:text-sm font-montserrat'

  const mobileMenuEl = document.createElement('div')
  mobileMenuEl.id = 'mobile-menu'
  mobileMenuEl.className = [
    'fixed top-0 left-0 h-full w-[160px] bg-[#004D30] text-white shadow-2xl',
    'transform -translate-x-full transition-transform duration-300 ease-in-out',
    'flex flex-col lg:hidden z-[100]'
  ].join(' ')

  const lockScroll = () => document.documentElement.classList.add('overflow-hidden')
  const unlockScroll = () => document.documentElement.classList.remove('overflow-hidden')
  const MAIN_SELECTOR = 'main'
  const SCROLL_ANIMATION_DURATION = 600 // milisegundos

  /** Dinámicamente calcula la altura visible del top‑bar móvil. */
  const getMobileHeaderOffset = () => {
    const mobileTopBar = headerEl.querySelector('#mobile-top-bar') as HTMLElement | null
    return mobileTopBar ? mobileTopBar.offsetHeight : 0
  }

  /** Scroll "manual" para mayor control de velocidad. */
  const smoothScrollTo = (targetY: number, duration = SCROLL_ANIMATION_DURATION) => {
    const startY = window.scrollY
    const distance = targetY - startY
    const startTime = performance.now()

    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      window.scrollTo(0, startY + distance * progress)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }

  const render = () => {
    const lang = getLang()
    const flag = lang === 'es'
      ? '/src/assets/top-bar-icon-dominican-flag.svg'
      : '/src/assets/top-bar-icon-usa-flag.svg'

    const navGap = lang === 'en'
      ? 'gap-[90px] xl:gap-[140px]'
      : 'gap-[80px] xl:gap-[125px]'

    document.title = t('page_title')
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = t('meta_description')

    // El z-index de mobile-top-bar (z-[55]) es relativo al z-50 de headerEl.
    headerEl.innerHTML = `
      <div id="mobile-top-bar" class="relative flex items-center h-14 bg-[#006E49]/80 lg:hidden z-[55] select-none transition-opacity duration-300">
        <button id="burger-btn" class="p-3">
          <img src="/src/assets/icon-hamburger-menu.svg" class="w-3.5 h-3.5 brightness-0 invert" alt="${t('alt_burger_menu', 'Abrir menú')}" />
        </button>
        <img id="mobile-main-logo" src="/src/assets/fav-icon-logo.svg"
             class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[25px] h-[31.02px] brightness-0 invert" alt="${t('alt_logo_mobile', 'Logo')}" />
        <button id="lang-toggle-mobile-main" class="ml-auto flex items-center gap-1 pr-3">
          <span class="lowercase text-xs">${lang}</span>
          <img src="${flag}" class="w-[18px] h-[18px]" alt="${t('alt_lang_flag_mobile_main', 'Bandera idioma')}" />
          <img src="/src/assets/top-bar-icon-double-arrow-left.svg" class="w-3 h-3 sm:w-5 sm:h-5 brightness-0 invert" alt="${t('alt_arrow_icon', 'Icono flecha')}" />
        </button>
      </div>
      <div class="hidden lg:block select-none">
        <div class="mt-4 w-full lg:max-w-[960px] xl:max-w-[1238px] mx-auto px-4 lg:px-8 xl:px-[64px] grid grid-cols-1 items-center lg:grid-cols-12">
          <div class="col-span-6 flex items-center gap-2">
            <img src="/src/assets/top-bar-icon-location.svg" class="w-[21px] h-[21px]" alt="${t('alt_location_icon', 'Ubicación')}"/>
            <span>${t('location_label')}</span>
          </div>
          <div class="col-span-6 flex justify-end items-center gap-1.5">
            ${['discord', 'linkedin', 'instagram', 'facebook'].map(s => `
              <a href="${t('social_link_' + s, '#')}" target="_blank" rel="noopener noreferrer" aria-label="${t('alt_social_' + s, s)}">
                <img data-src="/src/assets/top-bar-icon-${s}.svg"
                     data-hover="/src/assets/top-bar-icon-${s}-hover.svg"
                     src="/src/assets/top-bar-icon-${s}.svg"
                     class="social-icon w-[21px] h-[21px] cursor-pointer" alt=""/>
              </a>`).join('')}
            <div id="lang-toggle-desktop" class="flex items-center gap-1 ml-3 cursor-pointer">
              <span class="lowercase">${lang}</span>
              <img src="${flag}" class="w-[21px] h-[21px]" alt="${t('alt_lang_flag_desktop', 'Bandera idioma')}"/>
              <img src="/src/assets/top-bar-icon-double-arrow-left.svg" class="w-5 h-5 brightness-0 invert" alt="${t('alt_arrow_icon', 'Icono flecha')}"/>
            </div>
          </div>
        </div>
        <nav class="w-full lg:max-w-[960px] xl:max-w-[1238px] mx-auto lg:px-8 xl:px-[64px] pt-4 pb-2 mt-6 grid grid-cols-12 items-center">
          <ul id="nav-list" class="relative col-span-11 flex items-center ${navGap} font-semibold text-[18px] leading-none">
            <div id="nav-highlight" class="absolute top-0 left-0 w-[80px] h-[130px] bg-[#006E49] rounded-tl-[15px] transition-all duration-300 ease-in-out -z-10">
              <div class="absolute bottom-[35px] left-1/2 -translate-x-1/2 w-5 h-[3px] bg-white"></div>
            </div>
            <li data-link="home" class="nav-item w-[80px] h-[130px] flex flex-col justify-center items-center cursor-pointer"><span>${t('nav_home')}</span></li>
            <li data-link="about" class="nav-item cursor-pointer"><span>${t('nav_about')}</span></li>
            <li data-link="services" class="nav-item cursor-pointer"><span>${t('nav_services')}</span></li>
            <li data-link="unisync" class="nav-item cursor-pointer"><span>${t('nav_unisync')}</span></li>
            <li data-link="contact" class="nav-item cursor-pointer"><span>${t('nav_contact')}</span></li>
          </ul>
          <div class="col-span-1 flex justify-end">
            <a href="tel:${t('phone_number_link', '')}" data-book-meeting aria-label="${t('alt_call_button', 'Llamar')}">
              <img src="/src/assets/nav-bar-icon-call-button.svg" class="w-9 h-9 cursor-pointer" alt=""/>
            </a>
          </div>
        </nav>
      </div>
    `

    mobileMenuEl.innerHTML = `
      <div class="flex items-center h-14 bg-[#006E49]/50 w-full px-3 relative select-none">
        <button id="close-menu-btn" class="p-1">
          <img src="/src/assets/menu-cancel-icon.svg" class="w-4 h-4 brightness-0 invert" alt="${t('alt_close_menu', 'Cerrar menú')}"/>
        </button>
        <img src="/src/assets/fav-icon-logo.svg"
             class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[25px] h-[31.02px] brightness-0 invert" alt="${t('alt_logo_menu', 'Logo')}"/>
        <button id="lang-toggle-mobile-menu" class="ml-auto flex items-center gap-1">
          <img src="${flag}" class="w-[18px] h-[18px]" alt="${t('alt_lang_flag_menu', 'Bandera idioma')}"/>
        </button>
      </div>
      <nav class="flex-grow mt-10">
        <ul class="flex flex-col gap-12 items-center text-[14px] font-bold w-full text-center">
          <li data-link="home" class="mobile-nav-item cursor-pointer hover:text-gray-300 w-full py-2"><span>${t('nav_home')}</span></li>
          <li data-link="about" class="mobile-nav-item cursor-pointer hover:text-gray-300 w-full py-2"><span>${t('nav_about')}</span></li>
          <li data-link="services" class="mobile-nav-item cursor-pointer hover:text-gray-300 w-full py-2"><span>${t('nav_services')}</span></li>
          <li data-link="unisync" class="mobile-nav-item cursor-pointer hover:text-gray-300 w-full py-2"><span>${t('nav_unisync')}</span></li>
          <li data-link="contact" class="mobile-nav-item cursor-pointer hover:text-gray-300 w-full py-2"><span>${t('nav_contact')}</span></li>
        </ul>
      </nav>
      <div class="my-8 flex justify-center">
        <img src="/src/assets/marker-icon-2.png" alt="${t('alt_decorative_separator', 'Separador')}" class="w-[100px] h-auto opacity-80" />
      </div>
      <div class="pb-8 px-6 flex justify-around items-center select-none">
        ${['discord', 'linkedin', 'instagram', 'facebook'].map(s => `
          <a href="${t('social_link_' + s, '#')}" target="_blank" rel="noopener noreferrer" aria-label="${t('alt_social_' + s + '_mobile', s)}">
            <img data-src="/src/assets/top-bar-icon-${s}.svg"
                 src="/src/assets/top-bar-icon-${s}.svg"
                 class="social-icon-mobile w-6 h-6 cursor-pointer brightness-0 invert hover:opacity-75" alt=""/>
          </a>
        `).join('')}
      </div>
    `

    if (!document.body.contains(mobileMenuEl)) {
      document.body.appendChild(mobileMenuEl)
    }

    const desktopLangToggle = headerEl.querySelector('#lang-toggle-desktop')
    desktopLangToggle?.addEventListener('click', () => {
      setLang(getLang() === 'es' ? 'en' : 'es')
    })

    const mobileMainLangToggle = headerEl.querySelector('#lang-toggle-mobile-main')
    mobileMainLangToggle?.addEventListener('click', (e) => {
      e.stopPropagation();
      setLang(getLang() === 'es' ? 'en' : 'es')
    })

    const mobileMenuLangToggle = mobileMenuEl.querySelector('#lang-toggle-mobile-menu')
    mobileMenuLangToggle?.addEventListener('click', (e) => {
      e.stopPropagation();
      setLang(getLang() === 'es' ? 'en' : 'es');
    })

    headerEl.querySelectorAll<HTMLImageElement>('.social-icon').forEach(img => {
      const baseSrc = img.dataset.src
      const hoverSrc = img.dataset.hover
      if (baseSrc && hoverSrc) {
        img.onmouseenter = () => { img.src = hoverSrc }
        img.onmouseleave = () => { img.src = baseSrc }
      }
    })

    const burgerBtn = headerEl.querySelector('#burger-btn') as HTMLButtonElement | null
    const closeMenuBtn = mobileMenuEl.querySelector('#close-menu-btn') as HTMLButtonElement | null

    const openMobileMenu = () => {
      const mainContent = document.querySelector(MAIN_SELECTOR) as HTMLElement | null
      const mobileTopBar = headerEl.querySelector('#mobile-top-bar') as HTMLElement | null

      mobileMenuEl.classList.remove('-translate-x-full')
      mobileMenuEl.classList.add('translate-x-0')
      // Fade out top‑bar en lugar de ocultarlo de golpe
      mobileTopBar?.classList.add('opacity-0', 'pointer-events-none')

      if (mainContent) {
        mainContent.classList.add('blur-sm', 'pointer-events-none')
      }
      lockScroll()
    }

    const closeMobileMenu = () => {
      const mainContent = document.querySelector(MAIN_SELECTOR) as HTMLElement | null
      const mobileTopBar = headerEl.querySelector('#mobile-top-bar') as HTMLElement | null

      mobileMenuEl.classList.add('-translate-x-full')
      mobileMenuEl.classList.remove('translate-x-0')
      // Re‑aparece suavemente
      mobileTopBar?.classList.remove('opacity-0', 'pointer-events-none')

      if (mainContent) {
        mainContent.classList.remove('blur-sm', 'pointer-events-none')
      }
      unlockScroll()
    }

    burgerBtn?.addEventListener('click', e => {
      e.stopPropagation()
      openMobileMenu()
    })
    closeMenuBtn?.addEventListener('click', e => {
      e.stopPropagation()
      closeMobileMenu()
    })

    // Cierre tocando fuera
    if (window.__headerDocClickListener) {
      document.removeEventListener('click', window.__headerDocClickListener)
    }
    window.__headerDocClickListener = (event: MouseEvent) => {
      const target = event.target as Node
      const currentBurgerBtn = headerEl.querySelector('#burger-btn')
      if (
        mobileMenuEl.classList.contains('translate-x-0') &&
        !mobileMenuEl.contains(target) &&
        (!currentBurgerBtn || !currentBurgerBtn.contains(target))
      ) {
        closeMobileMenu()
      }
    }
    document.addEventListener('click', window.__headerDocClickListener)

    // ————————————————————————————
    // Navegación dentro del menú móvil (offset & scroll mejorados)
    // ————————————————————————————
    const mobileNavItems = mobileMenuEl.querySelectorAll<HTMLLIElement>('.mobile-nav-item')

    mobileNavItems.forEach(li => {
      li.addEventListener('click', e => {
        e.preventDefault()
        const id = li.dataset.link
        if (!id) return
        closeMobileMenu()
        setTimeout(() => {
          const section = document.getElementById(id)
          if (section) {
            const offset = getMobileHeaderOffset()
            const topPos = section.getBoundingClientRect().top + window.scrollY - offset
            smoothScrollTo(topPos) // scroll más suave y con offset correcto
            if (window.innerWidth >= 1024 && window.__moveNavHighlight) {
              window.__moveNavHighlight(id)
            }
          }
        }, 300) // espera a que termine la animación del menú
      })
    })

    const navList = headerEl.querySelector('#nav-list') as HTMLElement | null
    const highlightEl = headerEl.querySelector('#nav-highlight') as HTMLElement | null

    if (navList && highlightEl) {
      const navItems = Array.from(headerEl.querySelectorAll<HTMLLIElement>('li.nav-item'))
      const PAD_X = 16
      const HEADER_Y_DESKTOP = 260
      let activeTab: HTMLLIElement | null = navItems.find(item => item.classList.contains('active')) || (navItems.length > 0 ? navItems[0] : null)

      const paintHighlight = (el: HTMLElement | null) => {
        if (!el || !navList || !highlightEl) return
        const rect = el.getBoundingClientRect()
        const isHome = el.dataset.link === 'home'
        const width = isHome ? rect.width : rect.width + PAD_X * 2
        const leftPosition = el.offsetLeft - (isHome ? 0 : PAD_X)
        highlightEl.style.width = `${width}px`
        highlightEl.style.transform = `translateX(${leftPosition}px)`
      }

      const setActiveClass = (el: HTMLElement | null) => {
        navItems.forEach(li => li.classList.remove('active'))
        if (el) el.classList.add('active')
      }

      const scrollToSectionDesktop = (id: string) => {
        const section = document.getElementById(id)
        if (section) {
          const topPos = section.getBoundingClientRect().top + window.scrollY - HEADER_Y_DESKTOP
          window.scrollTo({ top: topPos, behavior: 'smooth' })
        }
      }

      navItems.forEach(li => {
        li.addEventListener('click', e => {
          e.preventDefault()
          const currentTargetLi = e.currentTarget as HTMLLIElement
          const linkId = currentTargetLi.dataset.link
          if (linkId) {
            scrollToSectionDesktop(linkId)
            activeTab = currentTargetLi
            paintHighlight(activeTab)
            setActiveClass(activeTab)
          }
        })
        li.addEventListener('mouseenter', () => paintHighlight(li))
        li.addEventListener('mouseleave', () => paintHighlight(activeTab))
      })

      window.addEventListener('resize', () => paintHighlight(activeTab))

      window.__moveNavHighlight = (id: string) => {
        const targetNavItem = headerEl.querySelector<HTMLLIElement>(`li.nav-item[data-link="${id}"]`)
        if (targetNavItem && targetNavItem !== activeTab) {
          activeTab = targetNavItem
          paintHighlight(activeTab)
          setActiveClass(activeTab)
        } else if (targetNavItem && targetNavItem === activeTab) {
            paintHighlight(targetNavItem)
        }
      }
      requestAnimationFrame(() => {
        if(activeTab){
            paintHighlight(activeTab)
            setActiveClass(activeTab)
        } else if (navItems.length > 0) {
            activeTab = navItems[0];
            paintHighlight(activeTab);
            setActiveClass(activeTab);
        }
      })
    }

    if (mobileMenuEl.classList.contains('translate-x-0')) {
      const mainContent = document.querySelector(MAIN_SELECTOR) as HTMLElement | null
      const mobileTopBar = headerEl.querySelector('#mobile-top-bar') as HTMLElement | null
      mobileTopBar?.classList.add('opacity-0', 'pointer-events-none')
      if (mainContent) {
        mainContent.classList.add('blur-sm', 'pointer-events-none')
      }
      lockScroll()
    }
  }

  render()
  onLangChange(render)
  return headerEl
}