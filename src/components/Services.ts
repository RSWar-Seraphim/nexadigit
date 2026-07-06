// ══════════════════════════════════════════════════════════════════════════════
// SERVICIOS — bento grid on a hairline lattice. Six services + a dark
// "ESPECIALIDAD" card (Agentes de IA, spanning two columns) + a CTA cell.
// ══════════════════════════════════════════════════════════════════════════════
import { t, onLangChange } from './i18n'
import { observeReveals } from '../utils/motion'

const CARDS = [
  { n: '01', title: 'services_1_title', desc: 'services_1_desc', delay: 0 },
  { n: '02', title: 'services_2_title', desc: 'services_2_desc', delay: 60 },
  { n: '04', title: 'services_4_title', desc: 'services_4_desc', delay: 0 },
  { n: '05', title: 'services_5_title', desc: 'services_5_desc', delay: 60 },
  { n: '06', title: 'services_6_title', desc: 'services_6_desc', delay: 120 },
] as const

export function Services() {
  const el = document.createElement('section')
  el.id = 'servicios'
  el.setAttribute('data-screen-label', 'Servicios')
  el.style.borderBottom = '1px solid var(--line)'

  const card = (c: (typeof CARDS)[number]) => `
    <div class="nd-service reveal" style="--reveal-delay:${c.delay}ms;">
      <div class="nd-service__num">${c.n}</div>
      <h3>${t(c.title)}</h3>
      <p>${t(c.desc)}</p>
    </div>`

  const render = () => {
    el.innerHTML = `
      <div class="nd-wrap" style="padding:104px clamp(20px,5vw,40px) 96px;border-left:1px solid var(--line);border-right:1px solid var(--line);">
        <div class="reveal nd-eyebrow" style="margin-bottom:20px;">${t('services_eyebrow')}</div>
        <h2 class="reveal nd-h2" style="--reveal-delay:80ms;margin-bottom:64px;">${t('services_title')}</h2>

        <div class="nd-services">
          ${card(CARDS[0])}
          ${card(CARDS[1])}

          <div class="nd-service--dark reveal" style="--reveal-delay:120ms;">
            <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:44px;">
              <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent);">03</span>
              <span style="font-family:var(--font-mono);font-size:10.5px;letter-spacing:0.14em;color:var(--accent);border:1px solid rgba(224,78,20,0.4);padding:5px 10px;">${t('services_specialty_badge')}</span>
            </div>
            <h3 style="margin:0 0 14px;font-family:var(--font-display);font-weight:600;font-size:26px;letter-spacing:-0.02em;line-height:1.15;color:var(--cream);">${t('services_3_title')}</h3>
            <p style="margin:0;max-width:480px;font-family:var(--font-serif);font-size:16px;line-height:1.65;color:rgba(250,247,242,0.72);">${t('services_3_desc')}</p>
          </div>

          ${card(CARDS[2])}
          ${card(CARDS[3])}
          ${card(CARDS[4])}

          <a href="#contacto" data-book-meeting class="nd-service--cta reveal" style="--reveal-delay:180ms;">
            <div style="font-family:var(--font-mono);font-size:12px;color:var(--muted);">+</div>
            <div style="font-family:var(--font-mono);font-size:13.5px;line-height:1.6;color:var(--ink);">${t('services_cta_q')}<br><span style="color:var(--accent);">${t('services_cta_link')} →</span></div>
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
