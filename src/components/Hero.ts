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
    /* (solo se muestra el Brand; títulos se suprimieron) */
    const brand = [
      /* por anchura */
      'ms:text-[68px] mm:text-[78px] ml:text-[85px] sm:text-[150px]',
    ].join(' ')

    return /* html */ `
      <!-- Visible hasta < lg (teléfonos y tablets) -->
      <div class="lg:hidden flex-1 flex flex-col pt-12 hero-mobile-fill pt-header-mob full-vh">
        <!-- Contenido desplazable -->
        <img src="/src/assets/marker-icon.png" class="mt-8 md:tall:mt-16 w-[180px] h-[40px] self-center flex-none lg:hidden" alt="">

        <div class="mt-2 flex-grow flex flex-col justify-center items-center overflow-y-auto overflow-x-hidden scrollbar-none">
          <h1 class="font-petrov-sans leading-none w-full
           ms:text-[68px] mm:text-[78px] ml:text-[85px]
           sm:!text-[120px] md:!text-[125px] my-3 md:tall:my-auto ${brand}">
            ${t('hero_brand')}
          </h1>

          <!-- Carrusel -->
          <div class="mt-6 flex justify-center overflow-hidden gap-3 sm:gap-6 md:gap-8 ">
            <div id="heroMobileTrack" class="flex transition-transform duration-700 ease-out gap-[clamp(10px,3.2vw,16px)]">
              ${['service-photo-one.png', 'service-photo-two.png', 'service-photo-three.png']
                .map(src => `<img src="/src/assets/${src}" class="w-[clamp(90px,28vw,110px)]
                  h-[clamp(127px,40vw,155px)]
                  sm:w-[clamp(110px,26vw,140px)]
                  sm:h-[clamp(150px,36vw,190px)]
                  md:w-[clamp(130px,24vw,165px)]
                  md:h-[clamp(175px,32vw,225px)]
                  object-cover rounded-[15px] flex-none
                  " alt="slide">`)
                .join('')}
            </div>
          </div>
          <div class="my-auto md:tall:my-2 flex flex-col items-center">
          <p class="mx-auto mt-5 text-center font-montserrat font-medium leading-[160%]
                    w-[270px] text-[9px] sm:w-[320px] sm:text-[10.5px]
                    md:w-[380px] md:text-[12px]">
            ${t('mid_desc')}
          </p>
          <div class="my-auto md:tall:my-0 md:tall:mt-12 flex flex-col items-center">
            <img src="/src/assets/marker-icon.png" class="mt-8 w-[42px] h-[14px]" alt="">

            <p class="w-[127px] sm:w-[160px] md:w-[160px]
                      text-[9px] sm:text-[10px] md:text-[12px] md:mt-4">
              ${t('mid_tagline')}
            </p>

            <div class="mt-6 flex justify-center">
              <button data-book-meeting class="w-[90px] h-[24px] bg-[#006E49] text-white font-montserrat font-bold text-[5px] uppercase rounded-[6px] flex items-center justify-center">
                ${t('services_block1_cta')}
              </button>
            </div>
          </div>
          </div>
        </div>

        <!-- Partners + flecha SIEMPRE visibles al fondo -->
        <div class="flex-shrink-0 w-full flex flex-col items-center pb-4 sm:pb-2">
          <div class="mt-10 flex justify-center">
            <div class="w-full max-w-[330px] h-[65px] bg-[#006E49] rounded-[35px] flex items-center justify-center gap-5 px-10">
              <img src="/src/assets/ms-gold-partner.png" class="w-[55px] h-[14px]" alt="${t('hero_partner_ms')}">
              <img src="/src/assets/novosit-logo.png" class="w-[55px] h-[15px]" alt="${t('hero_partner_novosit')}">
              <img src="/src/assets/chatgpt-logo-white.webp" class="w-[75px] h-[20px]" alt="${t('hero_partner_openai')}">
            </div>
          </div>
          <div class="mt-4 sm:mt-2 mb-2 sm:mb-0 flex justify-center">
            <img src="/src/assets/header-scroll-down.svg" class="w-[26px] h-[26px] animate-bounce" alt="">
          </div>
        </div>
      </div>`
  }

  /* ──────────────── template DESKTOP ──────────────── */
  const desktopTemplate = (lang: string) => {
    // const title1 = lang === 'en' ? 'text-[22.5px] sm:text-[32px] md:text-[55px] lg:text-[70px] xl:text-[83px]' : 'text-[20px] sm:text-[30px] md:text-[50px] lg:text-[63px] xl:text-[77px]'
    // const title2 = lang === 'en' ? 'text-[30px] sm:text-[45px] md:text-[72px] lg:text-[90px] xl:text-[109px]' : 'text-[25px] sm:text-[40px] md:text-[62px] lg:text-[78px] xl:text-[94px]'
    // const brand = 'text-[65px] sm:text-[95px] md:text-[155px] lg:text-[210px] xl:text-[240px]'
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
    <a href="#about"
       aria-label="Ir a la sección About"
       class="w-8 h-8 md:w-10 md:h-10            /* Ø 32-40 px */
              rounded-full bg-[#006E49]
              hover:bg-[#00a16b] transition-colors duration-200
              flex items-center justify-center inline-flex
              animate-bounce-mini">              <!-- 🡐 rebote global -->

      <img src="/src/assets/header-arrow-down.svg"
           class="w-[14px] h-[14px] md:w-[16px] md:h-[16px]
                  group-hover:scale-105 transition-transform duration-200"
           alt="">
    </a>
  </div>
</div>




</div>`
  }

let partnerTimer: number | undefined

  /* ---------- render ---------- */
  const render = () => {
       /* 1.  Si el carrusel desktop estaba corriendo, lo detengo */
    if (partnerTimer) clearInterval(partnerTimer)

    /* 2.  Vuelvo a inyectar los templates (ya lo hacías) */
    const lang = getLang()
    hero.innerHTML = mobileTemplate(lang) + desktopTemplate(lang)

    /* 3.  Arranco otra vez el autoplay desktop y guardo su ID */
    partnerTimer = startPartnersAutoplay()
  }

  render()
  onLangChange(render)

  /* Carrusel autoplay (móvil) */
  const autoplay = () => {
    const track = hero.querySelector<HTMLDivElement>('#heroMobileTrack')
    if (!track) return
    const W = 110, GAP = 16, DELAY = 4000
    let i = 0
/* <<<<<<<<<<<<<<  ✨ Windsurf Command ⭐ >>>>>>>>>>>>>>>> */
    /**
     * Updates the `style.transform` property of the `#heroMobileTrack` element, to translate it horizontally by an amount calculated from the current `i` value, the slide width `W`, and the gap between slides `GAP`.
     * The calculation is as follows: `calc(50% - ${W / 2}px - ${i * (W + GAP)}px)`.
     * This function is called on page load and every `DELAY` milliseconds, to animate the autoplay of the mobile hero carousel.
     */
/* <<<<<<<<<<  fe26a658-3b1f-4073-be70-157b96a90cb2  >>>>>>>>>>> */
    const move = () => (track.style.transform = `translateX(calc(50% - ${W / 2}px - ${i * (W + GAP)}px))`)
    move()
    setInterval(() => {
      i = (i + 1) % track.children.length
      move()
    }, DELAY)
  }
  requestAnimationFrame(autoplay)



/* Carrusel partners sin huecos */
function startPartnersAutoplay(): number | undefined {
  const track = hero.querySelector<HTMLDivElement>('#partnerTrack')
  if (!track) return undefined

  const GAP   = 48           // lg:gap-12
  const SPEED = 700          // duración animación
  const DELAY = 3000         // 3 s

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

  /* ⬇️  ⬇️  ⬇️  NO llamamos slide() aquí  ⬇️  ⬇️  ⬇️ */
  return setInterval(slide, DELAY)   // el primer movimiento ocurre tras 3 s
}


  return hero
}
