// ──────────────────────────────────────────
// src/components/Contact.ts  (con scroll-reveal)
// ──────────────────────────────────────────
import { t, onLangChange } from './i18n'
import { notify } from './notify'
import { FooterMobile, FooterDesktop } from './Footer'
/* ╭─────────────────────────────────────────╮
   │ 1. UTILIDAD: efecto scroll-reveal sutil │
   ╰─────────────────────────────────────────╯ */
function attachScrollReveal(root: HTMLElement) {
  const items = Array.from(
    root.querySelectorAll<HTMLElement>('.contact-animate')
  )

  /* stagger: 0 s, 0.10 s, 0.20 s… */
  items.forEach((el, idx) =>
    el.style.setProperty('--delay', `${idx * 0.10}s`)
  )

  const io = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-shown')
          io.unobserve(e.target)              // solo una vez
        }
      })
    },
    { rootMargin: '0px 0px 15% 0px', threshold: 0 }
  )

  items.forEach(el => io.observe(el))
}

/* ╭─────────────────────────────────────────╮
   │ 2.  COMPONENTE CONTACT                  │
   ╰─────────────────────────────────────────╯ */
export function Contact() {
  const contactEl = document.createElement('section')
  contactEl.id = 'contact'

  /* ───────── helpers de marcado ───────── */
  const renderMobile = () => `
<div class="sm:hidden w-full flex flex-col items-center">

  <!-- Encabezado -->
  <h2 class="contact-animate is-hidden font-montserrat font-bold text-[24px] text-center mt-12 md:mt-4 lg:mt-14">
    ${t('contact_title')}
  </h2>
  <p class="contact-animate is-hidden font-montserrat font-medium text-[10px] text-center mt-1">
    ${t('contact_subtitle')}
  </p>
  <img src="/assets/marker-icon.webp"
       class="contact-animate is-hidden w-[55px] h-[15px] mx-auto mt-3"
       alt="" aria-hidden="true" />

  <!-- FORM MOBILE -->
  <form id="contact-form-mobile"
        aria-labelledby="contact-title-mobile"
        class="contact-animate is-hidden w-full max-w-[450px] bg-white rounded shadow-lg mt-8 p-5 flex flex-col gap-3">

    <label for="cfm-first-name" class="font-montserrat text-[10px] text-black/70 text-left">
      ${t('form_label_name')}
    </label>
    <input id="cfm-first-name" name="first_name" type="text" autocomplete="given-name"
           placeholder="John"
           class="text-black border p-2 rounded outline-none bg-white text-[11px]" />

    <label for="cfm-last-name" class="font-montserrat text-[10px] text-black/70 text-left">
      ${t('form_label_lastname')}
    </label>
    <input id="cfm-last-name" name="last_name" type="text" autocomplete="family-name"
           placeholder="Doe"
           class="text-black border p-2 rounded outline-none bg-white text-[11px]" />

    <label for="cfm-email" class="font-montserrat text-[10px] text-black/70 text-left">
      ${t('form_label_email')}
    </label>
    <input id="cfm-email" name="email" type="email" autocomplete="email"
           placeholder="john@gmail.com"
           class="text-black border p-2 rounded outline-none bg-white text-[11px]" />

    <label for="cfm-message" class="font-montserrat text-[10px] text-black/70 text-left">
      ${t('form_label_message')}
    </label>
    <textarea id="cfm-message" name="message" rows="4"
              placeholder="${t('form_label_message')}"
              class="border p-2 rounded outline-none resize-none bg-white text-[11px] text-black"></textarea>

    <button type="submit"
            aria-label="${t('form_submit')}"
            class="h-[35px] bg-[#006E49] hover:bg-[#00a16b] text-[11px] text-white font-montserrat font-bold tracking-wide rounded-[8px] flex items-center justify-center transition-colors duration-200 mt-2">
      ${t('form_submit')}
    </button>
  </form>

  <img src="/assets/contact-hands.webp"
       alt="${t('contact_hands_img_alt')}"
       class="contact-animate is-hidden w-[550px] h-auto object-contain mt-16" />

  ${FooterMobile()}
</div>`;



  const renderDesktop = () => `
<div class="hidden sm:block w-full flex-col items-center">

  <!-- Encabezado -->
  <h2 id="contact-title-desktop"
      class="contact-animate is-hidden font-montserrat font-bold text-[45px] text-center mt-14">
    ${t('contact_title')}
  </h2>
  <p class="contact-animate is-hidden font-montserrat font-bold text-[15px] text-center mt-1">
    ${t('contact_subtitle')}
  </p>
  <img src="/assets/marker-icon.webp"
       class="contact-animate is-hidden w-[91px] h-[25px] mx-auto mt-4"
       alt="" aria-hidden="true" />

  <!-- FORM + MAPA -->
  <div class="contact-animate is-hidden mt-10 w-full max-w-[960px] mx-auto overflow-hidden rounded-[20px] shadow-lg
              grid grid-cols-1 lg:grid-cols-2 bg-white">

    <!-- FORM DESKTOP -->
    <form id="contact-form-desktop" aria-labelledby="contact-title-desktop"
          class="p-6 flex flex-col gap-4">

      <label for="cfd-first-name" class="font-montserrat text-[12px] text-black/90 text-left">
        ${t('form_label_name')}
      </label>
      <input id="cfd-first-name" name="first_name" type="text" autocomplete="given-name"
             placeholder="John"
             class="border p-2 rounded outline-none bg-white text-black" />

      <label for="cfd-last-name" class="font-montserrat text-[12px] text-black/90 text-left">
        ${t('form_label_lastname')}
      </label>
      <input id="cfd-last-name" name="last_name" type="text" autocomplete="family-name"
             placeholder="Doe"
             class="border p-2 rounded outline-none bg-white text-black" />

      <label for="cfd-email" class="font-montserrat text-[12px] text-black/90 text-left">
        ${t('form_label_email')}
      </label>
      <input id="cfd-email" name="email" type="email" autocomplete="email"
             placeholder="john@gmail.com"
             class="border p-2 rounded outline-none bg-white text-black" />

      <label for="cfd-message" class="font-montserrat text-[12px] text-black/90 text-left">
        ${t('form_label_message')}
      </label>
      <textarea id="cfd-message" name="message" rows="4"
                placeholder="${t('form_label_message')}"
                class="border p-2 rounded outline-none resize-none bg-white text-black"></textarea>

      <button type="submit"
              aria-label="${t('form_submit')}"
              class="h-[45px] bg-[#006E49] hover:bg-[#00a16b] text-white font-montserrat font-bold tracking-wide rounded-[8px] flex items-center justify-center transition-colors duration-200 mt-2">
        ${t('form_submit')}
      </button>
    </form>

    <!-- MAPA (solo ≥ lg) -->
    <div class="hidden lg:block h-[540px]">
      <div id="leaflet-map" class="w-full h-full pointer-events-none rounded-r-[20px]"></div>
    </div>
  </div>

  <!-- Imagen decorativa -->
  <div class="contact-animate is-hidden w-full flex justify-center mt-20">
    <img src="/assets/contact-hands.webp"
         alt="${t('contact_hands_img_alt')}"
         class="w-[795px] h-[611px] object-contain" />
  </div>

  ${FooterDesktop()}
</div>`;


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
      'scroll-mt-[96px] w-full px-4 text-white flex flex-col items-center mt-0 lg:-mt-8 relative'
    contactEl.style.background = 'linear-gradient(to bottom,rgba(0,111,73,.30) 0%,#000 100%)'
    contactEl.style.width       = '100vw'
    contactEl.style.marginLeft  = 'calc(50% - 50vw)'
    contactEl.style.marginRight = 'calc(50% - 50vw)'

    contactEl.innerHTML = renderMobile() + renderDesktop()
    attachFormHandlers()
    loadLeaflet()

    /* activa el scroll-reveal */
    requestAnimationFrame(() => attachScrollReveal(contactEl))
  }

  render()
  onLangChange(render)

  return contactEl
}