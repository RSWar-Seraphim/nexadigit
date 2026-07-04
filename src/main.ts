/******************************************************************************
 *  main.ts — composition root
 *  Header → Hero(+ProofStrip) → Services → Unisync → Assets → Process →
 *  Contact → Footer
 ******************************************************************************/

import './styles/style.css';
import { Header }   from './components/Header';
import { Hero }     from './components/Hero';
import { Services } from './components/Services';
import { Unisync }  from './components/Unisync';
import { Assets }   from './components/Assets';
import { Process }  from './components/Process';
import { Contact }  from './components/Contact';
import { Footer }   from './components/Footer';
import { showLegalModal } from './components/PrivacyModal';
import { autoDetectLang } from './components/i18n/autoDetectLang';
import { setLang } from './components/i18n';

/* -------------------------------------------------------------------------- */
/* 1. Render principal                                                         */
/* -------------------------------------------------------------------------- */
function renderApp() {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) return;

  const main = document.createElement('main');
  main.id = 'main'; // target del skip-link
  main.append(
    Hero(),
    Services(),
    Unisync(),
    Assets(),
    Process(),
    Contact()
  );

  app.innerHTML = '';
  app.append(Header(), main, Footer());
}

/* -------------------------------------------------------------------------- */
/* 2. Boot: idioma, render, scroll                                             */
/* -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', async () => {
  setLang(await autoDetectLang());
  renderApp();

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
          '?hide_event_type_details=1&primary_color=1439C8',
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
