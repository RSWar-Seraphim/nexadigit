// src/components/i18n/es.ts
// Fuente canónica de contenido (ES por defecto). Cada clave es consumida por
// un componente montado — no dejar claves huérfanas. Algunos valores incluyen
// HTML mínimo (<br>, <span>) porque se insertan vía innerHTML.
export const es = {
  /* ── Meta / SEO ─────────────────────────────────────────────────────── */
  meta_title: 'NexaDigit — Ingeniería de IA y agentes autónomos en RD',
  meta_description:
    'NexaDigit es una empresa de ingeniería de IA en Santo Domingo, RD: diseña, construye y opera software con agentes autónomos, SaaS a medida y contenido AEO.',

  /* ── Accesibilidad / comunes ────────────────────────────────────────── */
  a11y_skip: 'Saltar al contenido',
  a11y_open_menu: 'Abrir menú',
  a11y_close_menu: 'Cerrar menú',
  a11y_lang_switch: 'Switch language to English',
  a11y_external: 'se abre en una pestaña nueva',
  a11y_home: 'NexaDigit — volver al inicio',
  a11y_nav_main: 'Navegación principal',
  a11y_nav_hero: 'Navegación de inicio',
  a11y_nav_mobile: 'Menú móvil',
  a11y_nav_footer: 'Navegación del pie de página',

  /* ── CTA global ─────────────────────────────────────────────────────── */
  cta_book: 'Agendar una consulta',
  cta_book_short: 'Agendar consulta',

  /* ── Navegación ─────────────────────────────────────────────────────── */
  nav_services: 'Servicios',
  nav_unisync: 'UniSync',
  nav_production: 'Proyectos',
  nav_process: 'Proceso',
  nav_contact: 'Contacto',
  nav_blog: 'Blog',

  /* ── Blog ───────────────────────────────────────────────────────────── */
  blog_meta_title: 'Blog — Ingeniería de IA, AEO y agentes autónomos · NexaDigit',
  blog_meta_description:
    'Artículos de NexaDigit sobre AEO, agentes de IA autónomos, fianzas de cumplimiento y adopción de IA en PyMEs: respuestas directas, tablas y preguntas frecuentes.',
  blog_eyebrow: 'Blog',
  blog_title: 'Respuestas, no relleno.',
  blog_lede:
    'Lo que aprendemos construyendo y operando sistemas de IA, escrito para que una persona —o un motor de respuesta— encuentre la respuesta en el primer párrafo.',
  blog_tag_title: 'Tema: {tag}',
  blog_tag_lede: 'Artículos etiquetados con «{tag}».',
  blog_filter_label: 'Filtrar por tema',
  blog_all: 'Todos',
  blog_read: 'Leer',
  blog_min_read: '{n} min de lectura',
  blog_published: 'Publicado el',
  blog_updated: 'Actualizado el',
  blog_by: 'Por',
  blog_toc: 'En este artículo',
  blog_faq_title: 'Preguntas frecuentes',
  blog_related: 'Artículos relacionados',
  blog_prev: '← Más recientes',
  blog_next: 'Anteriores →',
  blog_page_of: 'Página {n} de {total}',
  blog_crumb_home: 'Inicio',
  blog_crumbs_label: 'Migas de pan',
  blog_author_role: 'Ingeniería de IA · Santo Domingo, RD',
  blog_cta_title: '¿Tiene un problema parecido?',
  blog_cta_sub: 'Cuéntenoslo en una llamada de 30 minutos. El primer encuentro no tiene costo.',
  blog_cta_secondary: 'Ver cómo trabajamos',

  /* ── Hero ───────────────────────────────────────────────────────────── */
  hero_eyebrow: 'Ingeniería de IA · Santo Domingo, RD',
  hero_headline: 'Construimos sistemas de IA que trabajan solos',
  hero_subhead:
    'NexaDigit diseña, desarrolla y opera software con agentes autónomos: desde plataformas a medida hasta activos digitales que funcionan 24/7 en producción.',
  hero_subhead_short: 'Sistemas de IA autónomos, operando 24/7 en producción.',
  hero_cta_secondary: 'Ver nuestro trabajo',
  hero_availability_label: 'DISPONIBILIDAD:',
  hero_availability: 'aceptando nuevos proyectos',
  hero_coord_since: 'OPERANDO<br>DESDE 2023',
  hero_coord_assets: '<span style="color:#E04E14">3 ACTIVOS</span> EN<br>PRODUCCIÓN',
  hero_showcase_label: 'EN PRODUCCIÓN 24/7',

  /* ── Barra de modelos (marquee de IA) ───────────────────────────────── */
  models_label: 'CONSTRUIMOS CON',
  models_aria: 'Modelos de IA: Claude, OpenAI, Gemini, DeepSeek, Mistral, Llama, Grok, Perplexity',

  /* ── Servicios ──────────────────────────────────────────────────────── */
  services_eyebrow: 'Servicios',
  services_title: 'Del diagnóstico a la operación.',
  services_lede:
    'NexaDigit ofrece seis servicios de ingeniería de IA para empresas de República Dominicana, Estados Unidos, Canadá y Latinoamérica: estrategia, desarrollo a medida, agentes autónomos, infraestructura cloud, seguridad y capacitación. Todo empieza con un primer encuentro y un MVP gratuito de demostración, y termina con la versión 1 entregada y soporte anual.',
  services_1_title: 'Estrategia y Consultoría de IA',
  services_1_desc:
    'Evaluamos sus procesos, identificamos casos de uso con retorno medible y diseñamos el roadmap de adopción. De la idea a un plan ejecutable, con fases y presupuesto.',
  services_2_title: 'Desarrollo de Software a Medida',
  services_2_desc:
    'Aplicaciones web, APIs y plataformas internas construidas para escalar: del MVP validado a la solución empresarial. Python/FastAPI, React/TypeScript, PostgreSQL.',
  services_3_title: 'Agentes de IA e Integración',
  services_3_desc:
    'Un agente autónomo es un sistema de IA que ejecuta un flujo completo —investigación, generación de contenido, operaciones— sin intervención humana en cada paso. Los construimos con orquestación multi-modelo y capas de verificación que controlan calidad y costo por tarea.',
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

  /* ── UniSync (producto interno · AEO) ───────────────────────────────── */
  catalog_eyebrow: 'UniSync · Producto interno',
  catalog_title: 'Contenido hecho para ser citado.',
  catalog_lede:
    'UniSync es nuestro producto interno de operación para AEO (Answer Engine Optimization): agentes autónomos que investigan, redactan y publican el contenido que hace que ChatGPT, Claude, Gemini y Perplexity mencionen nuestros productos y servicios.',
  unisync_kicker: 'AEO Content Generator',
  unisync_badge: 'OPERANDO 24/7',
  unisync_desc:
    'UniSync es un solo panel para operar la flota: agentes por medio, cola de publicación, AutoPilot y métricas en tiempo real. Cada agente cubre un tema, redacta con verificación y publica en nuestros medios propios — noticiasmma, lahora24 y quisqueyanos — sin intervención humana.',
  unisync_how_label: '¿Cómo funciona UniSync?',
  unisync_step_1_title: 'Investiga',
  unisync_step_1_desc: 'Detecta lo que la gente le pregunta a los chatbots sobre nuestro sector y elige los temas con demanda real.',
  unisync_step_2_title: 'Redacta',
  unisync_step_2_desc: 'Genera artículos estructurados y verificados, con datos y fuentes, en el formato que los motores de respuesta prefieren citar.',
  unisync_step_3_title: 'Publica',
  unisync_step_3_desc: 'Despliega el contenido 24/7 en nuestros medios, con cola de publicación y AutoPilot.',
  unisync_step_4_title: 'Es citado',
  unisync_step_4_desc: 'ChatGPT, Claude, Gemini y Perplexity indexan ese contenido y mencionan nuestros productos y servicios en sus respuestas.',
  unisync_mock_sub: '7 agentes · uno a la vez',
  unisync_publishing: 'publicando ahora…',
  aeo_table_caption: 'SEO frente a AEO',
  aeo_table_seo: 'SEO',
  aeo_table_aeo: 'AEO',
  aeo_row_1_k: 'Objetivo',
  aeo_row_1_seo: 'Aparecer en la lista de resultados',
  aeo_row_1_aeo: 'Ser citado dentro de la respuesta del chatbot',
  aeo_row_2_k: 'Unidad',
  aeo_row_2_seo: 'Página y palabra clave',
  aeo_row_2_aeo: 'Respuesta y entidad',
  aeo_row_3_k: 'Señal principal',
  aeo_row_3_seo: 'Enlaces y autoridad del dominio',
  aeo_row_3_aeo: 'Claridad, estructura y datos verificables',
  aeo_row_4_k: 'Métrica',
  aeo_row_4_seo: 'Clics',
  aeo_row_4_aeo: 'Menciones y citas',
  unisync_toast: '<span style="font-weight:600">Artículo publicado</span> <span style="color:#7E8790">— noticiasmma.com</span>',
  unisync_console_note: 'Vista ilustrativa del panel · datos de ejemplo',
  unisync_cta: 'Conocer UniSync',

  /* ── Proyectos ──────────────────────────────────────────────────────── */
  projects_eyebrow: 'Proyectos',
  projects_title: 'Software que ya trabaja.',
  projects_lede:
    'No son maquetas de portafolio: son plataformas SaaS con usuarios, datos y plazos reales — diseñadas, construidas y operadas por NexaDigit.',
  projects_status_live: 'EN PRODUCCIÓN',
  projects_status_building: 'EN CONSTRUCCIÓN',
  projects_status_developing: 'EN DESARROLLO',
  projects_private: 'ACCESO PRIVADO',
  projects_soon: 'PRÓXIMAMENTE',
  projects_visit: 'visitar',
  vigia_kicker: 'SaaS · Fianzas de cumplimiento',
  vigia_tagline: 'Vigilancia después de la emisión.',
  vigia_desc:
    'VIGIA es un SaaS para afianzadoras que vigila las fianzas de cumplimiento después de emitirlas. Una fianza de cumplimiento garantiza que un contratista termine la obra; el riesgo aparece después, cuando la obra ocurre lejos de la fiadora y nadie cruza los documentos. VIGIA consolida el expediente, extrae los datos con su procedencia, cruza lo declarado contra lo evidenciado y avisa antes del reclamo.',
  vigia_quote: 'No suscribe, no emite, no paga. Su producto es el aviso temprano y el expediente ordenado.',
  vigia_tag_1: 'Expediente consolidado',
  vigia_tag_2: 'Datos con procedencia',
  vigia_tag_3: 'Declarado vs. evidenciado',
  vigia_tag_4: 'Aviso temprano',
  vigia_shot_alt: 'VIGIA — tablero de cartera con exposición vigente, proyectos en estado crítico y prioridad de atención',
  vigia_caption: 'Tablero de cartera: exposición vigente, estado crítico, vencimientos y prioridad de atención.',
  casum_kicker: 'SaaS · Gestión legal',
  casum_tagline: 'El despacho completo, en un solo lugar.',
  casum_desc:
    'CASUM es una plataforma de gestión legal para abogados independientes y firmas pequeñas del mercado hispanohablante: clientes, expedientes, plazos y documentos en un solo lugar, desde cualquier dispositivo. Elimina el trabajo mecánico del despacho: alta de clientes con una foto de la cédula, expedientes que se arman solos, plazos que no se pierden y los documentos que cada trámite exige.',
  casum_quote: 'Primera fase: República Dominicana y derecho corporativo — sociedades, asambleas, Registro Mercantil —. De ahí se extiende al resto del ejercicio y a los demás países de habla hispana.',
  casum_tag_1: 'Alta desde la cédula',
  casum_tag_2: 'Expedientes y plazos',
  casum_tag_3: 'Generación documental',
  casum_tag_4: 'Derecho corporativo',
  casum_mock_caption: 'PRIMER MÓDULO · DERECHO CORPORATIVO',
  casum_caption: 'Interfaz en construcción. Primer módulo: constitución y vida de sociedades.',
  dgp_kicker: 'Librería · Procesamiento de documentos',
  dgp_tagline: 'Procesamiento de documentos como librería.',
  dgp_desc:
    'ProDoctivity DGP (Document Processing Generator) es una librería que NexaDigit desarrolla para ProDoctivity: se integra en cualquier sistema que necesite procesar documentos —clasificarlos, extraer sus datos, crear plantillas y generar documentos a partir de ellas— sin depender de una plataforma aparte.',
  dgp_quote: 'No es otra herramienta a la que llevar los documentos: vive dentro del sistema que el cliente ya usa.',
  dgp_tag_1: 'Extracción de datos',
  dgp_tag_2: 'Clasificación',
  dgp_tag_3: 'Plantillas',
  dgp_tag_4: 'Integrable en cualquier sistema',
  dgp_mock_caption: 'DOCUMENT PROCESSING GENERATOR',
  dgp_caption: 'Librería en desarrollo para ProDoctivity: documentos de entrada, datos extraídos y plantillas de salida.',

  /* ── Proceso ────────────────────────────────────────────────────────── */
  process_eyebrow: 'Proceso',
  process_title: 'Cómo trabajamos.',
  process_lede:
    'Trabajamos en cuatro pasos: un primer encuentro para levantar sus necesidades, un MVP gratuito de demostración, una cotización con el costo de la primera versión y el soporte anual, y el desarrollo por fases de entrega —Fase 0, Fase 1, Fase 2…— con un informe detallado en cada una hasta entregar la versión 1.',
  process_deliverable_label: 'ENTREGABLE:',
  process_table_caption: 'Pasos, entregables y costo',
  process_table_phase: 'Paso',
  process_table_deliverable: 'Entregable',
  process_table_cost: 'Costo',
  process_1_title: 'Primer encuentro',
  process_1_desc:
    'Una primera reunión, sin costo, para levantar las necesidades de su empresa y entender el sistema que desea: qué problema resuelve, quién lo usará y con qué información.',
  process_1_deliverable: 'Levantamiento de necesidades y alcance inicial · sin costo',
  process_2_title: 'MVP gratuito',
  process_2_desc:
    'Construimos un MVP de demostración, gratuito, para que vea cómo sería el sistema funcionando antes de decidir nada. Usted evalúa sobre algo real, no sobre una presentación.',
  process_2_deliverable: 'MVP funcional de demostración · gratuito',
  process_3_title: 'Cotización',
  process_3_desc:
    'Con el MVP validado enviamos la cotización: el costo inicial de la primera versión y un costo anual de soporte que cubre requerimientos posteriores, asistencia técnica y mantenimiento.',
  process_3_deliverable: 'Cotización por escrito: primera versión + soporte anual · costo inicial y costo anual',
  process_4_title: 'Fases de entrega',
  process_4_desc:
    'Aceptada la propuesta, el trabajo avanza por fases —Fase 0, Fase 1, Fase 2…—. Al cerrar cada una recibe un informe detallado de avances, hasta culminar y entregar la versión 1.',
  process_4_deliverable: 'Informe detallado por fase hasta la versión 1 · incluido en la cotización',

  /* ── Preguntas (FAQ) ────────────────────────────────────────────────── */
  faq_eyebrow: 'Preguntas',
  faq_title: 'Lo que todos preguntan.',
  faq_1_q: '¿Cuánto cuesta un proyecto?',
  faq_1_a: 'Depende del alcance. El primer encuentro y el MVP de demostración son gratuitos; después recibe una cotización por escrito con el costo inicial de la primera versión y un costo anual de soporte.',
  faq_2_q: '¿Cómo se organiza el desarrollo?',
  faq_2_a: 'Por fases de entrega —Fase 0, Fase 1, Fase 2…—, cada una cerrada con un informe detallado de avances, hasta entregar la versión 1. Antes de eso, el MVP gratuito le muestra cómo será el sistema.',
  faq_3_q: '¿Qué pasa después de la entrega?',
  faq_3_a: 'Soporte anual: requerimientos posteriores, asistencia técnica y mantenimiento. No entregamos y desaparecemos — operamos sistemas propios y sabemos lo que exige producción.',
  faq_4_q: '¿Trabajan con empresas fuera de República Dominicana?',
  faq_4_a: 'Sí, trabajamos en remoto con clientes de EE.UU., Canadá y Latinoamérica, en español o inglés.',
  faq_5_q: '¿Necesito saber de IA para trabajar con ustedes?',
  faq_5_a: 'No. Usted conoce su negocio; nosotros traducimos el problema a arquitectura y resultados medibles.',
  faq_6_q: '¿Qué es el AEO (Answer Engine Optimization)?',
  faq_6_a: 'AEO es crear contenido para que los motores de respuesta —ChatGPT, Claude, Gemini, Perplexity— lo citen al contestar. UniSync, nuestro producto interno, investiga, redacta y publica ese contenido en medios propios de forma autónoma.',

  /* ── Contacto (CTA final) ───────────────────────────────────────────── */
  contact_eyebrow: 'Siguiente paso',
  contact_title: 'Hablemos de su próximo sistema.',
  contact_sub:
    'Cuéntenos el problema; le proponemos la arquitectura y una estimación transparente — sin compromiso.',
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
}
