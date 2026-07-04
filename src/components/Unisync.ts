// ══════════════════════════════════════════════════════════════════════════════
// UNISYNC — product band. Distinct treatment: full-width surface band framed
// by hairline borders, light-dominant. Four capabilities + external CTA.
// ══════════════════════════════════════════════════════════════════════════════
import { t, onLangChange } from './i18n'
import { observeReveals } from '../utils/motion'

const FEATURES = ['1', '2', '3', '4'] as const

const FEATURE_ICONS: Record<(typeof FEATURES)[number], string> = {
  // Agentes — bolt in circle
  '1': '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>',
  // Gestión centralizada — squares grid
  '2': '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/>',
  // Analítica — chart bars
  '3': '<path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>',
  // Módulos — puzzle
  '4': '<path stroke-linecap="round" stroke-linejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z"/>',
}

export function Unisync() {
  const el = document.createElement('section')
  el.id = 'unisync'

  function render() {
    el.className = 'border-y border-line bg-surface'
    el.innerHTML = `
      <div class="max-w-content mx-auto px-6 py-24">
        <p class="eyebrow eyebrow--accent reveal">${t('unisync_eyebrow')}</p>
        <h2 class="display display-title mt-4 max-w-3xl reveal reveal-d1">${t('unisync_title')}</h2>
        <p class="lede mt-6 reveal reveal-d2">${t('unisync_lede')}</p>

        <div class="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          ${FEATURES.map(
            (n, i) => `
            <div class="flex flex-col gap-3 reveal reveal-d${i + 1}">
              <div class="w-10 h-10 rounded-lg border border-line bg-bg flex items-center justify-center" aria-hidden="true">
                <svg class="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">${FEATURE_ICONS[n]}</svg>
              </div>
              <h3 class="font-display font-semibold text-lg text-ink">${t(`unisync_ft${n}_title` as const)}</h3>
              <p class="text-slate text-[0.9375rem] leading-relaxed">${t(`unisync_ft${n}_desc` as const)}</p>
            </div>
          `
          ).join('')}
        </div>

        <div class="mt-14 reveal">
          <a href="https://unisync.ai" target="_blank" rel="noopener noreferrer" class="btn-secondary">
            ${t('unisync_cta')}
            <svg class="btn-arrow w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
            </svg>
            <span class="sr-only">(${t('a11y_external')})</span>
          </a>
        </div>
      </div>
    `

    observeReveals(el)
  }

  render()
  onLangChange(render)
  return el
}
