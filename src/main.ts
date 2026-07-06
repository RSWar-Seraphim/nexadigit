/******************************************************************************
 *  main.ts — composition root
 *  Header → Hero(+ProofStrip) → Services → Unisync(Catálogo) → Assets(Producción)
 *  → Process → Faq → Contact → Footer
 ******************************************************************************/

import './styles/style.css';
import { Header }   from './components/Header';
import { Hero }     from './components/Hero';
import { Services } from './components/Services';
import { Unisync }  from './components/Unisync';
import { Assets }   from './components/Assets';
import { Process }  from './components/Process';
import { Faq }      from './components/Faq';
import { Contact }  from './components/Contact';
import { Footer }   from './components/Footer';
import { autoDetectLang } from './components/i18n/autoDetectLang';
import { setLang } from './components/i18n';
import { initInteractions } from './interactions';

/* -------------------------------------------------------------------------- */
/* 1. Render principal                                                         */
/* -------------------------------------------------------------------------- */
function renderApp() {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) return;

  const main = document.createElement('main');
  main.id = 'main'; // target del skip-link

  // Paint the hero (the LCP) as early as possible: mount only Header + Hero
  // first, then defer the heavier below-the-fold sections until the main thread
  // is idle so they don't delay the largest contentful paint.
  main.append(Hero());
  app.innerHTML = '';
  app.append(Header(), main);
  initInteractions();

  const mountRest = () => {
    main.append(Services(), Unisync(), Assets(), Process(), Faq(), Contact());
    app.append(Footer());
  };
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(mountRest, { timeout: 500 });
  } else {
    requestAnimationFrame(() => requestAnimationFrame(mountRest));
  }
}

/* -------------------------------------------------------------------------- */
/* 2. Boot: idioma, render, scroll                                             */
/* -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  setLang(autoDetectLang());
  renderApp();

  /* Deep-link: la app se monta tras un await, por lo que el salto nativo al
     #hash no encuentra el destino. Reintentamos una vez montado el DOM. */
  if (location.hash.length > 1) {
    const id = location.hash.slice(1);
    requestAnimationFrame(() =>
      document.getElementById(id)?.scrollIntoView({ block: 'start' })
    );
  }

  /* Deja este JS para después de la pintura inicial */
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => import('./scroll'));
  } else {
    setTimeout(() => import('./scroll'), 0);
  }
});

/* -------------------------------------------------------------------------- */
/* 3. Calendly diferido + modal legal                                          */
/* -------------------------------------------------------------------------- */
let calendlyScriptLoading = false;

document.addEventListener('click', e => {
  const target = e.target as HTMLElement;

  /* ---------- Calendly (botón reserva) ---------- */
  const book = target.closest('[data-book-meeting]');
  if (book) {
    e.preventDefault();

    const openCalendly = () => {
      (window as any).Calendly.initPopupWidget({
        url:
          'https://calendly.com/kreyes-nexadigit/30min' +
          '?hide_event_type_details=1&primary_color=e04e14',
      });
    };

    if ((window as any).Calendly) {
      openCalendly();
    } else if (!calendlyScriptLoading) {
      calendlyScriptLoading = true;

      /* CSS del widget: también diferido hasta el primer click */
      if (!document.getElementById('calendly-css')) {
        const css = document.createElement('link');
        css.id = 'calendly-css';
        css.rel = 'stylesheet';
        css.href = 'https://assets.calendly.com/assets/external/widget.css';
        document.head.appendChild(css);
      }

      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.onload = () => {
        openCalendly();
        calendlyScriptLoading = false;
      };
      document.head.appendChild(script);
    }
    return false;
  }
});
