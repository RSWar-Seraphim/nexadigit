// ══════════════════════════════════════════════════════════════════════════════
// UNISYNC COMPONENT - NexaDigit's Flagship Product
// Autonomous AI Agents for Content at Scale
// ══════════════════════════════════════════════════════════════════════════════
import { onLangChange, getLang } from './i18n'

export function Unisync() {
  const el = document.createElement('section')
  el.id = 'unisync'

  function render() {
    const lang = getLang()

    el.className = 'relative'
    el.innerHTML = `
      <div class="max-w-7xl mx-auto px-6 pt-24 pb-12">

        <!-- Top Section: Label + Title + Description -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16 reveal">
          <!-- Left: Label + Big Title -->
          <div>
            <p class="text-sm text-[#2dd4bf] uppercase tracking-widest mb-6">${lang === 'en' ? 'Our Product' : 'Nuestro Producto'}</p>
            <h2 class="text-5xl md:text-6xl lg:text-7xl font-display text-white leading-[1.1]">
              ${lang === 'en' ? 'Content on<br>Autopilot' : 'Contenido en<br>Autopilot'}
            </h2>
          </div>
          <!-- Right: Description -->
          <div class="flex items-end">
            <p class="text-lg text-gray-400 leading-relaxed max-w-md">
              ${lang === 'en'
                ? 'We built UniSync.ai to automate our own content empire. AI agents that research, write, and publish 24/7 across all platforms.'
                : 'Creamos UniSync.ai para automatizar nuestro propio imperio de contenido. Agentes IA que investigan, escriben y publican 24/7 en todas las plataformas.'}
            </p>
          </div>
        </div>

        <!-- Big Visual: Dashboard Screenshot -->
        <div class="reveal reveal-delay-1 mb-20">
          <div class="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0d1512] to-[#0a0f0d] border border-white/10">
            <!-- Subtle glow -->
            <div class="absolute inset-0 bg-gradient-to-br from-[#14b8a6]/10 via-transparent to-purple-500/5"></div>

            <div class="relative p-8 md:p-12">
              <!-- Dashboard Header -->
              <div class="flex items-center justify-between mb-8">
                <div class="flex items-center gap-4">
                  <div class="text-2xl font-display text-white">UniSync<span class="text-[#2dd4bf]">.ai</span></div>
                  <div class="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                    <span class="text-xs text-green-400 font-medium">${lang === 'en' ? 'LIVE' : 'EN VIVO'}</span>
                  </div>
                </div>
                <div class="text-sm text-gray-500 font-mono">${lang === 'en' ? 'Dashboard' : 'Panel'}</div>
              </div>

              <!-- Stats Grid -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                <div class="bg-white/[0.03] rounded-xl p-5 border border-white/5">
                  <div class="text-sm text-gray-500 mb-2">${lang === 'en' ? 'Active Agents' : 'Agentes Activos'}</div>
                  <div class="text-4xl text-white font-display">24</div>
                </div>
                <div class="bg-white/[0.03] rounded-xl p-5 border border-white/5">
                  <div class="text-sm text-gray-500 mb-2">${lang === 'en' ? 'Articles Published' : 'Artículos Publicados'}</div>
                  <div class="text-4xl text-white font-display">12.4K</div>
                </div>
                <div class="bg-white/[0.03] rounded-xl p-5 border border-white/5">
                  <div class="text-sm text-gray-500 mb-2">${lang === 'en' ? 'Videos Created' : 'Videos Creados'}</div>
                  <div class="text-4xl text-white font-display">847</div>
                </div>
                <div class="bg-[#14b8a6]/5 rounded-xl p-5 border border-[#14b8a6]/10">
                  <div class="text-sm text-gray-500 mb-2">${lang === 'en' ? 'Monthly Cost' : 'Costo Mensual'}</div>
                  <div class="text-4xl text-[#2dd4bf] font-display">$127</div>
                </div>
              </div>

              <!-- Platforms Bar -->
              <div class="flex flex-wrap items-center gap-3">
                <span class="text-sm text-gray-500">${lang === 'en' ? 'Publishing to:' : 'Publicando en:'}</span>
                <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5">
                  <svg class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2z"/></svg>
                  <span class="text-sm text-gray-400">WordPress</span>
                </div>
                <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5">
                  <svg class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/></svg>
                  <span class="text-sm text-gray-400">YouTube</span>
                </div>
                <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5">
                  <svg class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231z"/></svg>
                  <span class="text-sm text-gray-400">X</span>
                </div>
                <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5">
                  <svg class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
                  <span class="text-sm text-gray-400">TikTok</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom: 4 Feature Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 reveal reveal-delay-2">
          <div>
            <h4 class="text-white font-medium mb-3">${lang === 'en' ? 'Autonomous Agents' : 'Agentes Autónomos'}</h4>
            <p class="text-sm text-gray-500 leading-relaxed mb-4">
              ${lang === 'en'
                ? 'AI agents that work around the clock. OpenAI, Claude, Gemini—use the best model for each task.'
                : 'Agentes IA que trabajan las 24 horas. OpenAI, Claude, Gemini—usa el mejor modelo para cada tarea.'}
            </p>
            <a href="https://unisync.ai" target="_blank" class="text-sm text-gray-400 hover:text-[#2dd4bf] transition-colors">${lang === 'en' ? 'Learn More' : 'Saber Más'} →</a>
          </div>

          <div>
            <h4 class="text-white font-medium mb-3">${lang === 'en' ? 'Multi-Platform' : 'Multi-Plataforma'}</h4>
            <p class="text-sm text-gray-500 leading-relaxed mb-4">
              ${lang === 'en'
                ? 'One dashboard for WordPress, YouTube, X, and TikTok. Schedule, publish, and track everything.'
                : 'Un dashboard para WordPress, YouTube, X y TikTok. Programa, publica y monitorea todo.'}
            </p>
            <a href="https://unisync.ai" target="_blank" class="text-sm text-gray-400 hover:text-[#2dd4bf] transition-colors">${lang === 'en' ? 'Learn More' : 'Saber Más'} →</a>
          </div>

          <div>
            <h4 class="text-white font-medium mb-3">${lang === 'en' ? 'Cost Control' : 'Control de Costos'}</h4>
            <p class="text-sm text-gray-500 leading-relaxed mb-4">
              ${lang === 'en'
                ? 'Real-time token tracking, monthly budgets, and detailed cost breakdowns per agent and platform.'
                : 'Seguimiento de tokens en tiempo real, presupuestos mensuales y desglose de costos por agente y plataforma.'}
            </p>
            <a href="https://unisync.ai" target="_blank" class="text-sm text-gray-400 hover:text-[#2dd4bf] transition-colors">${lang === 'en' ? 'Learn More' : 'Saber Más'} →</a>
          </div>

          <div>
            <h4 class="text-white font-medium mb-3">${lang === 'en' ? 'Production Ready' : 'En Producción'}</h4>
            <p class="text-sm text-gray-500 leading-relaxed mb-4">
              ${lang === 'en'
                ? "Not a concept. This is real software generating real value for us every single day."
                : 'No es un concepto. Es software real generando valor real para nosotros cada día.'}
            </p>
            <a href="https://unisync.ai" target="_blank" class="text-sm text-gray-400 hover:text-[#2dd4bf] transition-colors">${lang === 'en' ? 'Learn More' : 'Saber Más'} →</a>
          </div>
        </div>

      </div>
    `

    initReveal(el)
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

