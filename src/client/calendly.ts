// Calendly popup, loaded on the first [data-book-meeting] click so the widget's
// CSS/JS (and its third-party cookie) never load for visitors who don't book.

const CALENDLY_URL =
  'https://calendly.com/kreyes-nexadigit/30min?hide_event_type_details=1&primary_color=e04e14'

let loading = false

function openCalendly() {
  ;(window as any).Calendly.initPopupWidget({ url: CALENDLY_URL })
}

export function initCalendly(): void {
  document.addEventListener('click', (e) => {
    const book = (e.target as HTMLElement).closest('[data-book-meeting]')
    if (!book) return
    e.preventDefault()

    if ((window as any).Calendly) {
      openCalendly()
      return
    }
    if (loading) return
    loading = true

    if (!document.getElementById('calendly-css')) {
      const css = document.createElement('link')
      css.id = 'calendly-css'
      css.rel = 'stylesheet'
      css.href = 'https://assets.calendly.com/assets/external/widget.css'
      document.head.appendChild(css)
    }
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.onload = () => {
      openCalendly()
      loading = false
    }
    document.head.appendChild(script)
  })
}
