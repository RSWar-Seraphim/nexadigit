// ──────────────────────────────────────────
// src/components/Unisync.ts   (mobile + desktop, refactorizado)
// ──────────────────────────────────────────
import { t, onLangChange, getLang } from './i18n'

// Helper: Bloque estadístico
function stat(icon: string, key: Parameters<typeof t>[0]) {
  return `
    <div class="flex flex-col items-center gap-4 max-w-[380px]">
      <div class="sm:w-[35px] sm:h-[35px] w-[20px] h-[20px] bg-[#006E49] rounded-full flex items-center justify-center">
        <img src="${icon}" class="w-3 h-3 sm:w-4 sm:h-4" alt="">
      </div>
      <p class="font-montserrat font-medium text-[8px] leading-relaxed
                 md:text-[15px] 
                 sm:text-[12px]">        
        ${t(key)}
      </p>
    </div>`
}

export function Unisync() {
  const el = document.createElement('section')
  el.id = 'unisync'

  function render() {
    const lang = getLang()
    const unisyncStats1Size = 'text-[45px]'
    const unisyncStats2Size = lang === 'en' ? 'text-[55px]' : 'text-[36px]'
    const title1Class = lang === 'en' ? 'unisync-title-1-en' : 'unisync-title-1-es'
    const title2Class = lang === 'en' ? 'unisync-title-2-en' : 'unisync-title-2-es'

    // Tagline2 coloreada
    const tagline2 = t('unisync_tagline2')
      .replace('IA', '<span class="text-[#00cc88]">IA</span>')
      .replace('AI', '<span class="text-[#00cc88]">AI</span>')

    // Subtitle estadística coloreada
    const statSubtitle = t('unisync_stat_subtitle')
      .replace('IA', '<span class="text-[#00cc88]">IA</span>')

    el.className = 'w-full max-w-[956px] mx-auto -mt-12 sm:mt-24 px-4 text-white'

    el.innerHTML = /* html */`
<!-- ░░░░░  MOBILE  ░░░░░ -->
<div class="block sm:hidden mt-16 text-center">
  <img src="/src/assets/marker-icon.webp" class="mx-auto w-[239px] h-[65px]" alt="" />
  <h1 class="font-petrov-sans font-bold text-[60px] leading-none mt-6">UniSync</h1>
  <img src="/src/assets/laptop_screen_unisync.webp"
       class="mx-auto mt-10 w-[90%]"
       alt="${t('unisync_laptop_alt')}" />
  <div class="mt-12 px-4">
    <h2 class="font-montserrat font-bold text-[20px] leading-tight">
      ${t('unisync_tagline1')}
    </h2>
    <h3 class="font-montserrat font-bold text-[19px] leading-tight mt-1">${tagline2}</h3>
    <img src="/src/assets/marker-icon.webp" class="mx-auto mt-4 w-[44px] h-[12px]" alt=""/>
  </div>
</div>

<!-- ░░░░░  MOBILE – características 4 × 1  ░░░░░ -->
<div class="mt-12 flex flex-col items-center gap-9 sm:hidden">
  ${mobileFeatureCard1()}
  ${mobileFeatureCard2()}
  ${mobileFeatureCard3()}
  ${mobileFeatureCard4()}

  <!-- ░░░░░  MOBILE – CTA ░░░░░ -->
  <div class="sm:hidden flex justify-center -mt-2">
    <button
      class="text-[8px] w-[145px] h-[45px] bg-[#006E49]/40 font-montserrat font-bold uppercase tracking-wide flex items-center justify-center">
      ${t('unisync_cta')}
    </button>
  </div>
  
  <!-- ░░░░░  MOBILE – estadísticas (sin edificio) ░░░░░ -->
  <div class="sm:hidden  relative w-full flex flex-col items-center mt-7 overflow-hidden">
    <img
      src="/src/assets/building-ai-unisync.webp"
      alt="AI building" aria-hidden="true"
      class="absolute bottom-0 left-1/2 -translate-x-1/2
             h-full w-auto max-w-none         
             object-cover object-bottom        
             opacity-[0.15]
             pointer-events-none select-none"
    />
    <div class="relative z-10 w-[70%] flex flex-col items-center text-center gap-6 pb-12">
      <div class="flex flex-col items-center gap-1">
        <h2 class="font-montserrat font-bold text-[17px] leading-tight max-w-[280px]">
          ${t('unisync_stat_title')}
        </h2>
        <h3 class="text-[20px] font-montserrat font-bold">
          ${statSubtitle}
        </h3>
        <img src="/src/assets/marker-icon.webp" class="w-[45px] h-[8px] mb-1" alt=""/>
      </div>
      <div class="flex flex-col items-center gap-14  w-[70%]">
        ${stat('/src/assets/unisync-graph-icon.svg', 'unisync_stat1')}
        ${stat('/src/assets/unisync-world.svg', 'unisync_stat2')}
        ${stat('/src/assets/unisync-corporate.svg', 'unisync_stat3')}
        ${stat('/src/assets/unisync-up.svg', 'unisync_stat4')}
      </div>
    </div>
  </div>
</div>

<!-- ░░░░░  DESKTOP  ░░░░░ -->
<div class="hidden sm:block">
  <!-- cabecera + portátil -->
  <div class="text-center">
    <img id="unisync-marker" src="/src/assets/marker-icon.webp" class="mx-auto" alt="" aria-hidden="true" />
    <h1 class="font-petrov-sans font-bold text-[190px] sm:text-[150px] leading-none mt-4">UniSync</h1>
    <img src="/src/assets/laptop_screen_unisync.webp"
         class="mx-auto mt-14 w-[85%]"
         alt="${t('unisync_laptop_alt')}" />
    <!-- tagline -->
    <div class="mt-8">
      <h2 class="font-montserrat font-bold ${title1Class}">
        ${t('unisync_tagline1')}
      </h2>
      <h3 class="font-montserrat font-bold ${title2Class} lg:-mt-4">
        ${t('unisync_tagline2')}
      </h3>
      <div class="flex justify-center mt-4">
        <img src="/src/assets/marker-icon.webp" class="w-[91px] h-[25px]" alt="" aria-hidden="true" />
      </div>
    </div>
  </div>
  <!-- características 2×2 -->
  <div class="mx-auto mt-16 grid grid-cols-2 grid-rows-2 gap-0 max-w-[1116px]">
    ${desktopFeatureCard1()}
    ${desktopFeatureCard2()}
    ${desktopFeatureCard3()}
    ${desktopFeatureCard4()}
  </div>
  <!-- CTA -->
  <div class="flex flex-col items-center mt-24">
    <button data-book-meeting
      class="
        w-[225px] h-[67px]           
        bg-[#006E49] hover:bg-[#00a16b]      
        text-white font-montserrat font-bold uppercase tracking-wide
        rounded-[8px] flex items-center justify-center
        transition-colors duration-200
        border-0
        focus:outline-none focus:ring-0 focus:ring-offset-0
        focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0
        active:outline-none active:ring-0 active:ring-offset-0
      ">
      ${t('unisync_cta')}
    </button>
  </div>
  <div class="mt-12">
    <h2 class="font-montserrat font-bold ${unisyncStats1Size}">
      ${t('unisync_stat_title')}
    </h2>
    <h3 class="font-montserrat font-bold ${unisyncStats2Size} mt-2">
      ${statSubtitle}
    </h3>
    <div class="flex justify-center mt-4">
      <img src="/src/assets/marker-icon.webp" class="w-[91px] h-[25px]" alt="" aria-hidden="true" />
    </div>
  </div>
  <!-- estadísticas + edificio  -->
  <div class="grid grid-cols-12 items-center gap-8 mt-16">
    <div class="col-span-6 flex justify-center">
      <img src="/src/assets/building-ai-unisync.webp"
           class="lg:w-[478px] lg:h-[939px] object-contain"
           alt="${t('unisync_building_alt')}" />
    </div>
    <div class="col-span-6 flex flex-col items-center gap-11 text-center">
      ${stat('/src/assets/unisync-graph-icon.svg','unisync_stat1')}
      ${stat('/src/assets/unisync-world.svg','unisync_stat2')}
      ${stat('/src/assets/unisync-corporate.svg','unisync_stat3')}
      ${stat('/src/assets/unisync-up.svg','unisync_stat4')}
    </div>
  </div>
</div>
`
  }

  // Helper cards para evitar repeticiones
  function mobileFeatureCard1() {
    return `
    <div class="relative w-[80%]">
      <div class="absolute inset-0 bg-[#006E49]/40 rounded-tl-[45px] rounded-br-[45px]"></div>
      <div class="relative z-10 px-6 py-8">
        <h4 class="font-montserrat font-bold text-[12px] leading-[15px] uppercase">
          ${t('unisync_ft1_title')}
        </h4>
        <p class="font-montserrat font-medium text-[8px] leading-relaxed mt-2">
          ${t('unisync_ft1_desc')}
        </p>
      </div>
    </div>`
  }
  function mobileFeatureCard2() {
    return `
    <div class="w-[90%] px-6">
      <h4 class="font-montserrat font-bold text-[12px] leading-[15px] uppercase">
        ${t('unisync_ft3_title')}
      </h4>
      <p class="font-montserrat font-medium text-[8px] leading-relaxed mt-2">
        ${t('unisync_ft3_desc')}
      </p>
    </div>`
  }
  function mobileFeatureCard3() {
    return `
    <div class="relative w-[80%]">
      <div class="absolute inset-0 bg-[#006E49]/40 rounded-tl-[45px] rounded-br-[45px]"></div>
      <div class="relative z-10 px-6 py-8">
        <h4 class="font-montserrat font-bold text-[12px] leading-[15px] uppercase">
          ${t('unisync_ft4_title')}
        </h4>
        <p class="font-montserrat font-medium text-[8px] leading-relaxed mt-2">
          ${t('unisync_ft4_desc')}
        </p>
      </div>
    </div>`
  }
  function mobileFeatureCard4() {
    return `
    <div class="w-[90%] px-6">
      <h4 class="font-montserrat font-bold text-[12px] leading-[15px] uppercase">
        ${t('unisync_ft2_title')}
      </h4>
      <p class="font-montserrat font-medium text-[8px] leading-relaxed mt-2">
        ${t('unisync_ft2_desc')}
      </p>
    </div>`
  }

  function desktopFeatureCard1() {
    return `
    <div class="bg-[#006E49]/40 rounded-tl-[45px] p-10 text-left">
      <h4 class="font-montserrat font-bold md:text-[20px] text-[28px] leading-tight">
        ${t('unisync_ft1_title')}
      </h4>
      <p class="font-montserrat font-medium  text-[15px] leading-relaxed mt-4">
        ${t('unisync_ft1_desc')}
      </p>
    </div>`
  }
  function desktopFeatureCard2() {
    return `
    <div class="p-10 text-left">
      <h4 class="font-montserrat font-bold md:text-[20px] text-[28px] leading-tight">
        ${t('unisync_ft3_title')}
      </h4>
      <p class="font-montserrat font-medium text-[15px] leading-relaxed mt-4">
        ${t('unisync_ft3_desc')}
      </p>
    </div>`
  }
  function desktopFeatureCard3() {
    return `
    <div class="p-10 text-left">
      <h4 class="font-montserrat font-bold md:text-[20px] text-[28px] leading-tight">
        ${t('unisync_ft4_title')}
      </h4>
      <p class="font-montserrat font-medium  text-[15px] leading-relaxed mt-4">
        ${t('unisync_ft4_desc')}
      </p>
    </div>`
  }
  function desktopFeatureCard4() {
    return `
    <div class="bg-[#006E49]/40 rounded-br-[45px] p-10 text-left">
      <h4 class="font-montserrat md:text-[20px] font-bold text-[28px] leading-tight">
        ${t('unisync_ft2_title')}
      </h4>
      <p class="font-montserrat font-medium text-[15px] leading-relaxed mt-4">
        ${t('unisync_ft2_desc')}
      </p>
    </div>`
  }

  render()
  onLangChange(render)
  return el
}
