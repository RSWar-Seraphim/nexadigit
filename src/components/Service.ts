// src/components/Service.ts
import { t, onLangChange } from './i18n'

export function Service() {
  const el = document.createElement('section')

  el.id = 'services'

  /* ——————————— estado del carrusel ——————————— */
  let carouselTimer: number | undefined // ID del setInterval

  /** Reinicia el carrusel cada vez que se re-renderiza */
  const initCarousel = () => {
  if (carouselTimer) clearInterval(carouselTimer)

  const WIDTH  = 360      // nuevo ancho
  const GAP    = 28
  const DELAY  = 5000
  const startIndex = 3    // 4.ª imagen al centro (3-1-3)

  const track = el.querySelector<HTMLDivElement>('#carouselTrack')
  if (!track) return
  const imgs = Array.from(track.querySelectorAll<HTMLImageElement>('.carousel-img'))
  if (!imgs.length) return

  let index = startIndex

  const centre = (i: number) => {
    const offset = i * (WIDTH + GAP)
    track.style.transform =
      `translateX(calc(50% - ${WIDTH / 2}px - ${offset}px))`
    imgs.forEach((img, k) => (img.style.opacity = k === i ? '1' : '0.5'))
  }

  centre(index)
  carouselTimer = window.setInterval(() => {
    index = (index + 1) % imgs.length   // desliza desde la derecha
    centre(index)
  }, DELAY)
}

  /* ——————————— plantilla ——————————— */
  const render = () => {
    el.className =
      'hidden sm:block w-full max-w-[956px] min-h-[941px] mx-auto mt-24 px-4 text-white'

    el.innerHTML = `
      <!-- 1) ENCABEZADO GENERAL DE SERVICIOS -->
      <div class="text-center">
        <h2 class="font-montserrat font-bold text-[45px] leading-none">
          ${t('services_section_title')}
        </h2>
        <div class="my-3 flex justify-center">
        <img
          src="/src/assets/marker-icon.png"
          class="w-[91px] h-[25px]"
          alt=""
        />
        </div>
      </div>

  <div class="flex flex-col items-center mt-10 w-full">
    <!-- título -->
    <h3 class="font-montserrat font-bold text-[25px] text-center w-full">
      ${t('services_block1_title')}
    </h3>
  
    <!-- wrapper: sobresale a ambos lados -->
    <div id="carouselWrapper"
       class="relative w-[130%] lg:w-[160%] -mx-[15%] lg:-mx-[30%] overflow-hidden mt-6"
       style="height:540px;">        <!-- ↓ 540 px -->
    <div id="carouselTrack"
         class="flex gap-7 transition-transform duration-1000
                ease-[cubic-bezier(.4,0,.2,1)]">
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


  <!-- arrow + descripción + CTA -->
  <img src="/src/assets/arrow-right-about.svg"
       alt="" aria-hidden="true"
       class="mt-4 w-[25px] h-[25px] rotate-90" />
  <p class="font-montserrat font-medium text-[20px] leading-relaxed
            text-center mt-4 max-w-[618px]">
    ${t('services_block1_desc')}
  </p>
  <button class="mt-8 w-[325px] h-[87px] bg-[#006E49] text-white
                 font-bold uppercase rounded-[8px] flex items-center
                 justify-center">
    ${t('services_block1_cta')}
  </button>
</div>


     <div class="mx-auto mt-20 grid grid-rows-2 grid-cols-[450px_minmax(0,1fr)]
            gap-y-16 gap-x-10 max-w-[900px]">

  <!-- Bloque A -->
  <div class="row-start-1 col-start-1 flex justify-center">
  <div class="w-[450px] h-[450px] min-w-[450px] flex-none
              bg-[#006E49]/20 rounded-[55px]"></div>
</div>

  <div class="row-start-1 col-start-2 flex items-center">
    <div class="max-w-[521px] text-left">
      <h3 class="font-montserrat font-bold text-[30px] leading-tight">
        ${t('services_block2_title')}
      </h3>
      <div class="my-3 flex justify-center">
        <img
          src="/src/assets/marker-icon.png"
          class="w-[91px] h-[25px]"
          alt=""
        />
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
      <img
        src="/src/assets/marker-icon.png"
        class="w-[91px] h-[25px]"
        alt=""
      />
    </div>
      <p class="font-montserrat font-medium text-[15px] leading-relaxed">
        ${t('services_block3_desc')}
      </p>
    </div>
  </div>

  <div class="row-start-2 col-start-2 flex justify-center">
  <div class="w-[450px] h-[450px] min-w-[450px] flex-none
              bg-[#006E49]/20 rounded-[55px]"></div>
</div>
`

    /* Después de pintar, activa el carrusel */
    initCarousel()
  }

  /* Primer pintado + reinicio cuando cambie el idioma */
  render()
  onLangChange(render)

  return el
}
