// src/components/Hero.ts
import { t, getLang, onLangChange } from './i18n'

export function Hero() {
  const heroEl = document.createElement('section')
  heroEl.className = 'w-full max-w-[1238px] mx-auto px-[64px] mt-12'

  const render = () => {
    const lang = getLang()

    /* tamaños de título según idioma */
    const title1Size = lang === 'en' ? 'text-[83px]'  : 'text-[77px]'
    const title2Size = lang === 'en' ? 'text-[109px]' : 'text-[94px]'

    /* margen top para barra de partners */
    const logosMargin = lang === 'en' ? 'mt-12' : 'mt-20'

    heroEl.innerHTML = `
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 text-center">
          <!-- Títulos -->
          <h2 class="font-montserrat font-extrabold leading-[1.1] ${title1Size}">
            ${t('hero_title_part1')}
          </h2>
          <h2 class="font-montserrat font-extrabold leading-[1.1] mt-1 ${title2Size}">
            ${t('hero_title_part2')}
          </h2>

          <!-- Marca NexaDigit + flecha curva -->
          <div class="relative inline-block mt-4">
            <h1 class="relative z-10 font-petrov-sans text-[240px] leading-none">
              ${t('hero_brand')}
            </h1>
            <img
              src="/src/assets/arrow_hero_section_down.svg"
              alt="${t('hero_bg_arrow_decor')}"
              class="absolute z-0 w-[428px] h-[635px] pointer-events-none top-[100%] left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          </div>

          <!-- Email + botón CTA -->
          <div class="mt-32 flex justify-center items-center gap-2">
            <input
              type="email"
              placeholder="${t('hero_email_placeholder')}"
              class="w-[314px] h-[57px] bg-white rounded-[20px] text-black px-4 py-2"
            />
            <button
              type="submit"
              class="bg-[#006E49] text-white font-bold flex items-center gap-2 h-[57px] px-4"
            >
              <img
                src="/src/assets/icon-send.svg"
                alt="${t('hero_cta_send_alt')}"
                class="w-4 h-4"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- Barra de partners -->
      <div class="grid grid-cols-12 ${logosMargin}">
        <div class="col-span-12 flex justify-center">
          <div
            class="w-[1071px] h-[125px] bg-[#006E49] rounded-[55px] flex items-center justify-center gap-8"
          >
            <img
              src="/src/assets/ms-gold-partner.png"
              alt="${t('hero_partner_ms')}"
              class="w-[150px] h-[40px]"
            />
            <img
              src="/src/assets/novosit-logo.png"
              alt="${t('hero_partner_novosit')}"
              class="w-[125px] h-[40px]"
            />
            <img
              src="/src/assets/NVIDIA_logo.png"
              alt="${t('hero_partner_nvidia')}"
              class="w-[140px] h-[30px]"
            />
            <img
              src="/src/assets/openai.png"
              alt="${t('hero_partner_openai')}"
              class="w-[135px] h-[37px]"
            />
          </div>
        </div>
      </div>

      <!-- Flecha scroll‑down -->
      <div class="grid grid-cols-12 mt-8">
        <div class="col-span-12 flex items-center justify-center">
          <img
            src="/src/assets/header-scroll-down.svg"
            alt="${t('hero_arrow_down_box')}"
            class="w-[45px] h-[45px] cursor-pointer animate-bounce"
          />
        </div>
      </div>

    `
  }

  render()
  onLangChange(render)

  return heroEl
}
