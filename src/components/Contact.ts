import { t, onLangChange } from './i18n'

export function Contact() {
  const contactEl = document.createElement('section')

  contactEl.id = 'contact'

  /* ---------- render ---------- */
  const render = () => {
    contactEl.className =
      'hidden sm:block w-full px-4 text-white flex flex-col items-center -mt-8 relative'

    contactEl.style.background =
        'linear-gradient(to bottom, rgba(0,111,73,0.30) 0%, #000000 100%)'

    contactEl.style.width        = '100vw'
    contactEl.style.marginLeft   = 'calc(50% - 50vw)'
    contactEl.style.marginRight  = 'calc(50% - 50vw)'
    contactEl.innerHTML = `
      <!-- Encabezado -->
      <h2 class="font-montserrat font-bold text-[45px] text-center mt-14">
        ${t('contact_title')}
      </h2>
      <p class="font-montserrat font-bold text-[15px] text-center mt-1">
        ${t('contact_subtitle')}
      </p>
      <img src="/src/assets/marker-icon.png" class="w-[91px] h-[25px] mx-auto mt-4"/>

      <!-- Formulario + Mapa -->
      <div class="grid grid-cols-12 gap-0 mt-10 pt-16 w-full max-w-[960px] mx-auto">
        <!-- Formulario -->
        <form class="col-span-6 bg-white p-6 flex flex-col gap-3 rounded-l-lg shadow-lg relative z-30 -mr-px">
          <label class="font-montserrat text-xs text-black/70 text-left">
            ${t('form_label_name')}
          </label>
          <input class="border p-2 rounded outline-none bg-white" type="text" placeholder="John" />

          <label class="font-montserrat text-xs text-black/70 text-left">
            ${t('form_label_lastname')}
          </label>
          <input class="border p-2 rounded outline-none bg-white" type="text" placeholder="Doe" />

          <label class="font-montserrat text-xs text-black/70 text-left">
            ${t('form_label_email')}
          </label>
          <input class="border p-2 rounded outline-none bg-white" type="email" placeholder="john@gmail.com" />

          <label class="font-montserrat text-xs text-black/70 text-left">
            ${t('form_label_message')}
          </label>
          <textarea class="border p-2 rounded outline-none resize-none bg-white" rows="4" placeholder="${t('form_label_message')}"></textarea>

          <button type="submit"
                  class="bg-[#006E49] hover:bg-[#00cc88] transition-colors text-white font-bold h-[45px] mt-2 rounded">
            ${t('form_submit')}
          </button>
        </form>

        <!-- Mapa (Leaflet) -->
        <div class="col-span-6 relative rounded-r-lg overflow-hidden -ml-px z-10">
          <div id="leaflet-map" class="w-full h-[504px] rounded overflow-hidden"></div>
        </div>
      </div>

      <!-- Manos decorativas -->
      <div class="w-full flex justify-center mt-20">
        <img src="/src/assets/contact-hands.png" alt="${t('contact_hands_img_alt')}" class="w-[795px] h-[611px] object-contain"/>
      </div>

      <!-- Footer -->
      <footer class="relative w-full mt-20 pt-10 pb-6 text-[12px] font-montserrat font-semibold">
        <img src="/src/assets/arrow-right-about.svg"
             class="w-5 h-5 rotate-90 absolute left-1/2 -translate-x-1/2 -top-3"/>

        <div class="max-w-[960px] mx-auto grid grid-cols-3 items-center">
          <span class="justify-self-start text-left">
            ${t('footer_copy')}
          </span>

          <h3 class="justify-self-center font-petrov-sans font-bold text-[25px]">
            NexaDigit
          </h3>

          <span class="justify-self-end flex gap-6">
            <a href="#" class="text-white hover:underline" target="_blank" rel="noopener noreferrer">
     ${t('footer_privacy')}
    </a>
    <a href="#" class="text-white hover:underline" target="_blank" rel="noopener noreferrer">
    ${t('footer_terms')}
    </a>
    <a href="#" class="text-white hover:underline" target="_blank" rel="noopener noreferrer">
      ${t('footer_cookie')}
    </a>
          </span>
        </div>
      </footer>
    `
    loadLeaflet()      //   nueva línea
  }

  /* ---------- Leaflet ---------- (sin cambios en lógica) */
  const loadLeaflet = () => {
    const head = document.head
    if (!document.querySelector("link[href*='leaflet.css']")) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet/dist/leaflet.css'
      head.appendChild(link)
    }
    if (!(window as any).L) {
      const script = document.createElement('script')
      script.src = 'https://unpkg.com/leaflet/dist/leaflet.js'
      script.onload = initMap
      head.appendChild(script)
    } else {
      initMap()
    }
  }

  const initMap = () => {
    const mapContainer = contactEl.querySelector('#leaflet-map') as HTMLElement
    if (!mapContainer || mapContainer.dataset.initialized) return
    mapContainer.dataset.initialized = '1'

    const L = (window as any).L
    const lat = 18.45305350020532
    const lng = -69.93497852241077
    const map = L.map(mapContainer, { zoomControl: false, attributionControl: false })
      .setView([lat, lng], 18)

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      { maxZoom: 19, attribution: '' }).addTo(map)

    const pinSvg = '<svg viewBox="0 0 24 24" width="40" height="40" fill="#006E49" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>'
    const pinIcon = L.divIcon({ className: '', html: pinSvg, iconSize: [40, 40], iconAnchor: [20, 40] })
    L.marker([lat, lng], { icon: pinIcon, interactive: false }).addTo(map)
  }

  /* inicializar */
  render()
  onLangChange(render)
  loadLeaflet()

  return contactEl
}
