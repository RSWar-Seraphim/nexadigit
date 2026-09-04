// ══════════════════════════════════════════════════════════════════════════════
// CLIENT ENTRY — bundled by Astro and loaded as a deferred module on the home
// page. The HTML is already complete (rendered at build time); this only
// attaches behavior to it. Nothing here re-renders markup.
// ══════════════════════════════════════════════════════════════════════════════
import { initInteractions } from '../interactions'
import { observeReveals } from '../utils/motion'
import { initHeader } from './header'
import { initFaq } from './faq'
import { initContact } from './contact'
import { initCalendly } from './calendly'

initInteractions()
observeReveals(document)
initHeader()
initFaq()
initContact()
initCalendly()

/* Nav highlighting + smooth [data-link] scrolling: after the first paint. */
const idle = (cb: () => void) =>
  'requestIdleCallback' in window ? (window as any).requestIdleCallback(cb) : setTimeout(cb, 0)
idle(() => {
  import('../scroll')
})
