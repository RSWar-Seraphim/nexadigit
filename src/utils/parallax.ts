// ──────────────────────────────────────────
// src/utils/parallax.ts
// Parallax scroll effect system for neumorphic design
// ──────────────────────────────────────────

let isInitialized = false;
let rafId: number | null = null;

/**
 * Initialize parallax effects for elements with data-parallax attribute
 * The data-parallax value represents the speed factor (0.1 = slow, 1.0 = fast)
 */
export function initParallax(): void {
  if (isInitialized) return;
  isInitialized = true;

  const parallaxElements = document.querySelectorAll<HTMLElement>('[data-parallax]');
  if (!parallaxElements.length) return;

  let ticking = false;

  const updateParallax = () => {
    const scrollY = window.scrollY;

    parallaxElements.forEach((el) => {
      const speed = parseFloat(el.dataset.parallax || '0.5');
      const direction = el.dataset.parallaxDirection || 'y'; // 'y' or 'x'
      const offset = -(scrollY * speed);

      if (direction === 'x') {
        el.style.transform = `translateX(${offset}px)`;
      } else {
        el.style.transform = `translateY(${offset}px)`;
      }
    });

    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      rafId = requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  // Initial update
  updateParallax();
}

/**
 * Initialize scroll reveal animations
 * Elements with reveal-up, reveal-left, reveal-right, or reveal-scale classes
 * will animate when they enter the viewport
 */
export function initScrollReveal(): void {
  const revealElements = document.querySelectorAll<HTMLElement>(
    '.reveal-up, .reveal-left, .reveal-right, .reveal-scale'
  );

  if (!revealElements.length) return;

  // Fallback for browsers without IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach((el) => {
      el.classList.add('is-visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          // Add stagger delay if specified
          const delay = el.dataset.revealDelay;
          if (delay) {
            el.style.transitionDelay = delay;
          }
          el.classList.add('is-visible');
          observer.unobserve(el);
        }
      });
    },
    {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1,
    }
  );

  revealElements.forEach((el, idx) => {
    // Apply stagger if no custom delay is set
    if (!el.dataset.revealDelay) {
      el.style.transitionDelay = `${idx * 0.1}s`;
    }
    observer.observe(el);
  });
}

/**
 * Cleanup function for parallax effects
 */
export function destroyParallax(): void {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
  }
  isInitialized = false;
}
