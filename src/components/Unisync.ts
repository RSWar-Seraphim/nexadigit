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

    el.className = 'py-20 relative overflow-hidden'
    el.innerHTML = `
      <div class="max-w-7xl mx-auto px-6">

        <!-- Header Row -->
        <div class="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 mb-16 reveal">
          <div>
            <p class="text-sm text-[#2dd4bf] uppercase tracking-widest mb-4">${lang === 'en' ? 'Our Product' : 'Nuestro Producto'}</p>
            <h2 class="text-4xl md:text-5xl font-display text-white leading-tight">
              UniSync<span class="text-[#2dd4bf]">.ai</span>
            </h2>
          </div>
          <div class="lg:max-w-md lg:text-right">
            <p class="text-gray-400 leading-relaxed mb-4">
              ${lang === 'en'
                ? 'AI agents that research, write, and publish content 24/7. Built by us, for us.'
                : 'Agentes IA que investigan, escriben y publican contenido 24/7. Creado por nosotros, para nosotros.'}
            </p>
            <a href="https://unisync.ai" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-[#2dd4bf] hover:underline text-sm font-medium">
              ${lang === 'en' ? 'Visit UniSync.ai' : 'Visitar UniSync.ai'}
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- 3 Feature Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 reveal reveal-delay-1">

          <!-- Card 1: Autonomous Agents -->
          <div class="bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.04] transition-colors group">
            <div class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-6 group-hover:border-white/20 transition-colors">
              <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <h4 class="text-white font-medium mb-3">${lang === 'en' ? 'Autonomous AI Agents' : 'Agentes IA Autónomos'}</h4>
            <p class="text-sm text-gray-500 leading-relaxed mb-6">
              ${lang === 'en'
                ? 'Configurable agents that research, write, and publish content without human intervention. Multiple AI providers: OpenAI, Claude, Gemini.'
                : 'Agentes configurables que investigan, escriben y publican contenido sin intervención humana. Múltiples proveedores IA: OpenAI, Claude, Gemini.'}
            </p>
            <div class="pt-4 border-t border-white/5">
              <span class="text-xs text-gray-600">↗</span>
            </div>
          </div>

          <!-- Card 2: Multi-Platform -->
          <div class="bg-white/[0.02] border border-white/5 rounded-2xl p-6 hover:bg-white/[0.04] transition-colors group">
            <div class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-6 group-hover:border-white/20 transition-colors">
              <svg class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
              </svg>
            </div>
            <h4 class="text-white font-medium mb-3">${lang === 'en' ? 'Multi-Platform Publishing' : 'Publicación Multi-Plataforma'}</h4>
            <p class="text-sm text-gray-500 leading-relaxed mb-6">
              ${lang === 'en'
                ? 'WordPress, YouTube, X, TikTok—one dashboard to manage all your channels. Schedule, publish, and track performance everywhere.'
                : 'WordPress, YouTube, X, TikTok—un dashboard para todos tus canales. Programa, publica y monitorea rendimiento en todas partes.'}
            </p>
            <div class="pt-4 border-t border-white/5">
              <span class="text-xs text-gray-600">↗</span>
            </div>
          </div>

          <!-- Card 3: Results (Highlighted) -->
          <div class="bg-[#14b8a6]/5 border border-[#14b8a6]/10 rounded-2xl p-6 group">
            <div class="w-12 h-12 rounded-full bg-[#14b8a6]/10 border border-[#14b8a6]/20 flex items-center justify-center mb-6">
              <svg class="w-5 h-5 text-[#2dd4bf]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <h4 class="text-white font-medium mb-3">${lang === 'en' ? 'Full Control & Analytics' : 'Control Total y Analytics'}</h4>
            <p class="text-sm text-gray-500 leading-relaxed mb-6">
              ${lang === 'en'
                ? 'Real-time token tracking, cost budgets, SEO metrics, and detailed logs. Production software generating real value for us daily.'
                : 'Seguimiento de tokens en tiempo real, presupuestos, métricas SEO y logs detallados. Software en producción generando valor real para nosotros diariamente.'}
            </p>
            <div class="pt-4 border-t border-[#14b8a6]/10">
              <span class="text-xs text-[#2dd4bf]">↗</span>
            </div>
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

