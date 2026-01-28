// ══════════════════════════════════════════════════════════════════════════════
// ABOUT/METODOLOGÍA COMPONENT - Integrated Ecosystem
// Unified section with methodology, consulting, and academy
// ══════════════════════════════════════════════════════════════════════════════
import { onLangChange, getLang } from './i18n'

export function About() {
  const aboutEl = document.createElement('section')
  aboutEl.id = 'metodologia'

  function render() {
    const lang = getLang()

    aboutEl.className = 'py-24 max-w-7xl mx-auto px-6'
    aboutEl.innerHTML = `
      <!-- Section Header -->
      <div class="text-center mb-16 reveal">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
          <span class="w-2 h-2 bg-[#14b8a6] rounded-full"></span>
          <span class="text-xs text-gray-400 uppercase tracking-wider">${lang === 'en' ? 'Our Approach' : 'Nuestro Enfoque'}</span>
        </div>
        <h2 class="text-4xl md:text-5xl font-display font-medium text-white mb-6">
          ${lang === 'en' ? "We're not just another" : 'No somos solo otra'}<br>
          <span class="text-gradient-primary">${lang === 'en' ? 'code agency' : 'agencia de código'}</span>
        </h2>
        <p class="text-lg text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
          ${lang === 'en'
            ? 'Our approach combines enterprise systems architecture with startup agility. We eliminate bureaucracy to deliver value from Sprint 1.'
            : 'Nuestro enfoque combina arquitectura de sistemas empresarial con la agilidad de una startup. Eliminamos la burocracia para entregar valor desde el Sprint 1.'}
        </p>
      </div>

      <!-- Stats Row -->
      <div class="flex flex-wrap justify-center gap-8 md:gap-16 mb-16 reveal reveal-delay-1">
        <div class="text-center">
          <div class="text-4xl md:text-5xl font-display font-medium text-[#2dd4bf] mb-2">200+</div>
          <div class="text-xs text-gray-500 uppercase tracking-wider">${lang === 'en' ? 'Projects Shipped' : 'Proyectos Enviados'}</div>
        </div>
        <div class="text-center">
          <div class="text-4xl md:text-5xl font-display font-medium text-[#2dd4bf] mb-2">98%</div>
          <div class="text-xs text-gray-500 uppercase tracking-wider">${lang === 'en' ? 'Client Retention' : 'Retención Clientes'}</div>
        </div>
        <div class="text-center">
          <div class="text-4xl md:text-5xl font-display font-medium text-[#2dd4bf] mb-2">24h</div>
          <div class="text-xs text-gray-500 uppercase tracking-wider">${lang === 'en' ? 'Response Time' : 'Tiempo Respuesta'}</div>
        </div>
      </div>

      <!-- Unified Bento Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        <!-- Step 1: Architecture -->
        <div class="reveal reveal-delay-1">
          <div class="glass-card rounded-2xl p-6 h-full group hover:border-[#14b8a6]/30 transition-all duration-300">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-12 h-12 rounded-xl bg-[#14b8a6]/10 border border-[#14b8a6]/20 flex items-center justify-center text-[#2dd4bf] font-mono text-lg font-bold group-hover:bg-[#14b8a6]/20 transition-colors">
                01
              </div>
              <h3 class="text-lg font-display font-medium text-white">${lang === 'en' ? 'Architecture & Discovery' : 'Arquitectura & Discovery'}</h3>
            </div>
            <p class="text-sm text-gray-400 leading-relaxed">
              ${lang === 'en'
                ? 'We break down your problem. Define the ideal tech stack (AWS, Azure, Vercel) and design scalable database schemas before writing a single line of code.'
                : 'Desglosamos tu problema. Definimos el stack tecnológico ideal (AWS, Azure, Vercel) y diseñamos esquemas de bases de datos escalables antes de escribir una línea de código.'}
            </p>
          </div>
        </div>

        <!-- Step 2: Development -->
        <div class="reveal reveal-delay-2">
          <div class="glass-card rounded-2xl p-6 h-full group hover:border-[#14b8a6]/30 transition-all duration-300">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-12 h-12 rounded-xl bg-[#14b8a6]/10 border border-[#14b8a6]/20 flex items-center justify-center text-[#2dd4bf] font-mono text-lg font-bold group-hover:bg-[#14b8a6]/20 transition-colors">
                02
              </div>
              <h3 class="text-lg font-display font-medium text-white">${lang === 'en' ? 'Sprint-Based Dev' : 'Desarrollo Sprint-Based'}</h3>
            </div>
            <p class="text-sm text-gray-400 leading-relaxed">
              ${lang === 'en'
                ? '2-week development cycles with tangible deliverables. Continuous integration (CI/CD) and automated tests to ensure zero regressions.'
                : 'Ciclos de desarrollo de 2 semanas con entregables tangibles. Integración continua (CI/CD) y tests automatizados para garantizar cero regresiones.'}
            </p>
          </div>
        </div>

        <!-- Step 3: Launch -->
        <div class="reveal reveal-delay-3">
          <div class="glass-card rounded-2xl p-6 h-full group hover:border-[#14b8a6]/30 transition-all duration-300">
            <div class="flex items-center gap-4 mb-4">
              <div class="w-12 h-12 rounded-xl bg-[#14b8a6]/10 border border-[#14b8a6]/20 flex items-center justify-center text-[#2dd4bf] font-mono text-lg font-bold group-hover:bg-[#14b8a6]/20 transition-colors">
                03
              </div>
              <h3 class="text-lg font-display font-medium text-white">${lang === 'en' ? 'Launch & AI Scaling' : 'Lanzamiento & IA'}</h3>
            </div>
            <p class="text-sm text-gray-400 leading-relaxed">
              ${lang === 'en'
                ? 'Production deployment. Real-time monitoring. Post-launch, we integrate AI modules to optimize processes based on real data.'
                : 'Despliegue en producción. Monitoreo en tiempo real. Post-lanzamiento, integramos módulos de IA para optimizar procesos basándonos en datos reales.'}
            </p>
          </div>
        </div>

        <!-- Consulting Card (Wide) with Flow Animation -->
        <div class="md:col-span-2 reveal reveal-delay-4">
          <div class="glass-card rounded-2xl p-1 h-full group">
            <div class="relative h-full rounded-xl bg-[#080808] overflow-hidden p-6 md:p-8 min-h-[280px]">
              <!-- Grid Pattern -->
              <div class="absolute inset-0 opacity-[0.08]" style="background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0); background-size: 24px 24px;"></div>

              <!-- Flow Diagram -->
              <div class="relative w-full h-28 flex items-center justify-between px-4 md:px-12 mb-6">
                <!-- Connection Line -->
                <div class="absolute top-1/2 left-16 right-16 h-[1px] bg-white/10"></div>
                <!-- Animated Stream -->
                <div class="absolute top-1/2 left-8 h-[2px] w-16 bg-gradient-to-r from-transparent via-[#14b8a6] to-transparent animate-stream blur-[1px]"></div>

                <!-- Left Icon -->
                <div class="relative z-10 w-12 h-12 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center group-hover:border-[#14b8a6]/50 transition-colors duration-300">
                  <svg class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>

                <!-- Center Icon (Main) -->
                <div class="relative z-10">
                  <div class="absolute inset-0 bg-[#14b8a6]/20 blur-2xl rounded-full scale-150"></div>
                  <div class="w-16 h-16 rounded-2xl bg-[#050505] border border-[#14b8a6]/40 flex items-center justify-center shadow-2xl relative group-hover:scale-110 group-hover:border-[#14b8a6]/60 transition-all duration-500">
                    <svg class="w-8 h-8 text-[#2dd4bf]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                </div>

                <!-- Right Icon -->
                <div class="relative z-10 w-12 h-12 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center group-hover:border-[#14b8a6]/50 transition-colors duration-300">
                  <svg class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                </div>
              </div>

              <!-- Content -->
              <div class="relative z-10">
                <h3 class="text-xl md:text-2xl font-display font-medium text-white mb-2">
                  ${lang === 'en' ? 'High-Level Consulting' : 'Consultoría de Alto Nivel'}
                </h3>
                <p class="text-sm text-gray-400 leading-relaxed max-w-lg">
                  ${lang === 'en'
                    ? "We don't just implement software; we design your company's digital architecture. Deep analysis, tailored strategy, and secure implementation."
                    : 'No solo implementamos software; diseñamos la arquitectura digital de tu empresa. Análisis profundo, estrategia a medida e implementación segura.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Academy Card -->
        <div class="reveal reveal-delay-5">
          <div class="glass-card rounded-2xl p-1 h-full group">
            <div class="relative h-full rounded-xl bg-[#080808] overflow-hidden p-6 flex flex-col">
              <!-- Animated Circles -->
              <div class="relative flex-1 flex items-center justify-center mb-4 min-h-[120px]">
                <div class="absolute w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
                <div class="relative w-24 h-24 border border-dashed border-white/10 rounded-full animate-spin-slow flex items-center justify-center">
                  <div class="w-16 h-16 border border-dotted border-white/20 rounded-full animate-spin-reverse"></div>
                </div>
                <!-- Center Icon -->
                <div class="absolute inset-0 flex items-center justify-center">
                  <svg class="w-8 h-8 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                </div>
              </div>

              <!-- Content -->
              <div>
                <h3 class="text-lg font-display font-medium text-white mb-2">Nexa Academy</h3>
                <p class="text-sm text-gray-400 leading-relaxed">
                  ${lang === 'en'
                    ? 'Executive and technical training. We prepare your team to live and create with AI.'
                    : 'Formación ejecutiva y técnica. Preparamos a tu equipo para convivir y crear con la IA.'}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    `

    initReveal(aboutEl)
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

  render()
  onLangChange(render)
  return aboutEl
}
