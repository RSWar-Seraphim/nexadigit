// ══════════════════════════════════════════════════════════════════════════════
// HERO — full-bleed editorial. Aurora bloom + hairline grid; a floating top bar
// (own nav, shown while the fixed header is transparent); the headline rises
// word-by-word once per load (tiny inline script so it starts at parse time,
// no wait for the bundle); a production showcase row; and the model bar.
// Pure markup — rendered at build time.
// ══════════════════════════════════════════════════════════════════════════════
import { tr, type Lang } from './i18n'
import { proofStripMarkup } from './ProofStrip'
import { NAV_ITEMS, langSwitchMarkup, navAttrs } from './Header'
import { PROJECTS, VIGIA_URL } from './Projects'

/* "N ACTIVOS EN PRODUCCIÓN" counts the SaaS projects that are live (VIGIA today),
   read from PROJECTS so the number follows the status badges in Proyectos. */
const LIVE_COUNT = PROJECTS.filter((p) => p.status === 'live').length

/* The showcase row under the hero: the SaaS projects — what is live (VIGIA)
   and what is still under construction. The media outlets UniSync operates are
   listed in the footer and llms.txt, not here. A domain is a link only once it
   is live — CASUM and Oris stay plain text until then. */
interface Showcase {
  label: string
  tld: string
  status: 'live' | 'building'
  url?: string
}
const SHOWCASE: Showcase[] = [
  { label: 'vigia', tld: '.com.pa', status: 'live', url: VIGIA_URL },
  { label: 'casum', tld: '.ai', status: 'building' },
  { label: 'oris', tld: '.do', status: 'building' },
]

/* Word rise: the words are hidden only when JS is on (html.js, see style.css),
   and shown by adding .hero-in two frames later so the transition plays. */
const HERO_IN_SCRIPT =
  '<script>(function(){var h=document.querySelector("[data-hero-headline]");if(!h)return;' +
  'if(matchMedia("(prefers-reduced-motion: reduce)").matches){h.classList.add("hero-in");return;}' +
  'requestAnimationFrame(function(){requestAnimationFrame(function(){h.classList.add("hero-in")})})})();</script>'

/* One showcase group: a mono label with its status dot (pulsing orange = live,
   dashed = under construction) followed by the domains. Each group wraps as a
   unit, so on narrower screens "en construcción" drops to its own line. */
const LIVE_DOT = (size: number, delay = 0) =>
  `<span style="width:${size}px;height:${size}px;border-radius:50%;background:var(--accent);flex-shrink:0;animation:ndPulse 2.6s infinite${delay ? ` ${delay}s` : ''};"></span>`
const BUILDING_DOT = (size: number) =>
  `<span style="width:${size}px;height:${size}px;border-radius:50%;border:1.5px dashed var(--line-strong);box-sizing:border-box;flex-shrink:0;"></span>`

function showcaseGroup(live: boolean, label: string, items: Showcase[]): string {
  const item = (s: Showcase, i: number) => {
    const inner = `${live ? LIVE_DOT(6, i * 0.5) : BUILDING_DOT(6)}${s.label}<span style="color:var(--line-strong);">${s.tld}</span>`
    return s.url
      ? `<a href="${s.url}" target="_blank" rel="noopener" class="nd-showcase-link">${inner}</a>`
      : `<span class="nd-showcase-link nd-showcase-link--building">${inner}</span>`
  }
  return `
          <span style="display:inline-flex;align-items:center;justify-content:center;gap:20px 40px;flex-wrap:wrap;">
            <span style="display:inline-flex;align-items:center;gap:10px;font-family:var(--font-mono);font-size:11px;letter-spacing:0.16em;color:var(--muted);flex-shrink:0;">${live ? LIVE_DOT(7) : BUILDING_DOT(7)}${label}</span>
            ${items.map(item).join('')}
          </span>`
}

export function heroMarkup(lang: Lang): string {
  const t = tr(lang)

  const eyebrow = (() => {
    const parts = t('hero_eyebrow').split(' · ')
    const main = parts[0]
    const loc = parts.slice(1).join(' · ')
    // The location ("· Santo Domingo, RD") is hidden on phones for a cleaner hero.
    return loc ? `${main}<span class="nd-eyebrow-loc"> · ${loc}</span>` : main
  })()

  const headline = t('hero_headline')
    .split(' ')
    .map((w, i, words) => {
      const last = i === words.length - 1
      const inner = last ? `${w}<span style="color:var(--accent);">.</span>` : w
      return `<span style="display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:0.12em;"><span class="nd-hero-word" style="--i:${i};">${inner}</span></span>`
    })
    .join(' ')

  return `
    <section id="top" data-screen-label="Hero" style="position:relative;min-height:100vh;background:var(--bg);color:var(--ink);display:flex;flex-direction:column;overflow:hidden;border-bottom:1px solid var(--line);">
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
        <nav class="hidden md:flex" style="align-items:center;gap:22px;flex-shrink:0;" aria-label="${t('a11y_nav_hero')}">
          ${NAV_ITEMS.map(
            (item) => `<a ${navAttrs(item, lang, { onHome: true })} class="nd-link nd-link--muted">${t(item.key)}</a>`
          ).join('')}
        </nav>
        <div style="display:flex;align-items:center;gap:16px;flex-shrink:0;">
          ${langSwitchMarkup(lang, 'hidden lg:flex')}
          <a href="#contacto" data-book-meeting class="nd-pill" style="flex-shrink:0;">${t('cta_book_short')}</a>
        </div>
      </div>

      <!-- hero editorial -->
      <div style="box-sizing:border-box;position:relative;z-index:1;flex:1;width:100%;display:grid;grid-template-columns:1fr auto;gap:clamp(28px,4vw,72px);align-items:end;align-content:center;padding:clamp(44px,6vh,92px) clamp(28px,5vw,76px) clamp(40px,5vh,64px);">
        <div>
          <div data-hero-fade class="nd-eyebrow" style="font-size:13px;margin-bottom:clamp(24px,3vh,38px);text-transform:uppercase;">${eyebrow}</div>
          <h1 data-hero-headline style="margin:0 0 clamp(26px,3vh,40px) 0;font-family:var(--font-display);font-weight:700;font-size:clamp(48px,7.6vw,116px);line-height:0.98;letter-spacing:-0.045em;color:var(--ink);">
            ${headline}
          </h1>
          <p data-hero-fade class="nd-hero-sub-full" style="margin:0 0 40px 0;max-width:600px;font-family:var(--font-serif);font-size:19px;line-height:1.6;color:var(--slate);">${t('hero_subhead')}</p>
          <p data-hero-fade class="nd-hero-sub-short" aria-hidden="true" style="margin:0 0 40px 0;max-width:600px;font-family:var(--font-serif);font-size:19px;line-height:1.6;color:var(--slate);">${t('hero_subhead_short')}</p>
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
          <span>${LIVE_COUNT === 1 ? t('hero_coord_assets_one') : t('hero_coord_assets_many').replace('{n}', String(LIVE_COUNT))}</span>
        </div>
      </div>

      <!-- production showcase -->
      <div class="nd-hero-showcase" style="position:relative;z-index:1;border-top:1px solid var(--line);">
        <div data-hero-fade style="box-sizing:border-box;width:100%;padding:32px clamp(28px,5vw,76px);display:flex;align-items:center;justify-content:center;gap:20px 48px;flex-wrap:wrap;">
          ${showcaseGroup(true, t('hero_showcase_label'), SHOWCASE.filter((s) => s.status === 'live'))}
          ${showcaseGroup(false, t('projects_status_building'), SHOWCASE.filter((s) => s.status === 'building'))}
        </div>
      </div>

      ${proofStripMarkup(lang)}
      ${HERO_IN_SCRIPT}
    </section>
  `
}
