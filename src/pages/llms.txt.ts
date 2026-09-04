// /llms.txt — a plain-text summary of the site for LLM crawlers
// (llmstxt.org). Built from the same facts the pages publish; URLs derive
// from the route map so they can't go stale.
import type { APIRoute } from 'astro'
import { ROUTES, SITE } from '../components/i18n/routes'
import { CONTACT_EMAIL } from '../components/Contact'
import { DIGITAL_ASSETS } from '../components/Projects'
import { SOCIALS } from '../components/Header'
import { MODELS } from '../components/ProofStrip'

const u = (path: string) => SITE + path

export const GET: APIRoute = () => {
  const body = `# NexaDigit

> NexaDigit es una empresa de ingeniería de IA en Santo Domingo, República Dominicana. Diseña, construye y opera software con agentes autónomos: plataformas SaaS a medida, UniSync (su motor interno de contenido para AEO) y medios digitales que publican 24/7.

Sitio principal: ${u(ROUTES.home.es)} · Versión en inglés: ${u(ROUTES.home.en)} · Operando desde 2023 · Idioma principal: español. Atiende clientes en República Dominicana, Estados Unidos, Canadá y Latinoamérica, en remoto.

## Qué hace NexaDigit

- Estrategia y consultoría de IA: diagnóstico inicial sin costo (3–5 días), propuesta técnica y comercial con precio cerrado por escrito (1 semana), desarrollo en sprints de 1–2 semanas con demos funcionales, y operación continua (monitoreo, soporte, mejoras). Un MVP típico toma 4–8 semanas.
- Desarrollo de software a medida: aplicaciones web, APIs y plataformas internas con Python/FastAPI, React/TypeScript y PostgreSQL.
- Agentes de IA e integración: agentes autónomos que ejecutan flujos completos (investigación, generación de contenido, operaciones) con orquestación multi-modelo (${MODELS.join(', ')}) y capas de verificación de calidad y costo.
- Infraestructura cloud (AWS, Azure, GCP, Cloudflare; CI/CD, edge), seguridad empresarial (OWASP) y capacitación empresarial en IA.

## Productos

- UniSync — producto interno de operación para AEO (Answer Engine Optimization): agentes que investigan qué preguntan las personas a los chatbots, redactan artículos verificados y los publican en medios propios, para que ChatGPT, Claude, Gemini y Perplexity mencionen productos y servicios. ${u(ROUTES.home.es)}#unisync
- VIGIA — SaaS en producción para afianzadoras: vigilancia de fianzas de cumplimiento después de la emisión. Consolida el expediente documental, extrae los datos con su procedencia, cruza lo declarado contra lo evidenciado y avisa antes de que llegue el reclamo. No suscribe, no emite, no paga. ${u(ROUTES.home.es)}#produccion
- CASUM — en construcción: plataforma de gestión legal para abogados independientes y firmas pequeñas de República Dominicana (clientes desde una foto de la cédula, expedientes, plazos, generación documental), empezando por derecho corporativo. ${u(ROUTES.home.es)}#produccion

## Medios operados con UniSync

${DIGITAL_ASSETS.map((a) => `- ${a.url}`).join('\n')}

## Páginas

- [Inicio](${u(ROUTES.home.es)}): servicios, UniSync, proyectos, proceso de trabajo, preguntas frecuentes y contacto
- [Home (English)](${u(ROUTES.home.en)})
- [Política de privacidad](${u(ROUTES.privacy.es)}) · [Privacy Policy](${u(ROUTES.privacy.en)})
- [Términos y condiciones](${u(ROUTES.terms.es)}) · [Terms & Conditions](${u(ROUTES.terms.en)})

## Contacto

- Correo: ${CONTACT_EMAIL}
- Formulario y agenda de consulta: ${u(ROUTES.home.es)}#contacto
${SOCIALS.map((s) => `- ${s.key[0].toUpperCase() + s.key.slice(1)}: ${s.url}`).join('\n')}
`
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
