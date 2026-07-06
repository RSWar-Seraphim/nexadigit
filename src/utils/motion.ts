// ══════════════════════════════════════════════════════════════════════════
// MOTION UTILITY — shared scroll reveals & metric counters
// Single IntersectionObserver for the whole app. Animates transform/opacity
// only (CSS does the work); everything honors prefers-reduced-motion.
// ══════════════════════════════════════════════════════════════════════════

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/* ── Entrance reveals ────────────────────────────────────────────────────
   Markup: class="reveal" | "seam" | "panel-rise", with optional inline
   style="--reveal-delay:80ms". Components call observeReveals(el) after each
   render; elements are shown once and unobserved. Under reduced motion the CSS
   already shows them; we just mark them shown so state stays consistent.
   NOTE: the shown class is `revealed`, NOT `active` — `active` is owned by
   scroll.ts for nav highlighting, and an element can be both a reveal and a
   [data-link] (e.g. the Activos Digitales card), so the two must not collide. */

const ENTRANCE_SELECTOR = '.reveal:not(.revealed), .seam:not(.revealed), .panel-rise:not(.revealed)'
let revealObserver: IntersectionObserver | null = null

export function observeReveals(root: ParentNode = document): void {
  const els = root.querySelectorAll<HTMLElement>(ENTRANCE_SELECTOR)
  if (!els.length) return

  if (prefersReducedMotion()) {
    els.forEach((el) => el.classList.add('revealed'))
    return
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            revealObserver!.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
  }

  els.forEach((el) => {
    // Already in view on load → reveal immediately (no hidden flash).
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight * 0.92 && r.bottom > 0) {
      el.classList.add('revealed')
    } else {
      revealObserver!.observe(el)
    }
  })
}

/* ── Metric counters ─────────────────────────────────────────────────────
   Markup: <span data-counter="1247" data-counter-decimals="0"
                 data-counter-suffix="">0</span>
   Counts up ~1.3s ease-out on first view; final value under reduced motion. */

export function observeCounters(root: ParentNode = document): void {
  const els = root.querySelectorAll<HTMLElement>('[data-counter]:not([data-counted])')
  if (!els.length) return

  const fmt = (v: number, dec: number) =>
    v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec })

  const finish = (el: HTMLElement) => {
    const target = Number(el.dataset.counter ?? '0')
    const dec = Number(el.dataset.counterDecimals ?? '0')
    el.textContent = `${fmt(target, dec)}${el.dataset.counterSuffix ?? ''}`
    el.setAttribute('data-counted', 'true')
  }

  if (prefersReducedMotion()) {
    els.forEach(finish)
    return
  }

  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const el = entry.target as HTMLElement
        observer.unobserve(el)
        el.setAttribute('data-counted', 'true')

        const target = Number(el.dataset.counter ?? '0')
        const dec = Number(el.dataset.counterDecimals ?? '0')
        const suffix = el.dataset.counterSuffix ?? ''
        const duration = 1300
        const start = performance.now()

        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - t, 3) // ease-out cubic
          el.textContent = `${fmt(target * eased, dec)}${suffix}`
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    },
    { threshold: 0.3 }
  )

  els.forEach((el) => counterObserver.observe(el))
}
