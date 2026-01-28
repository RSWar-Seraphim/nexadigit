// ══════════════════════════════════════════════════════════════════════════════
// CONTACT COMPONENT - Premium Dark CTA & Contact
// Glass panel with gradient glow and modern footer
// ══════════════════════════════════════════════════════════════════════════════
import { t, onLangChange, getLang } from './i18n'
import { notify } from './notify'

export function Contact() {
  const contactEl = document.createElement('section')
  contactEl.id = 'contact'

  function initMap() {
    const mapContainer = contactEl.querySelector<HTMLElement>('#leaflet-map')
    if (!mapContainer || mapContainer.dataset.initialized) return
    mapContainer.dataset.initialized = '1'

    const L = (window as any).L
    const lat = 18.45305350020532
    const lng = -69.93497852241077

    const map = L.map(mapContainer, {
      zoomControl: false,
      attributionControl: false,
    }).setView([lat, lng], 18)

    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      { maxZoom: 19 }
    ).addTo(map)

    const pinSvg = `
      <svg viewBox="0 0 24 24" width="40" height="40" fill="#14b8a6"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13
                 a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5
                 2.5 2.5 0 0 1 0 5z"/>
      </svg>`
    const pinIcon = L.divIcon({
      className: '',
      html: pinSvg,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    })
    L.marker([lat, lng], { icon: pinIcon, interactive: false }).addTo(map)

    map.whenReady(() => {
      setTimeout(() => map.invalidateSize(), 0)
    })
  }

  function ensureLeaflet() {
    if ((window as any).L) {
      initMap()
    } else {
      window.addEventListener('leaflet:loaded', initMap, { once: true })
    }
  }

  function attachFormHandlers() {
    const form = contactEl.querySelector<HTMLFormElement>('#contact-form')
    if (!form) return

    form.addEventListener('submit', async (ev) => {
      ev.preventDefault()
      const fd = new FormData(form)

      const payload = {
        firstName: fd.get('first_name'),
        lastName: fd.get('last_name'),
        email: fd.get('email'),
        message: fd.get('message'),
      }

      try {
        const res = await fetch('/api/mailerlite', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        if (res.ok) {
          notify(t('notify_contact_success'), 'success')
          form.reset()
        } else {
          const err = await res.json()
          notify(t('notify_contact_error') + ' ' + (err.error || ''), 'error')
        }
      } catch {
        notify(t('notify_contact_network_error'), 'error')
      }
    })
  }

  function render() {
    const lang = getLang()

    contactEl.className = 'relative py-24 px-6'
    contactEl.innerHTML = `
      <div class="relative z-10 w-full max-w-7xl mx-auto">

        <!-- CTA Section -->
        <div class="reveal relative rounded-[32px] bg-gradient-to-b from-[#0a1a17] to-[#050505] border border-white/5 overflow-hidden px-8 py-20 text-center mb-24">
          <!-- Background Glow -->
          <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#14b8a6]/10 blur-[120px] rounded-full pointer-events-none"></div>

          <div class="z-10 relative">
            <h2 class="text-title mb-6">
              ${lang === 'en' ? 'Ready to' : '¿Listo para'} <span class="text-gradient-primary">${lang === 'en' ? 'transform' : 'transformar'}</span><br>${lang === 'en' ? 'your business?' : 'tu negocio?'}
            </h2>
            <p class="text-body text-lg max-w-xl mx-auto mb-10">
              ${lang === 'en'
                ? 'Join the leading organizations already operating with AI. The AI market will reach $407B by 2027. Don\'t fall behind.'
                : 'Únete a las organizaciones líderes que ya operan con IA. El mercado de IA alcanzará los $407B para 2027. No te quedes atrás.'}
            </p>

            <div class="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <a href="#bookMeeting" data-book-meeting class="btn-primary btn-spotlight">
                <span>${lang === 'en' ? 'Schedule Call' : 'Agendar Llamada'}</span>
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
              </a>
              <button type="button" onclick="document.getElementById('contact-form').scrollIntoView({behavior:'smooth'})" class="btn-secondary">
                <span>${lang === 'en' ? 'Send Message' : 'Enviar Mensaje'}</span>
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Contact Form Section -->
        <div class="grid lg:grid-cols-2 gap-8 reveal reveal-delay-1">
          <!-- Form -->
          <div class="glass-card p-8">
            <form id="contact-form">
              <h3 class="text-headline mb-4">${t('contact_title')}</h3>
              <p class="text-body mb-8">${t('contact_subtitle')}</p>

              <div class="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label for="cf-first-name" class="block text-xs text-gray-400 uppercase tracking-wider mb-2">${t('form_label_name')}</label>
                  <input
                    id="cf-first-name"
                    name="first_name"
                    type="text"
                    autocomplete="given-name"
                    placeholder="John"
                    class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#14b8a6]/50 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label for="cf-last-name" class="block text-xs text-gray-400 uppercase tracking-wider mb-2">${t('form_label_lastname')}</label>
                  <input
                    id="cf-last-name"
                    name="last_name"
                    type="text"
                    autocomplete="family-name"
                    placeholder="Doe"
                    class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#14b8a6]/50 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div class="mb-6">
                <label for="cf-email" class="block text-xs text-gray-400 uppercase tracking-wider mb-2">${t('form_label_email')}</label>
                <input
                  id="cf-email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  placeholder="john@example.com"
                  class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#14b8a6]/50 focus:outline-none transition-colors"
                />
              </div>

              <div class="mb-8">
                <label for="cf-message" class="block text-xs text-gray-400 uppercase tracking-wider mb-2">${t('form_label_message')}</label>
                <textarea
                  id="cf-message"
                  name="message"
                  rows="5"
                  placeholder="${lang === 'en' ? 'Tell us about your project...' : 'Cuéntanos sobre tu proyecto...'}"
                  class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-[#14b8a6]/50 focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>

              <button type="submit" class="btn-primary w-full justify-center">
                <span>${t('form_submit')}</span>
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </button>
            </form>
          </div>

          <!-- Map -->
          <div class="glass-card p-1 hidden lg:block">
            <div id="leaflet-map" class="w-full h-full min-h-[500px] rounded-2xl pointer-events-none"></div>
          </div>
        </div>

        <!-- Contact Info -->
        <div class="grid sm:grid-cols-3 gap-8 mt-16 reveal reveal-delay-2">
          <div class="text-center">
            <div class="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-[#2dd4bf]">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <h4 class="text-white font-medium mb-2">${lang === 'en' ? 'Location' : 'Ubicación'}</h4>
            <p class="text-sm text-gray-400">Santo Domingo, DR</p>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-[#2dd4bf]">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <h4 class="text-white font-medium mb-2">Email</h4>
            <p class="text-sm text-gray-400">info@nexadigit.com</p>
          </div>
          <div class="text-center">
            <div class="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-[#2dd4bf]">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h4 class="text-white font-medium mb-2">${lang === 'en' ? 'Hours' : 'Horario'}</h4>
            <p class="text-sm text-gray-400">${lang === 'en' ? 'Mon-Fri: 9AM - 6PM' : 'Lun-Vie: 9AM - 6PM'}</p>
          </div>
        </div>

      </div>

      <!-- Footer -->
      <footer class="mt-24 border-t border-white/5 pt-16 max-w-7xl mx-auto">
        <div class="grid md:grid-cols-4 gap-12 mb-12">
          <!-- Brand -->
          <div class="md:col-span-1">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                </svg>
              </div>
              <div>
                <span class="font-display font-medium text-white">NexaDigit</span>
                <span class="block text-[10px] text-gray-500">EST. 2024</span>
              </div>
            </div>
            <p class="text-sm text-gray-400 mb-4">
              ${lang === 'en'
                ? 'Building the future of digital business with AI-powered solutions.'
                : 'Construyendo el futuro de los negocios digitales con soluciones impulsadas por IA.'}
            </p>
            <!-- Social Links -->
            <div class="flex gap-3">
              <a href="https://discord.gg/XTUg2WKtZU" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/107399409" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://www.instagram.com/nexadigit.io" target="_blank" rel="noopener noreferrer" class="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

          <!-- Links -->
          <div>
            <h4 class="text-white font-medium mb-4">${lang === 'en' ? 'Solutions' : 'Soluciones'}</h4>
            <ul class="space-y-2">
              <li><a href="#servicios" class="text-sm text-gray-400 hover:text-white transition-colors">${lang === 'en' ? 'Custom Software' : 'Software a Medida'}</a></li>
              <li><a href="#servicios" class="text-sm text-gray-400 hover:text-white transition-colors">${lang === 'en' ? 'AI Integration' : 'Integración IA'}</a></li>
              <li><a href="#servicios" class="text-sm text-gray-400 hover:text-white transition-colors">${lang === 'en' ? 'Cloud Services' : 'Servicios Cloud'}</a></li>
              <li><a href="#unisync" class="text-sm text-gray-400 hover:text-white transition-colors">UniSync AI</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-white font-medium mb-4">${lang === 'en' ? 'Company' : 'Empresa'}</h4>
            <ul class="space-y-2">
              <li><a href="#metodologia" class="text-sm text-gray-400 hover:text-white transition-colors">${lang === 'en' ? 'Our Process' : 'Nuestro Proceso'}</a></li>
              <li><a href="#contact" class="text-sm text-gray-400 hover:text-white transition-colors">${lang === 'en' ? 'Contact' : 'Contacto'}</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-white font-medium mb-4">${lang === 'en' ? 'Legal' : 'Legal'}</h4>
            <ul class="space-y-2">
              <li><a href="#" data-legal="privacy" class="text-sm text-gray-400 hover:text-white transition-colors">${lang === 'en' ? 'Privacy Policy' : 'Política de Privacidad'}</a></li>
              <li><a href="#" data-legal="terms" class="text-sm text-gray-400 hover:text-white transition-colors">${lang === 'en' ? 'Terms of Service' : 'Términos de Servicio'}</a></li>
            </ul>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p class="text-xs text-gray-500">
            © ${new Date().getFullYear()} NexaDigit. ${lang === 'en' ? 'All rights reserved.' : 'Todos los derechos reservados.'}
          </p>
          <p class="text-xs text-gray-500">
            ${lang === 'en' ? 'Crafted with' : 'Hecho con'} <span class="text-[#14b8a6]">♥</span> ${lang === 'en' ? 'in Santo Domingo' : 'en Santo Domingo'}
          </p>
        </div>
      </footer>
    `

    attachFormHandlers()
    ensureLeaflet()
    initReveal(contactEl)
  }

  render()
  onLangChange(render)
  return contactEl
}

function initReveal(container: HTMLElement) {
  const reveals = container.querySelectorAll('.reveal')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  )

  reveals.forEach((el) => observer.observe(el))
}
