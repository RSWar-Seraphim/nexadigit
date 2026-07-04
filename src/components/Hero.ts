// ══════════════════════════════════════════════════════════════════════════════
// HERO — the one orchestrated moment (≤ 1.2s):
// headline lines reveal via clip + rise (stagger ~90ms) → subhead/CTAs fade →
// the Proof of Operation strip powers on (border draws in, dots settle).
// The sequence plays once per page load; language re-renders skip it.
// ══════════════════════════════════════════════════════════════════════════════
import { t, onLangChange } from './i18n'
import { ProofStrip } from './ProofStrip'
import { prefersReducedMotion } from '../utils/motion'

let heroPlayed = false

export function Hero() {
  const el = document.createElement('section')
  el.id = 'home'

  const render = () => {
    el.className = 'relative px-6 pt-[calc(var(--header-h)+9vh)] pb-20'
    el.innerHTML = `
      <div class="max-w-content mx-auto">
        <p class="eyebrow hero-fade" style="--hero-delay:140ms">${t('hero_eyebrow')}</p>

        <h1 class="display display-hero mt-6 max-w-[17ch]">
          <span class="hero-line" style="--hero-delay:0ms">${t('hero_headline_l1')}</span>
          <span class="hero-line" style="--hero-delay:90ms">${t('hero_headline_l2')}</span>
        </h1>

        <p class="lede mt-7 hero-fade" style="--hero-delay:320ms">${t('hero_subhead')}</p>

        <div class="mt-9 flex flex-wrap items-center gap-3 hero-fade" style="--hero-delay:430ms">
          <a href="#contact" data-book-meeting class="btn-primary">
            ${t('cta_book')}
            <svg class="btn-arrow w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
            </svg>
          </a>
          <a href="#activos" class="btn-secondary">
            ${t('hero_cta_secondary')}
            <svg class="btn-arrow w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
            </svg>
          </a>
        </div>

        <div id="proof-mount" class="mt-14 max-w-3xl hero-fade" style="--hero-delay:520ms"></div>
      </div>
    `

    const strip = ProofStrip()
    el.querySelector('#proof-mount')?.appendChild(strip)

    if (heroPlayed || prefersReducedMotion()) {
      // No replay on language change / reduced motion: land in final state.
      el.classList.add('hero-in')
      strip.classList.add('powered')
      heroPlayed = true
      return
    }

    heroPlayed = true
    // Double rAF so initial (hidden) styles are committed before transitioning.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.classList.add('hero-in')
        setTimeout(() => strip.classList.add('powered'), 600)
      })
    })
  }

  render()
  onLangChange(render)
  return el
}
