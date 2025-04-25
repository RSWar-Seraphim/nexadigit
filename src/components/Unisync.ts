// src/components/Unisync.ts
import {t, onLangChange, getLang} from './i18n'

export function Unisync() {
  const unisyncEl = document.createElement('section')

  unisyncEl.id = 'unisync'
  /**
   * Renderización dinámica según el idioma actual
   */
  const render = () => {

    const lang = getLang()

    /* tamaños de título según idioma */
    const unisyncStats1Size = lang === 'en' ? 'text-[45px]'  : 'text-[45px]'
    const unisyncStats2Size = lang === 'en' ? 'text-[55px]' : 'text-[36px]'
    const unisyncFeatures1Size = lang === 'en' ? 'text-[65px]'  : 'text-[65px]'
    const unisyncFeatures2Size = lang === 'en' ? 'text-[60px]'  : 'text-[60px]'

    unisyncEl.className = 'w-full max-w-[956px] mx-auto mt-24 px-4 text-white'

    unisyncEl.innerHTML = `
      <!-- Encabezado UniSync -->
      <div class="text-center">
        <img src="/src/assets/marker-icon.png" alt="" aria-hidden="true" class="mx-auto" />
        <h1 class="font-petrov-sans font-bold text-[190px] leading-none mt-4">UniSync</h1>
        <img
          src="/src/assets/laptop_screen_unisync.png"
          alt="${t('unisync_laptop_alt')}"
          class="mx-auto mt-14 w-[85%]"
        />        <!-- Tagline -->
        <div class="mt-12">
          <h2 class="font-montserrat font-bold ${unisyncFeatures1Size}">${t('unisync_tagline1')}</h2>
          <h3 class="font-montserrat font-bold ${unisyncFeatures2Size} mt-2">
            ${t('unisync_tagline2').replace('IA', '<span class="text-[#00cc88]">IA</span>')}
          </h3>
          <div class="flex justify-center mt-4">
            <img src="/src/assets/marker-icon.png" alt="" aria-hidden="true" class="w-[91px] h-[25px]" />
          </div>
        </div>
      </div>

     <!-- Características de UniSync (2 × 2 · 1116×506) -->
<div class="mx-auto mt-16 grid grid-cols-2 grid-rows-2 gap-0 max-w-[1116px]">

  <!-- Tarjeta 1  (arriba-izq) -->
  <div class="bg-[#006E49]/40 rounded-tl-[45px] text-left p-10">
    <h4 class="font-montserrat font-bold text-[28px] leading-tight">
      ${t('unisync_ft1_title')}
    </h4>
    <p class="font-montserrat font-medium text-[15px] leading-relaxed mt-4">
      ${t('unisync_ft1_desc')}
    </p>
  </div>

  <!-- Tarjeta 2  (arriba-der) -->
  <div class="p-10 text-left">
    <h4 class="font-montserrat font-bold text-[28px] leading-tight">
      ${t('unisync_ft3_title')}
    </h4>
    <p class="font-montserrat font-medium text-[15px] leading-relaxed mt-4">
      ${t('unisync_ft3_desc')}
    </p>
  </div>

  <!-- Tarjeta 3  (abajo-izq) -->
  <div class="p-10 text-left">
    <h4 class="font-montserrat font-bold text-[28px] leading-tight">
      ${t('unisync_ft4_title')}
    </h4>
    <p class="font-montserrat font-medium text-[15px] leading-relaxed mt-4">
      ${t('unisync_ft4_desc')}
    </p>
  </div>

  <!-- Tarjeta 4  (abajo-der) -->
  <div class="bg-[#006E49]/40 rounded-br-[45px] p-10 text-left">
    <h4 class="font-montserrat font-bold text-[28px] leading-tight">
      ${t('unisync_ft2_title')}
    </h4>
    <p class="font-montserrat font-medium text-[15px] leading-relaxed mt-4">
      ${t('unisync_ft2_desc')}
    </p>
  </div>
</div>

<!-- CTA Demo -->
<div class="flex flex-col items-center mt-24">
  <button
    class="w-[325px] h-[87px] bg-[#006E49]/40 transition-colors
           rounded font-montserrat font-bold uppercase tracking-wide flex
           items-center justify-center gap-2">
    ${t('unisync_cta')}
  </button>
</div>


      <!-- Estadísticas -->
         <div class="mt-12">
          <h2 class="font-montserrat font-bold ${unisyncStats1Size}">${t('unisync_stat_title')}</h2>
          <h3 class="font-montserrat font-bold ${unisyncStats2Size} mt-2">
            ${t('unisync_stat_subtitle').replace('IA', '<span class="text-[#00cc88]">IA</span>')}
          </h3>
          <div class="flex justify-center mt-4">
            <img src="/src/assets/marker-icon.png" alt="" aria-hidden="true" class="w-[91px] h-[25px]" />
          </div>
        </div>
      </div>
      <div class="grid grid-cols-12 items-center gap-8 mt-16">
        <div class="col-span-6 flex justify-center">
          <img src="/src/assets/building-ai-unisync.png" alt="${t('unisync_building_alt')}" class="w-[478px] h-[939px] object-contain" />
        </div>
        <div class="col-span-6 flex flex-col items-center gap-20 text-center">
          ${stat('/src/assets/unisync-graph-icon.svg', 'unisync_stat1')}
          ${stat('/src/assets/unisync-world.svg', 'unisync_stat2')}
          ${stat('/src/assets/unisync-corporate.svg', 'unisync_stat3')}
          ${stat('/src/assets/unisync-up.svg', 'unisync_stat4')}
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
  titleKey:   Parameters<typeof t>[0],
  descKey:    Parameters<typeof t>[0]
) => `
  <div class="grid grid-cols-[40px_1fr] gap-4 items-center">
    <!-- Icono circular -->
    <div class="w-[40px] h-[40px] bg-[#006E49] rounded-full flex items-center justify-center">
      <img src="${icon}" alt="${t(imgAltKey)}" class="w-4 h-4" />
    </div>

    <!-- Texto -->
    <div class="max-w-[400px] text-left">
      <h4 class="font-montserrat font-bold text-[30px] leading-[40px]">
        ${t(titleKey)}
      </h4>
      <p class="font-montserrat font-medium text-[15px] leading-relaxed mt-2">
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
      <p class="font-montserrat font-medium text-[15px] leading-relaxed">${t(textKey)}</p>
    </div>`

  // Render inicial y actualización en toggle
  render()
  onLangChange(render)

  return unisyncEl
}
