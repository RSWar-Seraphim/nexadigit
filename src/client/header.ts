// Off-canvas mobile menu: burger opens, X / outside click / nav item closes.
// Markup comes from src/components/Header.ts (rendered at build time).

const lockScroll = () => document.documentElement.classList.add('overflow-hidden')
const unlockScroll = () => document.documentElement.classList.remove('overflow-hidden')

export function initHeader(): void {
  const menu = document.getElementById('mobile-menu')
  const burger = document.getElementById('burger-btn')
  if (!menu || !burger) return

  const isOpen = () => menu.classList.contains('translate-x-0')

  const close = (cb?: () => void) => {
    menu.classList.add('-translate-x-full')
    menu.classList.remove('translate-x-0')
    burger.setAttribute('aria-expanded', 'false')
    if (cb) setTimeout(cb, 300)
    else setTimeout(unlockScroll, 300)
  }

  const open = () => {
    menu.classList.remove('-translate-x-full')
    menu.classList.add('translate-x-0')
    burger.setAttribute('aria-expanded', 'true')
    lockScroll()
  }

  burger.addEventListener('click', (e) => {
    e.stopPropagation()
    open()
  })
  document.getElementById('close-menu-btn')?.addEventListener('click', (e) => {
    e.stopPropagation()
    close()
  })
  document.addEventListener('click', (e) => {
    if (isOpen() && !menu.contains(e.target as Node)) close()
  })

  /* Section links on the landing scroll after the menu slides away; links to
     other pages (Blog, /#… from a subpage) simply navigate. */
  menu.querySelectorAll<HTMLAnchorElement>('.mobile-nav-item a').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.dataset.link
      if (!id) return
      e.preventDefault()
      e.stopPropagation()
      close(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        setTimeout(unlockScroll, 300)
      })
    })
  })
}
