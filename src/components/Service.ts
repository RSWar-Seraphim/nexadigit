import { t, onLangChange } from './i18n'

export function Service() {
  const el = document.createElement('section')

  const render = () => {
    el.className = 'w-full max-w-[956px] min-h-[941px] mx-auto mt-24 px-4 text-white'
    el.innerHTML = `
      <!-- 1) ENCABEZADO GENERAL DE SERVICIOS -->
      <div class="text-center">
        <h2 class="font-montserrat font-bold text-[45px] leading-none">
          ${t('services_section_title')}
        </h2>
        <div class="flex justify-center mt-2">
          <img src="/src/assets/marker-icon.png"
               alt="" aria-hidden="true"
               class="w-[91px] h-[25px]" />
        </div>
      </div>

      <!-- BLOQUE 1 -->
      <div class="flex flex-col items-center mt-10">
        <h3 class="font-montserrat font-bold text-[25px] text-center w-full">
          ${t('services_block1_title')}
        </h3>
        <img src="/src/assets/happy-business-people-in-a-meeting-2025-02-10-02-43-54-utc.jpg"
             alt="${t('services_block1_img_alt')}"
             class="w-[618px] h-[818px] object-cover rounded-[55px] mt-6" />
        <img src="/src/assets/arrow-right-about.svg"
             alt="" aria-hidden="true"
             class="mt-4 w-[25px] h-[25px] transform rotate-90" />
        <p class="font-montserrat font-medium text-[20px] leading-relaxed text-center mt-4 w-[618px]">
          ${t('services_block1_desc')}
        </p>
        <button
          class="mt-8 w-[325px] h-[87px] bg-[#006E49] text-white font-bold uppercase rounded-[8px] flex items-center justify-center">
          ${t('services_block1_cta')}
        </button>
      </div>

      <!-- BLOQUE 2 -->
      <div class="grid grid-cols-12 items-center gap-8 mt-16">
        <div class="col-span-6 flex justify-center">
          <img src="/src/assets/entrepreneurs-discussing-documents-2025-01-29-08-04-13-utc.jpg"
               alt="${t('services_block2_img_alt')}"
               class="w-[485px] h-[720px] object-cover rounded-[55px]" />
        </div>
        <div class="col-span-6 flex justify-center">
          <div class="relative w-[485px] h-[720px]">
            <div class="absolute inset-0 flex flex-col items-start justify-center px-6">
              <h3 class="font-montserrat font-bold text-[35px] leading-tight text-left">
                ${t('services_block2_title')}
              </h3>
              <div class="flex justify-center w-full mt-8">
                <img src="/src/assets/marker-icon.png"
                     alt="" aria-hidden="true"
                     class="w-[91px] h-[25px]" />
              </div>
              <p class="font-montserrat font-medium text-[20px] leading-relaxed text-left mt-8">
                ${t('services_block2_desc')}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- BLOQUE 3 -->
      <div class="grid grid-cols-12 items-center gap-8 mt-16">
        <div class="col-span-6 flex justify-center">
          <div class="relative w-[485px] h-[720px]">
            <div class="absolute inset-0 flex flex-col items-start justify-center px-6">
              <h3 class="font-montserrat font-bold text-[35px] leading-tight text-left">
                ${t('services_block3_title')}
              </h3>
              <div class="flex justify-center w-full mt-8">
                <img src="/src/assets/marker-icon.png"
                     alt="" aria-hidden="true"
                     class="w-[91px] h-[25px]" />
              </div>
              <p class="font-montserrat font-medium text-[20px] leading-relaxed text-left mt-8">
                ${t('services_block3_desc')}
              </p>
            </div>
          </div>
        </div>
        <div class="col-span-6 flex justify-center">
          <div class="w-[485px] h-[720px] bg-[#006E49]/20 rounded-[55px]" aria-hidden="true"></div>
        </div>
      </div>
    `
  }

  render()
  onLangChange(render)
  return el
}
