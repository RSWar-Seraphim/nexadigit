// ══════════════════════════════════════════════════════════════════════════════
// HERO — full-bleed editorial. Aurora bloom + hairline grid; a floating top bar
// (own nav, shown while the fixed header is transparent); the headline rises
// word-by-word once per load; a production showcase row; and the "Prueba de
// Operación" telemetry strip. Language re-renders skip the one-time word rise.
// ══════════════════════════════════════════════════════════════════════════════
import { t, getLang, setLang, onLangChange } from './i18n'
import { ProofStrip } from './ProofStrip'
import { NAV_ITEMS, langSwitchMarkup } from './Header'
import { prefersReducedMotion } from '../utils/motion'

let heroPlayed = false

const SHOWCASE = [
  { url: 'https://noticiasmma.com', label: 'noticiasmma', tld: '.com', delay: '' },
  { url: 'https://lahora24.com', label: 'lahora24', tld: '.com', delay: ' 0.5s' },
  { url: 'https://quisqueyanos.net', label: 'quisqueyanos', tld: '.net', delay: ' 1s' },
]

function eyebrowMarkup(): string {
  const parts = t('hero_eyebrow').split(' · ')
  const main = parts[0]
  const loc = parts.slice(1).join(' · ')
  // The location ("· Santo Domingo, RD") is hidden on phones for a cleaner hero.
  return loc ? `${main}<span class="nd-eyebrow-loc"> · ${loc}</span>` : main
}

function headlineMarkup(): string {
  const words = t('hero_headline').split(' ')
  return words
    .map((w, i) => {
      const last = i === words.length - 1
      const inner = last ? `${w}<span style="color:var(--accent);">.</span>` : w
      return `<span style="display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:0.12em;"><span class="nd-hero-word" style="--i:${i};">${inner}</span></span>`
    })
    .join(' ')
}

export function Hero() {
  const el = document.createElement('section')
  el.id = 'top'
  el.setAttribute('data-screen-label', 'Hero')
  el.style.cssText =
    'position:relative;min-height:100vh;background:var(--bg);color:var(--ink);display:flex;flex-direction:column;overflow:hidden;border-bottom:1px solid var(--line);'

  const render = () => {
    el.innerHTML = `
      <!-- aurora bloom field -->
      <div aria-hidden="true" style="position:absolute;inset:0;z-index:0;overflow:hidden;pointer-events:none;">
        <div style="position:absolute;left:-8%;bottom:-32%;width:68%;height:98%;background:radial-gradient(closest-side, rgba(224,78,20,0.52), rgba(224,78,20,0.15) 46%, rgba(224,78,20,0) 72%);filter:blur(46px);animation:ndAuroraA 15s ease-in-out infinite;"></div>
        <div style="position:absolute;right:-12%;bottom:-36%;width:66%;height:102%;background:radial-gradient(closest-side, rgba(224,78,20,0.44), rgba(224,78,20,0.11) 46%, rgba(224,78,20,0) 72%);filter:blur(54px);animation:ndAuroraB 18s ease-in-out infinite;"></div>
        <div style="position:absolute;left:50%;top:-24%;width:84%;height:64%;transform:translateX(-50%);background:radial-gradient(closest-side, rgba(224,78,20,0.22), rgba(224,78,20,0) 70%);filter:blur(64px);animation:ndAuroraA 22s ease-in-out infinite reverse;"></div>
        <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(21,23,28,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(21,23,28,0.03) 1px, transparent 1px);background-size:56px 56px;-webkit-mask-image:radial-gradient(ellipse 78% 68% at 50% 42%, #000 26%, transparent 78%);mask-image:radial-gradient(ellipse 78% 68% at 50% 42%, #000 26%, transparent 78%);"></div>
      </div>

      <!-- floating top bar -->
      <div style="box-sizing:border-box;position:relative;z-index:3;width:100%;padding:24px clamp(28px,5vw,76px);display:flex;align-items:center;justify-content:space-between;gap:20px;">
        <a href="#top" data-link="top" style="display:flex;align-items:center;gap:10px;text-decoration:none;flex-shrink:0;">
          <img src="/assets/img/nexadigit-mark.webp" width="249" height="318" alt="NexaDigit" style="height:42px;width:auto;display:block;">
        </a>
        <nav class="hidden md:flex" style="align-items:center;gap:22px;flex-shrink:0;">
          ${NAV_ITEMS.map(
            (item) => `<a href="#${item.id}" data-link="${item.id}" class="nd-link nd-link--muted">${t(item.key)}</a>`
          ).join('')}
        </nav>
        <div style="display:flex;align-items:center;gap:16px;flex-shrink:0;">
          ${langSwitchMarkup(getLang(), 'hidden lg:flex')}
          <a href="#contacto" data-book-meeting class="nd-pill" style="flex-shrink:0;">${t('cta_book_short')}</a>
        </div>
      </div>

      <!-- hero editorial -->
      <div style="box-sizing:border-box;position:relative;z-index:1;flex:1;width:100%;display:grid;grid-template-columns:1fr auto;gap:clamp(28px,4vw,72px);align-items:end;align-content:center;padding:clamp(44px,6vh,92px) clamp(28px,5vw,76px) clamp(40px,5vh,64px);">
        <div>
          <div data-hero-fade class="nd-eyebrow" style="font-size:13px;margin-bottom:clamp(24px,3vh,38px);text-transform:uppercase;">${eyebrowMarkup()}</div>
          <h1 data-hero-headline style="margin:0 0 clamp(26px,3vh,40px) 0;font-family:var(--font-display);font-weight:700;font-size:clamp(48px,7.6vw,116px);line-height:0.98;letter-spacing:-0.045em;color:var(--ink);">
            ${headlineMarkup()}
          </h1>
          <p data-hero-fade class="nd-hero-sub-full" style="margin:0 0 40px 0;max-width:600px;font-family:var(--font-serif);font-size:19px;line-height:1.6;color:var(--slate);">${t('hero_subhead')}</p>
          <p data-hero-fade class="nd-hero-sub-short" style="margin:0 0 40px 0;max-width:600px;font-family:var(--font-serif);font-size:19px;line-height:1.6;color:var(--slate);">${t('hero_subhead_short')}</p>
          <div data-hero-fade style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
            <a data-cta-btn data-glow="0 14px 44px rgba(224,78,20,0.42)" data-book-meeting href="#contacto" class="nd-cta">${t('cta_book')}<span class="nd-cta__arrow" data-cta-arrow>→</span></a>
            <a href="#produccion" data-link="produccion" class="nd-btn-ghost">${t('hero_cta_secondary')}</a>
          </div>
          <div data-hero-fade class="nd-hero-availability" style="display:inline-flex;align-items:center;gap:9px;margin-top:32px;font-family:var(--font-mono);font-size:11px;letter-spacing:0.08em;color:var(--slate);">
            <span style="width:6px;height:6px;border-radius:50%;background:var(--accent);animation:ndPulse 2.6s infinite;flex-shrink:0;"></span>
            <span><span style="color:var(--accent);">${t('hero_availability_label')}</span> ${t('hero_availability')}</span>
          </div>
        </div>
        <div data-hero-fade class="nd-hero-coords hidden md:flex" style="flex-direction:column;gap:16px;text-align:right;font-family:var(--font-mono);font-size:12px;letter-spacing:0.1em;color:var(--muted);line-height:1.7;padding-bottom:10px;white-space:nowrap;">
          <span>18.4861° N<br>69.9312° W</span>
          <span>${t('hero_coord_since')}</span>
          <span>${t('hero_coord_assets')}</span>
        </div>
      </div>

      <!-- production showcase -->
      <div class="nd-hero-showcase" style="position:relative;z-index:1;border-top:1px solid var(--line);">
        <div data-hero-fade style="box-sizing:border-box;width:100%;padding:32px clamp(28px,5vw,76px);display:flex;align-items:center;justify-content:center;gap:20px 48px;flex-wrap:wrap;">
          <span style="display:inline-flex;align-items:center;gap:10px;font-family:var(--font-mono);font-size:11px;letter-spacing:0.16em;color:var(--muted);flex-shrink:0;">
            <span style="width:7px;height:7px;border-radius:50%;background:var(--accent);flex-shrink:0;animation:ndPulse 2.6s infinite;"></span>
            ${t('hero_showcase_label')}
          </span>
          ${SHOWCASE.map(
            (s) => `
            <a href="${s.url}" target="_blank" rel="noopener" class="nd-showcase-link">
              <span style="width:6px;height:6px;border-radius:50%;background:var(--accent);flex-shrink:0;animation:ndPulse 2.6s infinite${s.delay};"></span>${s.label}<span style="color:var(--line-strong);">${s.tld}</span>
            </a>`
          ).join('')}
        </div>
      </div>
    `

    el.appendChild(ProofStrip())

    // Minimalist ES/EN switch in the hero's floating top bar.
    el.querySelectorAll<HTMLElement>('[data-set-lang]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        const next = btn.dataset.setLang as 'es' | 'en'
        if (next !== getLang()) setLang(next)
      })
    })

    // One-time word rise (skip replay on language change / reduced motion).
    // On first mount main.ts swaps in the static LCP headline (no word spans),
    // so this animation harmlessly targets the replaced-out node.
    const h1 = el.querySelector<HTMLElement>('[data-hero-headline]')
    if (!h1) return
    if (heroPlayed || prefersReducedMotion()) {
      h1.classList.add('hero-in')
      heroPlayed = true
      return
    }
    heroPlayed = true
    requestAnimationFrame(() => requestAnimationFrame(() => h1.classList.add('hero-in')))
  }

  render()
  onLangChange(render)
  return el
}
