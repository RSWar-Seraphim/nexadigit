// ══════════════════════════════════════════════════════════════════════════════
// PROYECTOS — the proof section. The software NexaDigit builds, laid out as
// numbered editorial case rows: a text column (status, kicker, tagline,
// capability chips, pull-quote) beside a browser mock. VIGIA's real dashboard
// screenshot scrolls on hover; CASUM and ProDoctivity DGP, still in progress,
// show their wordmark floating over a drafting grid. Pure markup.
// ══════════════════════════════════════════════════════════════════════════════
import { tr, type Key, type Lang } from './i18n'

/* The media outlets UniSync operates — listed in the footer, the hero showcase
   and llms.txt (they no longer have their own strip in this section). */
export const DIGITAL_ASSETS = [
  { name: 'noticiasmma.com', url: 'https://noticiasmma.com' },
  { name: 'lahora24.com', url: 'https://lahora24.com' },
  { name: 'quisqueyanos.net', url: 'https://quisqueyanos.net' },
]

/* VIGIA's own site (live, private access). Used by the hero showcase, llms.txt
   and the SoftwareApplication JSON-LD. CASUM and Oris have no public site yet. */
export const VIGIA_URL = 'https://vigia.com.pa'

type Status = 'live' | 'building' | 'developing'

interface Project {
  num: string
  name: string
  status: Status
  kicker: Key
  tagline: Key
  desc: Key
  quote: Key
  tags: Key[]
  caption: Key
  captionTag: Key
  /* 12-column placement; both cells pin to grid-row 1 so a mirrored row
     (mock left, text right) keeps text first in DOM order for mobile/reading. */
  textCol: string
  mockCol: string
  delay: number
  /* Not-yet-live projects: the brand wordmark (original colors) over a drafting wireframe. */
  draft?: { mark: { src: string; w: number; h: number; width: number; alt: string }; caption: Key; wire: 'app' | 'doc' }
}

export const PROJECTS: Project[] = [
  {
    num: '01', name: 'VIGIA', status: 'live',
    kicker: 'vigia_kicker', tagline: 'vigia_tagline', desc: 'vigia_desc', quote: 'vigia_quote',
    tags: ['vigia_tag_1', 'vigia_tag_2', 'vigia_tag_3', 'vigia_tag_4'],
    caption: 'vigia_caption', captionTag: 'projects_private',
    textCol: '1 / 5', mockCol: '5 / 13', delay: 0,
  },
  {
    num: '02', name: 'CASUM', status: 'building',
    kicker: 'casum_kicker', tagline: 'casum_tagline', desc: 'casum_desc', quote: 'casum_quote',
    tags: ['casum_tag_1', 'casum_tag_2', 'casum_tag_3', 'casum_tag_4'],
    caption: 'casum_caption', captionTag: 'projects_soon',
    textCol: '8 / 13', mockCol: '1 / 8', delay: 0,
    draft: { mark: { src: '/assets/img/logo-casum.svg', w: 2172, h: 724, width: 220, alt: 'CASUM' }, caption: 'casum_mock_caption', wire: 'app' },
  },
  {
    num: '03', name: 'ProDoctivity DGP', status: 'developing',
    kicker: 'dgp_kicker', tagline: 'dgp_tagline', desc: 'dgp_desc', quote: 'dgp_quote',
    tags: ['dgp_tag_1', 'dgp_tag_2', 'dgp_tag_3', 'dgp_tag_4'],
    caption: 'dgp_caption', captionTag: 'projects_soon',
    textCol: '1 / 6', mockCol: '6 / 13', delay: 0,
    draft: { mark: { src: '/assets/img/logo-prodoctivity.png', w: 500, h: 84, width: 260, alt: 'ProDoctivity' }, caption: 'dgp_mock_caption', wire: 'doc' },
  },
]

const VIGIA_SHOT = { src: '/assets/img/vigia-preview.webp', w: 1400, h: 1210, height: 520 }

const STATUS_KEY: Record<Status, Key> = {
  live: 'projects_status_live',
  building: 'projects_status_building',
  developing: 'projects_status_developing',
}

export function projectsMarkup(lang: Lang): string {
  const t = tr(lang)

  const statusBadge = (s: Status) =>
    s === 'live'
      ? `<span class="nd-status nd-status--live"><span class="nd-status__dot"></span>${t(STATUS_KEY[s])}</span>`
      : `<span class="nd-status nd-status--building"><span class="nd-status__dot"></span>${t(STATUS_KEY[s])}</span>`

  const textCell = (p: Project) => `
    <div class="nd-proj-text reveal" style="grid-column:${p.textCol};grid-row:1;--reveal-delay:${p.delay}ms;">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:30px;">
        <span style="font-family:var(--font-mono);font-size:12px;color:var(--muted);">${p.num}</span>
        ${statusBadge(p.status)}
      </div>
      <h3 style="margin:0 0 10px;font-family:var(--font-display);font-weight:700;font-size:40px;letter-spacing:-0.03em;line-height:1;color:var(--ink);">${p.name}</h3>
      <div style="font-family:var(--font-mono);font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:var(--muted);margin-bottom:24px;">${t(p.kicker)}</div>
      <p style="margin:0 0 14px;font-family:var(--font-display);font-weight:600;font-size:21px;letter-spacing:-0.015em;line-height:1.3;color:var(--ink);">${t(p.tagline)}</p>
      <p style="margin:0 0 24px;font-family:var(--font-serif);font-size:16px;line-height:1.65;color:var(--slate);">${t(p.desc)}</p>
      <div style="display:flex;flex-wrap:wrap;gap:7px;margin-bottom:28px;">
        ${p.tags.map((k) => `<span class="nd-chip">${t(k)}</span>`).join('')}
      </div>
      <blockquote style="margin:0;padding:2px 0 2px 16px;border-left:2px solid var(--accent);font-family:var(--font-serif);font-style:italic;font-size:14.5px;line-height:1.6;color:var(--slate);">${t(p.quote)}</blockquote>
    </div>`

  /* Browser chrome shared by all mocks. */
  const chrome = (p: Project) => {
    const live = p.status === 'live'
    const dot = live
      ? '<span style="width:7px;height:7px;border-radius:50%;background:var(--accent);animation:ndPulse 2.6s infinite;"></span>'
      : '<span style="width:7px;height:7px;border-radius:50%;border:1.5px dashed var(--line-strong);box-sizing:border-box;"></span>'
    return `
    <div style="display:flex;align-items:center;gap:10px;padding:12px 16px;border-bottom:1px solid var(--line);background:var(--bg);">
      <span style="display:flex;gap:6px;"><span style="width:9px;height:9px;border-radius:50%;background:#DEDED6;"></span><span style="width:9px;height:9px;border-radius:50%;background:#DEDED6;"></span><span style="width:9px;height:9px;border-radius:50%;background:#DEDED6;"></span></span>
      <span style="flex:1;min-width:0;display:flex;align-items:center;justify-content:center;gap:9px;border:1px solid var(--line);background:var(--surface);padding:5px 14px;border-radius:999px;font-family:var(--font-mono);font-size:12px;color:var(--ink);white-space:nowrap;">${dot}${p.name.toLowerCase()}</span>
      <span class="nd-chrome-status" style="font-family:var(--font-mono);font-size:10.5px;letter-spacing:0.12em;font-weight:600;white-space:nowrap;color:${live ? 'var(--accent)' : 'var(--muted)'};">${t(STATUS_KEY[p.status])}</span>
    </div>`
  }

  const captionRow = (p: Project) => `
    <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px 20px;border-top:1px solid var(--line);">
      <span style="font-family:var(--font-serif);font-size:14.5px;line-height:1.5;color:var(--slate);">${t(p.caption)}</span>
      <span style="font-family:var(--font-mono);font-size:10.5px;letter-spacing:0.12em;color:var(--muted);white-space:nowrap;">${t(p.captionTag)}</span>
    </div>`

  const liveMock = (p: Project) => `
    <div class="nd-prod-card reveal" style="grid-column:${p.mockCol};grid-row:1;--reveal-delay:${p.delay + 90}ms;--shot-h:${VIGIA_SHOT.height}px;">
      ${chrome(p)}
      <div class="nd-prod-shot" style="height:${VIGIA_SHOT.height}px;">
        <img src="${VIGIA_SHOT.src}" width="${VIGIA_SHOT.w}" height="${VIGIA_SHOT.h}" alt="${t('vigia_shot_alt')}" loading="lazy" decoding="async">
      </div>
      ${captionRow(p)}
    </div>`

  /* No UI to show yet: the wordmark floats over a drafting grid + dashed wireframe
     ('app' = sidebar + rows, 'doc' = a page beside its extracted fields). */
  const draftMock = (p: Project) => {
    const d = p.draft!
    const wires = d.wire === 'app' ? 6 : 6
    return `
    <div class="nd-prod-card reveal" style="grid-column:${p.mockCol};grid-row:1;--reveal-delay:${p.delay + 90}ms;">
      ${chrome(p)}
      <div class="nd-proj-draft">
        <div class="nd-proj-draft__wire nd-proj-draft__wire--${d.wire}" aria-hidden="true">${'<span></span>'.repeat(wires)}</div>
        <div class="nd-proj-draft__mark">
          <img class="nd-draft-mark" src="${d.mark.src}" width="${d.mark.w}" height="${d.mark.h}" alt="${d.mark.alt}" loading="lazy" decoding="async" style="width:${d.mark.width}px;">
          <span style="font-family:var(--font-mono);font-size:10.5px;letter-spacing:0.14em;color:var(--muted);text-align:center;">${t(d.caption)}</span>
        </div>
      </div>
      ${captionRow(p)}
    </div>`
  }

  const projectRow = (p: Project, i: number) => `
    <div class="nd-proj-row" style="display:grid;grid-template-columns:repeat(12,1fr);gap:28px;align-items:start;${i ? 'margin-top:72px;padding-top:64px;border-top:1px solid var(--line);' : ''}">
      ${textCell(p)}
      ${p.status === 'live' ? liveMock(p) : draftMock(p)}
    </div>`

  return `
    <section id="produccion" data-screen-label="Proyectos" style="border-bottom:1px solid var(--line);">
      <div class="nd-wrap" style="padding:104px clamp(20px,5vw,40px) 0;border-left:1px solid var(--line);border-right:1px solid var(--line);">
        <div class="reveal nd-eyebrow" style="margin-bottom:20px;">${t('projects_eyebrow')}</div>
        <div class="nd-head2" style="display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:end;margin-bottom:72px;">
          <h2 class="reveal nd-h2" style="--reveal-delay:80ms;">${t('projects_title')}</h2>
          <p class="reveal" style="--reveal-delay:140ms;margin:0;font-family:var(--font-serif);font-size:18px;line-height:1.65;color:var(--slate);">${t('projects_lede')}</p>
        </div>

        ${PROJECTS.map(projectRow).join('')}
        <div class="nd-proj-bottom" style="height:112px;"></div>
      </div>
    </section>
  `
}
