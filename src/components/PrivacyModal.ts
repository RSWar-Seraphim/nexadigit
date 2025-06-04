// src/components/PrivacyModal.ts
// --------------------------------------------------------------
// Modal vanilla‑JS/TS (Vite) que muestra Política de Privacidad,
// Términos de Uso y Configuración de Cookies (ES/EN).
// Exporta showLegalModal() para ser usado desde main.ts.
// --------------------------------------------------------------

import { getLang, onLangChange } from './i18n'

function docHtml(type: DocType): string {
  return docs[type][getLang() === 'en' ? 'en' : 'es']
}


/* 2️⃣  Helper que consulta la variable ya inicializada */

/** Tipos aceptados en el atributo data-legal */
export type DocType = 'privacy' | 'terms' | 'cookie'

/* ─────────── Contenidos HTML en ambos idiomas ─────────── */
const docs: Record<DocType, { es: string; en: string }> = {
  privacy: {
    es: `
      <h2 class="text-2xl font-bold mb-4">Política de Privacidad</h2>
      <p><strong>Fecha de entrada en vigor:</strong> 2 de junio de 2025</p>
      <p>En NexaDigit, respetamos tu privacidad y nos comprometemos a proteger tus datos personales. Esta política explica qué información recopilamos, cómo la utilizamos y los derechos que tienes sobre tus datos.</p>
      <h3 class="mt-6 mb-2 font-semibold">1. Datos que recopilamos</h3>
      <ul class="list-disc list-inside space-y-1">
        <li>Nombre</li>
        <li>Apellido</li>
        <li>Correo electrónico</li>
        <li>Mensajes enviados a través del formulario de contacto</li>
      </ul>
      <h3 class="mt-6 mb-2 font-semibold">2. Uso de los datos</h3>
      <ul class="list-disc list-inside space-y-1">
        <li>Envío de comunicaciones promocionales y publicidad sobre nuestros productos y servicios.</li>
        <li>Responder tus mensajes o solicitudes a través del formulario de contacto.</li>
      </ul>
      <h3 class="mt-6 mb-2 font-semibold">3. Terceros con los que compartimos datos</h3>
      <p>Podemos compartir tu información con las siguientes plataformas externas:</p>
      <ul class="list-disc list-inside space-y-1">
        <li><strong>MailerLite</strong>: para gestionar nuestras campañas de email marketing.</li>
        <li><strong>Google Analytics</strong>: para obtener estadísticas de navegación en nuestro sitio web.</li>
        <li><strong>Calendly</strong>: para agendar reuniones o llamadas contigo.</li>
      </ul>
      <p>Estas plataformas cumplen con estándares internacionales de protección de datos.</p>
      <h3 class="mt-6 mb-2 font-semibold">4. Protección de tus datos</h3>
      <ul class="list-disc list-inside space-y-1">
        <li>Encriptación en tránsito mediante HTTPS.</li>
        <li>Acceso restringido únicamente al personal autorizado.</li>
        <li>Supervisión continua de vulnerabilidades.</li>
      </ul>
      <h3 class="mt-6 mb-2 font-semibold">5. Derechos del usuario</h3>
      <ul class="list-disc list-inside space-y-1">
        <li>Acceder a tus datos personales.</li>
        <li>Rectificar información incorrecta.</li>
        <li>Solicitar la eliminación de tus datos.</li>
        <li>Retirar tu consentimiento en cualquier momento.</li>
      </ul>
      <h3 class="mt-6 mb-2 font-semibold">6. Contacto</h3>
      <p><a href="mailto:privacy@nexadigit.io" class="text-white hover:text-[#00e178] underline transition-colors">privacy@nexadigit.io</a>
</p>
    `,
    en: `
      <h2 class="text-2xl font-bold mb-4">Privacy Policy</h2>
      <p><strong>Effective date:</strong> June&nbsp;2, 2025</p>
      <p>At NexaDigit, we respect your privacy and are committed to protecting your personal data. This policy explains what information we collect, how we use it, and the rights you have regarding your data.</p>
      <h3 class="mt-6 mb-2 font-semibold">1. Data We Collect</h3>
      <ul class="list-disc list-inside space-y-1">
        <li>First Name</li>
        <li>Last Name</li>
        <li>Email Address</li>
        <li>Messages sent via the contact form</li>
      </ul>
      <h3 class="mt-6 mb-2 font-semibold">2. How We Use Your Data</h3>
      <ul class="list-disc list-inside space-y-1">
        <li>Sending promotional communications about our products and services.</li>
        <li>Responding to your messages or inquiries submitted through the contact form.</li>
      </ul>
      <h3 class="mt-6 mb-2 font-semibold">3. Third‑Party Services</h3>
      <p>We may share your information with the following external platforms:</p>
      <ul class="list-disc list-inside space-y-1">
        <li><strong>MailerLite</strong> – to manage our email marketing campaigns.</li>
        <li><strong>Google Analytics</strong> – to obtain website usage statistics.</li>
        <li><strong>Calendly</strong> – to schedule meetings or calls with you.</li>
      </ul>
      <p>These platforms comply with international data‑protection standards.</p>
      <h3 class="mt-6 mb-2 font-semibold">4. Protecting Your Data</h3>
      <ul class="list-disc list-inside space-y-1">
        <li>Transport‑layer encryption via HTTPS.</li>
        <li>Access limited to authorized personnel only.</li>
        <li>Continuous vulnerability monitoring.</li>
      </ul>
      <h3 class="mt-6 mb-2 font-semibold">5. Your Rights</h3>
      <ul class="list-disc list-inside space-y-1">
        <li>Access your personal data.</li>
        <li>Correct inaccurate information.</li>
        <li>Request deletion of your data.</li>
        <li>Withdraw your consent at any time.</li>
      </ul>
      <h3 class="mt-6 mb-2 font-semibold">6. Contact</h3>
      <p>📧 <a href="mailto:privacy@nexadigit.io" class="underline">privacy@nexadigit.io</a></p>
    `,
  },
  terms: {
  es: `
    <h2 class="text-2xl font-bold mb-4">Términos de Uso</h2>

    <p>Última actualización: 2&nbsp;de&nbsp;junio&nbsp;de&nbsp;2025</p>

    <h3 class="mt-6 mb-2 font-semibold">1. Aceptación de los Términos</h3>
    <p>
      Al acceder y utilizar el sitio web de <strong>NexaDigit</strong> (“el Sitio”)
      aceptas quedar vinculado por estos Términos de Uso y por nuestra
      Política de Privacidad. Si no estás de acuerdo con alguna parte de los
      términos, no utilices el Sitio.
    </p>

    <h3 class="mt-6 mb-2 font-semibold">2. Uso Permitido</h3>
    <ul class="list-disc list-inside space-y-1">
      <li>Solo podrás utilizar el Sitio con fines legítimos y conforme a la ley.</li>
      <li>Queda prohibido interferir con la seguridad, la integridad o el rendimiento del Sitio.</li>
      <li>No puedes intentar obtener acceso no autorizado a ninguna parte del Sitio ni a los sistemas que lo respaldan.</li>
    </ul>

    <h3 class="mt-6 mb-2 font-semibold">3. Propiedad Intelectual</h3>
    <p>
      Todo el contenido (textos, gráficos, logotipos, software) es propiedad
      de NexaDigit o de sus licenciantes y está protegido por las leyes de
      derechos de autor y marcas. No se otorga ninguna licencia fuera del uso
      personal y no comercial permitido.
    </p>

    <h3 class="mt-6 mb-2 font-semibold">4. Contenido de Usuarios</h3>
    <p>
      Si envías ideas o comentarios (“Contenido de Usuario”), concedes a
      NexaDigit una licencia mundial, libre de regalías, para usar, reproducir
      y mostrar dicho contenido con el fin de operar o mejorar el Sitio.
    </p>

    <h3 class="mt-6 mb-2 font-semibold">5. Limitación de Responsabilidad</h3>
    <p>
      El Sitio se proporciona “tal cual” y “según disponibilidad”. NexaDigit
      no garantiza que el Sitio esté libre de errores, virus o interrupciones.
      En ningún caso NexaDigit será responsable de daños indirectos,
      incidentales o consecuentes que surjan del uso o la imposibilidad de uso
      del Sitio.
    </p>

    <h3 class="mt-6 mb-2 font-semibold">6. Modificaciones</h3>
    <p>
      NexaDigit puede modificar estos Términos en cualquier momento. Los
      cambios entrarán en vigor cuando se publiquen en el Sitio. El uso
      continuado del Sitio después de la publicación constituye tu aceptación
      de los nuevos Términos.
    </p>

    <h3 class="mt-6 mb-2 font-semibold">7. Ley Aplicable y Jurisdicción</h3>
    <p>
      Estos Términos se regirán por las leyes de la República Dominicana.
      Cualquier disputa se someterá a los tribunales competentes de Santo
      Domingo, renunciando a cualquier otro fuero.
    </p>

    <h3 class="mt-6 mb-2 font-semibold">8. Contacto</h3>
    <p>
      📧 <a href="mailto:legal@nexadigit.io"
            class="text-white hover:text-[#00e178] underline transition-colors">
            legal@nexadigit.io</a>
    </p>
  `,
  en: `
    <h2 class="text-2xl font-bold mb-4">Terms of Use</h2>

    <p>Last updated: June&nbsp;2,&nbsp;2025</p>

    <h3 class="mt-6 mb-2 font-semibold">1. Acceptance of Terms</h3>
    <p>
      By accessing and using <strong>NexaDigit</strong> (“the Site”) you agree
      to be bound by these Terms of Use and our Privacy Policy. If you disagree
      with any part of the terms, you must not use the Site.
    </p>

    <h3 class="mt-6 mb-2 font-semibold">2. Permitted Use</h3>
    <ul class="list-disc list-inside space-y-1">
      <li>You may use the Site only for lawful purposes in accordance with applicable laws.</li>
      <li>You must not interfere with the Site’s security, integrity or performance.</li>
      <li>You must not attempt to gain unauthorized access to any part of the Site or its supporting systems.</li>
    </ul>

    <h3 class="mt-6 mb-2 font-semibold">3. Intellectual Property</h3>
    <p>
      All content (text, graphics, logos, software) is owned by NexaDigit or
      its licensors and protected by copyright and trademark laws. No license
      is granted except for personal, non-commercial use.
    </p>

    <h3 class="mt-6 mb-2 font-semibold">4. User Content</h3>
    <p>
      If you submit ideas or feedback (“User Content”), you grant NexaDigit a
      worldwide, royalty-free license to use, reproduce and display such
      content for operating or improving the Site.
    </p>

    <h3 class="mt-6 mb-2 font-semibold">5. Limitation of Liability</h3>
    <p>
      The Site is provided “as is” and “as available”. NexaDigit makes no
      warranty that the Site will be error-free, virus-free or uninterrupted.
      In no event shall NexaDigit be liable for indirect, incidental or
      consequential damages arising from the use or inability to use the Site.
    </p>

    <h3 class="mt-6 mb-2 font-semibold">6. Modifications</h3>
    <p>
      NexaDigit may modify these Terms at any time. Changes take effect when
      posted on the Site. Continued use of the Site after posting constitutes
      acceptance of the new Terms.
    </p>

    <h3 class="mt-6 mb-2 font-semibold">7. Governing Law & Jurisdiction</h3>
    <p>
      These Terms are governed by the laws of the Dominican Republic. Any
      dispute shall be submitted to the competent courts in Santo Domingo,
      waiving any other jurisdiction.
    </p>

    <h3 class="mt-6 mb-2 font-semibold">8. Contact</h3>
    <p>
      📧 <a href="mailto:legal@nexadigit.io"
            class="underline">legal@nexadigit.io</a>
    </p>
  `,
},

  cookie: {
  es: `
    <h2 class="text-2xl font-bold mb-4">Política de Cookies</h2>

    <p>Última actualización: 2&nbsp;de&nbsp;junio&nbsp;de&nbsp;2025</p>

    <h3 class="mt-6 mb-2 font-semibold">1. ¿Qué son las cookies?</h3>
    <p>
      Las cookies son pequeños archivos de texto que se almacenan en tu
      dispositivo cuando visitas un sitio web. Sirven para recordar tus
      preferencias, reconocer tu navegador y mejorar la experiencia de
      usuario.
    </p>

    <h3 class="mt-6 mb-2 font-semibold">2. ¿Qué tipos de cookies usamos?</h3>
    <ul class="list-disc list-inside space-y-1">
      <li><strong>Cookies esenciales</strong> &nbsp;–&nbsp; necesarias para que el sitio funcione y no pueden desactivarse.</li>
      <li><strong>Cookies de rendimiento</strong> &nbsp;–&nbsp; recopilan información anónima sobre cómo usas el sitio (ej. Google&nbsp;Analytics).</li>
      <li><strong>Cookies de funcionalidad</strong> &nbsp;–&nbsp; recuerdan tus preferencias (idioma, región) para ofrecerte funciones personalizadas.</li>
      <li><strong>Cookies de marketing</strong> &nbsp;–&nbsp; nos ayudan a mostrarte contenido o anuncios relevantes en otras plataformas.</li>
    </ul>

    <h3 class="mt-6 mb-2 font-semibold">3. Cookies de terceros</h3>
    <p>
      Utilizamos servicios externos como <em>Google&nbsp;Analytics</em> y
      <em>Calendly</em> que pueden colocar sus propias cookies. No tenemos
      control directo sobre estas cookies; consulta sus políticas para más
      detalles.
    </p>

    <h3 class="mt-6 mb-2 font-semibold">4. ¿Cómo puedes gestionar las cookies?</h3>
    <ul class="list-disc list-inside space-y-1">
      <li>Puedes aceptar o rechazar las cookies no esenciales mediante el banner de consentimiento.</li>
      <li>También puedes eliminarlas o bloquearlas desde la configuración de tu navegador.</li>
      <li>Ten en cuenta que deshabilitar ciertas cookies podría afectar el funcionamiento del sitio.</li>
    </ul>

    <h3 class="mt-6 mb-2 font-semibold">5. Consentimiento</h3>
    <p>
      Al continuar navegando en NexaDigit tras ver el banner de cookies,
      consientes el uso de las cookies seleccionadas. Siempre podrás cambiar
      tu elección desde el enlace “Configuración de Cookies”.
    </p>

    <h3 class="mt-6 mb-2 font-semibold">6. Cambios en la política</h3>
    <p>
      Podemos actualizar esta Política de Cookies en cualquier momento. Las
      modificaciones se publicarán en esta página con la fecha de revisión
      correspondiente.
    </p>

    <h3 class="mt-6 mb-2 font-semibold">7. Contacto</h3>
    <p>
      📧 <a href="mailto:cookies@nexadigit.io"
            class="text-white hover:text-[#00e178] underline transition-colors">
            cookies@nexadigit.io</a>
    </p>
  `,
  en: `
    <h2 class="text-2xl font-bold mb-4">Cookie Policy</h2>

    <p>Last updated: June&nbsp;2,&nbsp;2025</p>

    <h3 class="mt-6 mb-2 font-semibold">1. What Are Cookies?</h3>
    <p>
      Cookies are small text files stored on your device when you visit a
      website. They help remember your preferences, recognize your browser and
      improve user experience.
    </p>

    <h3 class="mt-6 mb-2 font-semibold">2. Which Cookies Do We Use?</h3>
    <ul class="list-disc list-inside space-y-1">
      <li><strong>Essential cookies</strong> – required for the site to function and cannot be switched off.</li>
      <li><strong>Performance cookies</strong> – collect anonymous data on how you use the site (e.g.&nbsp;Google&nbsp;Analytics).</li>
      <li><strong>Functional cookies</strong> – remember your preferences (language, region) to provide personalized features.</li>
      <li><strong>Marketing cookies</strong> – help us show you relevant content or ads on other platforms.</li>
    </ul>

    <h3 class="mt-6 mb-2 font-semibold">3. Third-Party Cookies</h3>
    <p>
      We use external services such as <em>Google&nbsp;Analytics</em> and
      <em>Calendly</em> that may set their own cookies. We do not have direct
      control over those cookies; please check their individual policies.
    </p>

    <h3 class="mt-6 mb-2 font-semibold">4. How Can You Manage Cookies?</h3>
    <ul class="list-disc list-inside space-y-1">
      <li>You can accept or reject non-essential cookies via the consent banner.</li>
      <li>You can also delete or block cookies from your browser settings.</li>
      <li>Disabling certain cookies may affect site functionality.</li>
    </ul>

    <h3 class="mt-6 mb-2 font-semibold">5. Consent</h3>
    <p>
      By continuing to browse NexaDigit after seeing the cookie banner, you
      consent to the selected cookies. You can change your choice at any time
      through the “Cookie Settings” link.
    </p>

    <h3 class="mt-6 mb-2 font-semibold">6. Updates to This Policy</h3>
    <p>
      We may update this Cookie Policy at any time. Changes will be posted on
      this page with the corresponding revision date.
    </p>

    <h3 class="mt-6 mb-2 font-semibold">7. Contact</h3>
    <p>
      📧 <a href="mailto:cookies@nexadigit.io"
            class="underline">cookies@nexadigit.io</a>
    </p>
  `,
},

}
/* ─────────── Estado global ─────────── */
let overlay: HTMLElement | null = null
let preventScroll: ((e: Event) => void) | null = null

/* ─────────── Crea la capa y el panel ─────────── */
function buildOverlay(html: string, type: DocType): HTMLElement {
  const o = document.createElement('div')
  o.className = `fixed inset-0 z-[999] flex items-center justify-center
                 bg-black/60 backdrop-blur-sm transition-opacity`
  o.dataset.doc = type

  o.innerHTML = `
    <div data-dialog
         class="relative bg-neutral-900 text-gray-200 rounded-2xl shadow-xl
                max-w-3xl w-11/12 p-6 md:p-10 overflow-y-auto max-h-[80vh]
                overscroll-y-contain">
      
    
      <!-- Botón cerrar -->
      <!-- Botón cerrar -->
<button aria-label="close"
        class="absolute top-4 right-4 flex items-center justify-center
               w-8 h-8 rounded-full bg-white text-gray-800
               hover:bg-[#ff5733] hover:text-white
               transition-colors duration-150 cursor-pointer
               focus:outline-none">

  <!-- Símbolo × -->
  <span class="text-xl leading-none font-bold select-none">&times;</span>
</button>





      <!-- Encabezado -->
      <header class="flex flex-col items-center mb-10">
        <div class="flex items-center w-full">
          <hr class="flex-grow border-gray-600">
          <img src="/assets/fav-icon-logo.svg" alt="NexaDigit"
               class="w-8 h-8 mx-4"/>
          <hr class="flex-grow border-gray-600">
        </div>
        <h2 id="modal-title" class="mt-4 text-sm font-semibold tracking-widest uppercase text-gray-300"></h2>
      </header>

      <!-- Contenido legal -->
      <article class="prose prose-invert prose-sm md:prose-base max-w-none">
        ${html}
      </article>
    </div>`
  return o
}


/* ─────────── Cerrar modal ─────────── */
function close() {
  if (!overlay) return
  const el = overlay

  document.body.classList.remove('overflow-hidden')

  if (preventScroll) {
    el.removeEventListener('wheel', preventScroll)
    el.removeEventListener('touchmove', preventScroll)
    preventScroll = null
  }

  el.classList.add('opacity-0')
  overlay = null
  document.removeEventListener('keydown', onEsc)
  setTimeout(() => el.remove(), 200)
}

/* ─────────── Abrir modal ─────────── */
export function showLegalModal(type: DocType = 'privacy') {
  /* si ya hay uno abierto, ciérralo (quita scroll-lock, listeners, etc.) */
  if (overlay) close()

  const html = docHtml(type)          // idioma correcto
  overlay = buildOverlay(html, type)
  document.body.appendChild(overlay)  // 👉 ¡aquí lo insertas!

  /* Bloquea scroll del fondo */
  document.body.classList.add('overflow-hidden')
  preventScroll = (e: Event) => e.preventDefault()
  overlay.addEventListener('wheel',     preventScroll, { passive: false })
  overlay.addEventListener('touchmove', preventScroll, { passive: false })

  /* Deja pasar scroll dentro del panel */
  const dialog = overlay.querySelector('[data-dialog]') as HTMLElement
  dialog.addEventListener('wheel',     (e) => e.stopPropagation(), { passive: false })
  dialog.addEventListener('touchmove', (e) => e.stopPropagation(), { passive: false })

  /* Cierres */
  overlay.querySelector('button')?.addEventListener('click', close)
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close() })
  document.addEventListener('keydown', onEsc)

  /* Accesibilidad */
  requestAnimationFrame(() => {
    (overlay!.querySelector('button') as HTMLButtonElement).focus()
  })
}


function onEsc(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

onLangChange(() => {
  if (!overlay) return
  const type = (overlay.dataset.doc || 'privacy') as DocType
  overlay.querySelector('.prose')!.innerHTML = docHtml(type)
})




