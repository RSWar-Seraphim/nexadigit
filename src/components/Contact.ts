// ══════════════════════════════════════════════════════════════════════════════
// CONTACTO / CTA FINAL — carbon band with a breathing glow. Left: the pitch,
// headline (masked word rise + underline draw), CTAs (Agendar → Calendly popup,
// correo → mailto) and a live "articles published" counter. Right: a glass form
// posting to /api/mailerlite (phone/company/service folded into the message).
// ══════════════════════════════════════════════════════════════════════════════
import { t, onLangChange } from './i18n'
import { notify } from './notify'
import { observeReveals, prefersReducedMotion } from '../utils/motion'

const CONTACT_EMAIL = 'info@nexadigit.io'
let ctaPlayed = false

function headlineMarkup(): string {
  const words = t('contact_title').split(' ')
  return words
    .map((w, i) => {
      const last = i === words.length - 1
      const inner = last
        ? `<span class="nd-cta-word" style="--i:${i};position:relative;">${w}<span class="nd-cta-underline"></span></span>`
        : `<span class="nd-cta-word" style="--i:${i};">${w}</span>`
      return `<span style="display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:8px;">${inner}</span>`
    })
    .join(' ')
}

const SERVICE_OPTS = ['form_service_1', 'form_service_2', 'form_service_3', 'form_service_4', 'form_service_5'] as const

export function Contact() {
  const el = document.createElement('section')
  el.id = 'contacto'
  el.setAttribute('data-screen-label', 'CTA Final')
  el.style.cssText =
    'position:relative;background:var(--carbon);color:var(--bg);min-height:90vh;display:flex;align-items:center;overflow:hidden;'

  function attachFormHandlers() {
    const form = el.querySelector<HTMLFormElement>('#contact-form')
    if (!form) return
    form.addEventListener('submit', async (ev) => {
      ev.preventDefault()
      if (!form.reportValidity()) return
      const fd = new FormData(form)

      const extras: string[] = []
      const phone = String(fd.get('phone') || '').trim()
      const company = String(fd.get('company') || '').trim()
      const service = String(fd.get('service') || '').trim()
      if (company) extras.push(`Empresa: ${company}`)
      if (phone) extras.push(`Teléfono: ${phone}`)
      if (service) extras.push(`Servicio: ${service}`)
      const base = String(fd.get('message') || '').trim()
      const message = [base, extras.join(' · ')].filter(Boolean).join('\n\n')

      const payload = {
        firstName: fd.get('first_name'),
        lastName: fd.get('last_name'),
        email: fd.get('email'),
        message,
      }

      try {
        const apiBase = import.meta.env.VITE_API_URL || ''
        const res = await fetch(`${apiBase}/api/mailerlite`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (res.ok) {
          notify(t('notify_contact_success'), 'success')
          form.reset()
        } else {
          const err = await res.json().catch(() => ({}))
          notify(t('notify_contact_error') + ' ' + (err.error || ''), 'error')
        }
      } catch {
        notify(t('notify_contact_network_error'), 'error')
      }
    })
  }

  function playHeadline() {
    const head = el.querySelector<HTMLElement>('.nd-cta-headline')
    if (!head) return
    if (ctaPlayed || prefersReducedMotion()) {
      head.classList.add('in')
      ctaPlayed = true
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            head.classList.add('in')
            ctaPlayed = true
            io.disconnect()
          }
        })
      },
      { threshold: 0.4 }
    )
    io.observe(head)
  }

  const render = () => {
    el.innerHTML = `
      <div class="seam" style="position:absolute;top:0;left:0;right:0;height:2px;background:var(--accent);box-shadow:0 0 12px rgba(224,78,20,0.35);z-index:3;"></div>
      <div class="seam" style="position:absolute;bottom:0;left:0;right:0;height:2px;background:var(--accent);box-shadow:0 0 12px rgba(224,78,20,0.35);z-index:3;"></div>
      <div aria-hidden="true" style="position:absolute;left:50%;top:50%;width:1100px;height:700px;transform:translate(-50%,-50%);background:radial-gradient(closest-side, rgba(224,78,20,0.09), rgba(224,78,20,0) 70%);animation:ndBreathe 10s ease-in-out infinite;pointer-events:none;"></div>
      <svg aria-hidden="true" style="position:absolute;inset:0;width:100%;height:100%;opacity:0.045;pointer-events:none;"><filter id="ndNoise"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch"></feTurbulence><feColorMatrix type="saturate" values="0"></feColorMatrix></filter><rect width="100%" height="100%" filter="url(#ndNoise)"></rect></svg>

      <div data-cta-block class="nd-cta-block nd-wrap" style="position:relative;z-index:2;width:100%;padding:104px clamp(20px,5vw,40px);display:grid;grid-template-columns:0.82fr 1fr;gap:64px;align-items:center;">

        <div>
          <div class="reveal" style="display:inline-flex;align-items:center;gap:11px;margin-bottom:24px;">
            <span style="width:7px;height:7px;border-radius:50%;background:var(--accent);box-shadow:0 0 10px rgba(224,78,20,0.6);animation:ndPulseDark 2.6s infinite;flex-shrink:0;"></span>
            <span style="font-family:var(--font-mono);font-size:12.5px;letter-spacing:0.16em;text-transform:uppercase;color:var(--accent);font-weight:500;text-shadow:0 0 14px rgba(224,78,20,0.35);">${t('contact_eyebrow')}</span>
          </div>
          <h2 class="nd-cta-headline" style="margin:0 0 22px;font-family:var(--font-display);font-weight:700;font-size:clamp(38px,4.2vw,58px);letter-spacing:-0.03em;line-height:1.06;">${headlineMarkup()}</h2>
          <p class="reveal" style="--reveal-delay:140ms;margin:0 0 28px;max-width:420px;font-family:var(--font-serif);font-size:17px;line-height:1.6;color:rgba(250,247,242,0.66);">${t('contact_sub')}</p>
          <div class="reveal" style="--reveal-delay:200ms;display:flex;align-items:center;gap:24px;flex-wrap:wrap;">
            <a data-book-meeting href="#contacto" class="nd-contact-link">${t('cta_book')} →</a>
            <a href="mailto:${CONTACT_EMAIL}" class="nd-contact-link nd-contact-link--muted">${CONTACT_EMAIL}</a>
          </div>
        </div>

        <form id="contact-form" class="reveal" style="--reveal-delay:120ms;position:relative;background:rgba(255,255,255,0.035);border:1px solid rgba(255,255,255,0.1);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);padding:34px;">
          <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg, #E04E14, rgba(224,78,20,0));box-shadow:0 0 12px rgba(224,78,20,0.3);"></div>
          <div style="display:flex;align-items:center;gap:9px;margin-bottom:22px;font-family:var(--font-mono);font-size:12px;letter-spacing:0.03em;color:var(--cream);">
            <span style="width:6px;height:6px;border-radius:50%;background:var(--accent);animation:ndPulseDark 2.6s infinite;flex-shrink:0;"></span>${t('form_note')}
          </div>

          <div class="nd-form2" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
            <input class="nd-input" type="text" name="first_name" required autocomplete="given-name" aria-label="${t('form_first')}" placeholder="${t('form_first')}">
            <input class="nd-input" type="text" name="last_name" autocomplete="family-name" aria-label="${t('form_last')}" placeholder="${t('form_last')}">
          </div>
          <input class="nd-input" type="email" name="email" required autocomplete="email" aria-label="${t('form_email')}" placeholder="${t('form_email')}" style="margin-bottom:12px;">
          <input class="nd-input nd-form-optional" type="tel" name="phone" autocomplete="tel" aria-label="${t('form_phone')}" placeholder="${t('form_phone')}" style="margin-bottom:12px;">
          <input class="nd-input nd-form-optional" type="text" name="company" autocomplete="organization" aria-label="${t('form_company')}" placeholder="${t('form_company')}" style="margin-bottom:12px;">
          <div style="position:relative;margin-bottom:12px;">
            <select class="nd-input" name="service" required aria-label="${t('form_service_placeholder')}">
              <option value="" disabled selected>${t('form_service_placeholder')}</option>
              ${SERVICE_OPTS.map((k) => `<option>${t(k)}</option>`).join('')}
            </select>
            <span style="position:absolute;right:15px;top:50%;transform:translateY(-50%);pointer-events:none;color:rgba(250,247,242,0.5);font-size:11px;">▾</span>
          </div>
          <textarea class="nd-input" name="message" rows="4" aria-label="${t('form_message')}" placeholder="${t('form_message')}" style="margin-bottom:16px;"></textarea>

          <button data-cta-btn data-glow="0 14px 44px rgba(224,78,20,0.45)" type="submit" style="display:flex;align-items:center;justify-content:center;gap:10px;width:100%;box-sizing:border-box;background:var(--accent);color:var(--cream);border:none;cursor:pointer;font-family:var(--font-mono);font-size:14.5px;letter-spacing:0.04em;font-weight:600;padding:17px;transition:transform 0.18s ease-out, box-shadow 0.35s;">${t('form_submit')}<span class="nd-cta__arrow" data-cta-arrow>→</span></button>
        </form>
      </div>
    `

    attachFormHandlers()
    observeReveals(el)
    playHeadline()
  }

  render()
  onLangChange(render)
  return el
}
