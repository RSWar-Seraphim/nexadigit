// ──────────────────────────────────────────
// src/components/Hero.ts   (mobile-first + desktop)
// ──────────────────────────────────────────
import { t, getLang, onLangChange } from './i18n'

export function Hero() {
  const heroEl = document.createElement('section')
  heroEl.className = 'w-full max-w-[1238px] mx-auto px-4 sm:px-[64px] mt-8 sm:mt-12'
  heroEl.id = 'home'

  const render = () => {
    const lang = getLang()

    /* ── tamaños de títulos ───────────────────────────── */
    const title1Size = lang === 'en'
      ? 'text-[19px] sm:text-[83px]'
      : 'text-[17px] sm:text-[77px]'

    const title2Size = lang === 'en'
      ? 'text-[29px] sm:text-[109px]'
      : 'text-[27px] sm:text-[94px]'

    const brandSize  = 'text-[65px] sm:text-[240px]'
    const logosMargin = lang === 'en' ? 'mt-10 sm:mt-12' : 'mt-14 sm:mt-20'

    /* ── plantilla ────────────────────────────────────── */
    heroEl.innerHTML = `
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 text-center">
          <!-- Títulos -->
          <h2 class="font-montserrat font-extrabold leading-tight ${title1Size}">
            ${t('hero_title_part1')}
          </h2>
          <h2 class="font-montserrat font-extrabold leading-tight mt-1 ${title2Size}">
            ${t('hero_title_part2')}
          </h2>

          <!-- Marca + flecha -->
          <div class="relative inline-block mt-4">
            <h1 class="relative z-10 font-petrov-sans ${brandSize} leading-none">
              ${t('hero_brand')}
            </h1>
            <img
              src="/src/assets/arrow_hero_section_down.svg"
              alt="${t('hero_bg_arrow_decor')}"
              class="absolute z-0 w-[89.24px] h-[46.3px] pointer-events-none top-[100%] left-1/2 -translate-x-1/2 -translate-y-1/2
                     sm:w-[428px] sm:h-[635px] animate-zoom"
            />
          </div>

          <!-- Formulario CTA -->
          <div class="mt-12 sm:mt-32 flex justify-center items-center gap-2">
            <input
              type="email"
              placeholder="${t('hero_email_placeholder')}"
              class="w-[120px] h-[21.78px] sm:w-[314px] sm:h-[57px] bg-white rounded-[6px] sm:rounded-[20px]
                     text-black px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-base"
            />
            <button
              type="submit"
              class="bg-[#006E49] text-white flex items-center justify-center
                     h-[21.78px] w-[21.78px] rounded-[6px] sm:h-[57px] sm:w-auto sm:px-4"
            >
              <img
                src="/src/assets/icon-send.svg"
                alt="${t('hero_cta_send_alt')}"
                class="w-[20px] h-[20px] sm:w-4 sm:h-4"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- Barra de partners -->
      <div class="grid grid-cols-12 ${logosMargin}">
        <div class="col-span-12 flex justify-center">
          <div
            class="w-full max-w-[350px] sm:max-w-[1071px] h-[85px] sm:h-[125px] bg-[#006E49]
                   rounded-[40px] sm:rounded-[55px] flex items-center justify-center gap-3 sm:gap-8 px-4"
          >
            <img src="/src/assets/ms-gold-partner.png"   alt="${t('hero_partner_ms')}"
                 class="w-[70px]  h-[20px]  sm:w-[150px] sm:h-[40px]" />
            <img src="/src/assets/novosit-logo.png"       alt="${t('hero_partner_novosit')}"
                 class="w-[65px]  h-[20px]  sm:w-[135px] sm:h-[40px] mb-0.5" />
            <img src="/src/assets/gemini_logo.png"        alt="${t('hero_partner_nvidia')}"
                 class="w-[70px]  h-[30px]  sm:w-[145px] sm:h-[55px] mb-0.5" />
            <img src="/src/assets/chatgpt-logo-white.webp" alt="${t('hero_partner_openai')}"
                 class="w-[80px]  h-[30px]  sm:w-[180px] sm:h-[55px] mt-1" />
          </div>
        </div>
      </div>

      <!-- Flecha scroll-down -->
      <div class="grid grid-cols-12 mt-6 sm:mt-8">
        <div class="col-span-12 flex justify-center">
          <img
            src="/src/assets/header-scroll-down.svg"
            alt="${t('hero_arrow_down_box')}"
            class="w-[30px] h-[30px] sm:w-[45px] sm:h-[45px] cursor-pointer animate-bounce"
          />
        </div>
      </div>
    `
  }

  render()
  onLangChange(render)
  return heroEl
}
