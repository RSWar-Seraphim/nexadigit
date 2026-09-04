// ══════════════════════════════════════════════════════════════════════════════
// CONTACTO / CTA FINAL — carbon band with a breathing glow. Left: the pitch,
// headline (masked word rise + underline draw), the three things that happen
// after writing, and the direct channels. Right: an editorial form — visible
// labels, hairline fields, one-tap choice pills — posting to /api/mailerlite.
// Pure markup; submit handler + headline reveal live in src/client/contact.ts.
// ══════════════════════════════════════════════════════════════════════════════
import { tr, type Key, type Lang } from './i18n'
import { ROUTES } from './i18n/routes'

export const CONTACT_EMAIL = 'kreyes@nexadigit.io'

const SERVICE_OPTS: Key[] = ['form_service_1', 'form_service_2', 'form_service_3', 'form_service_4', 'form_service_5']
const NEXT_STEPS: Key[] = ['form_note', 'contact_next_2', 'contact_next_3']

export function contactMarkup(lang: Lang): string {
  const t = tr(lang)

  const headline = t('contact_title')
    .split(' ')
    .map((w, i, words) => {
      const last = i === words.length - 1
      const inner = last
        ? `<span class="nd-cta-word" style="--i:${i};position:relative;">${w}<span class="nd-cta-underline"></span></span>`
        : `<span class="nd-cta-word" style="--i:${i};">${w}</span>`
      return `<span style="display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:8px;">${inner}</span>`
    })
    .join(' ')

  const field = (id: string, name: string, label: Key, type = 'text', extra = '', cls = '') => `
    <div class="nd-field ${cls}">
      <label for="${id}">${t(label)}</label>
      <input id="${id}" type="${type}" name="${name}" ${extra}>
    </div>`

  return `
    <section id="contacto" data-screen-label="CTA Final" style="position:relative;background:var(--carbon);color:var(--bg);overflow:hidden;">
      <div class="seam" style="position:absolute;top:0;left:0;right:0;height:2px;background:var(--accent);box-shadow:0 0 12px rgba(224,78,20,0.35);z-index:3;"></div>
      <div class="seam" style="position:absolute;bottom:0;left:0;right:0;height:2px;background:var(--accent);box-shadow:0 0 12px rgba(224,78,20,0.35);z-index:3;"></div>
      <div aria-hidden="true" style="position:absolute;left:32%;top:50%;width:1100px;height:760px;transform:translate(-50%,-50%);background:radial-gradient(closest-side, rgba(224,78,20,0.10), rgba(224,78,20,0) 70%);animation:ndBreathe 10s ease-in-out infinite;pointer-events:none;"></div>

      <div data-cta-block class="nd-cta-block nd-wrap" style="position:relative;z-index:2;width:100%;padding:112px clamp(20px,5vw,40px);display:grid;grid-template-columns:1fr 1.15fr;gap:clamp(48px,7vw,104px);align-items:start;">

        <div>
          <div class="reveal" style="display:inline-flex;align-items:center;gap:11px;margin-bottom:24px;">
            <span style="width:7px;height:7px;border-radius:50%;background:var(--accent);box-shadow:0 0 10px rgba(224,78,20,0.6);animation:ndPulseDark 2.6s infinite;flex-shrink:0;"></span>
            <span style="font-family:var(--font-mono);font-size:12.5px;letter-spacing:0.16em;text-transform:uppercase;color:var(--accent);font-weight:500;text-shadow:0 0 14px rgba(224,78,20,0.35);">${t('contact_eyebrow')}</span>
          </div>
          <h2 class="nd-cta-headline" style="margin:0 0 22px;font-family:var(--font-display);font-weight:700;font-size:clamp(38px,4.2vw,58px);letter-spacing:-0.03em;line-height:1.06;">${headline}</h2>
          <p class="reveal" style="--reveal-delay:140ms;margin:0 0 44px;max-width:440px;font-family:var(--font-serif);font-size:17px;line-height:1.6;color:rgba(250,247,242,0.66);">${t('contact_sub')}</p>

          <div class="reveal nd-next" style="--reveal-delay:200ms;">
            <div class="nd-next__label">${t('contact_next_label')}</div>
            ${NEXT_STEPS.map(
              (k, i) => `
              <div class="nd-step">
                <span style="font-family:var(--font-mono);font-size:12px;color:var(--accent);padding-top:3px;">0${i + 1}</span>
                <div style="font-family:var(--font-serif);font-size:15.5px;line-height:1.55;color:rgba(250,247,242,0.72);">${t(k)}</div>
              </div>`
            ).join('')}
          </div>

          <div class="reveal nd-channels" style="--reveal-delay:260ms;">
            <a href="mailto:${CONTACT_EMAIL}" class="nd-contact-link nd-contact-link--muted">${CONTACT_EMAIL}</a>
            <a data-book-meeting href="#contacto" class="nd-contact-link">${t('cta_book')} →</a>
          </div>
        </div>

        <form id="contact-form" class="nd-form reveal" method="post" action="/api/mailerlite" style="--reveal-delay:120ms;">
          <div class="nd-form-grid">
            ${field('cf-first', 'first_name', 'form_first', 'text', 'required autocomplete="given-name"')}
            ${field('cf-last', 'last_name', 'form_last', 'text', 'autocomplete="family-name"')}
            ${field('cf-email', 'email', 'form_email', 'email', 'required autocomplete="email"', 'span2')}
            ${field('cf-phone', 'phone', 'form_phone', 'tel', 'autocomplete="tel"', 'nd-form-optional')}
            ${field('cf-company', 'company', 'form_company', 'text', 'autocomplete="organization"', 'nd-form-optional')}

            <fieldset class="nd-choices span2">
              <legend>${t('form_service_legend')}</legend>
              <div class="nd-choices__list">
                ${SERVICE_OPTS.map(
                  (k, i) => `
                  <label class="nd-choice">
                    <input type="radio" name="service" value="${t(k)}"${i === 0 ? ' required' : ''}>
                    <span>${t(k)}</span>
                  </label>`
                ).join('')}
              </div>
            </fieldset>

            <div class="nd-field span2">
              <label for="cf-message">${t('form_message')}</label>
              <textarea id="cf-message" name="message" rows="3" placeholder="${t('form_message_placeholder')}"></textarea>
            </div>
          </div>

          <div class="nd-form-actions">
            <button type="submit" class="nd-cta" data-cta-btn data-glow="0 14px 44px rgba(224,78,20,0.45)">${t('form_submit')}<span class="nd-cta__arrow" data-cta-arrow>→</span></button>
            <p class="nd-form-note">${t('form_privacy_pre')} <a href="${ROUTES.privacy[lang]}">${t('form_privacy_link')}</a>.</p>
          </div>
        </form>
      </div>
    </section>
  `
}
