// ══════════════════════════════════════════════════════════════════════════════
// MODEL BAR — the strip at the foot of the hero. An auto-scrolling marquee of
// the AI models NexaDigit builds with. Shown on every viewport. The wordmarks
// are placeholders — drop real brand SVGs in /public and swap them in later.
// ══════════════════════════════════════════════════════════════════════════════
import { tr, type Lang } from './i18n'

export const MODELS = ['Claude', 'OpenAI', 'Gemini', 'DeepSeek', 'Mistral', 'Llama', 'Grok', 'Perplexity']

export function proofStripMarkup(lang: Lang): string {
  const t = tr(lang)
  const items = MODELS.map((m) => `<span class="nd-model">${m}</span>`).join('')
  return `
    <div data-strip style="position:relative;z-index:2;border-top:1px solid var(--line);background:var(--panel);">
      <div class="nd-wrap" style="padding:0 clamp(28px,5vw,76px);height:56px;display:flex;align-items:center;gap:22px;">
        <span class="nd-modelbar-label">${t('models_label')}</span>
        <span class="nd-modelbar-div" style="width:1px;height:20px;background:var(--line-strong);flex-shrink:0;"></span>
        <div class="nd-marquee" role="img" aria-label="${t('models_aria')}">
          <div class="nd-marquee-track" aria-hidden="true">${items}${items}</div>
        </div>
      </div>
    </div>
  `
}
