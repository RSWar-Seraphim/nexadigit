// src/components/i18n/es.ts
// Fuente canónica de contenido (ES por defecto). Cada clave es consumida por
// un componente montado — no dejar claves huérfanas. Algunos valores incluyen
// HTML mínimo (<br>, <span>) porque se insertan vía innerHTML.
export const es = {
  /* ── Meta / SEO ─────────────────────────────────────────────────────── */
  meta_title: 'NexaDigit — Ingeniería de IA · Sistemas autónomos en producción',
  meta_description:
    'NexaDigit diseña, desarrolla y opera software con agentes de IA autónomos: plataformas a medida, UniSync y activos digitales funcionando 24/7 en producción.',

  /* ── Accesibilidad / comunes ────────────────────────────────────────── */
  a11y_skip: 'Saltar al contenido',
  a11y_open_menu: 'Abrir menú',
  a11y_close_menu: 'Cerrar menú',
  a11y_lang_switch: 'Switch language to English',
  a11y_external: 'se abre en una pestaña nueva',
  a11y_home: 'NexaDigit — volver al inicio',

  /* ── CTA global ─────────────────────────────────────────────────────── */
  cta_book: 'Agendar una consulta',
  cta_book_short: 'Agendar consulta',

  /* ── Navegación ─────────────────────────────────────────────────────── */
  nav_services: 'Servicios',
  nav_unisync: 'UniSync',
  nav_production: 'En Producción',
  nav_process: 'Proceso',
  nav_contact: 'Contacto',

  /* ── Hero ───────────────────────────────────────────────────────────── */
  hero_eyebrow: 'Ingeniería de IA · Santo Domingo, RD',
  hero_headline: 'Construimos sistemas de IA que trabajan solos',
  hero_subhead:
    'NexaDigit diseña, desarrolla y opera software con agentes autónomos: desde plataformas a medida hasta activos digitales que funcionan 24/7 en producción.',
  hero_subhead_short: 'Sistemas de IA autónomos, operando 24/7 en producción.',
  hero_cta_secondary: 'Ver nuestro trabajo',
  hero_availability_label: 'DISPONIBILIDAD:',
  hero_availability: 'aceptando 2 proyectos para agosto',
  hero_coord_since: 'OPERANDO<br>DESDE 2023',
  hero_coord_assets: '<span style="color:#E04E14">3 ACTIVOS</span> EN<br>PRODUCCIÓN',
  hero_showcase_label: 'EN PRODUCCIÓN 24/7',

  /* ── Barra de modelos (marquee de IA) ───────────────────────────────── */
  models_label: 'CONSTRUIMOS CON',
  models_aria: 'Modelos de IA: Claude, OpenAI, Gemini, DeepSeek, Mistral, Llama, Grok, Perplexity',

  /* ── Telemetría (legado, sin uso) ───────────────────────────────────── */
  strip_label: 'PRUEBA DE OPERACIÓN',
  ticker_1_text: 'agentes activos · último artículo hace 12 min',
  ticker_2_text: '3 agentes en ejecución · 42 artículos publicados hoy',
  ticker_3_text: 'pipeline estable · uptime 99.97% (30 días)',
  ticker_4_text: '11 agentes operando · verificación de calidad 100%',

  /* ── Servicios ──────────────────────────────────────────────────────── */
  services_eyebrow: 'Servicios',
  services_title: 'Del diagnóstico a la operación.',
  services_1_title: 'Estrategia y Consultoría de IA',
  services_1_desc:
    'Evaluamos sus procesos, identificamos casos de uso con retorno medible y diseñamos el roadmap de adopción. De la idea a un plan ejecutable, con fases y presupuesto.',
  services_2_title: 'Desarrollo de Software a Medida',
  services_2_desc:
    'Aplicaciones web, APIs y plataformas internas construidas para escalar: del MVP validado a la solución empresarial. Python/FastAPI, React/TypeScript, PostgreSQL.',
  services_3_title: 'Agentes de IA e Integración',
  services_3_desc:
    'Agentes autónomos que ejecutan flujos completos: investigación, generación de contenido, operaciones. Con orquestación multi-modelo y capas de verificación que controlan calidad y costo por tarea.',
  services_4_title: 'Infraestructura Cloud',
  services_4_desc:
    'Arquitectura y despliegue en AWS, Azure, GCP y Cloudflare. CI/CD, edge computing y optimización de costos.',
  services_5_title: 'Seguridad Empresarial',
  services_5_desc:
    'Autenticación robusta, cifrado, control de accesos y prácticas OWASP integradas desde el primer commit.',
  services_6_title: 'Capacitación Empresarial en IA',
  services_6_desc:
    'Talleres prácticos para que su equipo adopte IA con criterio: flujos con agentes, prompting efectivo y evaluación de herramientas.',
  services_specialty_badge: 'ESPECIALIDAD',
  services_cta_q: '¿Otro caso de uso?',
  services_cta_link: 'Agendar una consulta',

  /* ── Catálogo / UniSync ─────────────────────────────────────────────── */
  catalog_eyebrow: 'Catálogo',
  catalog_title: 'Lo que construye NexaDigit.',
  catalog_lede:
    'No solo desarrollamos para clientes: creamos y operamos nuestros propios productos. Cada uno es prueba de lo que nuestra ingeniería puede hacer.',
  unisync_desc:
    'Plataforma de gestión de activos digitales con agentes autónomos. Gestiona, automatiza y despliega propiedades web completas: agentes de IA, gestión centralizada, analítica en tiempo real y módulos personalizados.',
  unisync_toast: '<span style="font-weight:600">Artículo publicado</span> <span style="color:#7E8790">— noticiasmma.com · hace 12 min</span>',
  unisync_cta: 'Conocer UniSync',
  oris_badge: 'EN DESARROLLO',
  oris_desc:
    'CRM inmobiliario con IA para agentes y constructoras en República Dominicana. Búsqueda conversacional sobre propiedades reales, gestión de leads y seguimiento de clientes — con datos estructurados y respuestas verificadas.',
  oris_tag_1: 'Búsqueda con IA',
  oris_tag_2: 'Gestión de leads',
  oris_tag_3: 'Constructoras',
  activos_card_title: 'Activos Digitales',
  activos_card_desc: 'Un portafolio de medios digitales operados por agentes de UniSync, publicando 24/7.',
  activos_card_cta: 'Construimos lo que operamos ↓',

  /* ── En Producción ──────────────────────────────────────────────────── */
  production_eyebrow: 'En Producción',
  production_title: 'Construimos lo que operamos.',
  production_lede:
    'Estos no son proyectos de portafolio: son medios reales, publicando contenido todos los días con agentes de UniSync.',
  production_status_full: 'OPERANDO 24/7',
  production_status_short: '24/7',
  production_visit: 'visitar',
  production_mma_desc: 'Cobertura de MMA y UFC en español.',
  production_lahora_desc: 'Actualidad de tecnología e IA.',
  production_quisqueyanos_desc: 'Periodismo dominicano.',
  counter_1_label: 'ARTÍCULOS PUBLICADOS ESTE MES',
  counter_2_label: 'AGENTES EN OPERACIÓN',
  counter_3_label: 'UPTIME · ÚLTIMOS 30 DÍAS',

  /* ── Proceso ────────────────────────────────────────────────────────── */
  process_eyebrow: 'Proceso',
  process_title: 'Cómo trabajamos.',
  process_deliverable_label: 'ENTREGABLE:',
  process_1_title: 'Descubrimiento',
  process_1_desc:
    'Una conversación inicial sin costo. Analizamos su operación, identificamos dónde la IA genera retorno real y definimos el problema exacto a resolver.',
  process_1_deliverable: 'Diagnóstico con oportunidades priorizadas · 3–5 días',
  process_2_title: 'Propuesta',
  process_2_desc:
    'Alcance detallado, arquitectura propuesta, fases de entrega y precio cerrado por escrito. Sin horas facturables abiertas ni sorpresas a mitad de camino.',
  process_2_deliverable: 'Propuesta técnica y comercial · 1 semana',
  process_3_title: 'Sprints',
  process_3_desc:
    'Desarrollo en ciclos de 1–2 semanas con demos funcionales al final de cada uno. Usted ve avance real, prueba el sistema y ajustamos sobre feedback, no sobre supuestos.',
  process_3_deliverable: 'Incrementos funcionales verificables · cada sprint',
  process_4_title: 'Operación',
  process_4_desc:
    'Despliegue a producción, monitoreo continuo y soporte. Los sistemas se mantienen, se miden y se mejoran — igual que operamos los nuestros.',
  process_4_deliverable: 'Sistema en producción con métricas y reportes · continuo',

  /* ── Preguntas (FAQ) ────────────────────────────────────────────────── */
  faq_eyebrow: 'Preguntas',
  faq_title: 'Lo que todos preguntan.',
  faq_1_q: '¿Cuánto cuesta un proyecto?',
  faq_1_a: 'Depende del alcance, pero siempre con precio cerrado por escrito antes de empezar. El diagnóstico inicial no tiene costo.',
  faq_2_q: '¿Cuánto tarda?',
  faq_2_a: 'Un MVP típico: 4–8 semanas en sprints de 1–2 semanas con demos funcionales en cada uno.',
  faq_3_q: '¿Qué pasa después de la entrega?',
  faq_3_a: 'Operación: monitoreo, soporte y mejoras continuas. No entregamos y desaparecemos — operamos sistemas propios y sabemos lo que exige producción.',
  faq_4_q: '¿Trabajan con empresas fuera de República Dominicana?',
  faq_4_a: 'Sí, trabajamos en remoto con clientes de EE.UU., Canadá y Latinoamérica, en español o inglés.',
  faq_5_q: '¿Necesito saber de IA para trabajar con ustedes?',
  faq_5_a: 'No. Usted conoce su negocio; nosotros traducimos el problema a arquitectura y resultados medibles.',

  /* ── Contacto (CTA final) ───────────────────────────────────────────── */
  contact_eyebrow: 'Siguiente paso',
  contact_title: 'Hablemos de su próximo sistema.',
  contact_sub:
    'Cuéntenos el problema; le proponemos la arquitectura y una estimación transparente — sin compromiso.',
  contact_cta_email: 'Escribir por correo',
  contact_trust_1: 'Diagnóstico gratuito',
  contact_trust_2: 'Sin compromiso',
  contact_trust_3: 'Respuesta instantánea',
  contact_pub_pre: 'Mientras usted leía esta página, nuestros agentes publicaron',
  contact_pub_word_singular: 'artículo',
  contact_pub_word_plural: 'artículos',
  form_note: 'Respuesta instantánea — un asistente de IA en nuestro correo le contesta al momento.',
  form_first: 'Nombre',
  form_last: 'Apellido',
  form_email: 'Correo electrónico',
  form_phone: 'Teléfono',
  form_company: 'Empresa',
  form_service_placeholder: 'Servicio de interés',
  form_service_1: 'Agentes autónomos en producción',
  form_service_2: 'Automatización de flujos con IA',
  form_service_3: 'Plataforma UniSync',
  form_service_4: 'Consultoría y arquitectura',
  form_service_5: 'Otro / no estoy seguro',
  form_message: 'Cuéntenos sobre su proyecto (opcional)',
  form_submit: 'Solicitar propuesta',
  form_stat_1_val: '3',
  form_stat_1_label: 'Activos en vivo',
  form_stat_2_val: 'Instantánea',
  form_stat_2_label: 'Respuesta',
  form_stat_3_val: '11',
  form_stat_3_label: 'Agentes activos',
  notify_contact_success: '¡Mensaje enviado con éxito!',
  notify_contact_error: 'Error: no se pudo enviar.',
  notify_contact_network_error: 'Error de red. Intente de nuevo.',

  /* ── Footer ─────────────────────────────────────────────────────────── */
  footer_tagline: 'Ingeniería de IA. Construimos y operamos sistemas autónomos en producción.',
  footer_location: 'Santo Domingo,<br>República Dominicana',
  footer_nav_label: 'Navegación',
  footer_assets_label: 'Activos',
  footer_lang_label: 'Idioma',
  footer_privacy: 'Política de Privacidad',
  footer_terms: 'Términos y Condiciones',
  footer_operating: 'nexadigit.io — operando',
  footer_rights: 'Derechos reservados.',
}
