// ══════════════════════════════════════════════════════════════════════════
// MOTION UTILITY — shared scroll reveals & metric counters
// Single IntersectionObserver for the whole app. Animates transform/opacity
// only (CSS does the work); everything honors prefers-reduced-motion.
// ══════════════════════════════════════════════════════════════════════════

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/* ── Scroll reveals ──────────────────────────────────────────────────────
   Markup: class="reveal" (+ optional reveal-d1..d5 for group stagger).
   Components call observeReveals(el) after each render — elements are
   revealed once and unobserved. Under reduced motion the CSS already shows
   them; we just mark them active so state stays consistent. */

let revealObserver: IntersectionObserver | null = null

export function observeReveals(root: ParentNode = document): void {
  const els = root.querySelectorAll<HTMLElement>('.reveal:not(.active)')
  if (!els.length) return

  if (prefersReducedMotion()) {
    els.forEach((el) => el.classList.add('active'))
    return
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
            revealObserver!.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
  }

  els.forEach((el) => revealObserver!.observe(el))
}

/* ── Metric counters ─────────────────────────────────────────────────────
   Markup: <span data-counter="3" data-counter-suffix="">0</span>
   Counts up ~900ms ease-out on first view; renders the final value
   immediately under reduced motion. */

export function observeCounters(root: ParentNode = document): void {
  const els = root.querySelectorAll<HTMLElement>('[data-counter]:not([data-counted])')
  if (!els.length) return

  const finish = (el: HTMLElement) => {
    el.textContent = `${el.dataset.counter}${el.dataset.counterSuffix ?? ''}`
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
        const suffix = el.dataset.counterSuffix ?? ''
        const duration = 900
        const start = performance.now()

        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - t, 3) // ease-out cubic
          el.textContent = `${Math.round(target * eased)}${suffix}`
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    },
    { threshold: 0.5 }
  )

  els.forEach((el) => counterObserver.observe(el))
}
