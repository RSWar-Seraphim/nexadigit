import { t, onLangChange } from './i18n'

export function Contact() {
  const contactEl = document.createElement('section')
  contactEl.id = 'contact'

  /* ---------- render ---------- */
  const render = () => {
    /* estilos comunes al <section> */
    contactEl.className =
      'w-full px-4 text-white flex flex-col items-center mt-0 lg:-mt-8 relative'
    contactEl.style.background =
      'linear-gradient(to bottom,rgba(0,111,73,.30) 0%,#000 100%)'
    contactEl.style.width       = '100vw'
    contactEl.style.marginLeft  = 'calc(50% - 50vw)'
    contactEl.style.marginRight = 'calc(50% - 50vw)'

    contactEl.innerHTML = `
<!-- ░░░░░  MOBILE – CONTACT ░░░░░ -->
<div class="sm:hidden w-full flex flex-col items-center">
  <!-- encabezado -->
<h2 class="font-montserrat font-bold text-[24px] text-center mt-12 md:mt-4 lg:mt-14">
  ${t('contact_title')}
</h2>
<p class="font-montserrat font-medium text-[10px] text-center mt-1">
  ${t('contact_subtitle')}
</p>
<img src="/src/assets/marker-icon.png" class="w-[55px] h-[15px] mx-auto mt-3" />

<!-- formulario -->
<!-- formulario – mobile -->
<form id="contact-form" class="w-full max-w-[450px] bg-white rounded shadow-lg mt-8 p-5 flex flex-col gap-3">
  <label class="font-montserrat text-[10px] text-black/70 text-left">
    ${t('form_label_name')}
  </label>
  <input type="firstName" placeholder="John"
         class="border p-2 rounded outline-none bg-white text-[11px] placeholder:text-[11px]" />

  <label class="font-montserrat text-[10px] text-black/70 text-left">
    ${t('form_label_lastname')}
  </label>
  <input type="lastName" placeholder="Doe"
         class="border p-2 rounded outline-none bg-white text-[11px] placeholder:text-[11px]" />

  <label class="font-montserrat text-[10px] text-black/70 text-left">
    ${t('form_label_email')}
  </label>
  <input type="email" placeholder="john@gmail.com"
         class="border p-2 rounded outline-none bg-white text-[11px] placeholder:text-[11px]" />

  <label class="font-montserrat text-[10px] text-black/70 text-left">
    ${t('form_label_message')}
  </label>
  <textarea name="message" rows="4" placeholder="${t('form_label_message')}"
            class="border p-2 rounded outline-none resize-none bg-white text-[11px] placeholder:text-[11px]"></textarea>

  <button type="submit"
          class="bg-[#006E49] hover:bg-[#00cc88] transition-colors text-white font-medium h-[35px] text-[11px] mt-1 rounded">
    ${t('form_submit')}
  </button>
</form>


<!-- manos decorativas -->
<img src="/src/assets/contact-hands.png"
     alt="${t('contact_hands_img_alt')}"
     class="w-[550px] h-auto object-contain mt-16" />

<!-- footer -->

<footer class="w-full mt-16 pb-8 text-[5px] font-montserrat font-semibold text-white">
  <div class="relative max-w-[500px] mx-auto flex items-center justify-between">

    <!-- texto izquierda -->
    <span class="whitespace-nowrap">
      ${t('footer_copy')}
    </span>

    <!-- logo centrado -->
    <img src="/src/assets/fav-icon-logo.svg"
         class="absolute left-1/2 -translate-x-1/2 w-[15px] h-[15px] filter brightness-0 invert"
         alt="NexaDigit" />

    <!-- links derecha -->
    <span class="flex gap-1.5 whitespace-nowrap">
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


</div>

<!-- ░░░░░  DESKTOP ░░░░░ -->
<div class="hidden sm:block w-full flex flex-col items-center">
  <!-- encabezado -->
  <h2 class="font-montserrat font-bold text-[45px] text-center mt-14">
    ${t('contact_title')}
  </h2>
  <p class="font-montserrat font-bold text-[15px] text-center mt-1">
    ${t('contact_subtitle')}
  </p>
  <img src="/src/assets/marker-icon.png" class="w-[91px] h-[25px] mx-auto mt-4" />

  <!-- formulario + mapa -->
<div
  class="mt-10 w-full max-w-[960px] mx-auto
         overflow-hidden rounded-[20px] shadow-lg
         grid grid-cols-1 lg:grid-cols-2 bg-white">

  <!-- ▸ Formulario (col-1) -->
 <!-- ▸ Formulario -->
<form id="contact-form"
      class="p-6 flex flex-col gap-4">

  <!-- Nombre -->
  <label class="font-montserrat text-xs text-black/70 text-left">
    ${t('form_label_name')}
  </label>
  <input type="text"
         placeholder="John"
         class="border p-2 rounded outline-none bg-white
                text-black placeholder:text-black/50"/>

  <!-- Apellido -->
  <label class="font-montserrat text-xs text-black/70 text-left">
    ${t('form_label_lastname')}
  </label>
  <input type="text"
         placeholder="Doe"
         class="border p-2 rounded outline-none bg-white
                text-black placeholder:text-black/50"/>

  <!-- Email -->
  <label class="font-montserrat text-xs text-black/70 text-left">
    ${t('form_label_email')}
  </label>
  <input type="email"
         placeholder="john@gmail.com"
         class="border p-2 rounded outline-none bg-white
                text-black placeholder:text-black/50"/>

  <!-- Mensaje -->
  <label class="font-montserrat text-xs text-black/70 text-left">
    ${t('form_label_message')}
  </label>
  <textarea rows="4"
            placeholder="${t('form_label_message')}"
            class="border p-2 rounded outline-none resize-none bg-white
                   text-black placeholder:text-black/50"></textarea>

  <!-- Botón -->
  <button
    class="h-[45px] mt-2 rounded
           bg-[#006E49] hover:bg-[#00a16b] transition-colors
           text-white font-bold">
    ${t('form_submit')}
  </button>
</form>


  <!-- ▸ Mapa (col-2, sólo desktop) -->
  <div class="hidden lg:block h-[504px]">
    <div id="leaflet-map"
         class="w-full h-full pointer-events-none rounded-r-[20px]"></div>
  </div>
</div>


  <!-- manos decorativas -->
  <div class="w-full flex justify-center mt-20">
    <img src="/src/assets/contact-hands.png"
         alt="${t('contact_hands_img_alt')}"
         class="w-[795px] h-[611px] object-contain" />
  </div>

  <!-- footer -->
  <footer class="hidden sm:block w-full mt-20 pt-10 pb-6 text-[12px] sm:text-[7px] lg:text-[12px] md:text-[9px] font-montserrat font-semibold">
  <div class="max-w-[960px] mx-auto grid grid-cols-3 items-center">
    <!-- © texto -->
    <span class="justify-self-start">
      ${t('footer_copy')}
    </span>

    <!-- logo -->
    <img src="/src/assets/fav-icon-logo.svg"
         class="justify-self-center w-[26px] h-[26px] filter brightness-0 invert" alt="NexaDigit" />

    <!-- links -->
    <span class="justify-self-end flex gap-6">
      <a href="#" class=" text-white" target="_blank" rel="noopener noreferrer">
        ${t('footer_privacy')}
      </a>
      <a href="#" class=" text-white" target="_blank" rel="noopener noreferrer">
        ${t('footer_terms')}
      </a>
      <a href="#" class="text-white" target="_blank" rel="noopener noreferrer">
        ${t('footer_cookie')}
      </a>
    </span>
  </div>
</footer>
</div>
`
    /* cargar Leaflet solo una vez */
    loadLeaflet()
  }

  /* ---------- Leaflet ---------- */
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
      script.src  = 'https://unpkg.com/leaflet/dist/leaflet.js'
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

    const L   = (window as any).L
    const lat = 18.45305350020532
    const lng = -69.93497852241077
    const map = L.map(mapContainer, { zoomControl:false, attributionControl:false })
                .setView([lat,lng],18)

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      { maxZoom:19, attribution:'' }).addTo(map)

    const pinSvg = '<svg viewBox="0 0 24 24" width="40" height="40" fill="#006E49" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>'
    const pinIcon = L.divIcon({ className:'', html:pinSvg, iconSize:[40,40], iconAnchor:[20,40] })
    L.marker([lat,lng], { icon:pinIcon, interactive:false }).addTo(map)
  }

  /* inicializar */
  render()
  onLangChange(render)      // re‑render on language change
  loadLeaflet()             // cargar librería

  return contactEl
}
