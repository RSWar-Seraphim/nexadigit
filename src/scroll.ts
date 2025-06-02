// src/scroll.ts

const ACTIVE_CLASS = 'active';

interface SectionData { id: string; top: number }

let sections: SectionData[] = [];
let headerEl: HTMLElement | null = null;
let headerOffset = 0;

// --- Measure header height and section positions ---
function measureSections() {
  headerEl = document.querySelector<HTMLElement>('header');
  headerOffset = headerEl ? headerEl.offsetHeight + headerEl.offsetTop + 10 : 56;

  sections = [...document.querySelectorAll<HTMLElement>('section[id]')].map(sec => ({
    id: sec.id,
    top: sec.getBoundingClientRect().top + scrollY - headerOffset,
  })).sort((a, b) => a.top - b.top);
}

// --- Update the active tab according to scroll position ---
function updateActiveFromScroll() {
  if (!sections.length) return;
  const scrollPos = scrollY;
  let current = sections[0];

  for (const sec of sections) {
    if (scrollPos + 2 >= sec.top) current = sec; // tolerance margin
    else break;
  }
  setActiveTab(current.id);
}

// --- Toggle active class on nav links and move highlight if available ---
function setActiveTab(id: string) {
  const links = [...document.querySelectorAll<HTMLElement>('[data-link]')];
  links.forEach(l => l.classList.toggle(ACTIVE_CLASS, l.dataset.link === id));
  (window as any).__moveNavHighlight?.(id);
}

// --- Enable smooth scroll for all [data-link] elements ---
function enableSmoothClicks() {
  document.addEventListener('click', e => {
    const link = (e.target as HTMLElement).closest<HTMLElement>('[data-link]');
    if (!link) return;

    e.preventDefault();
    measureSections(); // recalculate before scrolling

    const id = link.dataset.link!;
    const sec = document.getElementById(id);
    const top = sec
      ? sec.getBoundingClientRect().top + scrollY - headerOffset
      : 0;

    scrollTo({ top, behavior: 'smooth' });
  });
}

// --- Main initializer ---
function initScrollHandling() {
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

  addEventListener('resize', () => {
    measureSections();
    updateActiveFromScroll();
  });

  addEventListener('load', () => {
    measureSections();
    updateActiveFromScroll();
  });
}

// --- Run initializer on DOM ready ---
if (document.readyState === 'loading') {
  addEventListener('DOMContentLoaded', initScrollHandling);
} else {
  initScrollHandling();
}
