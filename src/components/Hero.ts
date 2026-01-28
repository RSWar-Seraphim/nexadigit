// ══════════════════════════════════════════════════════════════════════════════
// HERO COMPONENT - Premium Dark Design (Enhanced)
// Interactive 3D dashboard with floating particles and dramatic effects
// ══════════════════════════════════════════════════════════════════════════════
import { getLang, onLangChange } from './i18n'

export function Hero() {
  const hero = document.createElement('section')
  hero.id = 'home'

  const render = () => {
    const lang = getLang()

    hero.className = 'relative min-h-screen pt-32 pb-20 flex flex-col justify-center items-center overflow-hidden perspective-container'
    hero.innerHTML = `
      <!-- Background Grid -->
      <div class="bg-grid"></div>

      <!-- Floating Particles -->
      <div class="hero-particles">
        <div class="particle particle-1"></div>
        <div class="particle particle-2"></div>
        <div class="particle particle-3"></div>
        <div class="particle particle-4"></div>
        <div class="particle particle-5"></div>
        <div class="particle particle-6"></div>
      </div>

      <!-- Light Beams -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="light-beam light-beam-1"></div>
        <div class="light-beam light-beam-2"></div>
      </div>

      <!-- Dynamic Hero Glow (Follows Mouse) - Enhanced -->
      <div id="hero-glow" class="absolute w-[900px] h-[900px] rounded-full blur-[150px] pointer-events-none opacity-50 mix-blend-screen transition-all duration-100 ease-out z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style="background: radial-gradient(circle, rgba(20,184,166,0.15) 0%, rgba(139,92,246,0.05) 50%, transparent 70%);"></div>

      <!-- Secondary Ambient Glows -->
      <div class="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse-slow"></div>
      <div class="fixed bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#14b8a6]/5 rounded-full blur-[100px] pointer-events-none z-0 animate-pulse-slow" style="animation-delay: 1s;"></div>

      <!-- Grid Overlay with Mask -->
      <div class="absolute inset-0 bg-grid-hero pointer-events-none z-0"></div>

      <!-- Main Content -->
      <div class="relative z-10 max-w-5xl w-full mx-auto px-6 text-center">
        <!-- Announcement Badge - Enhanced -->
        <div class="hero-badge badge mb-8 cursor-pointer group">
          <span class="badge-label animate-pulse">${lang === 'en' ? 'New' : 'Nuevo'}</span>
          <span class="badge-text flex items-center gap-1">
            UniSync v2.0 ${lang === 'en' ? 'available' : 'disponible'}
            <svg class="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </span>
        </div>

        <!-- Main Headline - Enhanced with Split Animation -->
        <h1 class="hero-title text-display tracking-tighter mb-8">
          <span class="hero-title-line inline-block">
            ${lang === 'en' ? 'Digital Engineering' : 'Ingeniería Digital'}
          </span>
          <br>
          <span class="hero-title-gradient text-gradient-primary relative inline-block">
            ${lang === 'en' ? 'Powered by AI' : 'Potenciada por IA'}
            <!-- Animated Underline -->
            <svg class="hero-underline absolute w-full h-4 -bottom-2 left-0 text-[#14b8a6]" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path class="underline-path" d="M0 5 Q 25 0, 50 5 T 100 5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>
            </svg>
            <!-- Sparkle Effect -->
            <span class="sparkle sparkle-1">✦</span>
            <span class="sparkle sparkle-2">✦</span>
          </span>
        </h1>

        <!-- Subtitle with Fade-in Words -->
        <p class="hero-subtitle text-lg md:text-xl text-gray-400 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
          ${lang === 'en'
            ? 'We design <span class="text-white/80">scalable software ecosystems</span> powered by <span class="text-[#2dd4bf]">artificial intelligence</span>. We transform complex code into simple experiences.'
            : 'Diseñamos <span class="text-white/80">ecosistemas de software escalables</span> impulsados por <span class="text-[#2dd4bf]">inteligencia artificial</span>. Transformamos código complejo en experiencias simples.'}
        </p>

        <!-- Action Buttons - Enhanced -->
        <div class="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-5 mb-20 relative z-20">
          <a href="#contact" data-book-meeting class="btn-primary btn-spotlight group relative overflow-hidden">
            <span class="relative z-10 flex items-center gap-2">
              ${lang === 'en' ? 'Schedule Consultation' : 'Agendar Consultoría'}
              <svg class="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </span>
            <!-- Button Shine Effect -->
            <div class="btn-shine"></div>
          </a>
          <button onclick="document.getElementById('unisync').scrollIntoView({behavior: 'smooth'})" class="btn-secondary group">
            <div class="w-7 h-7 rounded-full bg-[#14b8a6]/20 flex items-center justify-center text-[#2dd4bf] group-hover:bg-[#14b8a6] group-hover:text-white group-hover:scale-110 transition-all duration-300">
              <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <span>${lang === 'en' ? 'Watch Showreel' : 'Ver Showreel'}</span>
          </button>
        </div>

        <!-- 3D INTERACTIVE DASHBOARD PREVIEW - Enhanced -->
        <div class="hero-dashboard relative w-full max-w-4xl mx-auto">
          <!-- Animated Gradient Border -->
          <div class="dashboard-glow absolute -inset-[1px] rounded-t-2xl opacity-60 z-0"></div>

          <!-- Card Reflection -->
          <div class="dashboard-reflection absolute -bottom-20 left-1/2 -translate-x-1/2 w-[80%] h-20 opacity-20 blur-sm z-0"></div>

          <div id="tilt-card" class="tilt-card relative w-full rounded-t-2xl border border-white/10 bg-[#080808]/90 backdrop-blur-xl shadow-2xl overflow-hidden group z-10">
            <!-- Scan Line Effect -->
            <div class="scan-line"></div>

            <!-- Reflection Shine -->
            <div class="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20"></div>

            <!-- Header of Window -->
            <div class="terminal-header relative">
              <div class="terminal-dots">
                <div class="terminal-dot red"></div>
                <div class="terminal-dot yellow"></div>
                <div class="terminal-dot green"></div>
              </div>
              <div class="terminal-url">
                <svg class="w-3 h-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
                <span>api.nexadigit.io/v2/dashboard</span>
              </div>
              <!-- Live Indicator -->
              <div class="flex items-center gap-1.5 text-[10px] text-green-400">
                <span class="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                LIVE
              </div>
            </div>

            <!-- Content Simulation -->
            <div class="p-6 grid grid-cols-12 gap-6 h-full bg-grid-small relative min-h-[300px] md:min-h-[380px]">
              <!-- Left Panel (Hidden on mobile) -->
              <div class="col-span-3 hidden md:flex flex-col gap-3 border-r border-white/5 pr-6">
                <div class="h-8 w-full bg-white/5 rounded animate-pulse"></div>
                <div class="h-4 w-2/3 bg-white/5 rounded opacity-50"></div>
                <div class="h-4 w-3/4 bg-white/5 rounded opacity-50"></div>

                <!-- Mini Stats -->
                <div class="mt-4 space-y-3">
                  <div class="flex items-center justify-between text-[10px]">
                    <span class="text-gray-500">CPU</span>
                    <span class="text-[#2dd4bf]">24%</span>
                  </div>
                  <div class="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div class="h-full w-[24%] bg-gradient-to-r from-[#14b8a6] to-[#2dd4bf] rounded-full"></div>
                  </div>
                  <div class="flex items-center justify-between text-[10px]">
                    <span class="text-gray-500">Memory</span>
                    <span class="text-purple-400">67%</span>
                  </div>
                  <div class="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div class="h-full w-[67%] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  </div>
                </div>

                <div class="mt-auto p-3 rounded-lg bg-[#134e4a]/20 border border-[#14b8a6]/20">
                  <div class="text-[10px] text-[#2dd4bf] mb-1">System Status</div>
                  <div class="flex items-center gap-2 text-xs text-white">
                    <span class="w-2 h-2 bg-[#14b8a6] rounded-full animate-pulse"></span>
                    Operational
                  </div>
                </div>
              </div>

              <!-- Main Panel -->
              <div class="col-span-12 md:col-span-9 flex flex-col justify-between">
                <div class="flex justify-between items-end mb-6">
                  <div>
                    <div class="text-xs text-gray-500 mb-1">Total Revenue</div>
                    <div class="text-3xl md:text-4xl font-display text-white flex items-baseline gap-2">
                      <span class="revenue-counter">$124,500</span>
                      <span class="text-xs text-green-400 flex items-center gap-0.5">
                        <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
                        </svg>
                        +23.5%
                      </span>
                    </div>
                  </div>
                  <div class="flex gap-2">
                    <div class="px-3 py-1.5 rounded-lg bg-[#14b8a6]/20 border border-[#14b8a6]/30 text-[10px] text-[#2dd4bf] font-medium">Week</div>
                    <div class="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] text-gray-500">Month</div>
                  </div>
                </div>

                <!-- Chart Area - Enhanced -->
                <div class="relative h-40 w-full flex items-end gap-1.5 px-2 pb-0 border-b border-white/5">
                  <!-- Chart Grid Lines -->
                  <div class="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                    <div class="border-b border-dashed border-white/20"></div>
                    <div class="border-b border-dashed border-white/20"></div>
                    <div class="border-b border-dashed border-white/20"></div>
                  </div>

                  <!-- Animated Bars -->
                  <div class="chart-bar w-full bg-gradient-to-t from-[#14b8a6]/30 to-[#14b8a6]/5 rounded-t-sm relative" style="--bar-height: 35%;">
                    <div class="absolute inset-0 bg-gradient-to-t from-[#14b8a6]/20 to-transparent opacity-0 hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div class="chart-bar w-full bg-gradient-to-t from-[#14b8a6]/30 to-[#14b8a6]/5 rounded-t-sm" style="--bar-height: 55%; animation-delay: 0.1s;"></div>
                  <div class="chart-bar w-full bg-gradient-to-t from-[#14b8a6]/30 to-[#14b8a6]/5 rounded-t-sm" style="--bar-height: 42%; animation-delay: 0.2s;"></div>
                  <div class="chart-bar w-full bg-gradient-to-t from-[#14b8a6]/30 to-[#14b8a6]/5 rounded-t-sm" style="--bar-height: 68%; animation-delay: 0.3s;"></div>
                  <div class="chart-bar w-full bg-gradient-to-t from-[#14b8a6]/30 to-[#14b8a6]/5 rounded-t-sm" style="--bar-height: 52%; animation-delay: 0.4s;"></div>
                  <div class="chart-bar w-full bg-gradient-to-t from-[#14b8a6]/30 to-[#14b8a6]/5 rounded-t-sm" style="--bar-height: 75%; animation-delay: 0.5s;"></div>
                  <div class="chart-bar w-full bg-gradient-to-t from-[#14b8a6]/30 to-[#14b8a6]/5 rounded-t-sm" style="--bar-height: 60%; animation-delay: 0.6s;"></div>
                  <div class="chart-bar chart-bar-active w-full bg-gradient-to-t from-[#14b8a6]/50 to-[#2dd4bf]/20 rounded-t-sm border-t-2 border-[#2dd4bf]" style="--bar-height: 92%; animation-delay: 0.7s;">
                    <!-- Glow on active bar -->
                    <div class="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#2dd4bf] rounded-full blur-md"></div>
                    <!-- Tooltip -->
                    <div class="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-black text-[10px] font-medium rounded shadow-lg whitespace-nowrap">
                      $18,420
                    </div>
                  </div>
                </div>

                <!-- Chart Labels -->
                <div class="flex justify-between text-[9px] text-gray-500 mt-2 px-1">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                  <span class="text-[#2dd4bf] font-medium">Today</span>
                </div>
              </div>
            </div>

            <!-- Bottom Fade -->
            <div class="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#050505] to-transparent z-20"></div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator - Enhanced -->
      <div class="scroll-indicator-wrapper absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span class="text-[10px] text-gray-500 uppercase tracking-widest">${lang === 'en' ? 'Scroll' : 'Desliza'}</span>
        <div class="scroll-indicator">
          <div class="scroll-dot"></div>
        </div>
      </div>
    `

    // Initialize entrance animations with stagger
    requestAnimationFrame(() => {
      const elements = [
        '.hero-badge',
        '.hero-title-line',
        '.hero-title-gradient',
        '.hero-subtitle',
        '.hero-buttons',
        '.hero-dashboard'
      ]

      elements.forEach((selector, i) => {
        const el = hero.querySelector(selector)
        if (el) {
          setTimeout(() => {
            el.classList.add('hero-visible')
          }, 150 + (i * 120))
        }
      })
    })

    // Setup 3D tilt effect
    setup3DEffect()
  }

  function setup3DEffect() {
    const card = hero.querySelector('#tilt-card') as HTMLElement
    const glow = hero.querySelector('#hero-glow') as HTMLElement
    const dashboardGlow = hero.querySelector('.dashboard-glow') as HTMLElement
    if (!card || !glow) return

    let rafId: number | null = null

    hero.addEventListener('mousemove', (e: MouseEvent) => {
      if (rafId) return

      rafId = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        // Move glow with smooth transition
        glow.style.left = `${x}px`
        glow.style.top = `${y}px`
        glow.style.transform = 'translate(-50%, -50%)'

        // Tilt card with enhanced effect
        const cardRect = card.getBoundingClientRect()
        const cardCenterX = cardRect.left + cardRect.width / 2
        const cardCenterY = cardRect.top + cardRect.height / 2
        const maxRotation = 8

        const rotateY = ((e.clientX - cardCenterX) / (window.innerWidth / 2)) * maxRotation
        const rotateX = -((e.clientY - cardCenterY) / (window.innerHeight / 2)) * maxRotation

        card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`

        // Move dashboard glow
        if (dashboardGlow) {
          const glowX = ((e.clientX - cardRect.left) / cardRect.width) * 100
          const glowY = ((e.clientY - cardRect.top) / cardRect.height) * 100
          dashboardGlow.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(20,184,166,0.4) 0%, rgba(139,92,246,0.2) 30%, transparent 60%)`
        }

        rafId = null
      })
    })

    hero.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
      if (dashboardGlow) {
        dashboardGlow.style.background = ''
      }
    })
  }

  render()
  onLangChange(render)

  return hero
}

// Clients/Trust Section
export function Clients() {
  const section = document.createElement('section')
  section.id = 'clients'

  const render = () => {
    const lang = getLang()

    section.className = 'border-y border-white/5 bg-white/[0.02]'
    section.innerHTML = `
      <div class="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <p class="text-xs text-gray-500 uppercase tracking-widest whitespace-nowrap">
          ${lang === 'en' ? 'Trusted by:' : 'Con la confianza de:'}
        </p>
        <div class="flex flex-wrap justify-center md:justify-end gap-12 opacity-50 grayscale">
          <div class="flex items-center gap-2 text-white font-display font-bold text-lg">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>
            ACME Corp
          </div>
          <div class="flex items-center gap-2 text-white font-display font-bold text-lg">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            STACK
          </div>
          <div class="flex items-center gap-2 text-white font-display font-bold text-lg">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z"/></svg>
            ORBITAL
          </div>
          <div class="flex items-center gap-2 text-white font-display font-bold text-lg">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            FLASH
          </div>
        </div>
      </div>
    `
  }

  render()
  onLangChange(render)
  return section
}

// Empresa Bento Grid Section
export function Empresa() {
  const section = document.createElement('section')
  section.id = 'empresa'

  const render = () => {
    const lang = getLang()

    section.className = 'pt-6 pb-20 max-w-7xl mx-auto px-6'
    section.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- Main Card: Consultoría -->
        <div class="lg:col-span-2 group reveal">
          <div class="glass-card rounded-2xl p-1 h-full">
            <div class="relative h-full rounded-xl bg-[#080808] overflow-hidden p-8 flex flex-col justify-between min-h-[320px]">
              <!-- Grid Pattern -->
              <div class="absolute inset-0 opacity-[0.08]" style="background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0); background-size: 24px 24px;"></div>

              <!-- Flow Diagram -->
              <div class="relative w-full h-32 flex items-center justify-between px-4 md:px-16 mt-6">
                <!-- Connection Line -->
                <div class="absolute top-1/2 left-10 right-10 h-[1px] bg-white/10"></div>
                <!-- Animated Stream -->
                <div class="absolute top-1/2 left-0 h-[1px] w-20 bg-gradient-to-r from-transparent via-[#14b8a6] to-transparent animate-stream blur-[1px]"></div>

                <!-- Left Icon -->
                <div class="relative z-10 w-14 h-14 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center group-hover:border-[#14b8a6]/50 transition-colors">
                  <svg class="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>

                <!-- Center Icon (Main) -->
                <div class="relative z-10">
                  <div class="absolute inset-0 bg-[#14b8a6]/20 blur-2xl rounded-full"></div>
                  <div class="w-20 h-20 rounded-2xl bg-[#050505] border border-[#14b8a6]/30 flex items-center justify-center shadow-2xl relative group-hover:scale-105 transition-transform duration-500">
                    <svg class="w-10 h-10 text-[#2dd4bf]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                </div>

                <!-- Right Icon -->
                <div class="relative z-10 w-14 h-14 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center group-hover:border-[#14b8a6]/50 transition-colors">
                  <svg class="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                </div>
              </div>

              <!-- Content -->
              <div class="z-10 relative mt-8">
                <h3 class="flex items-center gap-2 text-2xl font-display font-medium text-white mb-3">
                  ${lang === 'en' ? 'High-Level Consulting' : 'Consultoría de Alto Nivel'}
                </h3>
                <p class="text-sm font-light text-gray-400 max-w-md leading-relaxed">
                  ${lang === 'en'
                    ? "We don't just implement software; we design your company's digital architecture. Deep analysis, tailored strategy, and secure implementation."
                    : 'No solo implementamos software; diseñamos la arquitectura digital de tu empresa. Análisis profundo, estrategia a medida e implementación segura.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Side Card: Nexa Academy -->
        <div class="lg:col-span-1 group reveal reveal-delay-1">
          <div class="glass-card rounded-2xl p-1 h-full">
            <div class="relative z-10 h-full rounded-xl bg-[#080808] overflow-hidden p-8 flex flex-col min-h-[320px]">

              <!-- Animated Circles -->
              <div class="relative flex-1 flex items-center justify-center mb-6">
                <div class="absolute w-40 h-40 bg-[#14b8a6]/10 rounded-full blur-3xl"></div>
                <div class="relative w-32 h-32 border border-dashed border-white/10 rounded-full animate-spin-slow flex items-center justify-center">
                  <div class="w-24 h-24 border border-dotted border-white/20 rounded-full animate-spin-reverse"></div>
                </div>
                <!-- Center Icon -->
                <div class="absolute inset-0 flex items-center justify-center">
                  <svg class="w-10 h-10 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                </div>
              </div>

              <!-- Content -->
              <div>
                <h3 class="text-xl font-display font-medium text-white mb-2">Nexa Academy</h3>
                <p class="text-sm text-gray-400 font-light leading-relaxed">
                  ${lang === 'en'
                    ? 'Executive and technical training. We prepare your team to live and create with Artificial Intelligence.'
                    : 'Formación ejecutiva y técnica. Preparamos a tu equipo para convivir y crear con la Inteligencia Artificial.'}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    `

    initReveal(section)
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
  return section
}
