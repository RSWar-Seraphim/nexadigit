// ──────────────────────────────────────────
// src/components/About.ts   (desktop intacto + mobile stack)
// ──────────────────────────────────────────
import { t, onLangChange } from './i18n'

export function About() {
  const aboutEl = document.createElement('section')
  aboutEl.id = 'about'

  type I18nKey = Parameters<typeof t>[0]

  /* ---------- helpers ---------- */
  const itemRowDesktop = (
    icon: string,
    titleKey: I18nKey,
    descKey: I18nKey,
    highlight = false
  ) => {
    const rowExtra = highlight
      ? 'relative bg-[#006E49]/40 rounded-tl-[55px] border-b border-white'
      : ''

    return `
      <div class="grid grid-cols-12 items-center gap-4 min-h-[170px] pl-4 md:pl-6 ${rowExtra}">
        <div class="col-span-5 flex items-center gap-3">
          <div class="w-[35px] h-[35px] bg-[#006E49] rounded-full flex items-center justify-center">
            <img src="${icon}" alt="${t(titleKey)} icon" class="w-4 h-4" />
          </div>
          <h3 class="font-montserrat font-bold text-[25px] uppercase leading-tight">
            ${t(titleKey)}
          </h3>
        </div>
        <div class="col-span-1 flex items-center justify-center">
          <img src="/src/assets/arrow-right-about.svg" alt="Arrow separator" class="w-[25px] h-[25px]" />
        </div>
        <div class="col-span-6 flex flex-col justify-center">
          <p class="font-montserrat font-medium text-[20px] leading-relaxed text-left">
            ${t(descKey)}
          </p>
        </div>
      </div>`
  }

  const itemRowMobile = (
    icon: string,
    titleKey: I18nKey,
    descKey: I18nKey,
    highlight = false
  ) => {
    const wrap = highlight ? 'bg-[#006E49]/40 rounded-[20px] py-6' : 'py-6'
    return `
      <div class="flex flex-col items-center text-center ${wrap}">
        <div class="w-[20px] h-[20px] bg-[#006E49] rounded-full flex items-center justify-center mb-2 ">
          <img src="${icon}" alt="${t(titleKey)} icon" class="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
        </div>
        <h3 class="font-montserrat font-extrabold text-[12px] uppercase">
          ${t(titleKey)}
        </h3>
        <p class="mt-2 font-montserrat font-medium text-[11px] leading-relaxed px-2">
          ${t(descKey)}
        </p>
      </div>`
  }

  /* ---------- render ---------- */
  const render = () => {
    aboutEl.className =
      'w-full max-w-[1000px] mx-auto mt-16 sm:mt-24 px-4 text-white scroll-mt-[160px]'

    aboutEl.innerHTML = `
      <!-- Encabezado -->
      <div class="text-center">
        <h2 class="font-montserrat font-bold text-[24px] sm:text-[45px] leading-none">
          ${t('about_title')}
        </h2>
        <div class="flex justify-center mt-4 sm:mt-10">
          <img src="/src/assets/marker-icon.png"
               alt="Marker icon"
               class="w-[70px] h-[18px] sm:w-[91px] sm:h-[25px]" />
        </div>
      </div>

      <!-- Versión MOBILE -->
      <div class="block sm:hidden mt-8 flex flex-col gap-6">
        ${itemRowMobile('/src/assets/about-processor-icon.svg',
                        'about_item1_title','about_item1_desc', true)}
        ${itemRowMobile('/src/assets/about-migrate-icon.svg',
                        'about_item2_title','about_item2_desc')}
        ${itemRowMobile('/src/assets/about-plan-icon.svg',
                        'about_item3_title','about_item3_desc', true)}
        ${itemRowMobile('/src/assets/about-human-icon.svg',
                        'about_item4_title','about_item4_desc')}
      </div>

      <!-- Versión DESKTOP (original) -->
      <div class="hidden sm:block mt-10">
        <div class="grid grid-rows-4 gap-10">
          ${itemRowDesktop('/src/assets/about-processor-icon.svg',
                           'about_item1_title','about_item1_desc', true)}
          ${itemRowDesktop('/src/assets/about-migrate-icon.svg',
                           'about_item2_title','about_item2_desc')}
          ${itemRowDesktop('/src/assets/about-plan-icon.svg',
                           'about_item3_title','about_item3_desc', true)}
          ${itemRowDesktop('/src/assets/about-human-icon.svg',
                           'about_item4_title','about_item4_desc')}
        </div>
      </div>
    `
  }

  render()
  onLangChange(render)
  return aboutEl
}
