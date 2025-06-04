// ──────────────────────────────────────────
// src/components/Service.ts   (refactorizado, mobile + desktop intacto)
// ──────────────────────────────────────────
import { t, onLangChange } from './i18n'

export function Service() {
  const el = document.createElement('section')
  el.id = 'services'

  // ————————————————————————————————————————
  // Un solo helper para cualquier carrusel (id, gap, delay)
  // ————————————————————————————————————————
  let timers: { [key: string]: number | undefined } = {}

  function initCarousel(params: {
    trackId: string,
    gap: number,
    delay: number,
    visible: number
  }) {
    const { trackId, gap, delay, visible } = params
    if (timers[trackId]) clearInterval(timers[trackId])
    const track = el.querySelector<HTMLDivElement>('#' + trackId)
    if (!track) return

    const SPEED   = 700
    const leftCnt = Math.floor(visible / 2)
    const firstImg = track.querySelector<HTMLImageElement>('img')
    if (!firstImg) return

    const ready = firstImg.complete
      ? Promise.resolve()
      : new Promise<void>(res =>
        firstImg.addEventListener('load', () => res(), { once: true }),
      )

    ready.then(() => {
      const W = firstImg.clientWidth

      // 1️⃣ Gira DOM para que el slide central sea el primero
      for (let i = 0; i < leftCnt; i++) track.appendChild(track.children[0])

      // 2️⃣ Duplica slides: nunca faltará relleno a la derecha
      const need = visible + leftCnt + 2 // margen de seguridad
      const orig = Array.from(track.children)
      let idx = 0
      while (track.children.length < need) {
        track.appendChild(orig[idx++ % orig.length].cloneNode(true))
      }

      // 3️⃣ Offset que centra el primer hijo
      const OFFSET = `calc(50% - ${(W / 2) + (W + gap) * leftCnt}px)`

      track.style.transition = 'none'
      track.style.transform  = `translateX(${OFFSET})`
      track.classList.remove('opacity-0', 'pointer-events-none', 'preload')

      // 4️⃣ Autoplay sin rebote visual
      const slide = () => {
        const first = track.children[0] as HTMLElement
        const STEP  = first.clientWidth + gap

        track.style.transition = `transform ${SPEED}ms cubic-bezier(.4,0,.2,1)`
        track.style.transform  = `translateX(calc(${OFFSET} - ${STEP}px))`

        track.addEventListener(
          'transitionend',
          () => {
            track.style.transition = 'none'
            track.appendChild(first)              // 1.º → final
            track.style.transform = `translateX(${OFFSET})`
          },
          { once: true }
        )
      }

      timers[trackId] = window.setInterval(slide, delay)

      // 5️⃣ Sigue centrado al redimensionar
      window.addEventListener('resize', () => {
        track.style.transition = 'none'
        track.style.transform  = `translateX(${OFFSET})`
      })
    })
  }

  // ————————————————————————————————————————
  // Render (markup intacto)
  // ————————————————————————————————————————
  const btnLabel = t('services_block1_cta');
  const render = () => {
    el.className = 'w-full max-w-[956px] mx-auto px-4 text-white scroll-mt-[160px]'
    el.innerHTML = /* html */`

<!-- ========== MOBILE (≤ 639 px) ========== -->
<div class="block mt-12 sm:hidden">

  <!-- ── Encabezado ─────────────────────────────────────────────── -->
  <h2 class="text-center font-montserrat font-bold text-title leading-none">
    ${t('services_section_title')}
  </h2>
  <div class="flex justify-center mt-3">
    <img src="/src/assets/marker-icon.webp"
         class="w-[65px] h-[18px]"
         loading="lazy"
         alt=""
         aria-hidden="true" />
  </div>

  <!-- ── Bloque 1 : carrusel mini-fotos ─────────────────────────── -->
  <h3 class="mt-8 font-montserrat font-bold text-[12px] text-center uppercase">
    ${t('services_block1_title')}
  </h3>

  <!-- Carrusel -->
  <div class="mt-4 relative overflow-hidden w-full" style="height:233px"
       aria-label="${t('services_block1_carousel_label')}"
       role="list">
    <div id="carouselTrackMobile"
         class="flex gap-4 transition-transform duration-700 ease-out">
      ${[
        'service-photo-one.webp','service-photo-two.webp','service-photo-three.webp',
        'service-photo-four.webp','service-photo-five.webp','service-photo-six.webp',
        'service-photo-seven.webp',
      ].map(src => `
        <img src="/src/assets/${src}"
             class="w-[165px] h-[233px] object-cover rounded-[15px] flex-none"
             loading="lazy"
             decoding="async"
             alt="${t('services_photo_alt')}"
             role="listitem">`).join('')}
    </div>
  </div>

  <!-- Descripción + CTA -->
  <p class="font-montserrat font-medium text-[10px] leading-relaxed text-center mt-4
            max-w-[90%] mx-auto">
    ${t('services_block1_desc')}
  </p>

  <a data-book-meeting
     href="#bookMeeting"
     class="mt-6 mx-auto w-[107px] h-[29px] bg-[#006E49] hover:bg-[#00a16b]
            text-white font-medium text-[7px] uppercase rounded-[6px]
            flex items-center justify-center
            focus:outline-offset-2 focus-visible:ring-2">
    ${t('services_block1_cta')}
  </a>

  <!-- ── Bloque 2 : cuadro izq. ─────────────────────────────────── -->
  <div class="mt-9 flex justify-center">
    <div class="relative w-[236px] h-[200px]">
      <div class="absolute -left-1 top-0 w-[250px] h-[150px] rounded-[20px] z-[1]"
           style="background:linear-gradient(145deg,rgba(0,110,73,.05),rgba(0,212,141,.05));"
           aria-hidden="true"></div>

      <div class="relative z-10 max-w-[185px] mx-auto flex flex-col items-start justify-center mt-7">
        <h3 class="text-center font-montserrat font-bold text-[12px] leading-[15px] uppercase">
          ${t('services_block2_title')}
        </h3>
        <img src="/src/assets/marker-icon.webp"
             class="my-1 mx-auto w-[39px] h-[10px]"
             loading="lazy"
             alt=""
             aria-hidden="true" />
        <p class="text-center font-medium text-[8px] leading-relaxed">
          ${t('services_block2_desc')}
        </p>
      </div>
    </div>
  </div>

  <!-- ── Bloque 3 : cuadro der. ─────────────────────────────────── -->
  <div class="flex justify-center">
    <div class="relative w-[236px] h-[200px]">
      <div class="absolute -right-1 top-0 w-[250px] h-[150px] rounded-[20px] z-[1]"
           style="background:linear-gradient(145deg,rgba(0,110,73,.05),rgba(0,212,141,.05));"
           aria-hidden="true"></div>

      <div class="relative z-10 max-w-[185px] mx-auto flex flex-col items-end justify-center mt-7">
        <h3 class="font-montserrat font-bold text-[12px] leading-[15px] uppercase">
          ${t('services_block3_title')}
        </h3>
        <img src="/src/assets/marker-icon.webp"
             class="my-1 mx-auto w-[39px] h-[10px]"
             loading="lazy"
             alt=""
             aria-hidden="true" />
        <p class="font-montserrat font-medium text-[8px] leading-relaxed">
          ${t('services_block3_desc')}
        </p>
      </div>
    </div>
  </div>

</div>
<!-- ========== TABLET / MD (640–1023 px) ========== -->
<div class="hidden sm:block lg:hidden mt-12">

  <!-- 1) ENCABEZADO ------------------------------------------------------- -->
  <div class="text-center">
    <h2 class="font-montserrat font-bold text-[32px] leading-none">
      ${t('services_section_title')}
    </h2>
    <div class="my-2 flex justify-center">
      <img src="/src/assets/marker-icon.webp"
           class="w-[80px] h-[22px]"
           loading="lazy"
           alt=""
           aria-hidden="true" />
    </div>
  </div>

  <!-- 2) BLOQUE 1 · carrusel mini-fotos ---------------------------------- -->
  <div class="flex flex-col items-center mt-8 w-full">
    <h3 class="font-montserrat font-bold text-[18px] text-center">
      ${t('services_block1_title')}
    </h3>

    <!-- Carrusel -->
    <div class="relative w-full overflow-hidden mt-4" style="height:310px"
         aria-label="${t('services_block1_carousel_label')}"
         role="list">
      <div id="carouselTrackMd"
           class="flex gap-4 transition-transform duration-700 ease-out">
        ${[
          'service-photo-one.webp','service-photo-two.webp','service-photo-three.webp',
          'service-photo-four.webp','service-photo-five.webp','service-photo-six.webp',
          'service-photo-seven.webp',
        ].map(src => `
          <img src="/src/assets/${src}"
               class="w-[220px] h-[310px] object-cover rounded-[20px] flex-none"
               loading="lazy"
               decoding="async"
               alt="${t('services_photo_alt')}"
               role="listitem">`).join('')}
      </div>
    </div>

    <img src="/src/assets/arrow-right-about.svg"
         class="mt-4 w-[15px] h-[15px] rotate-90"
         loading="lazy"
         alt=""
         aria-hidden="true" />

    <p class="font-montserrat font-medium text-[12px] leading-relaxed text-center mt-4
              max-w-[90%] md:max-w-[48%] sm:max-w-[60%]">
      ${t('services_block1_desc')}
    </p>

    <a data-book-meeting
       href="#bookMeeting"
       class="mt-6 w-[180px] h-[40px] bg-[#006E49] hover:bg-[#00a16b]
              text-white font-bold uppercase rounded-[8px] flex items-center
              justify-center text-[10px] focus:outline-offset-2 focus-visible:ring-2"
       aria-label="${t('services_block1_cta')}">
      ${t('services_block1_cta')}
    </a>
  </div>

  <!-- 3) BLOQUES 2 – 3 (50 % tamaño) ------------------------------------- -->
  <div class="mx-auto mt-16 grid
              grid-cols-2 grid-rows-2
              gap-x-6 gap-y-14
              sm:max-w-[640px] max-w-[720px]">

    <!-- ░░ Fila 1 ░░ -->
    <!-- Cuadro A decorativo -->
    <div class="ml-12 sm:ml-0 sm:self-center">
      <div class="w-[280px] h-[220px] bg-[#006E49]/20 rounded-[25px]"
           aria-hidden="true"></div>
    </div>

    <!-- Texto A -->
    <div class="self-center max-w-[300px] text-left">
      <h3 class="sm:text-[20px] font-montserrat font-bold text-[18px] leading-tight">
        ${t('services_block2_title')}
      </h3>
      <div class="my-2 flex justify-center">
        <img src="/src/assets/marker-icon.webp"
             class="w-[70px] h-[18px]"
             loading="lazy"
             alt=""
             aria-hidden="true" />
      </div>
      <p class="font-montserrat font-medium text-[15px] leading-relaxed">
        ${t('services_block2_desc')}
      </p>
    </div>

    <!-- ░░ Fila 2 ░░ -->
    <!-- Texto B -->
    <div class="self-center max-w-[300px] text-left justify-self-end">
      <h3 class="sm:text-[20px] font-montserrat font-bold text-[18px] leading-tight">
        ${t('services_block3_title')}
      </h3>
      <div class="my-2 flex justify-center">
        <img src="/src/assets/marker-icon.webp"
             class="w-[70px] h-[18px]"
             loading="lazy"
             alt=""
             aria-hidden="true" />
      </div>
      <p class="font-montserrat font-medium text-[15px] leading-relaxed">
        ${t('services_block3_desc')}
      </p>
    </div>

    <!-- Cuadro B decorativo -->
    <div>
      <div class="w-[280px] h-[220px] bg-[#006E49]/20 rounded-[25px]"
           aria-hidden="true"></div>
    </div>
  </div>
</div>
<!-- ========== DESKTOP (≥1024 px) ========== -->
<div class="hidden lg:block mt-12">

  <!-- 1) ENCABEZADO ------------------------------------------------------- -->
  <div class="text-center">
    <h2 class="font-montserrat font-bold text-title leading-none">
      ${t('services_section_title')}
    </h2>
    <div class="my-3 flex justify-center">
      <img
        src="/src/assets/marker-icon.webp"
        class="w-[91px] h-[25px]"
        loading="lazy"
        alt=""
        aria-hidden="true" />
    </div>
  </div>

  <!-- 2) BLOQUE 1 · carrusel grande -------------------------------------- -->
  <div class="flex flex-col items-center mt-10 w-full">
    <h3 class="font-montserrat font-bold text-[25px] text-center">
      ${t('services_block1_title')}
    </h3>

    <!-- Carrusel -->
    <div id="carouselWrapper"
         class="h-[420px] relative w-full lg:w-full xl:w-[120%] mx-0
                xl:-mx-[20%] 2xl:-mx-[30%] 4k:h-[540px] 4k:w-[125%]
                overflow-hidden mt-6"
         aria-label="${t('services_block1_carousel_label')}"
         role="list">
      <div id="carouselTrack"
           class="flex gap-7 transition-transform duration-1000 ease-[cubic-bezier(.4,0,.2,1)]">
        ${[
          'service-photo-one.webp','service-photo-two.webp','service-photo-three.webp',
          'service-photo-four.webp','service-photo-five.webp','service-photo-six.webp',
          'service-photo-seven.webp',
        ].map(src => `
          <img src="/src/assets/${src}"
               class="carousel-img object-cover rounded-[45px] opacity-50 flex-none
                      w-[280px] h-[420px] 4k:w-[360px] 4k:h-[540px]"
               loading="lazy"
               decoding="async"
               alt="${t('services_photo_alt')}"
               role="listitem">`).join('')}
      </div>
    </div>

    <img src="/src/assets/arrow-right-about.svg"
         class="mt-4 w-[25px] h-[25px] rotate-90"
         loading="lazy"
         alt=""
         aria-hidden="true" />

    <p class="font-montserrat font-medium text-body leading-relaxed text-center mt-4 max-w-[618px]">
      ${t('services_block1_desc')}
    </p>

    <!-- BOTÓN -->
    <a data-book-meeting
       href="#bookMeeting"
       class="mt-8 w-[225px] h-[67px] bg-[#006E49] hover:bg-[#00a16b]
              text-white font-bold uppercase rounded-[8px] flex items-center
              justify-center transition-colors duration-200
              focus:outline-offset-2 focus-visible:ring-2"
       aria-label="${t('services_block1_cta')}">
      ${btnLabel}
    </a>
  </div>

  <!-- 3) BLOQUES 2 – 3 ---------------------------------------------------- -->
  <div class="mx-auto mt-20 grid grid-rows-2
              grid-cols-[415px_minmax(0,1fr)]
              gap-y-16 gap-x-10 max-w-[900px]">

    <!-- BLOQUE A ---------------------------------------------------------- -->
    <div class="row-start-1 col-start-1 flex justify-center">
      <div class="w-[415px] h-[415px] rounded-[35px] overflow-hidden
                  flex items-center justify-center relative">
        <video src="/src/assets/block_a_service.webm"
               class="w-full h-full object-cover"
               autoplay loop muted playsinline
               aria-label="${t('services_block_a_video_label')}">
        </video>
        <div class="absolute inset-0 bg-black/50 pointer-events-none
                    rounded-[35px]" aria-hidden="true"></div>
      </div>
    </div>

    <div class="row-start-1 col-start-2 flex items-center">
      <div class="w-[415px] min-h-[415px] text-left flex flex-col justify-center">
        <h3 class="font-montserrat font-bold text-[25px] leading-tight">
          ${t('services_block2_title')}
        </h3>
        <div class="my-3 flex justify-center">
          <img src="/src/assets/marker-icon.webp"
               class="w-[91px] h-[25px]"
               loading="lazy"
               alt=""
               aria-hidden="true" />
        </div>
        <p class="font-montserrat font-medium text-[15px] leading-relaxed">
          ${t('services_block2_desc')}
        </p>
      </div>
    </div>

    <!-- BLOQUE B ---------------------------------------------------------- -->
    <div class="row-start-2 col-start-1 flex items-center">
      <div class="w-[415px] min-h-[415px] text-left flex flex-col justify-center">
        <h3 class="font-montserrat font-bold text-[25px] leading-tight">
          ${t('services_block3_title')}
        </h3>
        <div class="my-3 flex justify-center">
          <img src="/src/assets/marker-icon.webp"
               class="w-[91px] h-[25px]"
               loading="lazy"
               alt=""
               aria-hidden="true" />
        </div>
        <p class="font-montserrat font-medium text-[15px] leading-relaxed">
          ${t('services_block3_desc')}
        </p>
      </div>
    </div>

    <div class="row-start-2 col-start-2 flex justify-center">
      <div class="w-[415px] h-[415px] rounded-[35px] overflow-hidden
                  flex items-center justify-center relative">
        <video src="/src/assets/block_b_service.webm"
               class="w-full h-full object-cover"
               autoplay loop muted playsinline
               aria-label="${t('services_block_b_video_label')}">
        </video>
        <div class="absolute inset-0 bg-black/50 pointer-events-none
                    rounded-[35px]" aria-hidden="true"></div>
      </div>
    </div>

  </div>
</div>

`
    // Carruseles según el breakpoint
    initCarousel({ trackId: "carouselTrack", gap: 28, delay: 5000, visible: 5 })      // desktop
    initCarousel({ trackId: "carouselTrackMobile", gap: 16, delay: 5000, visible: 5 }) // mobile
    initCarousel({ trackId: "carouselTrackMd", gap: 16, delay: 5000, visible: 5 })     // tablet/md
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
    modal.classList.remove('hidden')
    requestAnimationFrame(() => {
      overlay.classList.remove('opacity-0')
      panel.classList.remove('opacity-0', 'scale-95', 'pointer-events-none')
    })
  }

  // ✨ cerrar con animación inversa
  const close = () => {
    overlay.classList.add('opacity-0')
    panel.classList.add('opacity-0', 'scale-95', 'pointer-events-none')
    setTimeout(() => modal.classList.add('hidden'), 300)
  }

  triggers.forEach(btn => btn.addEventListener('click', open))
  closeBtn.addEventListener('click', close)
  modal.addEventListener('click', e => { if (e.target === overlay) close() })

  // 🚀 Ajusta la velocidad del video aquí:
  const vid = el.querySelector<HTMLVideoElement>('#mi-video-service')
  if (vid) vid.playbackRate = 0.5 // Cambia a 0.7, 0.8 si quieres menos lento

}, 0)


  return el
}
