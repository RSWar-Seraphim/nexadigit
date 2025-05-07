// ──────────────────────────────────────────
// src/components/Hero.ts   (ajuste spacing + mobile fine-tune)
// ──────────────────────────────────────────
import { t, getLang, onLangChange } from './i18n'

export function Hero() {
  const heroEl = document.createElement('section')
  // eliminamos margen superior en mobile; vuelve a aparecer en desktop
  heroEl.className =
    'w-full max-w-[1238px] mx-auto px-4 lg:px-[64px] md:mt-12 lg:mt-12 scroll-mt-[64px]'
  heroEl.id = 'home'

  const render = () => {
    const lang = getLang()

    /* Tamaños de texto */
    const title1Size =
      lang === 'en'
        ? 'text-[22.5px] ml:text-[31px] lg:text-[70px] xl:text-[83px] md:text-[57px]'
        : 'text-[20px]   ml:text-[28px] lg:text-[63px] xl:text-[77px] md:text-[51px]'

    const title2Size =
      lang === 'en'
        ? 'text-[30px]   ml:text-[41px] lg:text-[90px] xl:text-[109px] md:text-[75px]'
        : 'text-[25px]   ml:text-[34px] lg:text-[78px] xl:text-[94px] md:text-[63px]'

    const brandSize  = 'text-[65px] ml:text-[90px] lg:text-[210px] xl:text-[240px] md:text-[165px]'

    const logosMargin = lang === 'en' ? 'mt-6 lg:mt-16' : 'mt-8 lg:mt-20'

    heroEl.innerHTML = `
      <div class="grid grid-cols-12 gap-0 lg:gap-4">
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
              class="absolute z-0 w-[120px] h-[190px] lg:w-[428px] lg:h-[635px] ml:w-[135px] ml:h-[290px]
                      md:w-[500px] md:h-[500px] top-[100%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-zoom"
            />
          </div>

          <!-- FORM CTA -->
          <div class="mt-10 md:mt-28 lg:mt-32 flex justify-center items-center gap-2">
            <input
              type="email"
              placeholder="${t('hero_email_placeholder')}"
              class="w-[180px] h-[28px] md:w-[250px] md:h-[45px] lg:w-[314px] lg:h-[57px] bg-white rounded-[6px] lg:rounded-[12px]
                     text-black placeholder:text-[8px] md:placeholder:text-[13px] lg:placeholder:text-[15px] text-xs lg:text-base px-3 lg:px-4"
            />
           <button class="bg-[#006E49] flex items-center justify-center
                  h-[28px] p-2 rounded-[8px]
                  md:h-[43px] md:px-4
                  lg:h-[50px] lg:px-4 lg:rounded-[8px]">
               <img src="/src/assets/icon-send.svg"
                   alt="${t('hero_cta_send_alt')}"
                   class="w-4 h-4 lg:w-4 lg:h-4 brightness-0 invert" />
           </button>


          </div>
        </div>
      </div>

      <!-- PARTNERS -->
      <div class="grid grid-cols-12 ${logosMargin}">
        <div class="col-span-12 flex justify-center">
          <div
            class="w-full max-w-[330px] lg:max-w-[1071px] h-[65px] lg:h-[125px] bg-[#006E49]
                   rounded-[35px] lg:rounded-[55px] flex items-center justify-center gap-5 lg:gap-8 px-3 lg:px-4
                   md:h-[100px] md:gap-8 md:px-4 md:max-w-[630px]
                   "
          >
            <img src="/src/assets/ms-gold-partner.png"   alt="${t('hero_partner_ms')}"
                 class="w-[55px]  h-[14px]  lg:w-[150px] lg:h-[40px]
                 md:w-[105px] md:h-[28px]
                 " />
            <img src="/src/assets/novosit-logo.png"       alt="${t('hero_partner_novosit')}"
                 class="w-[55px]  h-[15px]  lg:w-[135px] lg:h-[40px]
                  md:w-[105px] md:h-[28px]" />
            <img src="/src/assets/gemini_logo.png"
             alt="Logo GEMINI"
             class="hidden md:inline-block lg:inline-block w-[60px] h-[24px] lg:w-[145px] lg:h-[55px]  md:w-[105px] md:h-[38px] md:-mt-2" />
            <img src="/src/assets/chatgpt-logo-white.webp" alt="${t('hero_partner_openai')}"
                 class="mt-1 w-[105px]  h-[28px]  lg:w-[180px] lg:h-[55px] md:w-[105px] md:h-[31px] md:mt-1" />
          </div>
        </div>
      </div>

      <!-- FLECHA SCROLL -->
      <div class="grid grid-cols-12 mt-6 lg:mt-8">
        <div class="col-span-12 flex justify-center">
          <img
            src="/src/assets/header-scroll-down.svg"
            alt="${t('hero_arrow_down_box')}"
            class="w-[26px] h-[26px] lg:w-[45px] lg:h-[45px] animate-bounce cursor-pointer"
          />
        </div>
      </div>
    `
  }

  render()
  onLangChange(render)
  return heroEl
}
