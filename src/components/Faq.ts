// ══════════════════════════════════════════════════════════════════════════════
// PREGUNTAS — single-open accordion. Left column holds the heading, right column
// the five questions. Grid-rows transition gives the smooth open/close.
// ══════════════════════════════════════════════════════════════════════════════
import { t, onLangChange } from './i18n'
import { observeReveals } from '../utils/motion'

const ITEMS = [
  { q: 'faq_1_q', a: 'faq_1_a' },
  { q: 'faq_2_q', a: 'faq_2_a' },
  { q: 'faq_3_q', a: 'faq_3_a' },
  { q: 'faq_4_q', a: 'faq_4_a' },
  { q: 'faq_5_q', a: 'faq_5_a' },
] as const

const CHEVRON =
  '<svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 5l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>'

export function Faq() {
  const el = document.createElement('section')
  el.id = 'preguntas'
  el.setAttribute('data-screen-label', 'Preguntas')
  el.style.borderBottom = '1px solid var(--line)'

  let openIndex = 0

  const render = () => {
    el.innerHTML = `
      <div class="nd-wrap nd-faq-grid" style="padding:104px clamp(20px,5vw,40px) 112px;border-left:1px solid var(--line);border-right:1px solid var(--line);display:grid;grid-template-columns:1fr 1.4fr;gap:72px;align-items:start;">
        <div>
          <div class="reveal nd-eyebrow" style="margin-bottom:20px;">${t('faq_eyebrow')}</div>
          <h2 class="reveal" style="--reveal-delay:80ms;margin:0;font-family:var(--font-display);font-weight:700;font-size:46px;letter-spacing:-0.03em;line-height:1.08;color:var(--ink);">${t('faq_title')}</h2>
        </div>
        <div class="reveal" style="--reveal-delay:140ms;">
          ${ITEMS.map(
            (it, i) => `
            <div class="nd-faq-item${i === openIndex ? ' open' : ''}">
              <div class="nd-faq-q" data-faq="${i}">
                <span>${t(it.q)}</span>
                <span class="nd-faq-icon">${CHEVRON}</span>
              </div>
              <div class="nd-faq-body"><div><p>${t(it.a)}</p></div></div>
            </div>`
          ).join('')}
        </div>
      </div>
    `

    el.querySelectorAll<HTMLElement>('[data-faq]').forEach((q) => {
      q.addEventListener('click', () => {
        const i = Number(q.dataset.faq)
        openIndex = openIndex === i ? -1 : i
        el.querySelectorAll<HTMLElement>('.nd-faq-item').forEach((item, idx) => {
          item.classList.toggle('open', idx === openIndex)
        })
      })
    })

    observeReveals(el)
  }

  render()
  onLangChange(render)
  return el
}
