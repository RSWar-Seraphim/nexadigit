// ══════════════════════════════════════════════════════════════════════════════
// SERVICE COMPONENT - Premium Bento Grid with Subtle Interactions
// Modern dark design with glass cards, typewriter, tilt & glow effects
// ══════════════════════════════════════════════════════════════════════════════
import { onLangChange, getLang } from './i18n'

export function Service() {
  const el = document.createElement('section')
  el.id = 'servicios'

  const render = () => {
    const lang = getLang()

    el.className = 'py-24 max-w-7xl mx-auto px-6'
    el.innerHTML = `
      <!-- Section Header -->
      <div class="text-center mb-16 reveal">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
          <span class="w-2 h-2 bg-[#14b8a6] rounded-full"></span>
          <span class="text-xs text-gray-400 uppercase tracking-wider">${lang === 'en' ? 'Solutions' : 'Soluciones'}</span>
        </div>
        <h2 class="text-title">
          ${lang === 'en' ? 'Everything you need to' : 'Todo lo que necesitas para'} <span class="text-gradient-primary">${lang === 'en' ? 'scale' : 'escalar'}</span>
        </h2>
      </div>

      <!-- Bento Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

        <!-- Main Card (Large) -->
        <div class="md:col-span-2 reveal reveal-delay-1">
          <div class="glass-card group h-full p-8 relative overflow-hidden service-card-tilt" data-tilt>
            <!-- Mouse glow -->
            <div class="card-glow"></div>
            <!-- Hover gradient -->
            <div class="absolute inset-0 bg-gradient-to-br from-[#14b8a6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

            <div class="relative z-10">
              <h3 class="text-headline mb-4">${lang === 'en' ? 'Custom Software Development' : 'Desarrollo de Software a Medida'}</h3>
              <p class="text-body mb-8 max-w-lg">
                ${lang === 'en'
                  ? 'We design and develop scalable applications tailored to your exact needs. From MVPs to enterprise-grade solutions.'
                  : 'Diseñamos y desarrollamos aplicaciones escalables adaptadas a tus necesidades exactas. Desde MVPs hasta soluciones empresariales.'}
              </p>

              <!-- Code Preview with Typewriter -->
              <div class="terminal">
                <div class="terminal-header">
                  <div class="terminal-dots">
                    <div class="terminal-dot red"></div>
                    <div class="terminal-dot yellow"></div>
                    <div class="terminal-dot green"></div>
                  </div>
                  <span class="text-xs text-gray-500 font-mono">nexadigit.config.ts</span>
                </div>
                <div class="terminal-body text-sm min-h-[140px]" id="typewriter-terminal">
                  <div class="typewriter-line" data-delay="0"><span class="text-gray-500">// ${lang === 'en' ? 'Your perfect setup' : 'Tu configuración perfecta'}</span></div>
                  <div class="typewriter-line" data-delay="400"><span class="text-purple-400">export</span><span class="text-blue-400 ml-1">const</span><span class="text-white ml-1">config</span><span class="text-gray-500 ml-1">=</span><span class="text-yellow-400 ml-1">{</span></div>
                  <div class="typewriter-line" data-delay="800"><span class="pl-4 text-gray-300"><span class="text-[#2dd4bf]">stack</span>: <span class="text-green-400">'modern'</span>,</span></div>
                  <div class="typewriter-line" data-delay="1200"><span class="pl-4 text-gray-300"><span class="text-[#2dd4bf]">scale</span>: <span class="text-purple-400">Infinity</span>,</span></div>
                  <div class="typewriter-line" data-delay="1600"><span class="pl-4 text-gray-300"><span class="text-[#2dd4bf]">ai</span>: <span class="text-orange-400">true</span></span></div>
                  <div class="typewriter-line" data-delay="2000"><span class="text-yellow-400">}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- AI Card (Tall) -->
        <div class="md:row-span-2 reveal reveal-delay-2">
          <div class="glass-card group h-full p-8 relative overflow-hidden service-card-tilt" data-tilt>
            <!-- Mouse glow -->
            <div class="card-glow purple"></div>
            <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

            <div class="relative z-10 h-full flex flex-col">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-6 border border-purple-500/20">
                <svg class="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>

              <h3 class="text-headline mb-4">${lang === 'en' ? 'AI Integration' : 'Integración IA'}</h3>
              <p class="text-body mb-8">
                ${lang === 'en'
                  ? 'Custom AI agents that automate repetitive tasks and enhance decision-making in your business.'
                  : 'Agentes de IA personalizados que automatizan tareas repetitivas y mejoran la toma de decisiones en tu negocio.'}
              </p>

              <!-- Animated Chart with grow effect -->
              <div class="mt-auto chart-container" data-chart>
                <div class="flex items-end justify-between gap-2 h-32">
                  <div class="chart-bar flex-1 bg-gradient-to-t from-purple-500/30 to-transparent rounded-t" data-height="40"></div>
                  <div class="chart-bar flex-1 bg-gradient-to-t from-purple-500/30 to-transparent rounded-t" data-height="60"></div>
                  <div class="chart-bar flex-1 bg-gradient-to-t from-purple-500/30 to-transparent rounded-t" data-height="45"></div>
                  <div class="chart-bar flex-1 bg-gradient-to-t from-purple-500/30 to-transparent rounded-t" data-height="80"></div>
                  <div class="chart-bar flex-1 bg-gradient-to-t from-purple-500/50 to-transparent rounded-t border-t-2 border-purple-400" data-height="95"></div>
                </div>
                <div class="flex justify-between text-[10px] text-gray-500 mt-2">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span class="text-purple-400">Now</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Small Card 1 - Cloud -->
        <div class="reveal reveal-delay-3">
          <div class="glass-card group p-6 relative overflow-hidden h-full service-card-tilt" data-tilt>
            <!-- Mouse glow -->
            <div class="card-glow blue"></div>
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

            <div class="relative z-10 flex justify-between items-start">
              <div>
                <div class="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 border border-blue-500/20">
                  <svg class="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>
                  </svg>
                </div>
                <h3 class="text-white font-medium mb-2">${lang === 'en' ? 'Cloud Infrastructure' : 'Infraestructura Cloud'}</h3>
                <p class="text-sm text-gray-400">${lang === 'en' ? 'AWS, Azure, GCP deployment' : 'Despliegue AWS, Azure, GCP'}</p>
              </div>
              <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Small Card 2 - Security -->
        <div class="reveal reveal-delay-4">
          <div class="glass-card group p-6 relative overflow-hidden h-full service-card-tilt" data-tilt>
            <!-- Mouse glow -->
            <div class="card-glow green"></div>
            <div class="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

            <div class="relative z-10 flex justify-between items-start">
              <div>
                <div class="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-4 border border-green-500/20">
                  <svg class="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                </div>
                <h3 class="text-white font-medium mb-2">${lang === 'en' ? 'Security First' : 'Seguridad Primero'}</h3>
                <p class="text-sm text-gray-400">${lang === 'en' ? 'Enterprise-grade protection' : 'Protección nivel empresarial'}</p>
              </div>
              <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

      </div>
    `

    initReveal(el)
    initTiltEffect(el)
    initMouseGlow(el)
    initTypewriter(el)
    initChartAnimation(el)
  }

  render()
  onLangChange(render)
  return el
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

// Subtle 3D tilt effect on hover
function initTiltEffect(container: HTMLElement) {
  const cards = container.querySelectorAll('[data-tilt]')

  cards.forEach((card) => {
    const el = card as HTMLElement

    el.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      // Subtle rotation (max 3 degrees)
      const rotateX = ((y - centerY) / centerY) * -3
      const rotateY = ((x - centerX) / centerX) * 3

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
    })

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'
    })
  })
}

// Mouse-following glow effect
function initMouseGlow(container: HTMLElement) {
  const cards = container.querySelectorAll('[data-tilt]')

  cards.forEach((card) => {
    const el = card as HTMLElement
    const glow = el.querySelector('.card-glow') as HTMLElement

    if (!glow) return

    el.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      glow.style.opacity = '1'
      glow.style.left = `${x}px`
      glow.style.top = `${y}px`
    })

    el.addEventListener('mouseleave', () => {
      glow.style.opacity = '0'
    })
  })
}

// Typewriter effect for terminal - types once when scrolled into view
function initTypewriter(container: HTMLElement) {
  const terminal = container.querySelector('#typewriter-terminal') as HTMLElement
  if (!terminal) return

  const lines = terminal.querySelectorAll('.typewriter-line')
  const originalContents: string[] = []

  // Store original HTML content and clear
  lines.forEach((line) => {
    originalContents.push(line.innerHTML)
    ;(line as HTMLElement).innerHTML = ''
    ;(line as HTMLElement).style.minHeight = '1.5em' // Prevent collapse
  })

  let hasStarted = false

  async function typeText(element: HTMLElement, html: string) {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html

    element.innerHTML = ''

    async function typeNode(node: Node, target: HTMLElement) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || ''
        for (const char of text) {
          target.insertAdjacentText('beforeend', char)
          await new Promise(r => setTimeout(r, 25))
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement
        const clone = document.createElement(el.tagName)
        for (const attr of Array.from(el.attributes)) {
          clone.setAttribute(attr.name, attr.value)
        }
        target.appendChild(clone)

        for (const child of Array.from(el.childNodes)) {
          await typeNode(child, clone)
        }
      }
    }

    for (const child of Array.from(tempDiv.childNodes)) {
      await typeNode(child, element)
    }
  }

  async function runTypewriter() {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i] as HTMLElement
      await typeText(line, originalContents[i])
      await new Promise(r => setTimeout(r, 80))
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasStarted) {
          hasStarted = true
          runTypewriter()
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 }
  )

  observer.observe(terminal)
}

// Chart bars - just pulse animation, no grow
function initChartAnimation(container: HTMLElement) {
  const chartContainer = container.querySelector('[data-chart]')
  if (!chartContainer) return

  const bars = chartContainer.querySelectorAll('.chart-bar')

  // Set heights directly and add pulse
  const durations = [2, 2.5, 3, 2.2, 1.8]

  bars.forEach((bar, index) => {
    const el = bar as HTMLElement
    const targetHeight = el.dataset.height || '50'
    el.style.height = `${targetHeight}%`
    el.style.animation = `pulse ${durations[index]}s ease-in-out infinite`
  })
}
