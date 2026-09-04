// ══════════════════════════════════════════════════════════════════════════════
// FOOTER — brand + tagline + location, navigation, digital assets, language
// links, legal links, © year + operating dot. Pure markup.
// ══════════════════════════════════════════════════════════════════════════════
import { tr, type Lang } from './i18n'
import { ROUTES } from './i18n/routes'
import { NAV_ITEMS, navAttrs, type NavOpts } from './Header'
import { DIGITAL_ASSETS } from './Projects'

export function footerMarkup(lang: Lang, opts: NavOpts = { onHome: true }): string {
  const t = tr(lang)
  const year = new Date().getFullYear()

  const langOpt = (code: Lang) => {
    const base = 'font-family:var(--font-mono);font-size:12px;padding:8px 14px;text-decoration:none;'
    return code === lang
      ? `<span aria-current="page" lang="${code}" style="${base}background:var(--carbon);color:var(--bg);">${code.toUpperCase()}</span>`
      : `<a href="${ROUTES.home[code]}" hreflang="${code}" lang="${code}" style="${base}color:var(--muted);">${code.toUpperCase()}</a>`
  }

  return `
    <footer role="contentinfo" style="border-top:1px solid var(--line);">
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
            <nav aria-label="${t('a11y_nav_footer')}" style="display:flex;flex-direction:column;gap:12px;">
              ${NAV_ITEMS.map((item) => `<a ${navAttrs(item, lang, opts)} class="nd-flink">${t(item.key)}</a>`).join('')}
            </nav>
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
              ${langOpt('es')}${langOpt('en')}
            </div>
          </div>
        </div>

        <div class="nd-footer-bottom" style="border-top:1px solid var(--line);padding:22px 0;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;font-family:var(--font-mono);font-size:12px;color:var(--muted);">
          <span>© ${year} NexaDigit</span>
          <span style="display:flex;align-items:center;gap:22px;flex-wrap:wrap;">
            <a href="${ROUTES.privacy[lang]}" class="nd-legal-link">${t('footer_privacy')}</a>
            <a href="${ROUTES.terms[lang]}" class="nd-legal-link">${t('footer_terms')}</a>
            <a href="/rss.xml" class="nd-legal-link">RSS</a>
            <span style="display:flex;align-items:center;gap:9px;"><span style="width:6px;height:6px;border-radius:50%;background:var(--accent);animation:ndPulse 2.6s infinite;"></span>${t('footer_operating')}</span>
          </span>
        </div>
      </div>
    </footer>
  `
}
