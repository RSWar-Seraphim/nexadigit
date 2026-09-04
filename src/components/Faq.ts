// ══════════════════════════════════════════════════════════════════════════════
// PREGUNTAS — single-open accordion. Left column holds the heading, right column
// the questions. Semantic: each question is an <h3> wrapping a <button
// aria-expanded aria-controls>; answers are always in the DOM (collapsed with a
// grid-rows transition) so crawlers and answer engines read them. The same
// FAQ_ITEMS array feeds the FAQPage JSON-LD (src/seo/schema.ts).
// Toggle behavior lives in src/client/faq.ts.
// ══════════════════════════════════════════════════════════════════════════════
import { tr, type Key, type Lang } from './i18n'

export const FAQ_ITEMS: ReadonlyArray<{ q: Key; a: Key }> = [
  { q: 'faq_1_q', a: 'faq_1_a' },
  { q: 'faq_2_q', a: 'faq_2_a' },
  { q: 'faq_3_q', a: 'faq_3_a' },
  { q: 'faq_4_q', a: 'faq_4_a' },
  { q: 'faq_5_q', a: 'faq_5_a' },
  { q: 'faq_6_q', a: 'faq_6_a' },
]

const CHEVRON =
  '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 5l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>'

export function faqMarkup(lang: Lang): string {
  const t = tr(lang)
  const openIndex = 0

  return `
    <section id="preguntas" data-screen-label="Preguntas" style="border-bottom:1px solid var(--line);">
      <div class="nd-wrap nd-faq-grid" style="padding:104px clamp(20px,5vw,40px) 112px;border-left:1px solid var(--line);border-right:1px solid var(--line);display:grid;grid-template-columns:1fr 1.4fr;gap:72px;align-items:start;">
        <div>
          <div class="reveal nd-eyebrow" style="margin-bottom:20px;">${t('faq_eyebrow')}</div>
          <h2 class="reveal" style="--reveal-delay:80ms;margin:0;font-family:var(--font-display);font-weight:700;font-size:46px;letter-spacing:-0.03em;line-height:1.08;color:var(--ink);">${t('faq_title')}</h2>
        </div>
        <div class="reveal" style="--reveal-delay:140ms;">
          ${FAQ_ITEMS.map(
            (it, i) => `
            <div class="nd-faq-item${i === openIndex ? ' open' : ''}">
              <h3 style="margin:0;">
                <button type="button" class="nd-faq-q" data-faq="${i}" id="faq-q-${i}" aria-expanded="${i === openIndex}" aria-controls="faq-a-${i}">
                  <span>${t(it.q)}</span>
                  <span class="nd-faq-icon">${CHEVRON}</span>
                </button>
              </h3>
              <div class="nd-faq-body" id="faq-a-${i}" role="region" aria-labelledby="faq-q-${i}"><div><p>${t(it.a)}</p></div></div>
            </div>`
          ).join('')}
        </div>
      </div>
    </section>
  `
}
