import { t, onLangChange } from './i18n'
import { notify } from './notify'


export function Contact() {
  const contactEl = document.createElement('section')
  contactEl.id = 'contact'

  /* ───────── helpers de marcado ───────── */
  const renderMobile = () => `
<div class="sm:hidden w-full flex flex-col items-center">
  <h2 class="font-montserrat font-bold text-[24px] text-center mt-12 md:mt-4 lg:mt-14">${t('contact_title')}</h2>
  <p  class="font-montserrat font-medium text-[10px] text-center mt-1">${t('contact_subtitle')}</p>
  <img src="/src/assets/marker-icon.webp" class="w-[55px] h-[15px] mx-auto mt-3"/>

  <!-- FORM MOBILE -->
  <form id="contact-form-mobile"
        class="w-full max-w-[450px] bg-white rounded shadow-lg mt-8 p-5 flex flex-col gap-3">
    <label class="font-montserrat text-[10px] text-black/70 text-left">${t('form_label_name')}</label>
    <input name="first_name"  type="text" placeholder="John" class="text-black border p-2 rounded outline-none bg-white text-[11px]"/>

    <label class="font-montserrat text-[10px] text-black/70 text-left">${t('form_label_lastname')}</label>
    <input name="last_name"   type="text" placeholder="Doe"  class="text-black border p-2 rounded outline-none bg-white text-[11px]"/>

    <label class="font-montserrat text-[10px] text-black/70 text-left">${t('form_label_email')}</label>
    <input name="email"       type="email" placeholder="john@gmail.com" class="text-black border p-2 rounded outline-none bg-white text-[11px]"/>

    <label class="font-montserrat text-[10px] text-black/70 text-left">${t('form_label_message')}</label>
    <textarea name="message"  rows="4" placeholder="${t('form_label_message')}"
              class="border p-2 rounded outline-none resize-none bg-white text-[11px] text-black"></textarea>

     <button
        type="submit"
        class="
          h-[35px]
          bg-[#006E49] hover:bg-[#00a16b]
          text-[11px]
          text-white font-montserrat font-bold  tracking-wide
          rounded-[8px] flex items-center justify-center
          transition-colors duration-200
          border-0
          focus:outline-none focus:ring-0 focus:ring-offset-0
          focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0
          active:outline-none active:ring-0 active:ring-offset-0
          mt-2
        ">
         ${t('form_submit')}
      </button>
  </form>

  <img src="/src/assets/contact-hands.webp" alt="${t('contact_hands_img_alt')}"
       class="w-[550px] h-auto object-contain mt-16"/>

  ${renderFooterMobile()}
</div>`

  const renderFooterMobile = () => `
<footer class="w-full mt-16 pb-8 text-[5px] font-montserrat font-semibold text-white">
  <div class="relative max-w-[500px] mx-auto flex items-center justify-between">
    <span>${t('footer_copy')}</span>
    <img data-link="home" src="/src/assets/fav-icon-logo.svg"
         class="cursor-pointer absolute left-1/2 -translate-x-1/2 w-[15px] h-[15px] filter brightness-0 invert" alt="NexaDigit"/>
    <span class="flex gap-1.5">
      <a href="#" class="text-white hover:underline" data-legal="privacy">${t('footer_privacy')}</a>
      <a href="#" class="text-white hover:underline">${t('footer_terms')}</a>
      <a href="#" class="text-white hover:underline">${t('footer_cookie')}</a>
    </span>


  </div>
</footer>`

  const renderDesktop = () => `
<div class="hidden sm:block w-full flex-col items-center">
  <h2 class="font-montserrat font-bold text-[45px] text-center mt-14">${t('contact_title')}</h2>
  <p  class="font-montserrat font-bold text-[15px] text-center mt-1">${t('contact_subtitle')}</p>
  <img src="/src/assets/marker-icon.webp" class="w-[91px] h-[25px] mx-auto mt-4"/>

  <div class="mt-10 w-full max-w-[960px] mx-auto overflow-hidden rounded-[20px] shadow-lg
              grid grid-cols-1 lg:grid-cols-2 bg-white">
    <!-- FORM DESKTOP -->
    <form id="contact-form-desktop" class="p-6 flex flex-col gap-4">
      <label class="font-montserrat text-[12px] text-black/90 text-left ">${t('form_label_name')}</label>
      <input name="first_name" type="text" placeholder="John" class="border p-2 rounded outline-none bg-white text-black"/>

      <label class="font-montserrat text-[12px] text-black/90 text-left">${t('form_label_lastname')}</label>
      <input name="last_name"  type="text" placeholder="Doe" class="border p-2 rounded outline-none bg-white text-black"/>

      <label class="font-montserrat text-[12px] text-black/90 text-left">${t('form_label_email')}</label>
      <input name="email"      type="email" placeholder="john@gmail.com" class="border p-2 rounded outline-none bg-white text-black"/>

      <label class="font-montserrat text-[12px] text-black/90 text-left">${t('form_label_message')}</label>
      <textarea name="message" rows="4" placeholder="${t('form_label_message')}"
                class="border p-2 rounded outline-none resize-none bg-white text-black"></textarea>

      <button
        type="submit"
        class="
          h-[45px]
          bg-[#006E49] hover:bg-[#00a16b]
          text-white font-montserrat font-bold  tracking-wide
          rounded-[8px] flex items-center justify-center
          transition-colors duration-200
          border-0
          focus:outline-none focus:ring-0 focus:ring-offset-0
          focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0
          active:outline-none active:ring-0 active:ring-offset-0
          mt-2
        ">
         ${t('form_submit')}
      </button>

    </form>

    <div class="hidden lg:block h-[540px]">
      <div id="leaflet-map" class="w-full h-full pointer-events-none rounded-r-[20px]"></div>
    </div>
  </div>

  <div class="w-full flex justify-center mt-20">
    <img src="/src/assets/contact-hands.webp" alt="${t('contact_hands_img_alt')}"
         class="w-[795px] h-[611px] object-contain"/>
  </div>

  ${renderFooterDesktop()}
</div>`

  const renderFooterDesktop = () => `
<footer class="hidden sm:block w-full mt-20 pt-10 pb-6 text-[12px] font-montserrat font-semibold">
  <div class="max-w-[960px] mx-auto grid grid-cols-3 items-center">
    <span>${t('footer_copy')}</span>
    <img data-link="home" src="/src/assets/fav-icon-logo.svg" class="cursor-pointer justify-self-center w-[26px] h-[26px] filter brightness-0 invert"
         alt="NexaDigit"/>
    <span class="justify-self-end flex gap-6">
      <a data-legal="privacy" class="cursor-pointer">${t('footer_privacy')}</a>
      <a data-legal="terms" class="cursor-pointer">${t('footer_terms')}</a>
      <a data-legal="cookie" class="cursor-pointer">${t('footer_cookie')}</a>
    </span>
  </div>
</footer>`

  /* ───────── Leaflet helpers ───────── */
  function loadLeaflet() {
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

  function initMap() {
    const mapContainer = contactEl.querySelector('#leaflet-map') as HTMLElement | null
    if (!mapContainer || mapContainer.dataset.initialized) return
    mapContainer.dataset.initialized = '1'

    const L   = (window as any).L
    const lat = 18.45305350020532
    const lng = -69.93497852241077
    const map = L.map(mapContainer, { zoomControl: false, attributionControl: false })
                .setView([lat, lng], 18)

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.webp',
      { maxZoom: 19 }).addTo(map)

    const pinSvg  = '<svg viewBox="0 0 24 24" width="40" height="40" fill="#006E49" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>'
    const pinIcon = L.divIcon({ className: '', html: pinSvg, iconSize: [40, 40], iconAnchor: [20, 40] })
    L.marker([lat, lng], { icon: pinIcon, interactive: false }).addTo(map)
  }

  /* ───────── Envío del formulario ───────── */
  function attachFormHandlers() {
  const forms = contactEl.querySelectorAll<HTMLFormElement>('#contact-form-mobile, #contact-form-desktop')
  forms.forEach(form => {
    form.addEventListener('submit', async (ev) => {
      ev.preventDefault()
      const fd = new FormData(form)

      const payload = {
        firstName:  fd.get('first_name'),
        lastName:   fd.get('last_name'),
        email:      fd.get('email'),
        message:    fd.get('message')
      }

      try {
        const res = await fetch('/api/mailerlite', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })

        if (res.ok) {
          notify(t('notify_contact_success'), 'success')
          form.reset()
        } else {
          const err = await res.json()
          notify(t('notify_contact_error') + ' ' + (err.error || ''), 'error')
        }
      } catch (err) {
        notify(t('notify_contact_network_error'), 'error')
      }
    })
  })
}


  /* ───────── Render principal ───────── */
  function render() {
    contactEl.className =
      'w-full px-4 text-white flex flex-col items-center mt-0 lg:-mt-8 relative'
    contactEl.style.background = 'linear-gradient(to bottom,rgba(0,111,73,.30) 0%,#000 100%)'
    contactEl.style.width       = '100vw'
    contactEl.style.marginLeft  = 'calc(50% - 50vw)'
    contactEl.style.marginRight = 'calc(50% - 50vw)'

    contactEl.innerHTML = renderMobile() + renderDesktop()
    attachFormHandlers()
    loadLeaflet()
  }

  render()
  onLangChange(render)

  return contactEl
}
