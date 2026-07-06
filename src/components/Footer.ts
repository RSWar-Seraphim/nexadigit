// ══════════════════════════════════════════════════════════════════════════════
// FOOTER — brand + tagline + location, navigation, digital assets, language
// switch, legal links (open the legal modal), dynamic © year + operating dot.
// ══════════════════════════════════════════════════════════════════════════════
import { t, getLang, setLang, onLangChange } from './i18n'
import { NAV_ITEMS } from './Header'
import { DIGITAL_ASSETS } from './Assets'

export function Footer() {
  const el = document.createElement('footer')
  el.setAttribute('role', 'contentinfo')
  el.style.borderTop = '1px solid var(--line)'

  const render = () => {
    const lang = getLang()
    const year = new Date().getFullYear()

    el.innerHTML = `
      <div class="nd-wrap" style="padding:72px clamp(20px,5vw,40px) 0;border-left:1px solid var(--line);border-right:1px solid var(--line);">
        <div class="nd-footer" style="display:grid;grid-template-columns:1.6fr 1fr 1fr 0.8fr;gap:48px;padding-bottom:64px;">
          <div>
            <div class="nd-footer-logo" style="display:flex;align-items:center;gap:10px;margin-bottom:18px;">
              <span style="font-family:var(--font-logo);font-weight:700;font-size:24px;letter-spacing:-0.01em;">NexaDigit</span>
            </div>
            <p style="margin:0 0 14px;font-family:var(--font-serif);font-size:15px;line-height:1.6;color:var(--slate);max-width:280px;">${t('footer_tagline')}</p>
            <div style="font-family:var(--font-mono);font-size:12px;color:var(--muted);line-height:1.8;">${t('footer_location')}</div>
          </div>

          <div>
            <div style="font-family:var(--font-mono);font-size:11px;letter-spacing:0.16em;color:var(--muted);margin-bottom:20px;">${t('footer_nav_label').toUpperCase()}</div>
            <div style="display:flex;flex-direction:column;gap:12px;">
              ${NAV_ITEMS.map((item) => `<a href="#${item.id}" data-link="${item.id}" class="nd-flink">${t(item.key)}</a>`).join('')}
            </div>
          </div>

          <div>
            <div style="font-family:var(--font-mono);font-size:11px;letter-spacing:0.16em;color:var(--muted);margin-bottom:20px;">${t('footer_assets_label').toUpperCase()}</div>
            <div style="display:flex;flex-direction:column;gap:12px;">
              ${DIGITAL_ASSETS.map(
                (a) => `<a href="${a.url}" target="_blank" rel="noopener" class="nd-alink"><span style="width:6px;height:6px;border-radius:50%;background:var(--accent);flex-shrink:0;"></span>${a.name}<span class="sr-only"> (${t('a11y_external')})</span></a>`
              ).join('')}
            </div>
          </div>

          <div>
            <div style="font-family:var(--font-mono);font-size:11px;letter-spacing:0.16em;color:var(--muted);margin-bottom:20px;">${t('footer_lang_label').toUpperCase()}</div>
            <div style="display:inline-flex;border:1px solid var(--line-strong);">
              <span data-set-lang="es" style="font-family:var(--font-mono);font-size:12px;padding:8px 14px;cursor:pointer;${lang === 'es' ? 'background:var(--carbon);color:var(--bg);' : 'color:var(--muted);'}">ES</span>
              <span data-set-lang="en" style="font-family:var(--font-mono);font-size:12px;padding:8px 14px;cursor:pointer;${lang === 'en' ? 'background:var(--carbon);color:var(--bg);' : 'color:var(--muted);'}">EN</span>
            </div>
          </div>
        </div>

        <div class="nd-footer-bottom" style="border-top:1px solid var(--line);padding:22px 0;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;font-family:var(--font-mono);font-size:12px;color:var(--muted);">
          <span>© ${year} NexaDigit</span>
          <span style="display:flex;align-items:center;gap:22px;flex-wrap:wrap;">
            <a href="/privacidad.html" class="nd-legal-link">${t('footer_privacy')}</a>
            <a href="/terminos.html" class="nd-legal-link">${t('footer_terms')}</a>
            <span style="display:flex;align-items:center;gap:9px;"><span style="width:6px;height:6px;border-radius:50%;background:var(--accent);animation:ndPulse 2.6s infinite;"></span>${t('footer_operating')}</span>
          </span>
        </div>
      </div>
    `

    el.querySelectorAll<HTMLElement>('[data-set-lang]').forEach((span) => {
      span.addEventListener('click', () => {
        const next = span.dataset.setLang as 'es' | 'en'
        if (next !== getLang()) setLang(next)
      })
    })
  }

  render()
  onLangChange(render)
  return el
}
