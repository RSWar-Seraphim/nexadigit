// Contact section behavior: the headline's masked word rise (once, when it
// scrolls into view) and the form submit → POST /api/mailerlite.
import { tr, type Lang } from '../components/i18n'
import { notify } from '../components/notify'
import { prefersReducedMotion } from '../utils/motion'

export function initContact(): void {
  const lang = (document.documentElement.lang === 'en' ? 'en' : 'es') as Lang
  const t = tr(lang)

  /* ── headline reveal ─────────────────────────────────────────────────── */
  const head = document.querySelector<HTMLElement>('#contacto .nd-cta-headline')
  if (head) {
    if (prefersReducedMotion()) {
      head.classList.add('in')
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              head.classList.add('in')
              io.disconnect()
            }
          })
        },
        { threshold: 0.4 }
      )
      io.observe(head)
    }
  }

  /* ── form ────────────────────────────────────────────────────────────── */
  const form = document.querySelector<HTMLFormElement>('#contact-form')
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
      const res = await fetch('/api/mailerlite', {
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
