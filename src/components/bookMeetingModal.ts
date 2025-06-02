// ──────────────────────────────────────────
// src/components/BookMeetingModal.ts
// Modularidad, claridad, máxima mantenibilidad (sin cambiar la UI)
// ──────────────────────────────────────────

/** HTML del modal de booking */
function getBookMeetingModalHTML() {
  return /* html */ `
<div id="bookMeetingModal" class="fixed inset-0 z-50 hidden flex items-center justify-center">
  <div id="bmOverlay"
       class="absolute inset-0 bg-black/40 backdrop-blur-sm
              opacity-0 transition-opacity duration-300 ease-out"></div>

  <div id="bmPanel"
       class="relative mx-auto my-auto w-full max-w-[22rem] sm:max-w-md md:max-w-lg
              bg-white text-black rounded-2xl shadow-xl p-5 sm:p-6 pt-12
              opacity-0 scale-95 pointer-events-none
              transition-all duration-300 ease-out">

    <button id="closeBookMeetingModal"
            class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center
                   bg-primary text-white rounded-full hover:bg-[#00573a]">&times;</button>

    <h2 class="text-lg sm:text-xl font-bold font-montserrat text-primary text-center">
      Book a Meeting
    </h2>
    <p class="text-[11px] sm:text-xs mt-1 text-gray-600 text-center leading-relaxed">
      Schedule a visit to our facilities or a meeting at your business.
    </p>

    <form class="space-y-3 sm:space-y-4 mt-5">
      <input name="name"  type="text" placeholder="Your name"
             class="w-full bg-white text-black border border-gray-300 rounded px-3 py-2 text-sm
                    focus:outline-none focus:ring-2 focus:ring-primary" />
      <input name="email" type="email" placeholder="Your email"
             class="w-full bg-white text-black border border-gray-300 rounded px-3 py-2 text-sm
                    focus:outline-none focus:ring-2 focus:ring-primary" />
      <input name="phone" type="tel" placeholder="Phone number"
             class="w-full bg-white text-black border border-gray-300 rounded px-3 py-2 text-sm
                    focus:outline-none focus:ring-2 focus:ring-primary" />
      <select name="meeting_type"
        class="w-full bg-white text-black border border-gray-300 rounded px-3 py-2 text-sm
               focus:outline-none focus:ring-2 focus:ring-primary">
        <option selected disabled>Choose meeting type</option>
        <option value="office">Visit our facilities</option>
        <option value="onsite">At your business</option>
        <option value="zoom">Zoom meeting</option>
        <option value="discord">Discord meeting</option>
      </select>
      <input type="date"
             class="w-full bg-white text-black border border-gray-300 rounded px-3 py-2 text-sm
                    focus:outline-none focus:ring-2 focus:ring-primary" />
      <button type="submit"
              class="w-full bg-primary text-white py-2 px-4 rounded font-semibold
                     hover:bg-[#00573a] transition">
        Confirm Booking
      </button>
    </form>
  </div>
</div>
  `
}
declare const Calendly: any;

function setupBookingForm() {
  const form = document.querySelector<HTMLFormElement>('#bookMeetingModal form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd    = new FormData(form);
    const name  = fd.get('name')  as string | null;
    const email = fd.get('email') as string | null;
    const phone = fd.get('phone') as string | null;

    /* 1) MailerLite lead ------------------------------------ */
    fetch('/api/mailerlite', {
      method : 'POST',
      headers: { 'Content-Type':'application/json' },
      body   : JSON.stringify({
        email,
        firstName : name?.split(' ')[0] ?? '',
        lastName  : name?.split(' ').slice(1).join(' ') ?? '',
        message   : `Meeting lead via modal. Phone: ${phone || 'N/A'}`
      })
    }).catch(() => {/* silencioso */});

    /* 2) Calendly popup con prefill -------------------------- */
    const url = new URL('https://calendly.com/kreyes/30min');
    if (name)  url.searchParams.set('name',  name);
    if (email) url.searchParams.set('email', email);

    Calendly.initPopupWidget({
      url: url.toString() + '&hide_event_type_details=1&primary_color=006E49'
    });

    closeBookMeeting();
  });
}


/** Inserta el modal en el DOM sólo si no existe ya */
function ensureBookMeetingModalInDOM() {
  if (!document.getElementById('bookMeetingModal')) {
    document.body.insertAdjacentHTML('beforeend', getBookMeetingModalHTML())
  }
}

/** Referencias a elementos del modal */
function getModalElements() {
  return {
    modal:    document.getElementById('bookMeetingModal')!,
    overlay:  document.getElementById('bmOverlay')!,
    panel:    document.getElementById('bmPanel')!,
    closeBtn: document.getElementById('closeBookMeetingModal')!
  }
}

/** Abre el modal con animación */
export function openBookMeeting() {
  const { modal, overlay, panel } = getModalElements()
  modal.classList.remove('hidden')
  requestAnimationFrame(() => {
    overlay.classList.remove('opacity-0')
    panel.classList.remove('opacity-0', 'scale-95', 'pointer-events-none')
  })
}

/** Cierra el modal con animación */
function closeBookMeeting() {
  const { modal, overlay, panel } = getModalElements()
  overlay.classList.add('opacity-0')
  panel.classList.add('opacity-0', 'scale-95', 'pointer-events-none')
  setTimeout(() => modal.classList.add('hidden'), 300)
}

/** Asigna listeners a los elementos del modal */
function setupModalListeners() {
  const { overlay, closeBtn } = getModalElements()
  closeBtn.addEventListener('click', closeBookMeeting)
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeBookMeeting()
  })
}

/** Delegación global: cualquier [data-book-meeting] abre el modal */
function setupGlobalBookMeetingDelegate() {
  document.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest('[data-book-meeting]')
    if (btn) {
      e.preventDefault()
      openBookMeeting()
    }
  })
}

/** Inicializa el sistema de modal de booking */
export function initBookMeetingModal() {
  ensureBookMeetingModalInDOM()
  setupModalListeners()
  setupGlobalBookMeetingDelegate()
}

// ─── Auto-inicialización al cargar este módulo ───
initBookMeetingModal()
setupBookingForm();
