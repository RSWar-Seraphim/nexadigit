// src/components/Unisync.ts
import { t, onLangChange } from './i18n'

export function Unisync() {
  const unisyncEl = document.createElement('section')

  /**
   * Renderización dinámica según el idioma actual
   */
  const render = () => {
    unisyncEl.className = 'w-full max-w-[956px] mx-auto mt-24 px-4 text-white'

    unisyncEl.innerHTML = `
      <!-- Encabezado UniSync -->
      <div class="text-center">
        <img src="/src/assets/marker-icon.png" alt="" aria-hidden="true" class="mx-auto" />
        <h1 class="font-petrov-sans font-bold text-[240px] leading-none mt-4">UniSync</h1>
        <img src="/src/assets/laptop_screen_unisync.png" alt="${t('unisync_laptop_alt')}" class="mx-auto mt-8" />
        <!-- Tagline -->
        <div class="mt-12">
          <h2 class="font-montserrat font-bold text-[55px]">${t('unisync_tagline1')}</h2>
          <h3 class="font-montserrat font-bold text-[46px] mt-2">
            ${t('unisync_tagline2').replace('IA', '<span class="text-[#00cc88]">IA</span>')}
          </h3>
          <div class="flex justify-center mt-4">
            <img src="/src/assets/marker-icon.png" alt="" aria-hidden="true" class="w-[91px] h-[25px]" />
          </div>
        </div>
      </div>

      <!-- Características de UniSync -->
      <div class="grid grid-cols-12 items-start gap-12 mt-16">
        <div class="col-span-6 flex flex-col gap-12 text-left">
          ${feature('/src/assets/unisync-icon-ai.svg', 'unisync_ft1_img_alt', 'unisync_ft1_title', 'unisync_ft1_desc')}
          ${feature('/src/assets/unisync-dashboard-icon.svg', 'unisync_ft2_img_alt', 'unisync_ft2_title', 'unisync_ft2_desc')}
          ${feature('/src/assets/unisync-module.svg', 'unisync_ft3_img_alt', 'unisync_ft3_title', 'unisync_ft3_desc')}
        </div>
        <div class="col-span-6 flex justify-center">
          <img src="/src/assets/unisync-face-3d.png" alt="${t('unisync_face3d_alt')}" class="w-[593px] h-[656px] object-contain" />
        </div>
      </div>

      <!-- CTA Demo -->
      <div class="flex flex-col items-center mt-24">
        <button class="w-[325px] h-[87px] bg-[#006E49] hover:bg-[#00e699] transition-colors rounded font-montserrat font-bold uppercase tracking-wide flex items-center justify-center gap-2">
          ${t('unisync_cta')}
          <img src="/src/assets/arrow-right-about.svg" alt="" aria-hidden="true" class="w-4 h-4" />
        </button>
      </div>

      <!-- Estadísticas -->
      <div class="grid grid-cols-12 items-center gap-8 mt-16">
        <div class="col-span-6 flex justify-center">
          <img src="/src/assets/building-ai-unisync.png" alt="${t('unisync_building_alt')}" class="w-[478px] h-[939px] object-contain" />
        </div>
        <div class="col-span-6 flex flex-col items-center gap-20 text-center">
          ${stat('/src/assets/unisync-graph-icon.svg', 'unisync_stat1')}
          ${stat('/src/assets/unisync-world.svg', 'unisync_stat2')}
          ${stat('/src/assets/unisync-corporate.svg', 'unisync_stat3')}
        </div>
      </div>
    `
  }

  /**
   * Helper: Feature row
   */
  const feature = (
    icon: string,
    imgAltKey: Parameters<typeof t>[0],
    titleKey: Parameters<typeof t>[0],
    descKey: Parameters<typeof t>[0]
  ) => `
    <div class="flex items-start gap-4">
      <div class="w-[35px] h-[35px] bg-[#006E49] rounded-full flex items-center justify-center">
        <img src="${icon}" alt="${t(imgAltKey)}" class="w-4 h-4" />
      </div>
      <div>
        <h4 class="font-montserrat font-bold text-[32px] leading-tight">${t(titleKey)}</h4>
        <p class="font-montserrat font-medium text-[20px] leading-relaxed mt-2 max-w-[400px]">
          ${t(descKey)}
        </p>
      </div>
    </div>`

  /**
   * Helper: Statistic box
   */
  const stat = (
    icon: string,
    textKey: Parameters<typeof t>[0]
  ) => `
    <div class="flex flex-col items-center gap-4 max-w-[380px]">
      <div class="w-[35px] h-[35px] bg-[#006E49] rounded-full flex items-center justify-center">
        <img src="${icon}" alt="" aria-hidden="true" class="w-4 h-4" />
      </div>
      <p class="font-montserrat font-medium text-[20px] leading-relaxed">${t(textKey)}</p>
    </div>`

  // Render inicial y actualización en toggle
  render()
  onLangChange(render)

  return unisyncEl
}
