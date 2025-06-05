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

/* Render principal */
function renderApp() {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (!app) return;

  const main = document.createElement('main');
  main.className = 'text-white';
  main.append(Header(), Hero(), About(), Service(), Unisync(), Contact());
  app.appendChild(main);
}

/* Loader */
function hideLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  requestAnimationFrame(() => {
    loader.classList.add('opacity-0');
    setTimeout(() => loader.remove(), 500);
  });
}

/* Boot */
document.addEventListener('DOMContentLoaded', async () => {
  setLang(await autoDetectLang());
  renderApp();
  await import('./scroll');
});

window.addEventListener('load', hideLoader);

let calendlyScriptLoading = false;

document.addEventListener('click', e => {
  const target = e.target as HTMLElement;

  const book = target.closest('[data-book-meeting]');
  if (book) {
    e.preventDefault();

    if ((window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({
        url: 'https://calendly.com/kreyes-nexadigit/30min?hide_event_type_details=1&primary_color=006E49'
      });
    } else if (!calendlyScriptLoading) {
      calendlyScriptLoading = true;
      const script = document.createElement('script');
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.onload = () => {
        (window as any).Calendly.initPopupWidget({
          url: 'https://calendly.com/kreyes-nexadigit/30min?hide_event_type_details=1&primary_color=006E49'
        });
        calendlyScriptLoading = false;
      };
      document.head.appendChild(script);
    }
    return false;
  }

  const legal = target.closest('[data-legal]');
  if (legal) {
    e.preventDefault();
    showLegalModal(legal.getAttribute('data-legal') as 'privacy');
    return false;
  }
});


