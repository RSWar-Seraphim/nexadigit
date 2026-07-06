// ══════════════════════════════════════════════════════════════════════════════
// INTERACTIONS — window-level, selector-based behaviors set up once. Because
// they re-query the DOM each frame/tick (rather than binding to element
// instances), they survive the components' language re-renders.
//   · nav transparency (transparent over hero → frosted past it)
//   · process progress rail (fill + dots advance on scroll)
//   · CTA block parallax lift
//   · magnetic CTA buttons (+ arrow slide + glow) via pointer delegation
//   · UniSync dashboard toast breathing in/out
//   · live "articles published since load" counter
// ══════════════════════════════════════════════════════════════════════════════
import { t } from './components/i18n'
import { prefersReducedMotion } from './utils/motion'

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

let started = false

export function initInteractions() {
  if (started) return
  started = true
  const reduced = prefersReducedMotion()

  /* ── Nav transparency + process rail + CTA parallax (one rAF scroll pass) ── */
  const on = (th: number, p: number) => (p >= th ? '#E04E14' : '#C9C9C1')

  const paintProcess = (p: number) => {
    const sec = document.getElementById('proceso')
    if (!sec) return
    const line = sec.querySelector<HTMLElement>('[data-proc-line]')
    if (line) line.style.width = (p * 100).toFixed(1) + '%'
    ;[0.02, 0.27, 0.52, 0.77].forEach((th, i) => {
      const dot = sec.querySelector<HTMLElement>(`[data-proc-dot="${i + 1}"]`)
      const num = sec.querySelector<HTMLElement>(`[data-proc-num="${i + 1}"]`)
      if (dot) dot.style.background = on(th, p)
      if (num) num.style.color = on(th, p)
    })
    const dot4 = sec.querySelector<HTMLElement>('[data-proc-dot="4"]')
    if (dot4) dot4.style.animation = p >= 0.77 ? 'ndPulse 2.6s infinite' : 'none'
  }

  const paintCta = (p: number) => {
    const block = document.querySelector<HTMLElement>('[data-cta-block]')
    if (block) block.style.transform = `translateY(${((1 - p) * 44).toFixed(1)}px)`
  }

  const onNavScroll = () => {
    const header = document.querySelector<HTMLElement>('.nd-header')
    if (!header) return
    const hero = document.getElementById('top')
    const overHero = hero ? hero.getBoundingClientRect().bottom > 90 : false
    header.classList.toggle('scrolled', !overHero)
  }

  if (reduced) {
    // Settle motion-driven states to their final position.
    paintProcess(1)
    paintCta(1)
    onNavScroll()
    window.addEventListener('scroll', onNavScroll, { passive: true })
  } else {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        onNavScroll()
        const winH = window.innerHeight
        const proc = document.getElementById('proceso')
        if (proc) {
          const r = proc.getBoundingClientRect()
          paintProcess(clamp((winH * 0.85 - r.top) / (winH * 0.6), 0, 1))
        }
        const cta = document.getElementById('contacto')
        if (cta) {
          const r = cta.getBoundingClientRect()
          paintCta(clamp((winH - r.top) / (winH * 0.7), 0, 1))
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  }


  /* ── Magnetic CTA buttons (pointer delegation) ────────────────────────── */
  let lastBtn: HTMLElement | null = null
  const enter = (btn: HTMLElement) => {
    btn.style.boxShadow = btn.getAttribute('data-glow') || '0 0 48px rgba(224,78,20,0.55)'
    const arrow = btn.querySelector<HTMLElement>('[data-cta-arrow]')
    if (arrow) {
      arrow.style.opacity = '1'
      arrow.style.transform = 'translateX(0)'
    }
  }
  const leave = (btn: HTMLElement) => {
    btn.style.transform = 'translate(0,0)'
    btn.style.boxShadow = 'none'
    const arrow = btn.querySelector<HTMLElement>('[data-cta-arrow]')
    if (arrow) {
      arrow.style.opacity = '0'
      arrow.style.transform = 'translateX(-10px)'
    }
  }
  document.addEventListener('pointermove', (e) => {
    const btn = (e.target as HTMLElement).closest?.('[data-cta-btn]') as HTMLElement | null
    if (btn) {
      if (btn !== lastBtn) {
        if (lastBtn) leave(lastBtn)
        enter(btn)
        lastBtn = btn
      }
      if (!reduced) {
        const r = btn.getBoundingClientRect()
        const dx = clamp((e.clientX - (r.left + r.width / 2)) * 0.12, -7, 7)
        const dy = clamp((e.clientY - (r.top + r.height / 2)) * 0.18, -5, 5)
        btn.style.transform = `translate(${dx}px,${dy}px)`
      }
    } else if (lastBtn) {
      leave(lastBtn)
      lastBtn = null
    }
  })

  /* ── UniSync dashboard toast breathing ────────────────────────────────── */
  if (!reduced) {
    let toastOn = false
    setInterval(() => {
      const toast = document.querySelector<HTMLElement>('[data-toast]')
      if (!toast) return
      toastOn = !toastOn
      toast.style.transform = toastOn ? 'translateY(0)' : 'translateY(14px)'
      toast.style.opacity = toastOn ? '1' : '0'
    }, 3200)
  }

  /* ── Live "articles published since load" counter ─────────────────────── */
  let pubs = 1
  setInterval(() => {
    pubs += 1
    const c = document.querySelector<HTMLElement>('[data-pub-count]')
    const w = document.querySelector<HTMLElement>('[data-pub-word]')
    if (c) c.textContent = String(pubs)
    if (w) w.textContent = pubs === 1 ? t('contact_pub_word_singular') : t('contact_pub_word_plural')
  }, 75000)
}
