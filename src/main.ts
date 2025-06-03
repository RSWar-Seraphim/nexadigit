import './styles/style.css'
import { Header }   from './components/Header'
import { Hero }     from './components/Hero'
import { About }    from './components/About'
import { Service }  from './components/Service'
import { Unisync }  from './components/Unisync'
import { Contact }  from './components/Contact'
import { showLegalModal } from './components/PrivacyModal'
import { autoDetectLang } from './components/i18n/autoDetectLang'
import { setLang } from './components/i18n'

/* --- Utility: Mounts each section into #app in the correct order --- */
function renderApp() {
  const app = document.querySelector<HTMLDivElement>('#app')
  if (!app) return

  // 1) Fixed Header
  const headerEl = Header()
  app.appendChild(headerEl)

  // 2) Main content area
  const mainEl = document.createElement('main')
  mainEl.className = 'text-white'

  // 3) Append all sections in order
  mainEl.append(
    Hero(),      // id="home"
    About(),     // id="about"
    Service(),   // id="services"
    Unisync(),   // id="unisync"
    Contact()    // id="contact"
  )

  app.appendChild(mainEl)
}

/* --- Utility: Hide the loader after app is mounted --- */
function hideLoader(delay = 900) { // Cambié a 900 como tu comentario, ajusta si quieres
  const loader = document.getElementById('loader')
  if (!loader) return
  setTimeout(() => {
    loader.classList.add('opacity-0')  // smooth fade
    setTimeout(() => loader.remove(), 500)
  }, delay)
}

/* --- App entry point --- */
document.addEventListener('DOMContentLoaded', async () => {
  // 1. Detecta idioma automáticamente (solo si el usuario no eligió manual)
  const detectedLang = await autoDetectLang();
  setLang(detectedLang); // Actualiza globalmente

  // 2. Render normal
  renderApp();

  // 3. Funcionalidad adicional
  await import('./scroll');
  hideLoader(900);
});

/* --- Calendly delegation --- */
declare const Calendly: any;

document.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest('[data-book-meeting]');
  if (btn) {
    e.preventDefault();
    Calendly.initPopupWidget({
      url: 'https://calendly.com/kreyes-nexadigit/30min?hide_event_type_details=1&primary_color=006E49'
    });
    return false;
  }
});

document.addEventListener('click', (e) => {
  const target = (e.target as HTMLElement).closest('[data-legal]');
  if (target) {
    e.preventDefault();
    const type = target.getAttribute('data-legal') as 'privacy';
    showLegalModal(type);
  }
});
