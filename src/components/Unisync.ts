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
          <!-- Left: Label + Brand + Big Title -->
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
                ? 'A platform that creates, controls, and monetizes digital assets on autopilot. AI agents that build passive income streams 24/7 across every marketplace.'
                : 'Una plataforma que crea, controla y monetiza activos digitales en piloto automático. Agentes IA que generan fuentes de ingreso pasivo 24/7 en cada mercado digital.'}
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
                  <div class="px-3 py-1 rounded-full bg-[#14b8a6]/10 border border-[#14b8a6]/20">
                    <span class="text-xs text-[#2dd4bf] font-medium">${lang === 'en' ? 'LIVE' : 'EN VIVO'}</span>
                  </div>
                </div>
                <div class="text-sm text-gray-500 font-mono">${lang === 'en' ? 'Dashboard' : 'Panel'}</div>
              </div>

              <!-- Stats Grid -->
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                <div class="bg-white/[0.03] rounded-xl p-5 border border-white/5">
                  <div class="text-sm text-gray-500 mb-2">${lang === 'en' ? 'Publish Time' : 'Tiempo de Publicación'}</div>
                  <div class="text-4xl text-white font-display">&lt;1<span class="text-lg ml-1">min</span></div>
                </div>
                <div class="bg-white/[0.03] rounded-xl p-5 border border-white/5">
                  <div class="text-sm text-gray-500 mb-2">${lang === 'en' ? 'Articles Published' : 'Artículos Publicados'}</div>
                  <div class="text-4xl text-white font-display">12.4K</div>
                </div>
                <div class="bg-white/[0.03] rounded-xl p-5 border border-white/5">
                  <div class="text-sm text-gray-500 mb-2">${lang === 'en' ? 'Autopilot Active' : 'Autopilot Activo'}</div>
                  <div class="text-4xl text-white font-display">24/7</div>
                </div>
                <div class="bg-[#14b8a6]/5 rounded-xl p-5 border border-[#14b8a6]/10">
                  <div class="text-sm text-gray-500 mb-2">${lang === 'en' ? 'Cost per Article' : 'Costo por Artículo'}</div>
                  <div class="text-4xl text-[#2dd4bf] font-display">$0.02</div>
                </div>
              </div>

              <!-- Platforms Bar -->
              <div class="flex flex-wrap items-center gap-3">
                <span class="text-sm text-gray-500">${lang === 'en' ? 'Publishing to:' : 'Publicando en:'}</span>
                <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5">
                  <svg class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM3.443 12c0-1.584.436-3.065 1.189-4.34l3.278 8.98A8.554 8.554 0 013.443 12zm8.557 8.56c-1.235 0-2.41-.263-3.472-.736l3.687-3.71 3.618 3.246c.028.02.054.042.084.058a8.519 8.519 0 01-3.917.942zm1.528-12.607c.71-.037 1.35-.112 1.35-.112.636-.075.562-.636-.075-.636 0 0-1.91.15-3.143.15-1.158 0-3.105-.15-3.105-.15-.636 0-.711.636-.075.636 0 0 .6.075 1.234.112l1.834 5.027-2.577 5.164L6.403 8.953c.711-.037 1.35-.112 1.35-.112.636-.075.562-.636-.075-.636 0 0-1.91.15-3.143.15-.221 0-.482-.006-.753-.016A8.538 8.538 0 0112 3.44c2.663 0 5.089 1.085 6.838 2.838-.044-.003-.086-.01-.131-.01-1.158 0-1.98.712-1.98 1.98 0 .636.375 1.175.773 1.81.3.524.648 1.196.648 2.166 0 .673-.373 1.835-.711 2.6l-.934 2.713-2.975-8.584zm3.847 11.642l2.476-6.672c.464-1.013.618-1.835.618-2.56 0-.263-.017-.507-.048-.736A8.544 8.544 0 0120.557 12a8.545 8.545 0 01-3.182 6.595z"/></svg>
                  <span class="text-sm text-gray-400">WordPress</span>
                </div>
                <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5">
                  <svg class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
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
                <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5">
                  <svg class="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor"><path d="M.045 18.02c.07-.116.36-.326.636-.46 3.006-1.53 6.036-3.02 9.054-4.55.06-.03.12-.07.18-.1a.3.3 0 01.27 0c3.09 1.54 6.174 3.08 9.264 4.62.075.04.153.08.2.14-.02.06-.08.1-.14.13-3.09 1.53-6.18 3.06-9.264 4.59a.38.38 0 01-.36 0C6.87 21.29 3.78 19.76.69 18.23c-.05-.03-.1-.06-.15-.1l-.075-.04-.42-.07zM23.98 13.83a.2.2 0 00-.09-.08c-.15-.07-.3-.14-.44-.22l-8.88-4.43a.37.37 0 00-.36 0L5.31 13.56c-.12.06-.24.12-.37.17a.2.2 0 00-.1.08c.07.07.17.1.26.15 3.02 1.51 6.04 3.02 9.07 4.52a.35.35 0 00.34 0c3.06-1.53 6.13-3.05 9.19-4.58.06-.03.12-.06.17-.1l.12-.02zM.045 13.62c.06-.1.34-.3.6-.44C3.65 11.65 6.66 10.13 9.67 8.6a.37.37 0 01.37 0c3.06 1.52 6.11 3.05 9.17 4.57.09.05.17.1.24.16-.06.07-.15.1-.24.14-3.06 1.53-6.13 3.06-9.19 4.58a.35.35 0 01-.34 0C6.64 16.53 3.57 15 .51 13.49c-.07-.04-.14-.07-.2-.12l-.09-.03-.18-.03v.3z"/><path d="M12.05.92c.13 0 .18.04.24.07 3.06 1.53 6.12 3.06 9.19 4.58.06.03.12.06.17.1.02.04 0 .08-.03.1-.08.06-.17.1-.26.15-3.02 1.51-6.04 3.02-9.07 4.52a.35.35 0 01-.34 0C8.9 8.92 5.83 7.39 2.77 5.87c-.1-.05-.2-.1-.28-.17.06-.07.15-.1.24-.14C5.78 4.03 8.85 2.5 11.92.97c.03-.02.07-.04.13-.05z"/></svg>
                  <span class="text-sm text-gray-400">Amazon</span>
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
            <h4 class="text-white font-medium mb-3">${lang === 'en' ? 'Digital Assets' : 'Activos Digitales'}</h4>
            <p class="text-sm text-gray-500 leading-relaxed mb-4">
              ${lang === 'en'
                ? 'Build, manage, and sell digital assets across marketplaces. Blogs, channels, and accounts that generate value while you sleep.'
                : 'Crea, gestiona y vende activos digitales en los mercados. Blogs, canales y cuentas que generan valor mientras duermes.'}
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
            <h4 class="text-white font-medium mb-3">${lang === 'en' ? 'Passive Income' : 'Ingresos Pasivos'}</h4>
            <p class="text-sm text-gray-500 leading-relaxed mb-4">
              ${lang === 'en'
                ? "Not a concept. Real software building real passive income streams. Your path to financial freedom."
                : 'No es un concepto. Software real construyendo fuentes reales de ingreso pasivo. Tu camino a la libertad financiera.'}
            </p>
            <a href="https://unisync.ai" target="_blank" class="text-sm text-gray-400 hover:text-[#2dd4bf] transition-colors">${lang === 'en' ? 'Learn More' : 'Saber Más'} →</a>
          </div>
        </div>

        <!-- CTA to UniSync.ai -->
        <div class="mt-12 text-center reveal reveal-delay-3">
          <a href="https://unisync.ai" target="_blank" rel="noopener noreferrer" class="btn-secondary group inline-flex">
            <span>${lang === 'en' ? 'Visit UniSync.ai' : 'Visitar UniSync.ai'}</span>
            <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </a>
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

