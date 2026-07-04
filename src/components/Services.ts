// ══════════════════════════════════════════════════════════════════════════════
// SERVICES — refined bento grid, six services from the canonical brief.
// Featured card (AI Agents & Integration) spans 2 columns; a small ink
// terminal card completes the grid and carries the engineering mono voice.
// ══════════════════════════════════════════════════════════════════════════════
import { t, onLangChange } from './i18n'
import { observeReveals } from '../utils/motion'

type ServiceKey = '1' | '2' | '3' | '4' | '5' | '6'

const ICONS: Record<ServiceKey, string> = {
  // Estrategia — compass
  '1': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0v-2m0-14v2m7 5h-2M7 12H5m10.5-3.5L13 13l-4.5 2.5L11 11l4.5-2.5z"/>',
  // Desarrollo — code brackets
  '2': '<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/>',
  // Agentes — cpu
  '3': '<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z"/>',
  // Cloud
  '4': '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"/>',
  // Seguridad — shield check
  '5': '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>',
  // Capacitación — academic cap
  '6': '<path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/>',
}

function iconBox(key: ServiceKey): string {
  return `
    <div class="w-10 h-10 flex-none rounded-lg border border-line bg-bg flex items-center justify-center" aria-hidden="true">
      <svg class="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">${ICONS[key]}</svg>
    </div>
  `
}

function serviceCard(key: ServiceKey, extraClasses = '', reveal = ''): string {
  return `
    <article class="card card-hover p-7 flex flex-col gap-4 reveal ${reveal} ${extraClasses}">
      ${iconBox(key)}
      <h3 class="font-display font-semibold text-xl text-ink">${t(`services_${key}_title` as const)}</h3>
      <p class="text-slate text-[0.9375rem] leading-relaxed">${t(`services_${key}_desc` as const)}</p>
    </article>
  `
}

export function Services() {
  const el = document.createElement('section')
  el.id = 'servicios'

  const render = () => {
    el.className = 'px-6 py-24'
    el.innerHTML = `
      <div class="max-w-content mx-auto">
        <p class="eyebrow reveal">${t('services_eyebrow')}</p>
        <h2 class="display display-title mt-4 reveal reveal-d1">${t('services_title')}</h2>

        <div class="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <!-- Featured: AI Agents & Integration (spans 2 columns) -->
          <article class="card card-hover p-7 flex flex-col gap-4 reveal md:col-span-2">
            ${iconBox('3')}
            <h3 class="font-display font-semibold text-2xl text-ink">${t('services_3_title')}</h3>
            <p class="text-slate leading-relaxed max-w-xl">${t('services_3_desc')}</p>
          </article>

          ${serviceCard('1', '', 'reveal-d1')}
          ${serviceCard('2', '', 'reveal-d1')}
          ${serviceCard('4', '', 'reveal-d2')}
          ${serviceCard('5', '', 'reveal-d2')}
          ${serviceCard('6', '', 'reveal-d3')}

          <!-- Ink terminal card: decorative engineering voice, completes the grid -->
          <div class="card p-0 overflow-hidden reveal reveal-d3 lg:col-span-2 !bg-ink !border-ink" aria-hidden="true">
            <div class="flex items-center gap-1.5 px-5 py-3 border-b border-white/10">
              <span class="w-2.5 h-2.5 rounded-full bg-white/20"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-white/20"></span>
              <span class="w-2.5 h-2.5 rounded-full bg-white/20"></span>
              <span class="ml-3 font-mono text-xs text-white/40">nexadigit.config.ts</span>
            </div>
            <pre class="px-5 py-4 font-mono text-[0.8125rem] leading-relaxed text-white/80 overflow-x-auto"><code>export const config = {
  stack:  'modern',
  agents: '24/7',
  ai:     true,
}</code></pre>
          </div>
        </div>
      </div>
    `

    observeReveals(el)
  }

  render()
  onLangChange(render)
  return el
}
