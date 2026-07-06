// ══════════════════════════════════════════════════════════════════════════════
// LEGAL PAGES — standalone Privacy Policy / Terms pages that mirror the v3 Green
// template (cream, 820px column, numbered sections, contact box). Bilingual:
// reads the site's stored language (localStorage 'lang') and offers an ES/EN
// toggle. Self-contained styles so these pages never inherit the desktop zoom.
// ══════════════════════════════════════════════════════════════════════════════

type Doc = 'privacy' | 'terms'
type Lang = 'es' | 'en'

interface Section { num: string; title: string; paras: string[] }
interface Content {
  metaTitle: string
  title: string
  updated: string
  intro: string
  sections: Section[]
  contactText: string // may include the {email} placeholder
}

const EMAIL = 'hola@nexadigit.io'
const LOGO = '/assets/img/nexadigit-mark.webp'

const UI = {
  es: { eyebrow: 'LEGAL', back: '← Volver al inicio', contact: 'CONTACTO', privacy: 'Política de Privacidad', terms: 'Términos y Condiciones' },
  en: { eyebrow: 'LEGAL', back: '← Back to home', contact: 'CONTACT', privacy: 'Privacy Policy', terms: 'Terms & Conditions' },
}

const DOCS: Record<Doc, Record<Lang, Content>> = {
  privacy: {
    es: {
      metaTitle: 'Política de Privacidad — NexaDigit',
      title: 'Política de Privacidad',
      updated: 'Última actualización: 5 de julio de 2026',
      intro: 'En NexaDigit valoramos su privacidad. Esta política explica qué datos recopilamos, cómo los usamos y qué derechos tiene usted sobre ellos cuando visita nuestro sitio o contrata nuestros servicios de ingeniería de IA.',
      sections: [
        { num: '01', title: 'Datos que recopilamos', paras: [
          'Datos que usted nos proporciona: nombre, apellido, correo electrónico, teléfono, empresa y los detalles del proyecto que comparte a través de nuestros formularios de contacto.',
          'Datos recopilados automáticamente: dirección IP, tipo de navegador, páginas visitadas y tiempo de permanencia, mediante cookies y tecnologías similares con fines analíticos.',
        ]},
        { num: '02', title: 'Cómo usamos su información', paras: [
          'Para responder a sus solicitudes, preparar propuestas y prestar los servicios contratados.',
          'Para mejorar nuestro sitio, entender su uso y comunicarnos con usted sobre actualizaciones relevantes. No vendemos ni alquilamos sus datos personales a terceros.',
        ]},
        { num: '03', title: 'Asistente de IA en el correo', paras: [
          'Nuestro canal de correo cuenta con un asistente de IA que procesa los mensajes entrantes para ofrecer una respuesta inmediata. Los mensajes se tratan de forma confidencial y se usan únicamente para atender su consulta.',
        ]},
        { num: '04', title: 'Cookies', paras: [
          'Utilizamos cookies esenciales para el funcionamiento del sitio y cookies analíticas para medir su rendimiento. Puede configurar su navegador para rechazarlas, aunque algunas funciones podrían verse afectadas.',
        ]},
        { num: '05', title: 'Conservación y seguridad', paras: [
          'Conservamos sus datos solo durante el tiempo necesario para las finalidades descritas o según exija la ley. Aplicamos medidas técnicas y organizativas razonables para proteger su información frente a accesos no autorizados.',
        ]},
        { num: '06', title: 'Sus derechos', paras: [
          'Usted puede solicitar el acceso, la rectificación o la eliminación de sus datos personales, así como oponerse a su tratamiento, escribiéndonos al correo indicado más abajo. Atenderemos su solicitud conforme a la legislación aplicable.',
        ]},
        { num: '07', title: 'Cambios en esta política', paras: [
          'Podemos actualizar esta política periódicamente. Publicaremos cualquier cambio en esta página con su fecha de actualización correspondiente.',
        ]},
      ],
      contactText: 'Para cualquier consulta sobre esta política o sobre sus datos personales, escríbanos a {email}.',
    },
    en: {
      metaTitle: 'Privacy Policy — NexaDigit',
      title: 'Privacy Policy',
      updated: 'Last updated: July 5, 2026',
      intro: 'At NexaDigit we value your privacy. This policy explains what data we collect, how we use it, and what rights you have over it when you visit our site or engage our AI engineering services.',
      sections: [
        { num: '01', title: 'Data we collect', paras: [
          'Data you provide: first name, last name, email, phone, company, and the project details you share through our contact forms.',
          'Data collected automatically: IP address, browser type, pages visited, and time on page, via cookies and similar technologies for analytics.',
        ]},
        { num: '02', title: 'How we use your information', paras: [
          'To respond to your requests, prepare proposals, and deliver the services you engage us for.',
          'To improve our site, understand how it is used, and communicate relevant updates. We do not sell or rent your personal data to third parties.',
        ]},
        { num: '03', title: 'AI assistant on email', paras: [
          'Our email channel uses an AI assistant that processes incoming messages to provide an immediate response. Messages are treated confidentially and used solely to handle your inquiry.',
        ]},
        { num: '04', title: 'Cookies', paras: [
          'We use essential cookies for the site to function and analytics cookies to measure its performance. You can set your browser to reject them, though some features may be affected.',
        ]},
        { num: '05', title: 'Retention and security', paras: [
          'We keep your data only as long as necessary for the purposes described or as required by law. We apply reasonable technical and organizational measures to protect your information against unauthorized access.',
        ]},
        { num: '06', title: 'Your rights', paras: [
          'You may request access to, correction of, or deletion of your personal data, as well as object to its processing, by writing to the email below. We will handle your request in accordance with applicable law.',
        ]},
        { num: '07', title: 'Changes to this policy', paras: [
          'We may update this policy from time to time. We will post any changes on this page with the corresponding update date.',
        ]},
      ],
      contactText: 'For any questions about this policy or your personal data, write to us at {email}.',
    },
  },
  terms: {
    es: {
      metaTitle: 'Términos y Condiciones — NexaDigit',
      title: 'Términos y Condiciones',
      updated: 'Última actualización: 5 de julio de 2026',
      intro: 'Estos Términos y Condiciones regulan el uso del sitio de NexaDigit y la contratación de nuestros servicios de ingeniería de IA. Al acceder al sitio o solicitar una propuesta, usted acepta lo aquí establecido.',
      sections: [
        { num: '01', title: 'Uso del sitio', paras: ['Usted se compromete a usar este sitio de forma lícita y a no realizar acciones que puedan dañar, deshabilitar o sobrecargar la plataforma, ni intentar acceder sin autorización a sistemas o datos.'] },
        { num: '02', title: 'Servicios', paras: ['NexaDigit ofrece diseño, desarrollo y operación de software con agentes autónomos de IA. El alcance, los entregables, los plazos y el precio de cada proyecto se definen en una propuesta específica acordada por escrito con el cliente.'] },
        { num: '03', title: 'Propuestas y contratación', paras: ['Las propuestas emitidas tienen la vigencia indicada en cada documento. Un proyecto se considera contratado una vez el cliente acepta la propuesta y se cumplen las condiciones de inicio pactadas.'] },
        { num: '04', title: 'Propiedad intelectual', paras: ['El contenido, marca, código y materiales de este sitio son propiedad de NexaDigit. La titularidad de los entregables desarrollados para un cliente se regirá por lo acordado en el contrato de cada proyecto.'] },
        { num: '05', title: 'Pagos', paras: ['Los términos de pago, incluyendo anticipos e hitos, se establecen en cada propuesta. Los importes no incluyen impuestos salvo indicación expresa.'] },
        { num: '06', title: 'Limitación de responsabilidad', paras: ['Los servicios se prestan con diligencia profesional razonable. En la medida permitida por la ley, NexaDigit no será responsable de daños indirectos o lucro cesante derivados del uso del sitio o de los servicios.'] },
        { num: '07', title: 'Enlaces a terceros', paras: ['Este sitio puede enlazar a propiedades operadas por NexaDigit o a sitios de terceros. No nos hacemos responsables del contenido ni de las políticas de sitios externos.'] },
        { num: '08', title: 'Legislación aplicable', paras: ['Estos términos se rigen por las leyes de la República Dominicana. Cualquier controversia se someterá a los tribunales competentes de Santo Domingo.'] },
      ],
      contactText: 'Si tiene preguntas sobre estos términos, escríbanos a {email}.',
    },
    en: {
      metaTitle: 'Terms & Conditions — NexaDigit',
      title: 'Terms & Conditions',
      updated: 'Last updated: July 5, 2026',
      intro: 'These Terms & Conditions govern the use of the NexaDigit site and the engagement of our AI engineering services. By accessing the site or requesting a proposal, you accept the terms set out here.',
      sections: [
        { num: '01', title: 'Use of the site', paras: ['You agree to use this site lawfully and not to take actions that could damage, disable, or overload the platform, or attempt to gain unauthorized access to systems or data.'] },
        { num: '02', title: 'Services', paras: ['NexaDigit provides design, development, and operation of software with autonomous AI agents. The scope, deliverables, timelines, and price of each project are defined in a specific proposal agreed in writing with the client.'] },
        { num: '03', title: 'Proposals and engagement', paras: ['Issued proposals are valid for the period stated in each document. A project is considered engaged once the client accepts the proposal and the agreed start conditions are met.'] },
        { num: '04', title: 'Intellectual property', paras: ['The content, brand, code, and materials of this site are the property of NexaDigit. Ownership of deliverables developed for a client is governed by each project’s contract.'] },
        { num: '05', title: 'Payments', paras: ['Payment terms, including deposits and milestones, are set out in each proposal. Amounts do not include taxes unless expressly stated.'] },
        { num: '06', title: 'Limitation of liability', paras: ['Services are provided with reasonable professional diligence. To the extent permitted by law, NexaDigit shall not be liable for indirect damages or lost profits arising from the use of the site or the services.'] },
        { num: '07', title: 'Third-party links', paras: ['This site may link to properties operated by NexaDigit or to third-party sites. We are not responsible for the content or policies of external sites.'] },
        { num: '08', title: 'Governing law', paras: ['These terms are governed by the laws of the Dominican Republic. Any dispute shall be submitted to the competent courts of Santo Domingo.'] },
      ],
      contactText: 'If you have questions about these terms, write to us at {email}.',
    },
  },
}

function getLang(): Lang {
  return (localStorage.getItem('lang') as Lang) === 'en' ? 'en' : 'es'
}

function pageHtml(doc: Doc, lang: Lang): string {
  const c = DOCS[doc][lang]
  const ui = UI[lang]
  const other: Doc = doc === 'privacy' ? 'terms' : 'privacy'
  const crossHref = other === 'privacy' ? '/privacidad.html' : '/terminos.html'
  const crossLabel = other === 'privacy' ? ui.privacy : ui.terms
  const emailLink = `<a href="mailto:${EMAIL}" style="color:#E04E14;text-decoration:none;font-weight:500;">${EMAIL}</a>`
  const langBtn = (l: Lang) =>
    `<span data-set-lang="${l}" style="font-family:'IBM Plex Mono',monospace;font-size:11px;padding:6px 10px;cursor:pointer;${lang === l ? 'background:#15171C;color:#FAF7F2;' : 'color:#8A867C;'}">${l.toUpperCase()}</span>`

  const sections = c.sections
    .map(
      (s) => `
      <section style="margin-bottom:44px;">
        <div style="display:flex;align-items:baseline;gap:14px;margin-bottom:16px;">
          <span style="font-family:'IBM Plex Mono',monospace;font-size:13px;color:#E04E14;font-weight:600;flex-shrink:0;">${s.num}</span>
          <h2 style="margin:0;font-family:'Schibsted Grotesk',sans-serif;font-weight:700;font-size:24px;letter-spacing:-0.02em;line-height:1.2;">${s.title}</h2>
        </div>
        <div style="padding-left:34px;">
          ${s.paras.map((p) => `<p style="margin:0 0 14px 0;font-size:16.5px;line-height:1.72;color:#3D3E3A;">${p}</p>`).join('')}
        </div>
      </section>`
    )
    .join('')

  return `
    <div style="min-height:100vh;background:#FAF7F2;">
      <header style="position:sticky;top:0;z-index:20;background:rgba(250,247,242,0.85);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border-bottom:1px solid #E8E3D9;">
        <div style="max-width:820px;margin:0 auto;padding:0 32px;height:68px;display:flex;align-items:center;justify-content:space-between;gap:16px;">
          <a href="/" style="display:flex;align-items:center;gap:10px;text-decoration:none;">
            <img src="${LOGO}" alt="NexaDigit" style="height:30px;width:auto;display:block;">
          </a>
          <div style="display:flex;align-items:center;gap:18px;">
            <span style="display:inline-flex;border:1px solid #DCD5C6;">${langBtn('es')}${langBtn('en')}</span>
            <a href="/" style="font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:0.06em;color:#15171C;text-decoration:none;white-space:nowrap;">${ui.back}</a>
          </div>
        </div>
      </header>

      <main style="max-width:820px;margin:0 auto;padding:72px 32px 120px 32px;">
        <div style="font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:0.16em;color:#E04E14;font-weight:500;margin-bottom:18px;">${ui.eyebrow}</div>
        <h1 style="margin:0 0 14px 0;font-family:'Schibsted Grotesk',sans-serif;font-weight:700;font-size:clamp(38px,6vw,62px);letter-spacing:-0.03em;line-height:1.04;">${c.title}</h1>
        <p style="margin:0 0 56px 0;font-family:'IBM Plex Mono',monospace;font-size:12.5px;letter-spacing:0.03em;color:#8A867C;">${c.updated}</p>

        <p style="margin:0 0 40px 0;font-size:18px;line-height:1.7;color:#3D3E3A;">${c.intro}</p>

        ${sections}

        <div style="margin-top:64px;padding:28px 30px;background:#F5F1E8;border:1px solid #E8E3D9;">
          <div style="font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:0.14em;color:#8A867C;margin-bottom:12px;">${ui.contact}</div>
          <p style="margin:0;font-size:16.5px;line-height:1.7;color:#3D3E3A;">${c.contactText.replace('{email}', emailLink)}</p>
        </div>
      </main>

      <footer style="border-top:1px solid #E8E3D9;">
        <div style="max-width:820px;margin:0 auto;padding:26px 32px;display:flex;justify-content:space-between;align-items:center;font-family:'IBM Plex Mono',monospace;font-size:12px;color:#8A867C;flex-wrap:wrap;gap:12px;">
          <span>© 2026 NexaDigit</span>
          <span style="display:flex;align-items:center;gap:20px;flex-wrap:wrap;">
            <a href="${crossHref}" style="color:#8A867C;text-decoration:none;">${crossLabel}</a>
            <a href="mailto:${EMAIL}" style="color:#8A867C;text-decoration:none;">${EMAIL}</a>
          </span>
        </div>
      </footer>
    </div>
  `
}

export function mountLegal(doc: Doc): void {
  const root = document.getElementById('legal')
  if (!root) return

  const render = () => {
    const lang = getLang()
    document.documentElement.lang = lang
    document.title = DOCS[doc][lang].metaTitle
    root.innerHTML = pageHtml(doc, lang)
    root.querySelectorAll<HTMLElement>('[data-set-lang]').forEach((el) => {
      el.addEventListener('click', () => {
        const next = el.dataset.setLang as Lang
        if (next !== getLang()) {
          localStorage.setItem('lang', next)
          render()
        }
      })
    })
  }

  render()
}
