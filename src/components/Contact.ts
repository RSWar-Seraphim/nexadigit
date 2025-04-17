// src/components/Contact.ts
export function Contact() {
  const contactEl = document.createElement('section')

  contactEl.className = `
    w-full max-w-[960px] mx-auto mt-32 px-4 text-white flex flex-col items-center
  `

  contactEl.innerHTML = `
    <!-- Encabezado -->
    <h2 class="font-montserrat font-bold text-[45px] text-center">CONTÁCTANOS</h2>
    <p class="font-montserrat font-bold text-[15px] text-center mt-1">Respondemos de inmediato</p>
    <img src="/src/assets/marker-icon.png" alt="marker" class="w-[91px] h-[25px] mx-auto mt-4" />

    <!-- Formulario + Mapa -->
    <div class="grid grid-cols-12 gap-6 mt-10 w-full">
      <!-- Formulario -->
      <form class="col-span-6 w-[529px] h-[504px] bg-white text-black p-6 flex flex-col gap-3 rounded relative z-10 shadow-lg">
        <label for="nombre"  class="font-montserrat text-xs text-black/70 text-left">Nombre</label>
        <input id="nombre"   class="border p-2 rounded outline-none bg-white" type="text" placeholder="John" />
        <label for="apellido" class="font-montserrat text-xs text-black/70 text-left">Apellido</label>
        <input id="apellido" class="border p-2 rounded outline-none bg-white" type="text" placeholder="Doe" />
        <label for="email"    class="font-montserrat text-xs text-black/70 text-left">Correo electrónico</label>
        <input id="email"    class="border p-2 rounded outline-none bg-white" type="email" placeholder="john@gmail.com" />
        <label for="mensaje"  class="font-montserrat text-xs text-black/70 text-left">Mensaje</label>
        <textarea id="mensaje" class="border p-2 rounded outline-none resize-none bg-white" rows="4" placeholder="Escribe tu mensaje"></textarea>
        <button type="submit" class="bg-[#006E49] hover:bg-[#00cc88] transition-colors text-white font-bold h-[45px] mt-2 rounded">Enviar</button>
      </form>

      <!-- Mapa interactivo (centro sin marcador) con pin personalizado -->
      <div class="col-span-6 relative">
        <!-- Iframe sin marcador nativo: usamos ll=lat,lng en lugar de q= -->
        <iframe
          class="w-full h-[504px] rounded"
          loading="lazy"
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps/embed?hl=es&ll=18.452972,-69.937918&z=16&output=embed">
        </iframe>

        <!-- Pin SVG 40×40 en #006E49 -->
        <svg viewBox="0 0 24 24" class="w-10 h-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none" fill="#006E49">
          <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
        </svg>

        <!-- Iconos sociales -->
        <div class="flex justify-end gap-4 mt-3 pr-2">
          <img src="/src/assets/top-bar-icon-linkedin.svg"  class="w-5 h-5 cursor-pointer" />
          <img src="/src/assets/top-bar-icon-instagram.svg" class="w-5 h-5 cursor-pointer" />
          <img src="/src/assets/top-bar-icon-facebook.svg"  class="w-5 h-5 cursor-pointer" />
        </div>
        <div class="flex justify-end gap-4 mt-3 pr-2">
          <img src="/src/assets/top-bar-icon-linkedin.svg"  class="w-5 h-5 cursor-pointer" />
          <img src="/src/assets/top-bar-icon-instagram.svg" class="w-5 h-5 cursor-pointer" />
          <img src="/src/assets/top-bar-icon-facebook.svg"  class="w-5 h-5 cursor-pointer" />
        </div>
      </div>
    </div>

    <!-- Manos decorativas -->
    <img src="/src/assets/contact-hands.png" alt="hands" class="w-[795px] h-[611px] mx-auto mt-20 object-contain" />

    <!-- Footer -->
    <footer class="w-full mt-20 flex flex-col items-center gap-4">
      <img src="/src/assets/arrow-right-about.svg" alt="arrow" class="w-5 h-5 rotate-90" />
      <h3 class="font-petrov-sans font-bold text-[25px]">NexaDigit</h3>
      <div class="w-full flex justify-between text-[12px] font-montserrat font-semibold px-4">
        <span>© 2025 NexaDigit. All rights reserved.</span>
        <span class="flex gap-6">
          <a href="#" class="text-white hover:underline">Privacy Policy</a>
          <a href="#" class="text-white hover:underline">Term of Use</a>
          <a href="#" class="text-white hover:underline">Cookie Settings</a>
        </span>
      </div>
    </footer>
  `

  return contactEl
}
