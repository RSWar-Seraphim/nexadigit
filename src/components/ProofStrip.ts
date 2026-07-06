// ══════════════════════════════════════════════════════════════════════════════
// MODEL BAR — the strip at the foot of the hero. An auto-scrolling marquee of
// the AI models NexaDigit builds with. Shown on every viewport. The wordmarks
// are placeholders — drop real brand SVGs in /public and swap them in later.
// ══════════════════════════════════════════════════════════════════════════════
import { t, onLangChange } from './i18n'

const MODELS = ['Claude', 'OpenAI', 'Gemini', 'DeepSeek', 'Mistral', 'Llama', 'Grok', 'Perplexity']

export function ProofStrip(): HTMLElement {
  const el = document.createElement('div')
  el.setAttribute('data-strip', '')
  el.style.cssText =
    'position:relative;z-index:2;border-top:1px solid var(--line);background:var(--panel);'

  const render = () => {
    const items = MODELS.map((m) => `<span class="nd-model">${m}</span>`).join('')
    el.innerHTML = `
      <div class="nd-wrap" style="padding:0 clamp(28px,5vw,76px);height:56px;display:flex;align-items:center;gap:22px;">
        <span class="nd-modelbar-label">${t('models_label')}</span>
        <span class="nd-modelbar-div" style="width:1px;height:20px;background:var(--line-strong);flex-shrink:0;"></span>
        <div class="nd-marquee" role="img" aria-label="${t('models_aria')}">
          <div class="nd-marquee-track" aria-hidden="true">${items}${items}</div>
        </div>
      </div>
    `
  }

  render()
  onLangChange(render)
  return el
}
