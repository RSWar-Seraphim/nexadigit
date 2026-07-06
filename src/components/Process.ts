// ══════════════════════════════════════════════════════════════════════════════
// CÓMO TRABAJAMOS — four numbered steps on a scroll-driven progress rail. The
// fill width, dot colors and step-number colors advance 01 → 04 as the section
// scrolls through the viewport (driven by interactions.ts).
// ══════════════════════════════════════════════════════════════════════════════
import { t, onLangChange } from './i18n'
import { observeReveals } from '../utils/motion'

const STEPS = [
  { n: '01', title: 'process_1_title', desc: 'process_1_desc', del: 'process_1_deliverable', delay: 0, pr: 36 },
  { n: '02', title: 'process_2_title', desc: 'process_2_desc', del: 'process_2_deliverable', delay: 90, pr: 36 },
  { n: '03', title: 'process_3_title', desc: 'process_3_desc', del: 'process_3_deliverable', delay: 180, pr: 36 },
  { n: '04', title: 'process_4_title', desc: 'process_4_desc', del: 'process_4_deliverable', delay: 270, pr: 0 },
] as const

export function Process() {
  const el = document.createElement('section')
  el.id = 'proceso'
  el.setAttribute('data-screen-label', 'Cómo Trabajamos')
  el.style.borderBottom = '1px solid var(--line)'

  const step = (s: (typeof STEPS)[number], i: number) => `
    <div class="reveal" style="--reveal-delay:${s.delay}ms;padding:40px ${s.pr}px 0 0;">
      <div data-proc-num="${i + 1}" style="font-family:var(--font-mono);font-size:13px;font-weight:600;margin-bottom:16px;transition:color 0.4s;color:#C9C9C1;">${s.n}</div>
      <h3 style="margin:0 0 12px;font-family:var(--font-display);font-weight:600;font-size:22px;letter-spacing:-0.015em;">${t(s.title)}</h3>
      <p style="margin:0 0 20px;font-family:var(--font-serif);font-size:15.5px;line-height:1.62;color:var(--slate);">${t(s.desc)}</p>
      <div style="border-top:1px solid var(--line);padding-top:14px;font-family:var(--font-mono);font-size:11px;line-height:1.7;letter-spacing:0.04em;"><span style="color:var(--accent);font-weight:600;letter-spacing:0.12em;">${t('process_deliverable_label')}</span><br><span style="color:var(--slate);">${t(s.del)}</span></div>
    </div>`

  const render = () => {
    el.innerHTML = `
      <div class="nd-wrap" style="padding:104px clamp(20px,5vw,40px) 112px;border-left:1px solid var(--line);border-right:1px solid var(--line);">
        <div class="reveal nd-eyebrow" style="margin-bottom:20px;">${t('process_eyebrow')}</div>
        <h2 class="reveal nd-h2" style="--reveal-delay:80ms;margin-bottom:72px;">${t('process_title')}</h2>

        <div style="position:relative;">
          <div class="nd-proceso-track">
            <div style="position:absolute;top:4px;left:0;right:0;height:2px;background:#DFDFD8;"></div>
            <div data-proc-line style="position:absolute;top:4px;left:0;height:2px;background:var(--accent);transition:width 0.2s linear;width:0%;"></div>
            <span data-proc-dot="1" style="position:absolute;top:0;left:0;width:10px;height:10px;border-radius:50%;transition:background 0.4s;background:#C9C9C1;"></span>
            <span data-proc-dot="2" style="position:absolute;top:0;left:25%;width:10px;height:10px;border-radius:50%;transition:background 0.4s;background:#C9C9C1;"></span>
            <span data-proc-dot="3" style="position:absolute;top:0;left:50%;width:10px;height:10px;border-radius:50%;transition:background 0.4s;background:#C9C9C1;"></span>
            <span data-proc-dot="4" style="position:absolute;top:0;left:75%;width:10px;height:10px;border-radius:50%;transition:background 0.4s;background:#C9C9C1;"></span>
          </div>

          <div class="nd-proceso" style="display:grid;grid-template-columns:repeat(4,1fr);gap:0;">
            ${STEPS.map(step).join('')}
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
