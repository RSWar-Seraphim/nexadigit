/******************************************************************************
 *  main.ts (versión final)
 ******************************************************************************/

import './styles/style.css';
import { Header }   from './components/Header';
import { Hero }     from './components/Hero';
import { About }    from './components/About';
import { Service }  from './components/Service';
import { Unisync }  from './components/Unisync';
import { Contact }  from './components/Contact';
import { showLegalModal } from './components/PrivacyModal';
import { autoDetectLang } from './components/i18n/autoDetectLang';
import { setLang } from './components/i18n';

/* -------------------------------------------------------------------------- */
/* 1. Render principal                                                         */
/* -------------------------------------------------------------------------- */
function renderApp() {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) return;

  // Encuentra el contenedor LCP que ya existe en el HTML
  const heroSection = app.querySelector<HTMLElement>('#home');
  if (!heroSection) return;

  const main = document.createElement('main');
  main.className = 'text-white';
  main.append(
    Header(),
    Hero(),
    About(),
    Service(),
    Unisync(),
    Contact()
  );
  app.innerHTML = '';
  app.appendChild(main);
}

/* -------------------------------------------------------------------------- */
/* 2. Boot: idioma, render, scroll, señal de montado                           */
/* -------------------------------------------------------------------------- */
/* Boot */
document.addEventListener('DOMContentLoaded', async () => {
  setLang(await autoDetectLang());
  renderApp();
  /* 👇 Deja este JS para después de la pintura inicial */
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
          '?hide_event_type_details=1&primary_color=006E49',
      });
    };

    if ((window as any).Calendly) {
      openCalendly();
    } else if (!calendlyScriptLoading) {
      calendlyScriptLoading = true;
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

  /* ---------- Modal Legal ---------- */
  const legal = target.closest('[data-legal]');
  if (legal) {
    e.preventDefault();
    showLegalModal(legal.getAttribute('data-legal') as 'privacy');
    return false;
  }
});
