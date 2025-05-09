// ──────────────────────────────────────────
// src/components/Service.ts   (mobile + desktop intacto)
// ──────────────────────────────────────────
import { t, onLangChange } from './i18n'
export function Service() {
const el = document.createElement('section')
el.id = 'services'
/* ─────────────── Carrusel DESKTOP ─────────────── */
let desktopTimer: number | undefined
const initCarouselDesktop = () => {
if (desktopTimer) clearInterval(desktopTimer)
const WIDTH = 360, GAP = 28, DELAY = 5000, start = 3
const track = el.querySelector
<HTMLDivElement>
('#carouselTrack')
if (!track) return
const imgs = [...track.querySelectorAll
<HTMLImageElement>
('.carousel-img')]
let i = start
const centre = (k: number) => {
track.style.transform =
`translateX(calc(50% - ${WIDTH / 2}px - ${k * (WIDTH + GAP)}px))`
imgs.forEach((img, idx) => (img.style.opacity = idx === k ? '1' : '0.5'))
}
centre(i)
desktopTimer = window.setInterval(() => {
i = (i + 1) % imgs.length
centre(i)
}, DELAY)
}
/* ─────────────── Carrusel MOBILE ─────────────── */
let mobileTimer: number | undefined
const initCarouselMobile = () => {
if (mobileTimer) clearInterval(mobileTimer)
const WIDTH = 165, GAP = 16, DELAY = 5000
const track = el.querySelector
<HTMLDivElement>
('#carouselTrackMobile')
if (!track) return
const imgs = track.querySelectorAll('img')
let i = 0
const slide = (k: number) =>
(track.style.transform = `translateX(calc(50% - ${WIDTH / 2}px - ${k * (WIDTH + GAP)}px))`)
slide(i)
mobileTimer = window.setInterval(() => {
i = (i + 1) % imgs.length
slide(i)
}, DELAY)
}

 /* ─────────────── Carrusel TABLET (MD) ─────────────── */
  let mdTimer: number | undefined
  const initCarouselMd = () => {
    if (mdTimer) clearInterval(mdTimer)

    // usa los mismos tamaños que el markup de tablet
    const WIDTH  = 220          // ancho de la mini‑foto
    const GAP    = 16           // gap‑4 → 16 px
    const DELAY  = 5000         // igual que mobile/desktop
    const track  = el.querySelector<HTMLDivElement>('#carouselTrackMd')
    if (!track) return

    const imgs = [...track.querySelectorAll<HTMLImageElement>('img')]
    let i = 0

    const slide = (k: number) => {
      track.style.transform =
        `translateX(calc(50% - ${WIDTH / 2}px - ${k * (WIDTH + GAP)}px))`
    }

    slide(i)                                        // centra la 1.ª imagen
    mdTimer = window.setInterval(() => {            // arranca autoplay
      i = (i + 1) % imgs.length
      slide(i)
    }, DELAY)
  }
/* ───────────────────────── render ───────────────────────── */
const render = () => {
el.className = 'w-full max-w-[956px] mx-auto px-4 text-white scroll-mt-[160px]'
el.innerHTML = /* html */`
<!-- ========== MOBILE (≤639 px) ========== -->
<div class="block mt-12 sm:hidden">
   <!-- Encabezado -->
   <h2 class="text-center font-montserrat font-bold text-[24px] leading-none">
      ${t('services_section_title')}
   </h2>
   <div class="flex justify-center mt-3">
      <img src="/src/assets/marker-icon.png" class="w-[65px] h-[18px]" alt="" />
   </div>
   <!-- Bloque 1 -->
   <h3 class="mt-8 font-montserrat font-bold text-[12px] text-center uppercase">
      ${t('services_block1_title')}
   </h3>
   <!-- Carrusel mini -->
   <div class="mt-4 relative overflow-hidden w-full" style="height:233px">
      <div id="carouselTrackMobile"
         class="flex gap-4 transition-transform duration-700 ease-out">
         ${[
         'service-photo-one.png','service-photo-two.png','service-photo-three.png',
         'service-photo-four.png','service-photo-five.png','service-photo-six.png',
         'service-photo-seven.png',
         ].map(src=>`
         <img src="/src/assets/${src}"
            class="w-[165px] h-[233px] object-cover rounded-[15px] flex-none"
            alt="AI service">`).join('')}
      </div>

   </div>

   <p class="mt-6 font-montserrat font-medium text-[9px] leading-relaxed text-center px-2">
      ${t('services_block1_desc')}
   </p>
   <button data-book-meeting class="mt-6 mx-auto w-[107px] h-[29px] bg-[#006E49] text-white
      font-medium text-[7px] uppercase rounded-[6px] flex items-center
      justify-center">
   ${t('services_block1_cta')}
   </button>
   <!-- 🔹 BLOQUE 2 – cuadro izq., texto centrado en card 🔹 -->
   <div class="mt-9 flex justify-center">
      <div class="relative w-[236px] h-[200px]">
         <!-- tarjeta fija -->
         <!-- cuadro decorativo -->
         <div class="absolute -left-1 top-0 w-[250px] h-[150px] rounded-[20px] z-[1]"
            style="background:linear-gradient(145deg,rgba(0,110,73,.05),rgba(0,212,141,.05));">
         </div>
         <!-- contenido limitado y centrado -->
         <div class="relative z-10 max-w-[185px] mx-auto flex flex-col items-start justify-center mt-7">
            <h3 class="text-center font-montserrat font-bold text-[12px] leading-[15px] uppercase">
               ${t('services_block2_title')}
            </h3>
            <img src="/src/assets/marker-icon.png"
               class="my-1 mx-auto w-[39px] h-[10px]"
               alt="" />
            <p class="text-center font-medium text-[8px] leading-relaxed">
               ${t('services_block2_desc')}
            </p>
         </div>
      </div>
   </div>
   <!-- 🔹 BLOQUE 3 – cuadro der., texto centrado en card 🔹 -->
   <div class=" flex justify-center">
      <div class="relative w-[236px] h-[200px]">
         <!-- cuadro decorativo -->
         <div class="absolute -right-1 top-0 w-[250px] h-[150px] rounded-[20px] z-[1]"
            style="background:linear-gradient(145deg,rgba(0,110,73,.05),rgba(0,212,141,.05));">
         </div>
         <!-- contenido limitado y centrado -->
         <div class="relative z-10 max-w-[185px] mx-auto flex flex-col items-end justify-center mt-7">
            <h3 class="font-montserrat font-bold text-[12px] leading-[15px] uppercase">
               ${t('services_block3_title')}
            </h3>
            <img src="/src/assets/marker-icon.png"
               class="my-1 mx-auto w-[39px] h-[10px]"
               alt="" />
            <p class="font-montserrat font-medium text-[8px] leading-relaxed">
               ${t('services_block3_desc')}
            </p>
         </div>
      </div>
   </div>
</div>
<!-- ========== TABLET / MD (640–1023 px) ========== -->
<div class="hidden sm:block lg:hidden mt-12">
   <!-- 1) ENCABEZADO -->
   <div class="text-center">
      <h2 class="font-montserrat font-bold text-[32px] leading-none">
         ${t('services_section_title')}
      </h2>
      <div class="my-2 flex justify-center">
         <img src="/src/assets/marker-icon.png" class="w-[80px] h-[22px]" alt="" />
      </div>
   </div>
   <!-- 2) BLOQUE 1 – carrusel (usa mini‑fotos) -->
   <div class="flex flex-col items-center mt-8 w-full">
      <h3 class="font-montserrat font-bold text-[18px] text-center">
         ${t('services_block1_title')}
      </h3>
      <div class="relative w-full overflow-hidden mt-4" style="height:310px">
         <div id="carouselTrackMd"
            class="flex gap-4 transition-transform duration-700 ease-out">
            ${[
            'service-photo-one.png','service-photo-two.png','service-photo-three.png',
            'service-photo-four.png','service-photo-five.png','service-photo-six.png',
            'service-photo-seven.png',
            ].map(src=>`
            <img src="/src/assets/${src}"
               class="w-[220px] h-[310px] object-cover rounded-[20px] flex-none"
               alt="AI service">`).join('')}
         </div>
      </div>
            <img src="/src/assets/arrow-right-about.svg" class="mt-4 w-[15px] h-[15px] rotate-90" alt="" aria-hidden="true" />

      <p class="font-montserrat font-medium text-[12px] leading-relaxed text-center mt-4 max-w-[90%] md:max-w-[48%] sm:max-w-[60%]">
         ${t('services_block1_desc')}
      </p>
      <button data-book-meeting class="mt-6 w-[180px] h-[40px] bg-[#006E49] text-white font-bold uppercase rounded-[8px] flex items-center justify-center text-[10px]">
      ${t('services_block1_cta')}
      </button>
   </div>
   <!-- 3) BLOQUES 2‑3 (cuadros 50 % tamaño) -->
<!-- 3) BLOQUES 2‑3 (tablet) -->
<div
  class="mx-auto mt-16 grid
         grid-cols-2 grid-rows-2         <!-- 2×2 -->
         gap-x-6 gap-y-14                <!-- 24 px horiz / 56 px vert -->
         sm:max-w-[640px]
         max-w-[720px]">                 <!-- un poco más ancho -->

  <!-- ░░ Fila 1 ░░ -->
  <!-- Cuadro A -->
  <div class="ml-12 sm:ml-0 sm:self-center">         <!-- lo acerca al texto -->
    <div class="w-[280px] h-[220px] bg-[#006E49]/20 rounded-[25px]"></div>
  </div>

  <!-- Texto A -->
  <div class="self-center max-w-[300px] text-left">
    <h3 class="sm:text-[20px] font-montserrat font-bold text-[18px] leading-tight">
      ${t('services_block2_title')}
    </h3>
    <div class="my-2 flex justify-center">
      <img src="/src/assets/marker-icon.png" class="w-[70px] h-[18px]" alt="" />
    </div>
    <p class="font-montserrat font-medium text-[13px] leading-relaxed">
      ${t('services_block2_desc')}
    </p>
  </div>

  <!-- ░░ Fila 2 ░░ -->
  <!-- Texto B -->
  <div class="self-center max-w-[300px] text-left justify-self-end">
    <h3 class="sm:text-[20px] font-montserrat font-bold text-[18px] leading-tight">
      ${t('services_block3_title')}
    </h3>
    <div class="my-2 flex justify-center">
      <img src="/src/assets/marker-icon.png" class="w-[70px] h-[18px]" alt="" />
    </div>
    <p class="font-montserrat font-medium text-[13px] leading-relaxed">
      ${t('services_block3_desc')}
    </p>
  </div>

  <!-- Cuadro B -->
  <div>
    <div class="w-[280px] h-[220px] bg-[#006E49]/20 rounded-[25px]"></div>
  </div>
</div>
</div>
<!-- ========== DESKTOP (original) ========== -->
<div class="hidden lg:block mt-12">
   <!-- 1) ENCABEZADO -->
   <div class="text-center">
      <h2 class="font-montserrat font-bold text-[45px] leading-none">
         ${t('services_section_title')}
      </h2>
      <div class="my-3 flex justify-center">
         <img src="/src/assets/marker-icon.png" class="w-[91px] h-[25px]" alt="" />
      </div>
   </div>
   <!-- 2) BLOQUE 1 con carrusel grande -->
   <div class="flex flex-col items-center mt-10 w-full">
      <h3 class="font-montserrat font-bold text-[25px] text-center">
         ${t('services_block1_title')}
      </h3>
      <div id="carouselWrapper"
         class="relative
            w-full               lg:w-full
            xl:w-[140%]           2xl:w-[160%]
            mx-0                 xl:-mx-[20%] 2xl:-mx-[30%]
            overflow-hidden mt-6"
         style="height:540px;">
         <div id="carouselTrack"
            class="flex gap-7 transition-transform duration-1000 ease-[cubic-bezier(.4,0,.2,1)]">
            ${[
            'service-photo-one.png',
            'service-photo-two.png',
            'service-photo-three.png',
            'service-photo-four.png',
            'service-photo-five.png',
            'service-photo-six.png',
            'service-photo-seven.png',
            ]
            .map(
            (src) =>
            `<img src="/src/assets/${src}"
               width="360" height="540"
               class="carousel-img object-cover rounded-[55px] opacity-50"
               alt="AI service photo">`,
            )
            .join('')}
         </div>
      </div>
      <img src="/src/assets/arrow-right-about.svg" class="mt-4 w-[25px] h-[25px] rotate-90" alt="" aria-hidden="true" />
      <p class="font-montserrat font-medium text-[20px] leading-relaxed text-center mt-4 max-w-[618px]">
         ${t('services_block1_desc')}
      </p>
      <!-- BOTÓN: Book a Meeting -->
<button data-book-meeting
  class="mt-8 w-[325px] h-[87px] bg-[#006E49] text-white font-bold uppercase rounded-[8px] flex items-center justify-center hover:bg-[#00573a] transition">
  ${t('services_block1_cta')}
</button>


   </div>
   <!-- 3) BLOQUES 2-3 -->
   <div class="mx-auto mt-20 grid grid-rows-2 grid-cols-[450px_minmax(0,1fr)] gap-y-16 gap-x-10 max-w-[900px]">
      <!-- Bloque A -->
      <div class="row-start-1 col-start-1 flex justify-center">
         <div class="w-[450px] h-[450px] bg-[#006E49]/20 rounded-[55px]"></div>
      </div>
      <div class="row-start-1 col-start-2 flex items-center">
         <div class="max-w-[521px] text-left">
            <h3 class="font-montserrat font-bold text-[30px] leading-tight">
               ${t('services_block2_title')}
            </h3>
            <div class="my-3 flex justify-center">
               <img src="/src/assets/marker-icon.png" class="w-[91px] h-[25px]" alt="" />
            </div>
            <p class="font-montserrat font-medium text-[15px] leading-relaxed">
               ${t('services_block2_desc')}
            </p>
         </div>
      </div>
      <!-- Bloque B -->
      <div class="row-start-2 col-start-1 flex items-center">
         <div class="max-w-[521px] text-left">
            <h3 class="font-montserrat font-bold text-[30px] leading-tight">
               ${t('services_block3_title')}
            </h3>
            <div class="my-3 flex justify-center">
               <img src="/src/assets/marker-icon.png" class="w-[91px] h-[25px]" alt="" />
            </div>
            <p class="font-montserrat font-medium text-[15px] leading-relaxed">
               ${t('services_block3_desc')}
            </p>
         </div>
      </div>
      <div class="row-start-2 col-start-2 flex justify-center">
         <div class="w-[450px] h-[450px] bg-[#006E49]/20 rounded-[55px]"></div>
      </div>
   </div>
</div>
`
    

initCarouselDesktop()
initCarouselMobile()
  initCarouselMd()
}
render()
onLangChange(render)

    setTimeout(() => {
  const modal    = document.getElementById('bookMeetingModal')!
  const overlay  = document.getElementById('bmOverlay')!
  const panel    = document.getElementById('bmPanel')!
  const closeBtn = document.getElementById('closeBookMeetingModal')!
  const triggers = el.querySelectorAll<HTMLButtonElement>('[data-book-meeting]')

  // ✨ abrir con animación
  const open = () => {
    modal.classList.remove('hidden')        // muestra contenedor (flex)

    // Espera 1 frame → se ve estado cerrado (opacity-0)
    requestAnimationFrame(() => {
      overlay.classList.remove('opacity-0')
      panel.classList.remove('opacity-0', 'scale-95', 'pointer-events-none')
    })
  }

  // ✨ cerrar con animación inversa
  const close = () => {
    overlay.classList.add('opacity-0')
    panel.classList.add('opacity-0', 'scale-95', 'pointer-events-none')
    setTimeout(() => modal.classList.add('hidden'), 300)  // ⌛ igual que duration-300
  }

  triggers.forEach(btn => btn.addEventListener('click', open))
  closeBtn.addEventListener('click', close)
  modal.addEventListener('click', e => { if (e.target === overlay) close() })
}, 0)




return el
}