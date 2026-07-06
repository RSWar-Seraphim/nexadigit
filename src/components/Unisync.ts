// ══════════════════════════════════════════════════════════════════════════════
// CATÁLOGO / UNISYNC — carbon band framed by drawing orange seams. Flagship
// UniSync card with a living operations dashboard (agent rows + a toast that
// breathes in/out, driven by interactions.ts) + Oris + Activos Digitales.
// ══════════════════════════════════════════════════════════════════════════════
import { t, onLangChange } from './i18n'
import { observeReveals } from '../utils/motion'

const AGENTS = [
  { img: '/assets/img/avatar-lr.webp', name: 'Lucía Ramírez', meta: 'noticiasmma.com · publicando ahora…', running: true },
  { img: '/assets/img/avatar-sp.webp', name: 'Sebastián Park', meta: 'noticiasmma.com · 19 posts', running: false },
  { img: '/assets/img/avatar-js.webp', name: 'Javier Salinas', meta: 'noticiasmma.com · 26 posts', running: false },
]

function agentRow(a: (typeof AGENTS)[number]): string {
  const avatarRing = a.running
    ? 'box-shadow:0 0 0 2px #0C0F14, 0 0 0 3.5px rgba(224,78,20,0.6);'
    : ''
  const status = a.running
    ? `<span style="display:inline-flex;align-items:center;gap:6px;font-family:var(--font-mono);font-size:9px;color:var(--accent);"><span style="width:6px;height:6px;border-radius:50%;background:var(--accent);flex-shrink:0;animation:ndPulse 2.6s infinite;"></span>Running</span>`
    : `<span style="display:inline-flex;align-items:center;gap:6px;font-family:var(--font-mono);font-size:9px;color:#7E8790;"><span style="width:5px;height:5px;border-radius:50%;background:#4A525C;flex-shrink:0;"></span>Idle</span>`
  const action = a.running
    ? `<span style="font-family:var(--font-mono);font-size:10px;font-weight:600;color:var(--cream);background:var(--accent);border:1px solid var(--accent);border-radius:6px;padding:6px 15px;">⏹ Stop</span>`
    : `<span class="nd-run-btn">▶ Run</span>`
  return `
    <div style="display:flex;align-items:center;gap:12px;padding:14px 0;border-top:1px solid #171D25;">
      <span style="width:30px;height:30px;border-radius:50%;overflow:hidden;flex-shrink:0;${avatarRing}"><img src="${a.img}" width="40" height="40" alt="${a.name}" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;display:block;"></span>
      <div style="flex:1;min-width:0;">
        <div style="font-family:var(--font-display);font-weight:600;font-size:12.5px;color:#E4E8EC;">${a.name}</div>
        <div style="font-family:var(--font-mono);font-size:9px;color:#7E8790;margin-top:1px;">${a.meta}</div>
      </div>
      ${status}
      ${action}
    </div>`
}

export function Unisync() {
  const el = document.createElement('section')
  el.id = 'unisync'
  el.setAttribute('data-screen-label', 'Catálogo')
  el.style.cssText = 'background:var(--carbon);color:var(--bg);'

  const render = () => {
    el.innerHTML = `
      <div class="seam" style="height:2px;background:var(--accent);box-shadow:0 0 12px rgba(224,78,20,0.35);"></div>
      <div class="nd-wrap" style="padding:112px clamp(20px,5vw,40px);border-left:1px solid rgba(250,247,242,0.08);border-right:1px solid rgba(250,247,242,0.08);">
        <div class="reveal" style="font-family:var(--font-mono);font-size:12.5px;letter-spacing:0.16em;text-transform:uppercase;color:var(--accent);font-weight:500;margin-bottom:20px;text-shadow:0 0 14px rgba(224,78,20,0.35);">${t('catalog_eyebrow')}</div>
        <div class="nd-head2" style="display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:end;margin-bottom:56px;">
          <h2 class="reveal nd-h2" style="--reveal-delay:80ms;color:var(--bg);">${t('catalog_title')}</h2>
          <p class="reveal" style="--reveal-delay:140ms;margin:0;font-family:var(--font-serif);font-size:18px;line-height:1.65;color:rgba(250,247,242,0.68);">${t('catalog_lede')}</p>
        </div>

        <div class="nd-catalogo" style="display:grid;grid-template-columns:1.55fr 1fr;gap:28px;align-items:stretch;">

          <!-- FLAGSHIP: UniSync -->
          <div class="nd-cat-card reveal" style="padding:40px;display:flex;flex-direction:column;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
              <span style="font-family:var(--font-display);font-weight:700;font-size:34px;letter-spacing:-0.025em;">UniSync</span>
              <span style="font-family:var(--font-mono);font-size:10.5px;letter-spacing:0.14em;color:var(--accent);border:1px solid rgba(224,78,20,0.4);padding:5px 12px;">FLAGSHIP</span>
            </div>
            <p style="margin:0 0 32px;font-family:var(--font-serif);font-size:16.5px;line-height:1.65;color:rgba(250,247,242,0.7);max-width:560px;">${t('unisync_desc')}</p>

            <!-- living operations panel -->
            <div class="panel-rise" style="position:relative;margin-bottom:40px;">
              <div style="display:flex;height:408px;overflow:hidden;background:var(--carbon-deep);border:1px solid #1C222B;box-shadow:0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(224,78,20,0.05);">
                <!-- sidebar -->
                <div style="width:60px;flex-shrink:0;background:#0A0D11;border-right:1px solid #171D25;padding:18px 0;display:flex;flex-direction:column;align-items:center;gap:7px;">
                  <div style="width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:14px;color:#6C747D;">▦</div>
                  <div style="width:36px;height:36px;border-radius:9px;background:rgba(224,78,20,0.12);display:flex;align-items:center;justify-content:center;font-size:14px;color:var(--accent);">◆</div>
                  <div style="width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:14px;color:#6C747D;">☰</div>
                  <div style="width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:14px;color:#6C747D;">⚙</div>
                  <div style="margin-top:auto;display:flex;flex-direction:column;align-items:center;gap:7px;">
                    <div style="width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:14px;color:#6C747D;">◔</div>
                    <div style="width:36px;height:36px;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:14px;color:#6C747D;">»</div>
                  </div>
                </div>
                <!-- main -->
                <div style="flex:1;min-width:0;display:flex;flex-direction:column;">
                  <div style="display:flex;align-items:center;justify-content:space-between;padding:18px 22px;border-bottom:1px solid #171D25;">
                    <div>
                      <div style="font-family:var(--font-display);font-weight:700;font-size:17px;color:#FFFFFF;letter-spacing:-0.01em;">Run Agents</div>
                      <div style="font-family:var(--font-mono);font-size:9px;color:#7E8790;margin-top:3px;">noticiasmma.com — 6 agentes</div>
                    </div>
                    <span style="font-family:var(--font-mono);font-size:9.5px;color:var(--accent);font-weight:600;background:transparent;border:1px solid rgba(224,78,20,0.4);border-radius:7px;padding:7px 13px;">⚡ AutoPilot</span>
                  </div>
                  <div style="flex:1;min-height:0;padding:22px;">
                    <div style="display:flex;gap:34px;margin-bottom:8px;">
                      <div><div style="font-family:var(--font-display);font-weight:700;font-size:22px;color:#E4E8EC;">6</div><div style="font-family:var(--font-mono);font-size:8.5px;letter-spacing:0.08em;color:#7E8790;margin-top:2px;">TOTAL</div></div>
                      <div><div style="font-family:var(--font-display);font-weight:700;font-size:22px;color:var(--accent);">1</div><div style="font-family:var(--font-mono);font-size:8.5px;letter-spacing:0.08em;color:#7E8790;margin-top:2px;">RUNNING</div></div>
                      <div><div style="font-family:var(--font-display);font-weight:700;font-size:22px;color:#9BA3AC;">5</div><div style="font-family:var(--font-mono);font-size:8.5px;letter-spacing:0.08em;color:#7E8790;margin-top:2px;">IDLE</div></div>
                    </div>
                    <div style="display:flex;flex-direction:column;">
                      ${AGENTS.map(agentRow).join('')}
                    </div>
                  </div>
                </div>
              </div>
              <div data-toast style="position:absolute;left:-24px;bottom:-18px;background:#10141A;color:#E4E8EC;border:1px solid #1D242D;box-shadow:0 20px 48px rgba(0,0,0,0.6);padding:12px 16px;display:flex;align-items:center;gap:11px;font-family:var(--font-mono);font-size:12px;transition:transform 0.5s cubic-bezier(.22,1,.36,1), opacity 0.5s;transform:translateY(14px);opacity:0;">
                <span style="width:18px;height:18px;border-radius:50%;background:var(--accent);color:var(--cream);display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0;">✓</span>
                <span>${t('unisync_toast')}</span>
              </div>
            </div>

            <div style="margin-top:auto;">
              <a href="https://unisync.ai" target="_blank" rel="noopener" class="nd-unisync-btn">${t('unisync_cta')} →</a>
            </div>
          </div>

          <!-- Secondary column -->
          <div style="display:flex;flex-direction:column;gap:28px;">
            <!-- Oris -->
            <div class="nd-cat-card nd-cat-card--light reveal" style="--reveal-delay:100ms;flex:1;padding:32px;display:flex;flex-direction:column;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;">
                <span style="font-family:var(--font-display);font-weight:700;font-size:25px;letter-spacing:-0.02em;">Oris</span>
                <span style="font-family:var(--font-mono);font-size:10.5px;letter-spacing:0.14em;color:rgba(250,247,242,0.7);border:1px solid rgba(250,247,242,0.3);padding:5px 12px;">${t('oris_badge')}</span>
              </div>
              <p style="margin:0 0 18px;font-family:var(--font-serif);font-size:15.5px;line-height:1.65;color:rgba(250,247,242,0.68);">${t('oris_desc')}</p>
              <div style="display:flex;flex-wrap:wrap;gap:7px;margin-top:auto;">
                ${['oris_tag_1', 'oris_tag_2', 'oris_tag_3']
                  .map(
                    (k) => `<span style="font-family:var(--font-mono);font-size:10px;letter-spacing:0.03em;color:rgba(250,247,242,0.7);border:1px solid rgba(250,247,242,0.16);border-radius:999px;padding:4px 11px;">${t(k as any)}</span>`
                  )
                  .join('')}
              </div>
            </div>
            <!-- Activos Digitales -->
            <a href="#produccion" data-link="produccion" class="nd-cat-card reveal" style="--reveal-delay:200ms;flex:1;padding:32px;display:flex;flex-direction:column;text-decoration:none;color:var(--bg);">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;">
                <span style="font-family:var(--font-display);font-weight:700;font-size:25px;letter-spacing:-0.02em;">${t('activos_card_title')}</span>
                <span style="width:8px;height:8px;border-radius:50%;background:var(--accent);box-shadow:0 0 10px rgba(224,78,20,0.6);animation:ndPulseDark 2.6s infinite;"></span>
              </div>
              <p style="margin:0 0 24px;font-family:var(--font-serif);font-size:15.5px;line-height:1.65;color:rgba(250,247,242,0.68);">${t('activos_card_desc')}</p>
              <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px;font-family:var(--font-mono);font-size:13px;">
                <span style="display:flex;align-items:center;gap:10px;"><span style="width:6px;height:6px;border-radius:50%;background:var(--accent);animation:ndPulseDark 2.6s infinite;flex-shrink:0;"></span>noticiasmma.com</span>
                <span style="display:flex;align-items:center;gap:10px;"><span style="width:6px;height:6px;border-radius:50%;background:var(--accent);animation:ndPulseDark 2.6s infinite 0.5s;flex-shrink:0;"></span>lahora24.com</span>
                <span style="display:flex;align-items:center;gap:10px;"><span style="width:6px;height:6px;border-radius:50%;background:var(--accent);animation:ndPulseDark 2.6s infinite 1s;flex-shrink:0;"></span>quisqueyanos.net</span>
              </div>
              <div style="margin-top:auto;font-family:var(--font-mono);font-size:12.5px;letter-spacing:0.06em;color:var(--accent);">${t('activos_card_cta')}</div>
            </a>
          </div>
        </div>
      </div>
      <div class="seam" style="height:2px;background:var(--accent);box-shadow:0 0 12px rgba(224,78,20,0.35);"></div>
    `
    observeReveals(el)
  }

  render()
  onLangChange(render)
  return el
}
