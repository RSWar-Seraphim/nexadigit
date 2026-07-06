// ══════════════════════════════════════════════════════════════════════════════
// EN PRODUCCIÓN — the proof section. Real media properties operated 24/7 by
// UniSync agents, shown as browser mocks whose screenshots scroll on hover, in
// an offset 12-column grid, followed by live metric counters.
// ══════════════════════════════════════════════════════════════════════════════
import { t, onLangChange } from './i18n'
import { observeReveals, observeCounters } from '../utils/motion'

interface DigitalAsset {
  name: string
  url: string
  descKey: 'production_mma_desc' | 'production_lahora_desc' | 'production_quisqueyanos_desc'
}

export const DIGITAL_ASSETS: DigitalAsset[] = [
  { name: 'noticiasmma.com', url: 'https://noticiasmma.com', descKey: 'production_mma_desc' },
  { name: 'lahora24.com', url: 'https://lahora24.com', descKey: 'production_lahora_desc' },
  { name: 'quisqueyanos.net', url: 'https://quisqueyanos.net', descKey: 'production_quisqueyanos_desc' },
]

const CARDS = [
  { url: 'https://noticiasmma.com', name: 'noticiasmma.com', img: '/assets/img/noticiasmma-preview.webp', iw: 800, ih: 698, descKey: 'production_mma_desc', statusKey: 'production_status_full', col: '1 / 8', mt: 0, shot: 380, delay: 0, dotDelay: '' },
  { url: 'https://lahora24.com', name: 'lahora24.com', img: '/assets/img/lahora24-preview.webp', iw: 800, ih: 820, descKey: 'production_lahora_desc', statusKey: 'production_status_short', col: '8 / 13', mt: 72, shot: 300, delay: 80, dotDelay: ' 0.6s' },
  { url: 'https://quisqueyanos.net', name: 'quisqueyanos.net', img: '/assets/img/quisqueyanos-preview.webp', iw: 800, ih: 554, descKey: 'production_quisqueyanos_desc', statusKey: 'production_status_full', col: '3 / 11', mt: 0, shot: 460, delay: 160, dotDelay: ' 1.2s' },
] as const

const COUNTERS = [
  { n: '1247', dec: 0, suffix: '', label: 'counter_1_label', delay: 0 },
  { n: '11', dec: 0, suffix: '', label: 'counter_2_label', delay: 80 },
  { n: '99.97', dec: 2, suffix: '', label: 'counter_3_label', delay: 160, pct: true },
] as const

export function Assets() {
  const el = document.createElement('section')
  el.id = 'produccion'
  el.setAttribute('data-screen-label', 'Activos Digitales')
  el.style.borderBottom = '1px solid var(--line)'

  const previewCard = (c: (typeof CARDS)[number]) => `
    <div class="nd-prod-card reveal" style="--reveal-delay:${c.delay}ms;--shot-h:${c.shot}px;grid-column:${c.col};${c.mt ? `margin-top:${c.mt}px;` : ''}">
      <div style="display:flex;align-items:center;gap:10px;padding:12px 16px;border-bottom:1px solid var(--line);background:var(--bg);">
        <span style="display:flex;gap:6px;"><span style="width:9px;height:9px;border-radius:50%;background:#DEDED6;"></span><span style="width:9px;height:9px;border-radius:50%;background:#DEDED6;"></span><span style="width:9px;height:9px;border-radius:50%;background:#DEDED6;"></span></span>
        <span style="flex:1;display:flex;align-items:center;justify-content:center;gap:9px;border:1px solid var(--line);background:var(--surface);padding:5px 14px;border-radius:999px;font-family:var(--font-mono);font-size:12px;color:var(--ink);"><span style="width:7px;height:7px;border-radius:50%;background:var(--accent);animation:ndPulse 2.6s infinite${c.dotDelay};"></span>${c.name}</span>
        <span style="font-family:var(--font-mono);font-size:10.5px;letter-spacing:0.12em;color:var(--accent);font-weight:600;">${t(c.statusKey)}</span>
      </div>
      <div class="nd-prod-shot" style="height:${c.shot}px;">
        <img src="${c.img}" width="${c.iw}" height="${c.ih}" alt="Portada de ${c.name}" loading="lazy" decoding="async">
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:16px 20px;border-top:1px solid var(--line);">
        <span style="font-family:var(--font-serif);font-size:15px;color:var(--slate);">${t(c.descKey)}</span>
        <a href="${c.url}" target="_blank" rel="noopener" class="nd-visit">${t('production_visit')} →</a>
      </div>
    </div>`

  const counterCell = (c: (typeof COUNTERS)[number]) => `
    <div class="reveal" style="--reveal-delay:${c.delay}ms;border-right:1px solid var(--line);border-bottom:1px solid var(--line);padding:32px;">
      <div style="font-family:var(--font-display);font-weight:700;font-size:64px;letter-spacing:-0.035em;color:var(--ink);"><span data-counter="${c.n}" data-counter-decimals="${c.dec}" data-counter-suffix="${c.suffix}">0</span>${'pct' in c && c.pct ? '<span style="color:var(--accent);">%</span>' : ''}</div>
      <div style="font-family:var(--font-mono);font-size:11.5px;letter-spacing:0.12em;color:var(--muted);margin-top:8px;">${t(c.label)}</div>
    </div>`

  const render = () => {
    el.innerHTML = `
      <div class="nd-wrap" style="padding:104px clamp(20px,5vw,40px) 0;border-left:1px solid var(--line);border-right:1px solid var(--line);">
        <div class="reveal nd-eyebrow" style="margin-bottom:20px;">${t('production_eyebrow')}</div>
        <div class="nd-head2" style="display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:end;margin-bottom:64px;">
          <h2 class="reveal nd-h2" style="--reveal-delay:80ms;">${t('production_title')}</h2>
          <p class="reveal" style="--reveal-delay:140ms;margin:0;font-family:var(--font-serif);font-size:18px;line-height:1.65;color:var(--slate);">${t('production_lede')}</p>
        </div>

        <div class="nd-prod-grid" style="display:grid;grid-template-columns:repeat(12,1fr);gap:28px;align-items:start;">
          ${CARDS.map(previewCard).join('')}
        </div>

        <div class="nd-metrics">
          <div style="height:80px;"></div>
          <div class="nd-counters" style="display:grid;grid-template-columns:repeat(3,1fr);border-left:1px solid var(--line);">
            ${COUNTERS.map(counterCell).join('')}
          </div>
        </div>
        <div class="nd-prod-bottom" style="height:96px;"></div>
      </div>
    `
    observeReveals(el)
    observeCounters(el)
  }

  render()
  onLangChange(render)
  return el
}
