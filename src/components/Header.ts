// src/components/Header.ts
import { t, getLang, setLang, onLangChange } from './i18n'

export function Header() {
  /* ------------------------------------------------------------------ *
   *  Elemento raíz <header> con estilos base                            *
   * ------------------------------------------------------------------ */
  const headerEl = document.createElement('header')
  headerEl.setAttribute('role', 'banner')
  headerEl.className =
    'fixed top-0 left-0 w-full z-50 bg-black/70 text-white text-xs md:text-sm font-montserrat'

  /* ------------------------------------------------------------------ *
   *  Renderizado inicial (HTML y SEO)                                   *
   * ------------------------------------------------------------------ */
  const lang = getLang()
  const flagSrc =
    lang === 'es'
      ? '/src/assets/top-bar-icon-dominican-flag.svg'
      : '/src/assets/top-bar-icon-usa-flag.svg'
  const navGap = lang === 'en' ? 'gap-[140px]' : 'gap-[125px]'

  // SEO inicial
  document.title = t('page_title')
  let metaDesc = document.querySelector(
    'meta[name="description"]'
  ) as HTMLMetaElement
  if (!metaDesc) {
    metaDesc = document.createElement('meta')
    metaDesc.name = 'description'
    document.head.appendChild(metaDesc)
  }
  metaDesc.content = t('meta_description')

  /* ------------------------------------------------------------------ *
   *  HTML del Top‑Bar + Navbar                                          *
   * ------------------------------------------------------------------ */
  headerEl.innerHTML = `
    <!-- Top Bar -->
    <div class="mt-4 w-full max-w-[1238px] mx-auto px-[64px] py-2 grid grid-cols-12 items-center">
      <!-- Columna Izquierda -->
      <div class="col-span-6 flex items-center gap-2">
        <img
          id="location-icon"
          src="/src/assets/top-bar-icon-location.svg"
          alt="${t('location')}"
          class="w-[18px] h-[18px]"
        />
        <span id="location-label" class="font-normal">
          ${t('location_label')}
        </span>
      </div>

      <!-- Columna Derecha -->
      <div class="col-span-6 flex justify-end items-center gap-1.5">
        <img src="/src/assets/top-bar-icon-linkedin.svg"  alt="${t('linkedin')}"  class="w-[21px] h-[21px] cursor-pointer" />
        <img src="/src/assets/top-bar-icon-instagram.svg" alt="${t('instagram')}" class="w-[21px] h-[21px] cursor-pointer" />
        <img src="/src/assets/top-bar-icon-facebook.svg"  alt="${t('facebook')}"  class="w-[21px] h-[21px] cursor-pointer" />

        <div id="lang-toggle" class="flex items-center gap-1 ml-3 cursor-pointer">
          <span id="lang-code" class="lowercase">${lang}</span>
          <img id="lang-flag"  src="${flagSrc}"  alt="${t('flag')}"           class="w-[21px] h-[21px]" />
          <img id="lang-arrow" src="/src/assets/top-bar-icon-double-arrow-left.svg"
               alt="${t('lang_toggle_arrow')}" class="w-[20px] h-[20px]" />
        </div>
      </div>
    </div>

    <!-- Navbar -->
    <nav class="w-full max-w-[1238px] mx-auto px-[64px] pt-4 pb-2 mt-6 grid grid-cols-12 items-center">
      <ul id="nav-list" class="col-span-11 flex items-center ${navGap} text-white font-semibold text-[18px] tracking-tight leading-none">
        <li class="relative w-[80px] h-[130px] bg-[#006E49] flex flex-col items-center justify-center">
          <span id="nav-item-home">${t('nav_home')}</span>
          <div class="absolute bottom-[35px] w-5 h-[3px] bg-white"></div>
        </li>
        <li class="hover:text-[#00cc88] cursor-pointer"><span id="nav-item-about">${t('nav_about')}</span></li>
        <li class="hover:text-[#00cc88] cursor-pointer"><span id="nav-item-services">${t('nav_services')}</span></li>
        <li class="hover:text-[#00cc88] cursor-pointer"><span id="nav-item-unisync">${t('nav_unisync')}</span></li>
        <li class="hover:text-[#00cc88] cursor-pointer"><span id="nav-item-contact">${t('nav_contact')}</span></li>
      </ul>

      <!-- Botón de videollamada -->
      <div class="col-span-1 flex justify-end items-center">
        <img src="/src/assets/nav-bar-icon-call-button.svg" alt="${t('call_button')}"
             class="w-[36px] h-[36px] cursor-pointer" />
      </div>
    </nav>
  `

  /* ------------------------------------------------------------------ *
   *  Toggle de idioma                                                   *
   * ------------------------------------------------------------------ */
  headerEl
    .querySelector('#lang-toggle')
    ?.addEventListener('click', () =>
      setLang(getLang() === 'es' ? 'en' : 'es')
    )

  /* ------------------------------------------------------------------ *
   *  Actualizaciones al cambiar idioma                                 *
   * ------------------------------------------------------------------ */
  onLangChange(() => {
    const lang = getLang()

    /* --- nodos DOM --- */
    const flag       = headerEl.querySelector('#lang-flag')        as HTMLImageElement
    const langCode   = headerEl.querySelector('#lang-code')        as HTMLElement
    const locIcon    = headerEl.querySelector('#location-icon')    as HTMLImageElement
    const locLabel   = headerEl.querySelector('#location-label')   as HTMLElement
    const navList    = headerEl.querySelector('#nav-list')         as HTMLElement
    const navHome    = headerEl.querySelector('#nav-item-home')    as HTMLElement
    const navAbout   = headerEl.querySelector('#nav-item-about')   as HTMLElement
    const navServ    = headerEl.querySelector('#nav-item-services')as HTMLElement
    const navUni     = headerEl.querySelector('#nav-item-unisync') as HTMLElement
    const navCont    = headerEl.querySelector('#nav-item-contact') as HTMLElement
    const callBtn    = headerEl.querySelector('img[src="/src/assets/nav-bar-icon-call-button.svg"]') as HTMLImageElement

    /* --- bandera / código / iconos --- */
    flag.src = lang === 'es'
      ? '/src/assets/top-bar-icon-dominican-flag.svg'
      : '/src/assets/top-bar-icon-usa-flag.svg'
    flag.alt        = t('flag')
    langCode.textContent = lang
    locIcon.alt     = t('location')
    locLabel.textContent = t('location_label')
    headerEl.querySelector('#lang-arrow')!.setAttribute('alt', t('lang_toggle_arrow'))

    /* --- textos navbar --- */
    navHome.textContent  = t('nav_home')
    navAbout.textContent = t('nav_about')
    navServ.textContent  = t('nav_services')
    navUni.textContent   = t('nav_unisync')
    navCont.textContent  = t('nav_contact')
    if (callBtn) callBtn.alt = t('call_button')

    /* --- espaciado navbar (gap) --- */
    if (lang === 'en') {
      navList.classList.replace('gap-[125px]', 'gap-[140px]')
    } else {
      navList.classList.replace('gap-[140px]', 'gap-[125px]')
    }

    /* --- SEO dinámico --- */
    document.title = t('page_title')
    metaDesc!.content = t('meta_description')
  })

  return headerEl
}
