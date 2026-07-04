// ══════════════════════════════════════════════════════════════════════════════
// CONTACT — final CTA + form. "Hablemos de su próximo sistema."
// Keeps the existing MailerLite wiring (POST /api/mailerlite + notify toasts),
// now with required fields and light styling.
// ══════════════════════════════════════════════════════════════════════════════
import { t, onLangChange } from './i18n'
import { notify } from './notify'
import { observeReveals } from '../utils/motion'

const CONTACT_EMAIL = 'info@nexadigit.io'

const INPUT_CLASSES =
  'w-full px-4 py-3 rounded-[10px] bg-surface border border-line text-ink placeholder:text-slate/60 ' +
  'focus:border-accent focus:outline-none transition-colors text-[0.9375rem]'

export function Contact() {
  const contactEl = document.createElement('section')
  contactEl.id = 'contact'

  function attachFormHandlers() {
    const form = contactEl.querySelector<HTMLFormElement>('#contact-form')
    if (!form) return

    form.addEventListener('submit', async (ev) => {
      ev.preventDefault()
      const fd = new FormData(form)

      const payload = {
        firstName: fd.get('first_name'),
        lastName: fd.get('last_name'),
        email: fd.get('email'),
        message: fd.get('message'),
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
          const err = await res.json()
          notify(t('notify_contact_error') + ' ' + (err.error || ''), 'error')
        }
      } catch {
        notify(t('notify_contact_network_error'), 'error')
      }
    })
  }

  function render() {
    contactEl.className = 'px-6 py-24'
    contactEl.innerHTML = `
      <div class="max-w-content mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

        <!-- CTA -->
        <div>
          <p class="eyebrow reveal">${t('nav_contact')}</p>
          <h2 class="display display-title mt-4 reveal reveal-d1">${t('contact_title')}</h2>
          <p class="lede mt-6 reveal reveal-d2">${t('contact_sub')}</p>

          <div class="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 reveal reveal-d3">
            <a href="#contact" data-book-meeting class="btn-primary">
              ${t('cta_book')}
              <svg class="btn-arrow w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </a>
            <p class="flex items-center gap-2 text-sm text-slate">
              ${t('contact_email_label')}
              <a href="mailto:${CONTACT_EMAIL}" class="link-underline font-mono text-sm">${CONTACT_EMAIL}</a>
            </p>
          </div>
        </div>

        <!-- Form -->
        <form id="contact-form" class="card p-7 md:p-8 grid grid-cols-1 sm:grid-cols-2 gap-5 reveal reveal-d2" novalidate="false">
          <div>
            <label for="cf-first" class="block text-sm font-medium text-ink mb-1.5">${t('form_label_name')}</label>
            <input id="cf-first" name="first_name" type="text" required autocomplete="given-name" class="${INPUT_CLASSES}">
          </div>
          <div>
            <label for="cf-last" class="block text-sm font-medium text-ink mb-1.5">${t('form_label_lastname')}</label>
            <input id="cf-last" name="last_name" type="text" required autocomplete="family-name" class="${INPUT_CLASSES}">
          </div>
          <div class="sm:col-span-2">
            <label for="cf-email" class="block text-sm font-medium text-ink mb-1.5">${t('form_label_email')}</label>
            <input id="cf-email" name="email" type="email" required autocomplete="email" class="${INPUT_CLASSES}">
          </div>
          <div class="sm:col-span-2">
            <label for="cf-message" class="block text-sm font-medium text-ink mb-1.5">${t('form_label_message')}</label>
            <textarea id="cf-message" name="message" rows="4" required class="${INPUT_CLASSES} resize-y"></textarea>
          </div>
          <div class="sm:col-span-2">
            <button type="submit" class="btn-primary w-full sm:w-auto">${t('form_submit')}</button>
          </div>
        </form>
      </div>
    `

    attachFormHandlers()
    observeReveals(contactEl)
  }

  render()
  onLangChange(render)
  return contactEl
}
