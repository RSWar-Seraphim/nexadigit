// ══════════════════════════════════════════════════════════════════════════════
// FOOTER — brand + location, navigation, digital assets, legal links,
// language switch, dynamic © year.
// ══════════════════════════════════════════════════════════════════════════════
import { t, getLang, setLang, onLangChange } from './i18n'
import { DIGITAL_ASSETS } from './Assets'

const NAV_ITEMS = [
  { id: 'home', key: 'nav_home' },
  { id: 'servicios', key: 'nav_services' },
  { id: 'unisync', key: 'nav_unisync' },
  { id: 'activos', key: 'nav_assets' },
  { id: 'proceso', key: 'nav_process' },
  { id: 'contact', key: 'nav_contact' },
] as const

const LEGAL_ITEMS = [
  { doc: 'privacy', key: 'footer_privacy' },
  { doc: 'terms', key: 'footer_terms' },
  { doc: 'cookie', key: 'footer_cookie' },
] as const

export function Footer() {
  const el = document.createElement('footer')
  el.setAttribute('role', 'contentinfo')

  const render = () => {
    const lang = getLang()
    const year = new Date().getFullYear()

    el.className = 'border-t border-line bg-surface'
    el.innerHTML = `
      <div class="max-w-content mx-auto px-6 py-16">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-10">

          <!-- Brand -->
          <div class="col-span-2 md:col-span-1">
            <a href="#home" class="flex items-center gap-2.5 group" aria-label="${t('a11y_home')}">
              <svg class="h-5 w-auto text-ink group-hover:text-accent transition-colors" viewBox="0 0 204 256" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M183.24,41.29c-11.4,0-21.81-9.24-21.81-20.65S171.84,0,183.24,0s20.64,9.24,20.64,20.64-9.24,20.65-20.64,20.65ZM163.8,136.27l-.63-89.79h40.46l.26,208.94h-40.08L55.86,95.35l-18.99-33.37,1.76,56.7.11,87.81,48.86-29.88,16.82,27.51-79.5,48.62c-7.75,4.74-17.88,2.3-22.62-5.45-1.86-3.04-2.55-6.45-2.23-9.75,0-.06,0-.12,0-1.34V.01l38.56.24,108.65,160.06,18.28,33.02-1.76-57.06Z"/>
              </svg>
              <span class="font-logo font-bold text-base text-ink">NexaDigit</span>
            </a>
            <p class="mono-detail mt-4">${t('footer_location')}</p>
          </div>

          <!-- Navigation -->
          <nav aria-label="${t('footer_nav_label')}">
            <h3 class="eyebrow mb-4">${t('footer_nav_label')}</h3>
            <ul class="flex flex-col gap-2.5">
              ${NAV_ITEMS.map(
                (item) => `
                <li><a href="#${item.id}" class="text-sm text-slate hover:text-ink transition-colors">${t(item.key)}</a></li>
              `
              ).join('')}
            </ul>
          </nav>

          <!-- Digital assets -->
          <div>
            <h3 class="eyebrow mb-4">${t('footer_assets_label')}</h3>
            <ul class="flex flex-col gap-2.5">
              ${DIGITAL_ASSETS.map(
                (asset) => `
                <li>
                  <a href="${asset.url}" target="_blank" rel="noopener noreferrer"
                     class="inline-flex items-center gap-2 text-sm font-mono text-slate hover:text-accent transition-colors">
                    <span class="signal-dot signal-dot--live !w-1.5 !h-1.5" aria-hidden="true"></span>
                    ${asset.name}
                    <span class="sr-only">(${t('a11y_external')})</span>
                  </a>
                </li>
              `
              ).join('')}
            </ul>
          </div>

          <!-- Legal + language -->
          <div>
            <h3 class="eyebrow mb-4">${t('footer_legal_label')}</h3>
            <ul class="flex flex-col gap-2.5">
              ${LEGAL_ITEMS.map(
                (item) => `
                <li>
                  <a href="#" data-legal="${item.doc}" class="text-sm text-slate hover:text-ink transition-colors">${t(item.key)}</a>
                </li>
              `
              ).join('')}
            </ul>
            <button id="footer-lang-toggle"
                    class="mt-6 px-3 py-1.5 rounded-lg border border-line text-xs font-mono font-medium text-slate hover:text-ink hover:border-accent transition-colors"
                    aria-label="${t('a11y_lang_switch')}">
              ${lang === 'es' ? 'English' : 'Español'}
            </button>
          </div>
        </div>

        <div class="mt-14 pt-8 border-t border-line flex flex-wrap items-center justify-between gap-4">
          <p class="text-xs text-slate">© ${year} NexaDigit. ${t('footer_rights')}</p>
          <p class="mono-detail text-xs" aria-hidden="true">18.4861° N, 69.9312° W</p>
        </div>
      </div>
    `

    el.querySelector('#footer-lang-toggle')?.addEventListener('click', () => {
      setLang(getLang() === 'es' ? 'en' : 'es')
    })
  }

  render()
  onLangChange(render)
  return el
}
