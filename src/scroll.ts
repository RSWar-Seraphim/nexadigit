// src/scroll.ts

const HEADER_EL      = document.querySelector<HTMLElement>('header')!

const HEADER_OFFSET  = HEADER_EL.offsetHeight + HEADER_EL.offsetTop + 10   /* ej. 56 px */
const ACTIVE_CLASS  = 'active';

interface SectionData { id: string; top: number }
let sections: SectionData[] = [];

function measureSections() {
  sections = [...document.querySelectorAll<HTMLElement>('section[id]')].map(sec => ({
    id : sec.id,
    top: sec.getBoundingClientRect().top + scrollY - HEADER_OFFSET
  })).sort((a, b) => a.top - b.top);
}

function updateActiveFromScroll() {
  if (!sections.length) return;
  const scrollPos = scrollY;

  let current = sections[0];
  for (const sec of sections) {
    /* margen de tolerancia de 2 px ↓↓↓ */
    if (scrollPos + 2 >= sec.top) current = sec;
    else break;
  }
  setActiveTab(current.id);
}

const links = [...document.querySelectorAll<HTMLElement>('[data-link]')];
function setActiveTab(id: string) {
  links.forEach(l => l.classList.toggle(ACTIVE_CLASS, l.dataset.link === id));
  window.__moveNavHighlight?.(id);
}

function enableSmoothClicks() {
  document.addEventListener('click', e => {
    const link = (e.target as HTMLElement).closest<HTMLElement>('[data-link]');
    if (!link) return;

    e.preventDefault();
    measureSections();                              // ★ recalcula justo antes
    const id  = link.dataset.link!;
    const sec = document.getElementById(id);
    const top = sec
      ? sec.getBoundingClientRect().top + scrollY - HEADER_OFFSET
      : 0;
    scrollTo({ top, behavior: 'smooth' });
  });
}

function init() {
  measureSections();
  enableSmoothClicks();
  updateActiveFromScroll();

  let ticking = false;
  addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        updateActiveFromScroll();
        ticking = false;
      });
    }
  });

  addEventListener('resize', () => {               // ventanas ↔
    measureSections();
    updateActiveFromScroll();
  });

  addEventListener('load', () => {
    measureSections();
    updateActiveFromScroll();
  });
}

document.readyState === 'loading'
  ? addEventListener('DOMContentLoaded', init)
  : init();
