// ──────────────────────────────────────────
// src/components/Hero.ts   (ajuste spacing + mobile fine-tune)
// ──────────────────────────────────────────
import { t, getLang, onLangChange } from './i18n'

export function Hero() {
  const heroEl = document.createElement('section')
  // eliminamos margen superior en mobile; vuelve a aparecer en desktop
  heroEl.className =
    'w-full max-w-[1238px] mx-auto px-4 sm:px-[64px] mt-0 sm:mt-12 scroll-mt-[64px]'
  heroEl.id = 'home'

  const render = () => {
    const lang = getLang()

    /* Tamaños de texto */
    const title1Size =
      lang === 'en' ? 'text-[22.5px] sm:text-[83px]' : 'text-[20px] sm:text-[77px]'

    const title2Size =
      lang === 'en' ? 'text-[30px] sm:text-[109px]' : 'text-[25px] sm:text-[94px]'

    const brandSize = 'text-[65px] sm:text-[240px]'
    const logosMargin = lang === 'en' ? 'mt-6 sm:mt-16' : 'mt-8 sm:mt-20'

    heroEl.innerHTML = `
      <div class="grid grid-cols-12 gap-0 sm:gap-4">
        <div class="col-span-12 text-center">
          <!-- TÍTULOS -->
          <h2 class="font-montserrat font-extrabold leading-tight ${title1Size}">
            ${t('hero_title_part1')}
          </h2>
          <h2 class="font-montserrat font-extrabold leading-tight mt-0.5 ${title2Size}">
            ${t('hero_title_part2')}
          </h2>

          <!-- MARCA + FLECHA -->
          <div class="relative inline-block mt-3">
            <h1 class="relative z-10 font-petrov-sans ${brandSize} leading-none whitespace-nowrap">
              ${t('hero_brand')}
            </h1>
            <img
              src="/src/assets/arrow_hero_section_down.svg"
              alt="${t('hero_bg_arrow_decor')}"
              class="absolute z-0 w-[120px] h-[190px] sm:w-[428px] sm:h-[635px]
                     top-[100%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-zoom"
            />
          </div>

          <!-- FORM CTA -->
          <div class="mt-10 sm:mt-32 flex justify-center items-center gap-2">
            <input
              type="email"
              placeholder="${t('hero_email_placeholder')}"
              class="w-[180px] h-[28px] sm:w-[314px] sm:h-[57px] bg-white rounded-[6px] sm:rounded-[20px]
                     text-black placeholder:text-[10px] text-xs sm:text-base px-3 sm:px-4"
            />
           <button class="bg-[#006E49] flex items-center justify-center
                  h-[28px] p-2 rounded-[6px]
                  sm:h-[57px] sm:px-4 sm:rounded-[20px]">
               <img src="/src/assets/icon-send.svg"
                   alt="${t('hero_cta_send_alt')}"
                   class="w-2 h-2 sm:w-4 sm:h-4 brightness-0 invert" />
           </button>


          </div>
        </div>
      </div>

      <!-- PARTNERS -->
      <div class="grid grid-cols-12 ${logosMargin}">
        <div class="col-span-12 flex justify-center">
          <div
            class="w-full max-w-[330px] sm:max-w-[1071px] h-[65px] sm:h-[125px] bg-[#006E49]
                   rounded-[35px] sm:rounded-[55px] flex items-center justify-center gap-5 sm:gap-8 px-3 sm:px-4"
          >
            <img src="/src/assets/ms-gold-partner.png"   alt="${t('hero_partner_ms')}"
                 class="w-[60px]  h-[18px]  sm:w-[150px] sm:h-[40px]" />
            <img src="/src/assets/novosit-logo.png"       alt="${t('hero_partner_novosit')}"
                 class="w-[65px]  h-[20px]  sm:w-[135px] sm:h-[40px]" />
            <img src="/src/assets/gemini_logo.png"
             alt="Logo NVIDIA"
             class="hidden sm:inline-block w-[60px] h-[24px] sm:w-[145px] sm:h-[55px]" />
            <img src="/src/assets/chatgpt-logo-white.webp" alt="${t('hero_partner_openai')}"
                 class="mt-1 w-[65px]  h-[24px]  sm:w-[180px] sm:h-[55px]" />
          </div>
        </div>
      </div>

      <!-- FLECHA SCROLL -->
      <div class="grid grid-cols-12 mt-6 sm:mt-8">
        <div class="col-span-12 flex justify-center">
          <img
            src="/src/assets/header-scroll-down.svg"
            alt="${t('hero_arrow_down_box')}"
            class="w-[26px] h-[26px] sm:w-[45px] sm:h-[45px] animate-bounce cursor-pointer"
          />
        </div>
      </div>
    `
  }

  render()
  onLangChange(render)
  return heroEl
}
