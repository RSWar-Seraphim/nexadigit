// FAQ accordion: one open at a time; clicking the open one closes it.
// Keeps aria-expanded in sync with the .open class the CSS animates on.

export function initFaq(): void {
  const items = [...document.querySelectorAll<HTMLElement>('#preguntas .nd-faq-item')]
  if (!items.length) return

  const setOpen = (openIdx: number) => {
    items.forEach((item, idx) => {
      const open = idx === openIdx
      item.classList.toggle('open', open)
      item.querySelector<HTMLButtonElement>('.nd-faq-q')?.setAttribute('aria-expanded', String(open))
    })
  }

  items.forEach((item, idx) => {
    item.querySelector<HTMLButtonElement>('.nd-faq-q')?.addEventListener('click', () => {
      setOpen(item.classList.contains('open') ? -1 : idx)
    })
  })
}
