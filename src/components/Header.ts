// ──────────────────────────────────────────
// src/components/Header.ts (Refactorizado)
// Mantenibilidad, modularidad y separación de lógica/UI/eventos
// ──────────────────────────────────────────

import { t, getLang, setLang, onLangChange } from './i18n';

// ————————————————————————————————————————
// Constantes y helpers
// ————————————————————————————————————————
const MAIN_SELECTOR = 'main';
const SCROLL_ANIMATION_DURATION = 100; // ms
const HEADER_Y_DESKTOP = 260;
const SOCIALS = [
  { key: 'discord', url: '#' },
  { key: 'linkedin', url: 'https://www.linkedin.com/company/107399409' },
  { key: 'instagram', url: 'https://www.instagram.com/nexadigit.io' }
];

// Utils
function lockScroll() {
  document.documentElement.classList.add('overflow-hidden');
}
function unlockScroll() {
  document.documentElement.classList.remove('overflow-hidden');
}

function smoothScrollTo(targetY: number, duration = SCROLL_ANIMATION_DURATION) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();
  function step(now: number) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * progress);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

function getMobileHeaderOffset(headerEl: HTMLElement) {
  const mobileTopBar = headerEl.querySelector('#mobile-top-bar') as HTMLElement | null;
  return mobileTopBar ? mobileTopBar.offsetHeight : 0;
}

function updateMetaDescription(desc: string) {
  let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement('meta');
    meta.name = 'description';
    document.head.appendChild(meta);
  }
  meta.content = desc;
}

// ————————————————————————————————————————
// Render HTML de secciones (retornan strings)
// ————————————————————————————————————————
function renderMobileTopBar(lang: string): string {
  const flag = lang === 'es'
    ? '/src/assets/top-bar-icon-dominican-flag.svg'
    : '/src/assets/top-bar-icon-usa-flag.svg';
  return `
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
  `;
}

function renderDesktopTopBar(lang: string): string {
  const flag = lang === 'es'
    ? '/src/assets/top-bar-icon-dominican-flag.svg'
    : '/src/assets/top-bar-icon-usa-flag.svg';
  const navGap = lang === 'en' ? 'gap-[90px] xl:gap-[140px]' : 'gap-[80px] xl:gap-[125px]';

  // Socials HTML
  const socialsHtml = SOCIALS.map(s => `
    <a href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${t('alt_social_' + s.key, s.key)}">
      <img data-src="/src/assets/top-bar-icon-${s.key}.svg"
           data-hover="/src/assets/top-bar-icon-${s.key}-hover.svg"
           src="/src/assets/top-bar-icon-${s.key}.svg"
           class="social-icon w-[21px] h-[21px] cursor-pointer" alt=""/>
    </a>
  `).join('');

  return `
    <div class="hidden lg:block select-none">
      <div class="mt-4 w-full lg:max-w-[960px] xl:max-w-[1238px] mx-auto px-4 lg:px-8 xl:px-[64px] grid grid-cols-1 items-center lg:grid-cols-12">
        <div class="col-span-6 flex items-center gap-2">
          <img src="/src/assets/top-bar-icon-location.svg" class="w-[21px] h-[21px]" alt="${t('alt_location_icon', 'Ubicación')}"/>
          <span>${t('location_label')}</span>
        </div>
        <div class="col-span-6 flex justify-end items-center gap-1.5">
          ${socialsHtml}
          <div id="lang-toggle-desktop" class="flex items-center gap-1 ml-3 cursor-pointer">
            <span class="lowercase">${lang}</span>
            <img src="${flag}" class="w-[21px] h-[21px]" alt="${t('alt_lang_flag_desktop', 'Bandera idioma')}"/>
            <img src="/src/assets/top-bar-icon-double-arrow-left.svg" class="w-5 h-5 brightness-0 invert" alt="${t('alt_arrow_icon', 'Icono flecha')}"/>
          </div>
        </div>
      </div>
      <header class="w-full flex justify-center mt-4">
        <nav class="w-full max-w-[960px] px-8 flex items-center justify-between
           h-20 rounded-full bg-gradient-to-r from-[#006E49]/60 to-[#001C13]/60
           shadow-lg overflow-hidden lg:max-w-[960px] xl:max-w-[1238px] mx-auto
           lg:px-8 xl:px-[64px] py-2 mt-4 grid-cols-12 backdrop-blur-md backdrop-saturate-150 ">
          <ul id="nav-list" class="relative col-span-11 flex items-center ${navGap} font-semibold text-[16px] leading-none">
            <div id="nav-highlight" class="absolute top-4 left-0 h-[90px]  transition-all -z-10">
              <div class="absolute bottom-[16px] left-1/2 -translate-x-1/2 w-5 h-[2.5px] bg-white"></div>
            </div>
            <li data-link="home" class="nav-item w-[80px] h-[130px] flex flex-col justify-center items-center cursor-pointer"><span>${t('nav_home')}</span></li>
            <li data-link="about" class="nav-item cursor-pointer"><span>${t('nav_about')}</span></li>
            <li data-link="services" class="nav-item cursor-pointer"><span>${t('nav_services')}</span></li>
            <li data-link="unisync" class="nav-item cursor-pointer"><span>${t('nav_unisync')}</span></li>
            <li data-link="contact" class="nav-item cursor-pointer"><span>${t('nav_contact')}</span></li>
          </ul>
          <div class="col-span-1 flex justify-end">
            <a href="tel:${t('phone_number_link', '')}" data-book-meeting aria-label="${t('alt_call_button', 'Llamar')}">
              <img src="/src/assets/nav-bar-icon-call-button.svg" class="w-9 h-9 cursor-pointer hover:animate-call-shake" alt="">
            </a>
          </div>
        </nav>
      </header>
    </div>
  `;
}

function renderMobileMenu(lang: string): string {
  const flag = lang === 'es'
    ? '/src/assets/top-bar-icon-dominican-flag.svg'
    : '/src/assets/top-bar-icon-usa-flag.svg';

  const socialsHtml = SOCIALS.map(s => `
    <a href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${t('alt_social_' + s.key + '_mobile', s.key)}">
      <img data-src="/src/assets/top-bar-icon-${s.key}.svg" src="/src/assets/top-bar-icon-${s.key}.svg" class="social-icon-mobile w-6 h-6 cursor-pointer brightness-0 invert hover:opacity-75" alt=""/>
    </a>
  `).join('');

  return `
    <div class="flex items-center h-14 bg-[#006E49]/50 w-full px-3 relative select-none">
      <button id="close-menu-btn" class="p-1">
        <img src="/src/assets/menu-cancel-icon.svg" class="w-4 h-4 brightness-0 invert" alt="${t('alt_close_menu', 'Cerrar menú')}"/>
      </button>
      <img src="/src/assets/fav-icon-logo.svg" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[25px] h-[31.02px] brightness-0 invert" alt="${t('alt_logo_menu', 'Logo')}"/>
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
      <img src="/src/assets/marker-icon-2.webp" alt="${t('alt_decorative_separator', 'Separador')}" class="w-[100px] h-auto opacity-80" />
    </div>
    <div class="pb-8 px-6 flex justify-around items-center select-none">
      ${socialsHtml}
    </div>
  `;
}

// ————————————————————————————————————————
// Listeners por sección
// ————————————————————————————————————————
function setupLanguageToggles(headerEl: HTMLElement, mobileMenuEl: HTMLElement) {
  const desktopLangToggle = headerEl.querySelector('#lang-toggle-desktop');
  desktopLangToggle?.addEventListener('click', () => setLang(getLang() === 'es' ? 'en' : 'es'));

  const mobileMainLangToggle = headerEl.querySelector('#lang-toggle-mobile-main');
  mobileMainLangToggle?.addEventListener('click', e => {
    e.stopPropagation();
    setLang(getLang() === 'es' ? 'en' : 'es');
  });

  const mobileMenuLangToggle = mobileMenuEl.querySelector('#lang-toggle-mobile-menu');
  mobileMenuLangToggle?.addEventListener('click', e => {
    e.stopPropagation();
    setLang(getLang() === 'es' ? 'en' : 'es');
  });
}

function setupSocialIconHover(headerEl: HTMLElement) {
  headerEl.querySelectorAll<HTMLImageElement>('.social-icon').forEach(img => {
    const baseSrc = img.dataset.src, hoverSrc = img.dataset.hover;
    if (baseSrc && hoverSrc) {
      img.onmouseenter = () => { img.src = hoverSrc; };
      img.onmouseleave = () => { img.src = baseSrc; };
    }
  });
}

function setupBurgerMenu(headerEl: HTMLElement, mobileMenuEl: HTMLElement, closeMobileMenu: (cb?: () => void) => void, openMobileMenu: () => void) {
  const burgerBtn = headerEl.querySelector('#burger-btn') as HTMLButtonElement | null;
  const closeMenuBtn = mobileMenuEl.querySelector('#close-menu-btn') as HTMLButtonElement | null;
  burgerBtn?.addEventListener('click', e => { e.stopPropagation(); openMobileMenu(); });
  closeMenuBtn?.addEventListener('click', e => { e.stopPropagation(); closeMobileMenu(); });
  // Click outside para cerrar
  if (window.__headerDocClickListener) document.removeEventListener('click', window.__headerDocClickListener);
  window.__headerDocClickListener = (event: MouseEvent) => {
    const target = event.target as Node;
    const currentBurgerBtn = headerEl.querySelector('#burger-btn');
    if (mobileMenuEl.classList.contains('translate-x-0') && !mobileMenuEl.contains(target) && (!currentBurgerBtn || !currentBurgerBtn.contains(target))) {
      closeMobileMenu();
    }
  };
  document.addEventListener('click', window.__headerDocClickListener);
}

function setupMobileNavigation(mobileMenuEl: HTMLElement, headerEl: HTMLElement, closeMobileMenu: (cb?: () => void) => void) {
  mobileMenuEl.querySelectorAll<HTMLLIElement>('.mobile-nav-item').forEach(menuItem => {
    menuItem.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      const id = menuItem.dataset.link;
      if (!id) return;
      const performScrollAndUnlock = () => {
        const section = document.getElementById(id);
        if (section) {
          const mobileHeaderActualHeight = getMobileHeaderOffset(headerEl);
          const desiredRespite = 30; // px
          const finalMobileOffset = mobileHeaderActualHeight + desiredRespite;
          const topPos = section.getBoundingClientRect().top + window.scrollY - finalMobileOffset;
          smoothScrollTo(topPos, SCROLL_ANIMATION_DURATION);
          setTimeout(() => {
            unlockScroll();
            if (window.innerWidth >= 1024 && window.__moveNavHighlight) {
              window.__moveNavHighlight(id);
            }
          }, SCROLL_ANIMATION_DURATION);
        } else {
          unlockScroll();
        }
      };
      closeMobileMenu(performScrollAndUnlock);
    });
  });
}

function setupDesktopNavigation(headerEl: HTMLElement) {
  const navList = headerEl.querySelector('#nav-list') as HTMLElement | null;
  const highlightEl = headerEl.querySelector('#nav-highlight') as HTMLElement | null;
  if (!navList || !highlightEl) return;

  const navItems = Array.from(headerEl.querySelectorAll<HTMLLIElement>('li.nav-item'));
  const PAD_X = 16;
  let activeTab: HTMLLIElement | null = navItems.find(item => item.classList.contains('active')) || navItems[0];

  function paintHighlight(el: HTMLElement | null) {
    if (!el || !navList || !highlightEl) return;
    const rect = el.getBoundingClientRect();
    const isHome = el.dataset.link === 'home';
    const width = isHome ? rect.width : rect.width + PAD_X * 2;
    const leftPosition = el.offsetLeft - (isHome ? 0 : PAD_X);
    highlightEl.style.width = `${width}px`;
    highlightEl.style.transform = `translateX(${leftPosition}px)`;
  }
  function setActiveClass(el: HTMLElement | null) {
    navItems.forEach(navLi => navLi.classList.remove('active'));
    if (el) el.classList.add('active');
  }
  navItems.forEach(li => {
    li.addEventListener('click', e => {
      e.preventDefault();
      const currentTargetLi = e.currentTarget as HTMLLIElement;
      const linkId = currentTargetLi.dataset.link;
      if (!linkId) return;

      let finalScrollTargetY: number | null = null;
      let scrollBehaviorForThisClick: ScrollBehavior = 'smooth';

      if (linkId === 'unisync' && window.innerWidth >= 1024) {
        e.stopPropagation();
        scrollBehaviorForThisClick = 'auto';
        const marker = document.getElementById('unisync-marker') as HTMLElement | null;
        if (marker) {
          const DESIRED_MARKER_CENTER_FROM_VIEWPORT_TOP = 100;
          const markerRect = marker.getBoundingClientRect();
          const markerScrollY = window.scrollY;
          const markerOffsetHeight = marker.offsetHeight;
          const markerCenterAbsoluteY = markerRect.top + markerScrollY + (markerOffsetHeight / 2);
          finalScrollTargetY = markerCenterAbsoluteY - DESIRED_MARKER_CENTER_FROM_VIEWPORT_TOP;
        } else {
          const section = document.getElementById(linkId);
          if (section) finalScrollTargetY = section.getBoundingClientRect().top + window.scrollY - HEADER_Y_DESKTOP;
        }
      } else {
        const section = document.getElementById(linkId);
        if (section) {
          finalScrollTargetY = section.getBoundingClientRect().top + window.scrollY - HEADER_Y_DESKTOP;
        }
      }

      if (finalScrollTargetY !== null) {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        let targetToScroll = finalScrollTargetY;
        if (targetToScroll < 0) targetToScroll = 0;
        if (targetToScroll > maxScroll) targetToScroll = maxScroll;
        window.scrollTo({ top: targetToScroll, behavior: scrollBehaviorForThisClick });
      }
            activeTab = currentTargetLi;
      paintHighlight(activeTab);
      setActiveClass(activeTab);
    });

    li.addEventListener('mouseenter', () => paintHighlight(li));
    li.addEventListener('mouseleave', () => paintHighlight(activeTab));
  });

  // Redimensionar: actualizar highlight
  window.addEventListener('resize', () => paintHighlight(activeTab));

  // API global para mover el highlight desde fuera
  window.__moveNavHighlight = (id: string) => {
    const targetNavItem = headerEl.querySelector<HTMLLIElement>(`li.nav-item[data-link="${id}"]`);
    if (targetNavItem && targetNavItem !== activeTab) {
      activeTab = targetNavItem;
      paintHighlight(activeTab);
      setActiveClass(activeTab);
    } else if (targetNavItem && targetNavItem === activeTab) {
      paintHighlight(targetNavItem);
    }
  };

  // Inicial: set highlight y active
  requestAnimationFrame(() => {
    if (activeTab) {
      paintHighlight(activeTab);
      setActiveClass(activeTab);
    } else if (navItems.length > 0) {
      activeTab = navItems[0];
      paintHighlight(activeTab);
      setActiveClass(activeTab);
    }
  });
}

// ————————————————————————————————————————
// Header principal (Entry point)
// ————————————————————————————————————————
export function Header() {
  const headerEl = document.createElement('header');
  headerEl.setAttribute('role', 'banner');
  headerEl.className =
    'fixed top-0 left-0 w-full z-50 bg-black/70 text-white text-xs md:text-sm font-montserrat';

  const mobileMenuEl = document.createElement('div');
  mobileMenuEl.id = 'mobile-menu';
  mobileMenuEl.className = [
    'fixed top-0 left-0 h-full w-[160px] bg-[#004D30] text-white shadow-2xl',
    'transform -translate-x-full transition-transform duration-300 ease-in-out',
    'flex flex-col lg:hidden z-[100]'
  ].join(' ');

  // Helpers para menú mobile
  const closeMobileMenu = (callbackAfterAnimation?: () => void) => {
    const mainContent = document.querySelector(MAIN_SELECTOR) as HTMLElement | null;
    const mobileTopBar = headerEl.querySelector('#mobile-top-bar') as HTMLElement | null;

    mobileMenuEl.classList.add('-translate-x-full');
    mobileMenuEl.classList.remove('translate-x-0');
    mobileTopBar?.classList.remove('opacity-0', 'pointer-events-none');
    if (mainContent) {
      mainContent.classList.remove('blur-sm', 'pointer-events-none');
    }
    if (callbackAfterAnimation) {
      setTimeout(callbackAfterAnimation, 300); // Duración de animación
    } else {
      setTimeout(unlockScroll, 300);
    }
  };

  const openMobileMenu = () => {
    const mainContent = document.querySelector(MAIN_SELECTOR) as HTMLElement | null;
    const mobileTopBar = headerEl.querySelector('#mobile-top-bar') as HTMLElement | null;
    mobileMenuEl.classList.remove('-translate-x-full');
    mobileMenuEl.classList.add('translate-x-0');
    mobileTopBar?.classList.add('opacity-0', 'pointer-events-none');
    if (mainContent) mainContent.classList.add('blur-sm', 'pointer-events-none');
    lockScroll();
  };

  // Renderiza todo el header y menús
  function render() {
    const lang = getLang();
    document.title = t('page_title');
    updateMetaDescription(t('meta_description'));

    // Header principal y menú mobile
    headerEl.innerHTML = [
      renderMobileTopBar(lang),
      renderDesktopTopBar(lang)
    ].join('');

    mobileMenuEl.innerHTML = renderMobileMenu(lang);

    // Añade mobileMenuEl si no está en el DOM
    if (!document.body.contains(mobileMenuEl)) {
      document.body.appendChild(mobileMenuEl);
    }

    // Altura dinámica para efectos de offset
    const setHeaderH = () => document.documentElement!.style.setProperty('--header-h', `${headerEl.offsetHeight}px`);
    requestAnimationFrame(setHeaderH);
    window.addEventListener('resize', setHeaderH, { passive: true });

    // Setups y listeners
    setupLanguageToggles(headerEl, mobileMenuEl);
    setupSocialIconHover(headerEl);
    setupBurgerMenu(headerEl, mobileMenuEl, closeMobileMenu, openMobileMenu);
    setupMobileNavigation(mobileMenuEl, headerEl, closeMobileMenu);
    setupDesktopNavigation(headerEl);

    // Si el menú mobile estaba abierto (reload, hot reload), asegura estilos y scroll lock
    if (mobileMenuEl.classList.contains('translate-x-0')) {
      const mainContent = document.querySelector(MAIN_SELECTOR) as HTMLElement | null;
      const mobileTopBar = headerEl.querySelector('#mobile-top-bar') as HTMLElement | null;
      mobileTopBar?.classList.add('opacity-0', 'pointer-events-none');
      if (mainContent) mainContent.classList.add('blur-sm', 'pointer-events-none');
      lockScroll();
    }
  }

  render();
  onLangChange(render);

  return headerEl;
}

// ————————————————————————————————————————
// Typings para Window (global helpers)
// ————————————————————————————————————————
declare global {
  interface Window {
    __moveNavHighlight?: (id: string) => void;
    __headerDocClickListener?: (event: MouseEvent) => void;
  }
}
