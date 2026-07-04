// ══════════════════════════════════════════════════════════════════════════════
// CÓMO TRABAJAMOS — four numbered steps on a horizontal rail (order is real
// information here); collapses to a vertical list on mobile.
// ══════════════════════════════════════════════════════════════════════════════
import { t, onLangChange } from './i18n'
import { observeReveals } from '../utils/motion'

const STEPS = ['1', '2', '3', '4'] as const

export function Process() {
  const el = document.createElement('section')
  el.id = 'proceso'

  const render = () => {
    el.className = 'px-6 py-24'
    el.innerHTML = `
      <div class="max-w-content mx-auto">
        <p class="eyebrow reveal">${t('process_eyebrow')}</p>
        <h2 class="display display-title mt-4 reveal reveal-d1">${t('process_title')}</h2>

        <ol class="step-rail mt-14 grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-10 list-none">
          ${STEPS.map(
            (n, i) => `
            <li class="flex md:flex-col gap-5 md:gap-6 reveal reveal-d${i + 1}">
              <div class="flex md:block flex-col items-center gap-2">
                <span class="step-dot" aria-hidden="true"></span>
                <span class="hidden md:inline-block step-number mt-4">0${n}</span>
                <span class="md:hidden flex-1 w-px bg-line" aria-hidden="true"></span>
              </div>
              <div class="pb-2">
                <span class="md:hidden step-number">0${n}</span>
                <h3 class="font-display font-semibold text-lg text-ink mt-1 md:mt-0">${t(`process_${n}_title` as const)}</h3>
                <p class="text-slate text-[0.9375rem] leading-relaxed mt-2">${t(`process_${n}_desc` as const)}</p>
              </div>
            </li>
          `
          ).join('')}
        </ol>
      </div>
    `

    observeReveals(el)
  }

  render()
  onLangChange(render)
  return el
}
