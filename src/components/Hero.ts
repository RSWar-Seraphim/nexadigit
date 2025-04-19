// src/components/Hero.ts
import { t, getLang, onLangChange } from './i18n'

export function Hero() {
  const heroEl = document.createElement('section')
  heroEl.className = 'w-full max-w-[1238px] mx-auto px-[64px] mt-12'

  const render = () => {
    const lang = getLang()

    /* tamaños de título */
    const title1Size = lang === 'en' ? 'text-[83px]'  : 'text-[77px]'
    const title2Size = lang === 'en' ? 'text-[109px]' : 'text-[94px]'

    /* 👉 margen top para el bloque de logos */
    const logosMargin = lang === 'en' ? 'mt-12' : 'mt-20' // súbelo un poco en EN

    heroEl.innerHTML = `
      <div class="grid grid-cols-12 gap-4">
        <!-- Contenido principal -->
        <div class="col-span-12 text-center">
          <h2 class="font-montserrat font-extrabold leading-[1.1] ${title1Size}">
            ${t('hero_title_part1')}
          </h2>
          <h2 class="font-montserrat font-extrabold leading-[1.1] mt-1 ${title2Size}">
            ${t('hero_title_part2')}
          </h2>

          <!-- NexaDigit + Flecha decorativa -->
          <div class="relative inline-block mt-4">
            <h1 class="relative z-10 font-petrov-sans text-[240px] leading-none">
              ${t('hero_brand')}
            </h1>
            <img
              src="/src/assets/arrow_hero_section_down.svg"
              alt="${t('hero_bg_arrow_decor')}"
              class="absolute z-0 w-[428px] h-[635px] pointer-events-none
                     top-[100%] left-[55%] -translate-x-1/2 -translate-y-1/2"
            />
          </div>

          <!-- Email + botón -->
          <div class="mt-32 flex justify-center items-center gap-2">
            <input type="email" placeholder="${t('hero_email_placeholder')}"
                   class="w-[314px] h-[57px] bg-white rounded-[20px] text-black px-4 py-2" />
            <button type="submit"
                    class="bg-[#006E49] text-white font-bold flex items-center gap-2 h-[57px] px-4">
              <img src="/src/assets/icon-send.svg" alt="${t('hero_cta_send_alt')}" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- Logos en recuadro verde -->
      <div class="grid grid-cols-12 ${logosMargin}">
        <div class="col-span-12 flex justify-center">
          <div class="w-[1074px] h-[154px] bg-[#006E49] rounded-[55px]
                      flex items-center justify-center gap-8">
            <img src="/src/assets/ms-gold-partner.png" alt="${t('hero_partner_ms')}"      class="w-[175px] h-[45px]" />
            <img src="/src/assets/NVIDIA_logo.png"      alt="${t('hero_partner_nvidia')}" class="w-[235px] h-[44px]" />
            <img src="/src/assets/novosit-logo.png"     alt="${t('hero_partner_novosit')}"class="w-[172px] h-[46px]" />
            <img src="/src/assets/openai.png"           alt="${t('hero_partner_openai')}" class="w-[199px] h-[54px]" />
          </div>
        </div>
      </div>

      <!-- Flecha extra debajo del recuadro -->
      <div class="grid grid-cols-12">
        <div class="col-span-12 flex items-center justify-center">
          <img src="/src/assets/arrow-down-hero-section.svg"
               alt="${t('hero_arrow_down_box')}"
               class="w-[98.67px] h-[98px] cursor-pointer" />
        </div>
      </div>
    `
  }

  render()
  onLangChange(render)

  return heroEl
}
