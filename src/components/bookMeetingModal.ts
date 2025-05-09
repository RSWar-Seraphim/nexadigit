// 👉 1. Bloque HTML
const modalHTML = /* html */ `
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
      <input type="text" placeholder="Your name"
             class="w-full bg-white text-black border border-gray-300 rounded px-3 py-2 text-sm
                    focus:outline-none focus:ring-2 focus:ring-primary" />
      <input type="email" placeholder="Your email"
             class="w-full bg-white text-black border border-gray-300 rounded px-3 py-2 text-sm
                    focus:outline-none focus:ring-2 focus:ring-primary" />
      <input type="tel" placeholder="Phone number"
             class="w-full bg-white text-black border border-gray-300 rounded px-3 py-2 text-sm
                    focus:outline-none focus:ring-2 focus:ring-primary" />
      <select
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
</div>`

// 👉 2. Sólo lo insertamos si aún no existe
if (!document.getElementById('bookMeetingModal')) {
  document.body.insertAdjacentHTML('beforeend', modalHTML)
}

// 👉 3. Lógica open/close (delegación)
const modal    = document.getElementById('bookMeetingModal')!
const overlay  = document.getElementById('bmOverlay')!
const panel    = document.getElementById('bmPanel')!
const closeBtn = document.getElementById('closeBookMeetingModal')!

export function openBookMeeting() {
  modal.classList.remove('hidden')
  requestAnimationFrame(() => {
    overlay.classList.remove('opacity-0')
    panel.classList.remove('opacity-0', 'scale-95', 'pointer-events-none')
  })
}
function closeBookMeeting() {
  overlay.classList.add('opacity-0')
  panel.classList.add('opacity-0', 'scale-95', 'pointer-events-none')
  setTimeout(() => modal.classList.add('hidden'), 300)
}
closeBtn.addEventListener('click', closeBookMeeting)
overlay.addEventListener('click', (e) => { if (e.target === overlay) closeBookMeeting() })

// 👉 4. Delegación global: cualquier [data-book-meeting] abre el modal
document.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest('[data-book-meeting]')
  if (btn) {
    e.preventDefault()
    openBookMeeting()
  }
})
