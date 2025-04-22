// src/components/Header.ts
import { t, getLang, setLang, onLangChange } from './i18n'

export function Header() {
  /* ------------------------------------------------------------ *
   *  Elemento raíz <header>                                       *
   * ------------------------------------------------------------ */
  const headerEl = document.createElement('header')
  headerEl.setAttribute('role', 'banner')
  headerEl.className =
    'fixed top-0 left-0 w-full z-50 bg-black/70 text-white text-xs md:text-sm font-montserrat'

  /* ------------------------------------------------------------ *
   *  Render                                                       *
   * ------------------------------------------------------------ */
  const render = () => {
    const lang = getLang()
    const flagSrc =
      lang === 'es'
        ? '/src/assets/top-bar-icon-dominican-flag.svg'
        : '/src/assets/top-bar-icon-usa-flag.svg'
    const navGap = lang === 'en' ? 'gap-[140px]' : 'gap-[125px]'

    /* SEO dinámico */
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

    /* ---------------------------------------------------------- *
     *  HTML                                                       *
     * ---------------------------------------------------------- */
    headerEl.innerHTML = `
      <!-- Top Bar -->
      <div class="mt-4 w-full max-w-[1238px] mx-auto px-[64px] py-2 grid grid-cols-12 items-center">
        <!-- Columna izquierda -->
        <div class="col-span-6 flex items-center gap-2">
          <img id="location-icon"
               src="/src/assets/top-bar-icon-location.svg"
               alt="${t('location')}"
               class="w-[18px] h-[18px]" />
          <span id="location-label" class="font-normal">
            ${t('location_label')}
          </span>
        </div>

        <!-- Columna derecha -->
        <div class="col-span-6 flex justify-end items-center gap-1.5">
          <!-- Redes sociales con hover dinámico -->
          <img data-src="/src/assets/top-bar-icon-linkedin.svg"
               data-hover="/src/assets/top-bar-icon-linkedin-hover.svg"
               src="/src/assets/top-bar-icon-linkedin.svg"
               alt="${t('linkedin')}"
               class="social-icon w-[21px] h-[21px] cursor-pointer" />
          <img data-src="/src/assets/top-bar-icon-instagram.svg"
               data-hover="/src/assets/top-bar-icon-instagram-hover.svg"
               src="/src/assets/top-bar-icon-instagram.svg"
               alt="${t('instagram')}"
               class="social-icon w-[21px] h-[21px] cursor-pointer" />
          <img data-src="/src/assets/top-bar-icon-facebook.svg"
               data-hover="/src/assets/top-bar-icon-facebook-hover.svg"
               src="/src/assets/top-bar-icon-facebook.svg"
               alt="${t('facebook')}"
               class="social-icon w-[21px] h-[21px] cursor-pointer" />

          <div id="lang-toggle" class="flex items-center gap-1 ml-3 cursor-pointer">
            <span id="lang-code" class="lowercase">${lang}</span>
            <img id="lang-flag"  src="${flagSrc}"  alt="${t('flag')}" class="w-[21px] h-[21px]" />
            <img id="lang-arrow"
                 src="/src/assets/top-bar-icon-double-arrow-left.svg"
                 alt="${t('lang_toggle_arrow')}"
                 class="w-[20px] h-[20px]" />
          </div>
        </div>
      </div>

      <!-- Navbar -->
      <nav class="w-full max-w-[1238px] mx-auto px-[64px] pt-4 pb-2 mt-6 grid grid-cols-12 items-center">
        <!-- Lista de navegación -->
        <ul id="nav-list"
            class="relative col-span-11 flex items-center ${navGap} text-white font-semibold text-[18px] tracking-tight leading-none">
          <!-- Destacado móvil (se mueve con el hover) -->
          <div id="nav-highlight"
               class="absolute top-0 left-0 w-[80px] h-[130px] bg-[#006E49]
                      rounded-tl-[15px] transition-all duration-300 ease-in-out -z-10">
            <div class="absolute bottom-[35px] left-1/2 -translate-x-1/2 w-5 h-[3px] bg-white"></div>
          </div>

          <!-- Ítems -->
          <li class="nav-item relative flex flex-col items-center justify-center
                     w-[80px] h-[130px] cursor-pointer"><span id="nav-item-home">${t('nav_home')}</span></li>
          <li class="nav-item  cursor-pointer"><span id="nav-item-about">${t('nav_about')}</span></li>
          <li class="nav-item  cursor-pointer"><span id="nav-item-services">${t('nav_services')}</span></li>
          <li class="nav-item  cursor-pointer"><span id="nav-item-unisync">${t('nav_unisync')}</span></li>
          <li class="nav-item  cursor-pointer"><span id="nav-item-contact">${t('nav_contact')}</span></li>
        </ul>

        <!-- Botón videollamada -->
        <div class="col-span-1 flex justify-end items-center">
          <img src="/src/assets/nav-bar-icon-call-button.svg"
               alt="${t('call_button')}"
               class="w-[36px] h-[36px] cursor-pointer" />
        </div>
      </nav>
    `

    /* -------------------------------------------------------- *
     *  Lógica de interacción                                    *
     * -------------------------------------------------------- */

    /* 1️⃣ Toggle de idioma */
    headerEl.querySelector('#lang-toggle')
      ?.addEventListener('click', () => setLang(getLang() === 'es' ? 'en' : 'es'))

    /* 2️⃣ Hover en redes sociales */
    headerEl.querySelectorAll('.social-icon').forEach(img => {
      const el = img as HTMLImageElement
      const base = el.dataset.src!
      const hover = el.dataset.hover!
      el.addEventListener('mouseenter', () => (el.src = hover))
      el.addEventListener('mouseleave', () => (el.src = base))
    })

    /* 3️⃣ Destacado del menú (cuadro + línea blanca) */
    const navList  = headerEl.querySelector('#nav-list') as HTMLElement
    const hiLight  = headerEl.querySelector('#nav-highlight') as HTMLElement
    const navItems = headerEl.querySelectorAll('.nav-item')

    const PADDING_X = 16;
    /** Función para mover el highlight al elemento objetivo */
    const moveHighlight = (target: HTMLElement) => {
    const listRect = navList.getBoundingClientRect();
    const itemRect = target.getBoundingClientRect();

    // Si es “HOME” ya tiene 80 px de ancho fijo — lo dejamos igual
    const isHome = target === navItems[0];
    const width  = isHome ? itemRect.width : itemRect.width + PADDING_X * 2;

    // Centramos el cuadro respecto al texto
    const left = itemRect.left - listRect.left - (width - itemRect.width) / 2;

    hiLight.style.transform = `translateX(${left}px)`;
    hiLight.style.width     = `${width}px`;
  };

    /* Inicial: sobre “Home” */
    moveHighlight(navItems[0] as HTMLElement)

    /* Hover dinámico */
    navItems.forEach(item =>
      item.addEventListener('mouseenter', () => moveHighlight(item as HTMLElement))
    )

        /* Hover dinámico */
    navItems.forEach(item =>
      item.addEventListener('mouseenter', () => moveHighlight(item as HTMLElement))
    )

    /* ← NEW: cuando el cursor sale del nav, regresa a HOME */
    navList.addEventListener('mouseleave', () => moveHighlight(navItems[0] as HTMLElement));

    /* Re‑calcular al hacer resize */
    window.addEventListener('resize', () =>
      moveHighlight(document.querySelector('.nav-item:hover') as HTMLElement || navItems[0] as HTMLElement)
    )

        /* Garantiza estado default tras el primer render ************ */
    const setDefault = () => moveHighlight(navItems[0] as HTMLElement);

    /* 1️⃣ un frame después del montaje */
    requestAnimationFrame(setDefault);

    /* 2️⃣ un frame extra por si el header se inyecta asíncronamente */
    requestAnimationFrame(() => requestAnimationFrame(setDefault));
  }

  /* Primera llamada + re‑render al cambiar idioma */
  render()
  onLangChange(render)

  return headerEl
}
