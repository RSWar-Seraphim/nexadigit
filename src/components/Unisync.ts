// ══════════════════════════════════════════════════════════════════════════════
// UNISYNC — carbon band framed by drawing orange seams, given entirely to the
// in-house AEO content engine: pitch + "how it works" pipeline on top, then a
// full-width "Run Agents" console mock (outlet tabs, fleet stats, agent cards)
// with a toast that breathes in/out (interactions.ts). Pure markup.
// ══════════════════════════════════════════════════════════════════════════════
import { tr, type Key, type Lang } from './i18n'

/* Console mock. These are illustrative constants shaped like the real product
   (one tab per outlet, agent cards) — not live data. The section says so. */
const SITES = [
  { host: 'quisqueyanos.net', n: 6, active: false },
  { host: 'lahora24.com', n: 5, active: false },
  { host: 'noticiasmma.com', n: 7, active: true },
]

const STATS = [
  { n: '7', label: 'TOTAL', accent: false },
  { n: '1', label: 'RUNNING', accent: true },
  { n: '0', label: 'QUEUED', accent: false },
  { n: '6', label: 'IDLE', accent: false },
  { n: '0', label: 'ERRORS', accent: false },
]

const AGENTS = [
  { img: '/assets/img/avatar-lr.jpg', name: 'Lucía Ramírez', topic: 'MMAAldia', tag: 'UFC', posts: 100, last: '', running: true },
  { img: '/assets/img/avatar-sp.jpg', name: 'Sebastián Park', topic: 'ufc latest news', tag: 'UFC', posts: 41, last: '1h', running: false },
  { img: '/assets/img/avatar-js.jpg', name: 'Javier Salinas', topic: 'ufc headlines today', tag: 'UFC', posts: 53, last: '30d', running: false },
]

const STEPS: { title: Key; desc: Key }[] = [
  { title: 'unisync_step_1_title', desc: 'unisync_step_1_desc' },
  { title: 'unisync_step_2_title', desc: 'unisync_step_2_desc' },
  { title: 'unisync_step_3_title', desc: 'unisync_step_3_desc' },
  { title: 'unisync_step_4_title', desc: 'unisync_step_4_desc' },
]

const sideIcon = (glyph: string, active = false) =>
  `<div style="width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:14px;${
    active ? 'background:rgba(224,78,20,0.12);color:var(--accent);' : 'color:#6C747D;'
  }">${glyph}</div>`

function agentCard(a: (typeof AGENTS)[number], publishing: string): string {
  const status = a.running
    ? `<span style="display:inline-flex;align-items:center;gap:6px;font-family:var(--font-mono);font-size:9px;color:var(--accent);"><span style="width:6px;height:6px;border-radius:50%;background:var(--accent);flex-shrink:0;animation:ndPulse 2.6s infinite;"></span>Running</span>`
    : `<span style="display:inline-flex;align-items:center;gap:6px;font-family:var(--font-mono);font-size:9px;color:#7E8790;"><span style="width:5px;height:5px;border-radius:50%;background:#4A525C;flex-shrink:0;"></span>Idle</span>`
  const action = a.running
    ? `<span class="nd-agent__btn nd-agent__btn--stop">⏹ Stop</span>`
    : `<span class="nd-run-btn nd-agent__btn">▶ Run</span>`
  const last = a.running ? publishing : a.last
  return `
    <div class="nd-agent${a.running ? ' is-running' : ''}">
      <div style="display:flex;align-items:center;gap:10px;">
        <span style="width:32px;height:32px;border-radius:50%;overflow:hidden;flex-shrink:0;${a.running ? 'box-shadow:0 0 0 2px #0F1319, 0 0 0 3.5px rgba(224,78,20,0.6);' : ''}"><img src="${a.img}" width="40" height="40" alt="${a.name}" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;display:block;"></span>
        <div style="flex:1;min-width:0;">
          <div style="font-family:var(--font-display);font-weight:600;font-size:12.5px;color:#E4E8EC;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${a.name}</div>
          <div style="font-family:var(--font-mono);font-size:9px;color:#7E8790;margin-top:1px;">noticiasmma.com</div>
        </div>
        ${status}
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;">
        <span class="nd-agent__chip nd-agent__chip--type">◎ Quick Publisher</span>
        <span class="nd-agent__chip">${a.tag}</span>
      </div>
      <div style="font-family:var(--font-mono);font-size:9.5px;color:#9BA3AC;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">⌕ ${a.topic}</div>
      <div style="display:flex;justify-content:space-between;gap:8px;font-family:var(--font-mono);font-size:9px;color:#7E8790;">
        <span>${a.posts} posts</span><span style="${a.running ? 'color:var(--accent);' : ''}">${last}</span>
      </div>
      ${action}
    </div>`
}

export function unisyncMarkup(lang: Lang): string {
  const t = tr(lang)

  return `
    <section id="unisync" data-screen-label="UniSync" style="background:var(--carbon);color:var(--bg);">
      <div class="seam" style="height:2px;background:var(--accent);box-shadow:0 0 12px rgba(224,78,20,0.35);"></div>
      <div class="nd-wrap" style="padding:112px clamp(20px,5vw,40px);border-left:1px solid rgba(250,247,242,0.08);border-right:1px solid rgba(250,247,242,0.08);">
        <div class="reveal" style="font-family:var(--font-mono);font-size:12.5px;letter-spacing:0.16em;text-transform:uppercase;color:var(--accent);font-weight:500;margin-bottom:20px;text-shadow:0 0 14px rgba(224,78,20,0.35);">${t('catalog_eyebrow')}</div>
        <div class="nd-head2" style="display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:end;margin-bottom:64px;">
          <h2 class="reveal nd-h2" style="--reveal-delay:80ms;color:var(--bg);">${t('catalog_title')}</h2>
          <p class="reveal" style="--reveal-delay:140ms;margin:0;font-family:var(--font-serif);font-size:18px;line-height:1.65;color:rgba(250,247,242,0.68);">${t('catalog_lede')}</p>
        </div>

        <!-- pitch + pipeline -->
        <div class="nd-catalogo" style="display:grid;grid-template-columns:1.2fr 1fr;gap:56px;align-items:start;margin-bottom:56px;">
          <div class="reveal">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:16px;margin-bottom:22px;">
              <div>
                <span style="font-family:var(--font-display);font-weight:700;font-size:34px;letter-spacing:-0.025em;line-height:1;">UniSync</span>
                <div style="font-family:var(--font-mono);font-size:10.5px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(250,247,242,0.55);margin-top:8px;">${t('unisync_kicker')}</div>
              </div>
              <span style="display:inline-flex;align-items:center;gap:8px;font-family:var(--font-mono);font-size:10.5px;letter-spacing:0.14em;color:var(--accent);border:1px solid rgba(224,78,20,0.4);padding:5px 12px;white-space:nowrap;"><span style="width:6px;height:6px;border-radius:50%;background:var(--accent);animation:ndPulseDark 2.6s infinite;"></span>${t('unisync_badge')}</span>
            </div>
            <p style="margin:0 0 30px;font-family:var(--font-serif);font-size:16.5px;line-height:1.65;color:rgba(250,247,242,0.7);max-width:600px;">${t('unisync_desc')}</p>
            <a href="https://unisync.ai" target="_blank" rel="noopener" class="nd-unisync-btn">${t('unisync_cta')} →</a>
          </div>
          <div class="reveal" style="--reveal-delay:100ms;">
            <div style="font-family:var(--font-mono);font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(250,247,242,0.5);margin-bottom:6px;">${t('unisync_how_label')}</div>
            ${STEPS.map(
              (s, i) => `
              <div class="nd-step">
                <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent);padding-top:2px;">0${i + 1}</span>
                <div>
                  <div style="font-family:var(--font-display);font-weight:600;font-size:15.5px;letter-spacing:-0.01em;color:#F3EFE8;margin-bottom:4px;">${t(s.title)}</div>
                  <div style="font-family:var(--font-serif);font-size:14px;line-height:1.55;color:rgba(250,247,242,0.62);">${t(s.desc)}</div>
                </div>
              </div>`
            ).join('')}
          </div>
        </div>

        <!-- "Run Agents" console (illustrative) -->
        <div class="panel-rise" style="position:relative;">
          <div style="display:flex;overflow:hidden;background:var(--carbon-deep);border:1px solid #1C222B;box-shadow:0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(224,78,20,0.05);">
            <!-- sidebar -->
            <div class="nd-console-side" style="width:60px;flex-shrink:0;background:#0A0D11;border-right:1px solid #171D25;padding:18px 0;display:flex;flex-direction:column;align-items:center;gap:7px;">
              ${sideIcon('▦')}${sideIcon('◆', true)}${sideIcon('☰')}${sideIcon('⚙')}
              <div style="margin-top:auto;display:flex;flex-direction:column;align-items:center;gap:7px;">${sideIcon('◔')}${sideIcon('»')}</div>
            </div>
            <!-- main -->
            <div style="flex:1;min-width:0;display:flex;flex-direction:column;">
              <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;padding:18px 22px 0;">
                <div>
                  <div style="font-family:var(--font-display);font-weight:700;font-size:17px;color:#FFFFFF;letter-spacing:-0.01em;">Run Agents</div>
                  <div style="font-family:var(--font-mono);font-size:9px;color:#7E8790;margin-top:3px;">noticiasmma.com — ${t('unisync_mock_sub')}</div>
                </div>
                <div style="display:flex;gap:8px;flex-wrap:wrap;">
                  <span class="nd-console-btn">⏹ Stop All</span>
                  <span class="nd-console-btn">≡ Queue All</span>
                  <span class="nd-console-btn nd-console-btn--accent">⚡ AutoPilot</span>
                </div>
              </div>
              <div style="display:flex;gap:22px;padding:12px 22px 0;border-bottom:1px solid #171D25;overflow:hidden;">
                <span class="nd-console-tab">Overview</span>
                ${SITES.map((s) => `<span class="nd-console-tab${s.active ? ' is-active' : ''}">${s.host} <span style="color:#4A525C;">(${s.n})</span></span>`).join('')}
              </div>
              <div style="padding:20px 22px 22px;">
                <div class="nd-stats" style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:16px;">
                  ${STATS.map(
                    (s) => `<div class="nd-stat-tile"><div style="font-family:var(--font-display);font-weight:700;font-size:20px;line-height:1;color:${s.accent ? 'var(--accent)' : '#E4E8EC'};">${s.n}</div><div style="font-family:var(--font-mono);font-size:8.5px;letter-spacing:0.08em;color:#7E8790;margin-top:6px;">${s.label}</div></div>`
                  ).join('')}
                </div>
                <div class="nd-agents" style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
                  ${AGENTS.map((a) => agentCard(a, t('unisync_publishing'))).join('')}
                </div>
              </div>
            </div>
          </div>
          <div data-toast style="position:absolute;left:24px;bottom:-18px;background:#10141A;color:#E4E8EC;border:1px solid #1D242D;box-shadow:0 20px 48px rgba(0,0,0,0.6);padding:12px 16px;display:flex;align-items:center;gap:11px;font-family:var(--font-mono);font-size:12px;transition:transform 0.5s cubic-bezier(.22,1,.36,1), opacity 0.5s;transform:translateY(14px);opacity:0;">
            <span style="width:18px;height:18px;border-radius:50%;background:var(--accent);color:var(--cream);display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0;">✓</span>
            <span>${t('unisync_toast')}</span>
          </div>
        </div>
        <div class="nd-console-note" style="margin-top:34px;font-family:var(--font-mono);font-size:10.5px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(250,247,242,0.4);text-align:right;">${t('unisync_console_note')}</div>
      </div>
      <div class="seam" style="height:2px;background:var(--accent);box-shadow:0 0 12px rgba(224,78,20,0.35);"></div>
    </section>
  `
}
