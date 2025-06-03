// ──────────────────────────────────────────
// src/components/About.ts   (desktop intacto + md refinado + mobile igual, refactorizado)
// ──────────────────────────────────────────
import { t, onLangChange } from './i18n'

type I18nKey = Parameters<typeof t>[0]

// Helper: Row desktop
function itemRowDesktop(
  icon: string,
  titleKey: I18nKey,
  descKey: I18nKey,
  highlight = false
) {
  const rowExtra = highlight
    ? 'relative bg-[#006E49]/40 rounded-tl-[55px] border-b border-white'
    : ''
  return `
    <div class="sm:min-h-[145px] grid grid-cols-12 items-center gap-4 lg:min-h-[170px] md:min-h-[145px] pl-4
               md:pl-2 md:gap-5 ${rowExtra}">
      <div class="col-span-5 flex items-center gap-3">
        <div class="w-[35px] h-[35px] md:w-[30px] md:h-[30px] bg-[#006E49] rounded-full flex items-center justify-center lg:flex">
          <img src="${icon}" alt="${t(titleKey)} icon" class="w-4 h-4 md:w-3.5 md:h-3.5" />
        </div>
        <h3 class="aside-text-about">${t(titleKey)}</h3>
      </div>
      <div class="col-span-1 lg:flex items-center justify-center">
        <img src="/src/assets/arrow-right-about.svg"
             alt="Arrow separator"
             class="md:w-[20px] md:h-[20px] w-[25px] h-[25px] sm:w-[15px] sm:h-[15px]" />
      </div>
      <div class="col-span-6 flex flex-col justify-center">
        <p class="font-montserrat font-medium text-body leading-relaxed text-left tracking-tight">
          ${t(descKey)}
        </p>
      </div>
    </div>`
}

// Helper: Row mobile
function itemRowMobile(
  icon: string,
  titleKey: I18nKey,
  descKey: I18nKey,
  highlight = false
) {
  const wrapperBase = 'relative w-[236px] h-[200px] flex items-center justify-center'
  const highlightClasses = highlight ? 'bg-[#006E49]/10 rounded-tl-[20px] rounded-tr-[20px]' : ''
  const highlightStyle = highlight ? 'style="border-bottom:0.5px solid #D9D9D9;"' : ''
  return `
    <div class="mt-6 flex justify-center">
      <div class="${wrapperBase} ${highlightClasses}" ${highlightStyle}>
        <div class="max-w-[185px] mx-auto flex flex-col items-center text-center">
          <div class="w-[20px] h-[20px] bg-[#006E49] rounded-full flex items-center justify-center mb-2">
            <img src="${icon}" alt="${t(titleKey)} icon" class="w-3 h-3" />
          </div>
          <h3 class="font-montserrat font-bold text-[12px] leading-[15px] uppercase">
            ${t(titleKey)}
          </h3>
          <img src="/src/assets/marker-icon.webp" class="my-1 w-[39px] h-[10px]" alt="" />
          <p class="font-montserrat font-medium text-[8px] leading-relaxed">
            ${t(descKey)}
          </p>
        </div>
      </div>
    </div>`
}

// Entry point
export function About() {
  const aboutEl = document.createElement('section')
  aboutEl.id = 'about'

  function render() {
    aboutEl.className =
      'w-full max-w-[1000px] mx-auto mt-6 sm:mt-24 px-4 text-white scroll-mt-[160px]'

    aboutEl.innerHTML = `
      <!-- Header -->
      <div class="text-center">
        <h2 class="text-title">
          ${t('about_title')}
        </h2>
        <div class="flex justify-center mt-2 md:mt-2">
          <img src="/src/assets/marker-icon.webp" alt="Marker icon"
               class="w-[70px] h-[18px] sm:w-[91px] sm:h-[25px]" />
        </div>
      </div>

      <!-- MOBILE version -->
      <div class="block sm:hidden mt-8 flex flex-col">
        ${itemRowMobile('/src/assets/about-processor-icon.svg','about_item1_title','about_item1_desc', true)}
        ${itemRowMobile('/src/assets/about-migrate-icon.svg','about_item2_title','about_item2_desc', false)}
        ${itemRowMobile('/src/assets/about-plan-icon.svg','about_item3_title','about_item3_desc', true)}
        ${itemRowMobile('/src/assets/about-human-icon.svg','about_item4_title','about_item4_desc', false)}
      </div>

      <!-- DESKTOP style, active desde md pero con ajustes -->
      <div class="hidden sm:block mt-10">
        <div class="grid grid-rows-4 gap-10">
          ${itemRowDesktop('/src/assets/about-processor-icon.svg','about_item1_title','about_item1_desc', true)}
          ${itemRowDesktop('/src/assets/about-migrate-icon.svg','about_item2_title','about_item2_desc')}
          ${itemRowDesktop('/src/assets/about-plan-icon.svg','about_item3_title','about_item3_desc', true)}
          ${itemRowDesktop('/src/assets/about-human-icon.svg','about_item4_title','about_item4_desc')}
        </div>
      </div>`
  }

  render()
  onLangChange(render)
  return aboutEl
}
