// ══════════════════════════════════════════════════════════════════════════════
// PROOF OF OPERATION — slim terminal-inspired telemetry band
// The signature element: a rotating feed of real operational facts with
// pulsing signal dots. Hardcoded config for now, shaped so a real API can
// feed the same structure later. Pure builder: the Hero re-renders it on
// language change (no own onLangChange subscription).
// ══════════════════════════════════════════════════════════════════════════════
import { t } from './i18n'
import { prefersReducedMotion } from '../utils/motion'

interface ProofItem {
  site: string
  key: 'proof_item_1' | 'proof_item_2' | 'proof_item_3'
}

// Append an item here (and its i18n keys) to extend the feed.
export const PROOF_ITEMS: ProofItem[] = [
  { site: 'noticiasmma.com', key: 'proof_item_1' },
  { site: 'lahora24.com', key: 'proof_item_2' },
  { site: 'quisqueyanos.net', key: 'proof_item_3' },
]

const CYCLE_MS = 5000
let tickerTimer: number | undefined

export function ProofStrip(): HTMLElement {
  const el = document.createElement('div')
  el.className = 'proof-strip px-5 py-3.5'
  el.setAttribute('role', 'group')
  el.setAttribute('aria-label', t('proof_label'))

  el.innerHTML = `
    <div class="flex items-center gap-4">
      <span class="hidden sm:block flex-none text-[10px] uppercase tracking-[0.14em] text-slate select-none">
        ${t('proof_label')}
      </span>

      <!-- Visual ticker (decorative for AT; the static list below carries content) -->
      <div class="proof-ticker flex-1" aria-hidden="true">
        ${PROOF_ITEMS.map(
          (item, i) => `
          <div class="proof-item${i === 0 ? ' is-active' : ''}">
            <span class="signal-dot"></span>
            <span class="truncate">${t(item.key)}</span>
          </div>
        `
        ).join('')}
      </div>

      <!-- Full feed: sr-only normally; shown as a static list under reduced motion -->
      <ul class="proof-static flex-1">
        ${PROOF_ITEMS.map(
          (item) => `
          <li>
            <span class="signal-dot"></span>
            <span>${t(item.key)}</span>
          </li>
        `
        ).join('')}
      </ul>
    </div>
  `

  startTicker(el)
  return el
}

function startTicker(root: HTMLElement) {
  if (tickerTimer) {
    clearInterval(tickerTimer)
    tickerTimer = undefined
  }
  if (prefersReducedMotion()) return

  const items = Array.from(root.querySelectorAll<HTMLElement>('.proof-item'))
  if (items.length <= 1) return

  // Pausable on hover
  let paused = false
  root.addEventListener('mouseenter', () => (paused = true))
  root.addEventListener('mouseleave', () => (paused = false))

  let idx = 0
  tickerTimer = window.setInterval(() => {
    if (paused || !root.isConnected) return
    const current = items[idx]
    idx = (idx + 1) % items.length
    const next = items[idx]

    current.classList.remove('is-active')
    current.classList.add('is-leaving')
    next.classList.remove('is-leaving')
    next.classList.add('is-active')

    // Reset the exited item below the viewport once its transition ends
    setTimeout(() => current.classList.remove('is-leaving'), 550)
  }, CYCLE_MS)
}
