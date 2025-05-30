// ──────────────────────────────────────────
// src/components/Hero.ts
// Ajustes responsive:
//   • Diseño móvil se usa hasta < lg (≤ 1023 px)
//   • Altura 100 % cuando portrait (< lg) y desktop (≥ lg).
//   • En landscape < lg la altura es auto.
//   • Corrección de márgenes del bloque inferior (partners + arrow) para que
//     la flecha no se corte en sm/md (641‑1023 px).
// ──────────────────────────────────────────
import { t, getLang, onLangChange } from './i18n'

export function Hero() {
  const hero = document.createElement('section')
  hero.id = 'home'
  hero.className = [
  'w-full md:mx-0 max-w-[1238px] md:max-w-none mx-auto',
  'px-4 md:px-6 lg:px-[64px] scroll-mt-[64px]',
  'relative',

  /* Altura mínima = viewport libre de header */
  'portrait:min-h-[calc(100dvh-var(--header-h))]',
  'lg:min-h-[calc(100dvh-var(--header-h))]',

  /* Distribución vertical */
  'flex flex-col lg:justify-start tall:justify-center',

  /* ¡Sin overflow interno! */
  'overflow-visible',

  /* Padding-top cero en desktop, se conserva en mobile */
  'pt-0 sm:pt-12 md:pt-12 lg:pt-[calc(var(--header-h)+28px)]'
].join(' ')
   /* ──────────────── template MÓVIL ──────────────── */
  const mobileTemplate = (lang: string) => {
    return /* html */ `
      <!-- Visible hasta < lg (teléfonos y tablets) -->
      <div class="lg:hidden relative flex-1 flex flex-col pt-12 hero-mobile-fill pt-header-mob full-vh items-center">
        <!-- Títulos -->
        <div class="mt-8 px-4 text-center">
          <h2 class="font-montserrat font-extrabold leading-tight ${lang === 'en' ? 'ms:text-[23px] mm:text-[26.5px] ml:text-[29px] sm:!text-[40px] md:!text-[50px]' : ' sm:!text-[36px] md:!text-[45px] ml:text-[26px] mm:text-[24px] ms:text-[21px]'}">${t('hero_title_part1')}</h2>
          <h2 class="font-montserrat font-extrabold leading-tight ${lang === 'en' ? 'ms:text-[30px] mm:text-[35px] ml:text-[38px] sm:!text-[53px] md:!text-[66px] text-[34px]' : 'sm:!text-[44px] md:!text-[55px] ml:text-[32px] mm:text-[29px] ms:text-[25px] text-[29px]'} mt-2">${t('hero_title_part2')}</h2>
          <h1 class="font-petrov-sans leading-none w-full ms:text-[68px] mm:text-[78px] ml:text-[85px] sm:!text-[116px] md:!text-[146px]  my-3">${t('hero_brand')}</h1>
          <img src="/src/assets/marker-icon.png" class="w-[180px] h-[40px] mx-auto mb-4" alt="">
        </div>
        <!-- Contenido central -->
        <div class="flex flex-col items-center flex-grow overflow-y-auto overflow-x-hidden scrollbar-none w-full">
          <!-- mid_desc + marker pequeño -->
          <p class="mx-auto mt-5 text-center font-montserrat font-medium leading-[160%] 
            ${lang === 'en' 
              ? 'w-[280px]  text-[9.5px] sm:w-[350px] sm:text-[14px]'
              : 'w-[215px]  text-[9.5px] sm:text-[14px] sm:w-[340px]'}">
            ${t('mid_desc')}
          </p>

          <img src="/src/assets/marker-icon.png" class="w-[50px] h-[14px] mx-auto my-4" alt="">
          <!-- Tagline + CTA centrados entre marker y carousel -->
          <div class="flex flex-col items-center my-auto">
            <p class="text-center
             ${lang === 'en' 
              ? 'w-[127px] text-[9px] sm:text-[12px] sm:w-[180px]'
              : 'w-[127px]  text-[9.5px] sm:text-[12px] sm:w-[180px]'}">
             ${t('mid_tagline')}
            </p>
           
            <div class="mt-6 flex justify-center">
              <button data-book-meeting class="w-[140px] h-[40px] bg-[#006E49] text-white font-montserrat font-bold text-[8px] sm:text-[10px] uppercase rounded-[6px] flex items-center justify-center">${t('services_block1_cta')}</button>
            </div>
          </div>
          <div class="mb-auto ms:hidden sm:mb-16 md:mb-24 flex justify-center overflow-hidden w-full max-w-[265px] px-4 mx-auto">
            <div id="partnerTrackMobile" class="flex items-center gap-5 transition-transform duration-700 ease-out">
              <img src="/src/assets/novosit-logo.png" class="-mt-1 w-[60px] h-[16px]" alt="${t('hero_partner_novosit')}">
              <img src="/src/assets/chatgpt-logo-white.webp" class="w-[75px] h-[22px]" alt="${t('hero_partner_openai')}">
              <img src="/src/assets/gemini_logo.png" class="-mt-2 w-[55px] h-[20px]" alt="Gemini logo">
              <img src="/src/assets/claude-logo.png" class="w-[65px] h-[16px]" alt="Claude logo">
              <img src="/src/assets/NVIDIA_logo.png" class="w-[65px] h-[12px]" alt="NVIDIA logo">
              <img src="/src/assets/deepseek-logo.png" class="w-[65px] h-[13px]" alt="DeepSeek logo">
            </div>
          </div>
        </div>
        <!-- Flecha navegar -->
        <div class="mb-8 flex justify-center w-full sm:absolute sm:bottom-6 sm:left-1/2 sm:-translate-x-1/2 sm:z-20">
          <div data-link="about" aria-label="Ir a la sección About" class="w-6 h-6 rounded-full bg-[#006E49] transition-colors duration-200 items-center justify-center inline-flex animate-bounce-mini">
            <img src="/src/assets/header-arrow-down.svg" class="w-[12px] h-[12px] group-hover:scale-105 transition-transform duration-200" alt="Flecha hacia abajo">
          </div>
        </div>
      </div>`
  }

  /* ──────────────── template DESKTOP ──────────────── */
  const desktopTemplate = (lang: string) => {
    const h2a  = lang === 'en' ? 'fluid-h2-en'   : 'fluid-h2-es'
    const h2b  = lang === 'en' ? 'fluid-h2-2-en' : 'fluid-h2-2-es'
    const logosMargin = 'mt-6 md:mt-12 lg:mt-16 lg:mt-20'

    return /* html */ `
<div class="hidden lg:flex lg:flex-col lg:items-center lg:justify-center lg:h-[calc(100svh-var(--header-h))] lg:space-y-5">
  <div class="hidden lg:grid grid-cols-12 gap-0 lg:gap-4">
    <div class="col-span-12 justify-center h-md:mt-[10px]">
      <img src="/src/assets/marker-icon.png" class="mb-8 w-[238px] h-[65px] self-center flex-none mx-auto lg:hidden" alt="">
      <h2 class="font-montserrat font-extrabold leading-tight fluid-h2 short:shrink-12 ${h2a}">${t('hero_title_part1')}</h2>
      <h2 class="font-montserrat font-extrabold leading-tight fluid-h2-2 short:shrink-12 ${h2b}">${t('hero_title_part2')}</h2>

      <div class="relative inline-block -mt-3">
        <h1 class="relative z-10 font-petrov-sans fluid-brand short:shrink-12 leading-none whitespace-nowrap  ">${t('hero_brand')}</h1>
        <img src="/src/assets/arrow_hero_section_down.svg" class="absolute z-0
         xl-h-lg:w-[500px] xl-h-lg:h-[600px]
         lg:w-[800px] lg:h-[500px]          
         top-[100%] left-1/2 -translate-x-1/2 -translate-y-1/2
         4k:w-[380px]  4k:h-[660px]
         pointer-events-none animate-zoom
         lg:-mt-2
         "" alt="">
      </div>

      <div class="mt-10 sm:mt-20 md:mt-20 lg:mt-35 flex justify-center items-center gap-2 
      4k:mt-40
      4k:pb-8
      xl-h-lg:pb-3
      xl-h-lg:mt-40">
        <input type="email" placeholder="${t('hero_email_placeholder')}" class="w-[180px] 
        h-[28px] md:w-[250px] md:h-[45px] 
        lg:w-[314px] lg:h-[45px]
         bg-white rounded-[8px] 
         text-black placeholder:text-[8px] 
         md:placeholder:text-[13px] 
         lg:placeholder:text-[15px] 
         text-xs lg:text-base px-3
         lg:px-4 4k:h-[55px]
         h-xl:h-[55px]
         4k:-mt-9
         xl-h-lg:-mt-9  
         lg:mt-5   
         ">
        <button
  class="bg-[#006E49] hover:bg-[#00a16b]
         flex items-center justify-center
         h-[28px] p-2 rounded-[8px]
         md:h-[45px] md:px-4 lg:h-[45px] lg:px-4
         4k:h-[55px] h-xl:h-[55px] 4k:-mt-9 xl-h-lg:-mt-9 lg:mt-5

         border-none focus:border-none focus-visible:border-none   /* ⬅︎ aquí */
         focus:outline-none  focus:ring-0
         focus-visible:outline-none focus-visible:ring-0
         transition-colors duration-200">
  <img src="/src/assets/icon-send.svg"
       class="w-4 h-4 brightness-0 invert"
       alt="">
</button>



      </div>
    </div>
  </div>
  <div class="hidden lg:grid grid-cols-12 ${logosMargin}">
    <div class="col-span-12 flex justify-center">
      <div class="w-full max-w-[380px] sm:max-w-[700px] md:max-w-[900px] lg:w-[700px]
              sm:h-[100px] h-[65px] lg:h-[80px]
              flex items-center justify-center gap-8 lg:gap-12 px-3 lg:px-4
              h-xl:h-[90px]
              4k:h-[110px]
              xl-h-lg:h-[120px]
              overflow-hidden">
              
        <div id="partnerTrack"
       class="flex items-center justify-center gap-8 lg:gap-12
              transition-transform duration-700 ease-out">
          <!-- 7 logos = los 4 originales + 3 nuevos -->
          <img src="/src/assets/ms-gold-partner.png"  class="w-[100px] h-[26px]"  alt="${t('hero_partner_ms')}">
          <img src="/src/assets/novosit-logo.png"      class="w-[95px]  h-[25px] mb-1" alt="${t('hero_partner_novosit')}">
          <img src="/src/assets/chatgpt-logo-white.webp" class="w-[120px] h-[35px]" alt="${t('hero_partner_openai')}">
          <img src="/src/assets/gemini_logo.png"        class="w-[80px]  h-[30px] mb-3" alt="Gemini logo">
          <!-- NUEVOS -->
          <img src="/src/assets/claude-logo.png"        class="w-[95px]  h-[22px]" alt="Claude logo">
          <img src="/src/assets/NVIDIA_logo.png"        class="w-[98px]  h-[18px]" alt="NVIDIA logo">
          <img src="/src/assets/deepseek-logo.png"      class="w-[95px]  h-[17px]" alt="DeepSeek logo">
        </div>
      </div>
    </div>
  </div>
  <div class="hidden lg:grid grid-cols-12">
  <div class="col-span-12 flex justify-center lg:mb-12">
    <!-- Botón circular (todo rebota) -->
    <div data-link="about"
       aria-label="Ir a la sección About"
       class="cursor-pointer w-8 h-8 md:w-10 md:h-10            /* Ø 32-40 px */
              rounded-full bg-[#006E49]
              hover:bg-[#00a16b] transition-colors duration-200
              flex items-center justify-center inline-flex
              animate-bounce-mini">              <!-- 🡐 rebote global -->

      <img src="/src/assets/header-arrow-down.svg"
           class="w-[14px] h-[14px] md:w-[16px] md:h-[16px]
                  group-hover:scale-105 transition-transform duration-200"
           alt="">
        </div>
    </div>
  </div>
</div>




</div>`
  }

  // render, autoplay y carousel partners girando igual al desktop
  let desktopPartnerTimer: number | undefined
  let mobilePartnerTimer: number | undefined

  function startPartnersAutoplay(): number | undefined {
    const track = hero.querySelector<HTMLDivElement>("#partnerTrack")
    if (!track) return undefined
    const GAP = 48, SPEED = 700, DELAY = 3000
    const slide = () => {
      const first = track.children[0] as HTMLElement
      if (!first) return
      const STEP = first.offsetWidth + GAP
      track.style.transition = `transform ${SPEED}ms ease-out`
      track.style.transform  = `translateX(-${STEP}px)`
      track.addEventListener(
        'transitionend',
        () => {
          track.style.transition = 'none'
          track.style.transform  = 'translateX(0)'
          track.appendChild(first)
        },
        { once: true }
      )
    }
    return setInterval(slide, DELAY)
  }

  function startMobilePartners(): number | undefined {
    const track = hero.querySelector<HTMLDivElement>("#partnerTrackMobile")
    if (!track) return undefined
    const GAP = 20, SPEED = 700, DELAY = 3000
    const slide = () => {
      const first = track.children[0] as HTMLElement
      if (!first) return
      const STEP = first.offsetWidth + GAP
      track.style.transition = `transform ${SPEED}ms ease-out`
      track.style.transform  = `translateX(-${STEP}px)`
      track.addEventListener(
        'transitionend',
        () => {
          track.style.transition = 'none'
          track.style.transform  = 'translateX(0)'
          track.appendChild(first)
        },
        { once: true }
      )
    }
    return setInterval(slide, DELAY)
  }

  const render = () => {
    if (desktopPartnerTimer) clearInterval(desktopPartnerTimer)
    if (mobilePartnerTimer) clearInterval(mobilePartnerTimer)
    const lang = getLang()
    hero.innerHTML = mobileTemplate(lang) + desktopTemplate(lang)
    desktopPartnerTimer = startPartnersAutoplay()
    mobilePartnerTimer = startMobilePartners()
  }

  render()
  onLangChange(render)

  return hero
}

