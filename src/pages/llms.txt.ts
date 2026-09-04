// /llms.txt — a plain-text summary of the site for LLM crawlers
// (llmstxt.org). Built from the same facts the pages publish; URLs derive
// from the route map so they can't go stale.
import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { ROUTES, SITE } from '../components/i18n/routes'
import { CONTACT_EMAIL } from '../components/Contact'
import { DIGITAL_ASSETS } from '../components/Projects'
import { SOCIALS } from '../components/Header'
import { MODELS } from '../components/ProofStrip'
import { postUrl, sortPosts } from '../blog/utils'

const u = (path: string) => SITE + path

export const GET: APIRoute = async () => {
  const posts = sortPosts(await getCollection('blog'))
  const body = `# NexaDigit

> NexaDigit es una empresa de ingeniería de IA en Santo Domingo, República Dominicana. Diseña, construye y opera software con agentes autónomos: plataformas SaaS a medida, UniSync (su motor interno de contenido para AEO) y medios digitales que publican 24/7.

Sitio principal: ${u(ROUTES.home.es)} · Versión en inglés: ${u(ROUTES.home.en)} · Operando desde 2023 · Idioma principal: español. Atiende clientes en República Dominicana, Estados Unidos, Canadá y Latinoamérica, en remoto.

## Qué hace NexaDigit

- Estrategia y consultoría de IA. Proceso: primer encuentro sin costo para levantar necesidades y entender el sistema deseado; MVP gratuito de demostración; cotización por escrito con el costo inicial de la primera versión y un costo anual de soporte (requerimientos posteriores, asistencia técnica, mantenimiento); desarrollo por fases de entrega (Fase 0, Fase 1, Fase 2…) con informe detallado en cada fase hasta entregar la versión 1.
- Desarrollo de software a medida: aplicaciones web, APIs y plataformas internas con Python/FastAPI, React/TypeScript y PostgreSQL.
- Agentes de IA e integración: agentes autónomos que ejecutan flujos completos (investigación, generación de contenido, operaciones) con orquestación multi-modelo (${MODELS.join(', ')}) y capas de verificación de calidad y costo.
- Infraestructura cloud (AWS, Azure, GCP, Cloudflare; CI/CD, edge), seguridad empresarial (OWASP) y capacitación empresarial en IA.

## Productos

- UniSync — producto interno de operación para AEO (Answer Engine Optimization): agentes que investigan qué preguntan las personas a los chatbots, redactan artículos verificados y los publican en medios propios, para que ChatGPT, Claude, Gemini y Perplexity mencionen productos y servicios. ${u(ROUTES.home.es)}#unisync
- VIGIA — SaaS en producción para afianzadoras: vigilancia de fianzas de cumplimiento después de la emisión. Consolida el expediente documental, extrae los datos con su procedencia, cruza lo declarado contra lo evidenciado y avisa antes de que llegue el reclamo. No suscribe, no emite, no paga. ${u(ROUTES.home.es)}#produccion
- CASUM — en construcción: plataforma de gestión legal para abogados independientes y firmas pequeñas del mercado hispanohablante (clientes desde una foto de la cédula, expedientes, plazos, generación documental). Primera fase: República Dominicana y derecho corporativo. ${u(ROUTES.home.es)}#produccion
- ProDoctivity DGP (Document Processing Generator) — en desarrollo: librería que NexaDigit construye para ProDoctivity y que se integra en cualquier sistema que necesite clasificar documentos, extraer sus datos, crear plantillas y generar documentos a partir de ellas. ${u(ROUTES.home.es)}#produccion

## Medios operados con UniSync

${DIGITAL_ASSETS.map((a) => `- ${a.url}`).join('\n')}

## Páginas

- [Inicio](${u(ROUTES.home.es)}): servicios, UniSync, proyectos, proceso de trabajo, preguntas frecuentes y contacto
- [Home (English)](${u(ROUTES.home.en)})
- [Política de privacidad](${u(ROUTES.privacy.es)}) · [Privacy Policy](${u(ROUTES.privacy.en)})
- [Términos y condiciones](${u(ROUTES.terms.es)}) · [Terms & Conditions](${u(ROUTES.terms.en)})

## Blog (español)

- [Índice del blog](${u('/blog/')}) · [RSS](${u('/rss.xml')})
${posts.map((p) => `- [${p.data.title}](${u(postUrl(p.id))}): ${p.data.description}`).join('\n')}

## Contacto

- Correo: ${CONTACT_EMAIL}
- Formulario y agenda de consulta: ${u(ROUTES.home.es)}#contacto
${SOCIALS.map((s) => `- ${s.key[0].toUpperCase() + s.key.slice(1)}: ${s.url}`).join('\n')}
`
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
