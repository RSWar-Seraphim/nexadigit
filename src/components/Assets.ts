// ══════════════════════════════════════════════════════════════════════════════
// ACTIVOS DIGITALES — the proof section. Real media properties operated 24/7
// by UniSync agents. To add an asset: append one object to DIGITAL_ASSETS
// (plus its description key in both locales).
// ══════════════════════════════════════════════════════════════════════════════
import { t, onLangChange } from './i18n'
import { observeReveals, observeCounters } from '../utils/motion'

interface DigitalAsset {
  name: string
  url: string
  descKey: 'assets_mma_desc' | 'assets_lahora_desc' | 'assets_quisqueyanos_desc'
}

export const DIGITAL_ASSETS: DigitalAsset[] = [
  { name: 'noticiasmma.com', url: 'https://noticiasmma.com', descKey: 'assets_mma_desc' },
  { name: 'lahora24.com', url: 'https://lahora24.com', descKey: 'assets_lahora_desc' },
  { name: 'quisqueyanos.net', url: 'https://quisqueyanos.net', descKey: 'assets_quisqueyanos_desc' },
]

export function Assets() {
  const el = document.createElement('section')
  el.id = 'activos'

  const render = () => {
    el.className = 'px-6 py-24'
    el.innerHTML = `
      <div class="max-w-content mx-auto">
        <div class="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p class="eyebrow reveal">${t('assets_eyebrow')}</p>
            <h2 class="display display-title mt-4 reveal reveal-d1">${t('assets_title')}</h2>
            <p class="lede mt-6 reveal reveal-d2">${t('assets_lede')}</p>
          </div>
          <p class="mono-detail flex items-center gap-2.5 reveal reveal-d2" aria-hidden="true">
            <span class="signal-dot signal-dot--live"></span>
            <span><span data-counter="${DIGITAL_ASSETS.length}">0</span>&nbsp;· ${t('assets_status')}</span>
          </p>
        </div>

        <div class="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          ${DIGITAL_ASSETS.map(
            (asset, i) => `
            <a href="${asset.url}" target="_blank" rel="noopener noreferrer"
               class="card card-hover group p-7 flex flex-col gap-4 reveal reveal-d${i + 1}">
              <div class="flex items-center justify-between gap-3">
                <span class="flex items-center gap-2.5 font-mono text-xs text-slate">
                  <span class="signal-dot signal-dot--live"></span>
                  ${t('assets_status')}
                </span>
                <svg class="w-4 h-4 text-slate group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
                </svg>
              </div>
              <h3 class="font-mono font-medium text-lg text-ink group-hover:text-accent transition-colors">${asset.name}</h3>
              <p class="text-slate text-[0.9375rem] leading-relaxed">${t(asset.descKey)}</p>
              <span class="sr-only">(${t('a11y_external')})</span>
            </a>
          `
          ).join('')}
        </div>
      </div>
    `

    observeReveals(el)
    observeCounters(el)
  }

  render()
  onLangChange(render)
  return el
}
