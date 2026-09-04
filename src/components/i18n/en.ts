// src/components/i18n/en.ts
// Natural business translation of es.ts — same key set, no orphans.
// Brand names, product names, and URLs stay untranslated.
export const en = {
  /* ── Meta / SEO ─────────────────────────────────────────────────────── */
  meta_title: 'NexaDigit — AI engineering and autonomous agents, DR',
  meta_description:
    'NexaDigit is an AI engineering company in Santo Domingo, DR: it designs, builds, and operates software with autonomous agents, custom SaaS, and AEO content.',

  /* ── Accessibility / common ─────────────────────────────────────────── */
  a11y_skip: 'Skip to content',
  a11y_open_menu: 'Open menu',
  a11y_close_menu: 'Close menu',
  a11y_lang_switch: 'Cambiar idioma a español',
  a11y_external: 'opens in a new tab',
  a11y_home: 'NexaDigit — back to top',
  a11y_nav_main: 'Main navigation',
  a11y_nav_hero: 'Top navigation',
  a11y_nav_mobile: 'Mobile menu',
  a11y_nav_footer: 'Footer navigation',

  /* ── Global CTA ─────────────────────────────────────────────────────── */
  cta_book: 'Book a consultation',
  cta_book_short: 'Book a call',

  /* ── Navigation ─────────────────────────────────────────────────────── */
  nav_services: 'Services',
  nav_unisync: 'UniSync',
  nav_production: 'Projects',
  nav_process: 'Process',
  nav_contact: 'Contact',

  /* ── Hero ───────────────────────────────────────────────────────────── */
  hero_eyebrow: 'AI Engineering · Santo Domingo, DR',
  hero_headline: 'We build AI systems that work on their own',
  hero_subhead:
    'NexaDigit designs, builds, and operates software with autonomous agents: from custom platforms to digital assets running 24/7 in production.',
  hero_subhead_short: 'Autonomous AI systems, operating 24/7 in production.',
  hero_cta_secondary: 'See our work',
  hero_availability_label: 'AVAILABILITY:',
  hero_availability: 'accepting 2 projects for August',
  hero_coord_since: 'OPERATING<br>SINCE 2023',
  hero_coord_assets: '<span style="color:#E04E14">3 ASSETS</span> IN<br>PRODUCTION',
  hero_showcase_label: 'IN PRODUCTION 24/7',

  /* ── Model bar (AI marquee) ─────────────────────────────────────────── */
  models_label: 'WE BUILD WITH',
  models_aria: 'AI models: Claude, OpenAI, Gemini, DeepSeek, Mistral, Llama, Grok, Perplexity',

  /* ── Services ───────────────────────────────────────────────────────── */
  services_eyebrow: 'Services',
  services_title: 'From diagnosis to operation.',
  services_1_title: 'AI Strategy & Consulting',
  services_1_desc:
    'We assess your processes, identify use cases with measurable returns, and design the adoption roadmap. From idea to an executable plan, with phases and budget.',
  services_2_title: 'Custom Software Development',
  services_2_desc:
    'Web applications, APIs, and internal platforms built to scale: from validated MVP to enterprise-grade solution. Python/FastAPI, React/TypeScript, PostgreSQL.',
  services_3_title: 'AI Agents & Integration',
  services_3_desc:
    'Autonomous agents that run complete workflows: research, content generation, operations. With multi-model orchestration and verification layers that control quality and cost per task.',
  services_4_title: 'Cloud Infrastructure',
  services_4_desc:
    'Architecture and deployment on AWS, Azure, GCP, and Cloudflare. CI/CD, edge computing, and cost optimization.',
  services_5_title: 'Enterprise Security',
  services_5_desc:
    'Robust authentication, encryption, access control, and OWASP practices built in from the first commit.',
  services_6_title: 'Corporate AI Training',
  services_6_desc:
    'Hands-on workshops so your team adopts AI with sound judgment: agent workflows, effective prompting, and tool evaluation.',
  services_specialty_badge: 'SPECIALTY',
  services_cta_q: 'Another use case?',
  services_cta_link: 'Book a consultation',

  /* ── UniSync (in-house product · AEO) ───────────────────────────────── */
  catalog_eyebrow: 'UniSync · In-house product',
  catalog_title: 'Content built to be cited.',
  catalog_lede:
    'UniSync is our in-house operations product for AEO (Answer Engine Optimization): autonomous agents that research, write, and publish the content that gets ChatGPT, Claude, Gemini, and Perplexity to mention our products and services.',
  unisync_kicker: 'AEO Content Generator',
  unisync_badge: 'OPERATING 24/7',
  unisync_desc:
    'One console to run the fleet: agents per outlet, a publishing queue, AutoPilot, and real-time metrics. Each agent owns a topic, writes with verification, and publishes to our own outlets — noticiasmma, lahora24, and quisqueyanos — with no human in the loop.',
  unisync_how_label: 'How it works',
  unisync_step_1_title: 'Research',
  unisync_step_1_desc: 'Detects what people ask chatbots about our sector and picks the topics with real demand.',
  unisync_step_2_title: 'Write',
  unisync_step_2_desc: 'Generates structured, verified articles, with data and sources, in the format answer engines prefer to cite.',
  unisync_step_3_title: 'Publish',
  unisync_step_3_desc: 'Ships the content 24/7 to our outlets, with a publishing queue and AutoPilot.',
  unisync_step_4_title: 'Get cited',
  unisync_step_4_desc: 'ChatGPT, Claude, Gemini, and Perplexity index that content and mention our products and services in their answers.',
  unisync_mock_sub: '7 agents · one at a time',
  unisync_publishing: 'publishing now…',
  unisync_toast: '<span style="font-weight:600">Article published</span> <span style="color:#7E8790">— noticiasmma.com · 12 min ago</span>',
  unisync_cta: 'Discover UniSync',

  /* ── Projects ───────────────────────────────────────────────────────── */
  projects_eyebrow: 'Projects',
  projects_title: "Software that's already working.",
  projects_lede:
    'Not portfolio mockups: SaaS platforms with real users, real data, and real deadlines — designed, built, and operated by NexaDigit.',
  projects_status_live: 'IN PRODUCTION',
  projects_status_building: 'UNDER CONSTRUCTION',
  projects_private: 'PRIVATE ACCESS',
  projects_soon: 'COMING SOON',
  projects_visit: 'visit',
  vigia_kicker: 'SaaS · Performance bonds',
  vigia_tagline: 'Surveillance after issuance.',
  vigia_desc:
    "A performance bond is underwritten before it's issued; the risk shows up the day after, when the project happens far from the surety and nobody cross-checks the documents. VIGIA consolidates the file, extracts every figure with its source, checks what was declared against what is evidenced, and raises the alert before the claim arrives.",
  vigia_quote: "It doesn't underwrite, issue, or pay. Its product is the early warning and the orderly file.",
  vigia_tag_1: 'Consolidated file',
  vigia_tag_2: 'Data with provenance',
  vigia_tag_3: 'Declared vs. evidenced',
  vigia_tag_4: 'Early warning',
  vigia_shot_alt: 'VIGIA — portfolio dashboard with current exposure, critical projects, and attention priority',
  vigia_caption: 'Portfolio dashboard: current exposure, critical status, expirations, and attention priority.',
  casum_kicker: 'SaaS · Legal practice management',
  casum_tagline: 'The whole practice, in one place.',
  casum_desc:
    'Legal practice management for solo lawyers and small firms in the Dominican Republic: clients, case files, deadlines, and documents, from any device. It takes the mechanical work off the lawyer: onboard a client from a photo of their ID, build and track case files, never miss a deadline, and generate the documents each procedure requires.',
  casum_quote: 'It starts with corporate law — incorporations, shareholder meetings, Mercantile Registry — and expands from there to the rest of the practice.',
  casum_tag_1: 'Onboarding from an ID photo',
  casum_tag_2: 'Case files & deadlines',
  casum_tag_3: 'Document generation',
  casum_tag_4: 'Corporate law',
  casum_mock_caption: 'FIRST MODULE · CORPORATE LAW',
  casum_caption: 'Interface under construction. First module: company formation and corporate life.',
  assets_strip_label: 'Digital assets',
  assets_strip_lede: 'Our own media outlets, operated 24/7 by UniSync agents: the content chatbots cite.',
  assets_mma_desc: 'MMA and UFC coverage in Spanish.',
  assets_lahora_desc: 'Technology and AI news.',
  assets_quisqueyanos_desc: 'Dominican journalism.',

  /* ── Process ────────────────────────────────────────────────────────── */
  process_eyebrow: 'Process',
  process_title: 'How we work.',
  process_deliverable_label: 'DELIVERABLE:',
  process_1_title: 'Discovery',
  process_1_desc:
    'An initial conversation at no cost. We analyze your operation, identify where AI delivers real returns, and define the exact problem to solve.',
  process_1_deliverable: 'Diagnosis with prioritized opportunities · 3–5 days',
  process_2_title: 'Proposal',
  process_2_desc:
    'Detailed scope, proposed architecture, delivery phases, and a fixed price in writing. No open billable hours and no surprises midway.',
  process_2_deliverable: 'Technical and commercial proposal · 1 week',
  process_3_title: 'Sprints',
  process_3_desc:
    'Development in 1–2 week cycles with a working demo at the end of each. You see real progress, test the system, and we adjust on feedback, not assumptions.',
  process_3_deliverable: 'Verifiable working increments · every sprint',
  process_4_title: 'Operation',
  process_4_desc:
    'Production deployment, continuous monitoring, and support. Systems are maintained, measured, and improved — the same way we run our own.',
  process_4_deliverable: 'System in production with metrics and reports · ongoing',

  /* ── FAQ ────────────────────────────────────────────────────────────── */
  faq_eyebrow: 'Questions',
  faq_title: 'What everyone asks.',
  faq_1_q: 'How much does a project cost?',
  faq_1_a: 'It depends on scope, but always with a fixed price in writing before we start. The initial diagnosis is free.',
  faq_2_q: 'How long does it take?',
  faq_2_a: 'A typical MVP: 4–8 weeks in 1–2 week sprints with a working demo in each.',
  faq_3_q: 'What happens after delivery?',
  faq_3_a: "Operation: monitoring, support, and continuous improvements. We don't deliver and disappear — we operate our own systems and know what production demands.",
  faq_4_q: 'Do you work with companies outside the Dominican Republic?',
  faq_4_a: 'Yes, we work remotely with clients in the U.S., Canada, and Latin America, in Spanish or English.',
  faq_5_q: 'Do I need to know about AI to work with you?',
  faq_5_a: 'No. You know your business; we translate the problem into architecture and measurable results.',
  faq_6_q: 'What is AEO (Answer Engine Optimization)?',
  faq_6_a: 'AEO is creating content so that answer engines —ChatGPT, Claude, Gemini, Perplexity— cite it when they reply. UniSync, our in-house product, researches, writes, and publishes that content on our own outlets autonomously.',

  /* ── Contact (final CTA) ────────────────────────────────────────────── */
  contact_eyebrow: 'Next step',
  contact_title: "Let's talk about your next system.",
  contact_sub:
    'Tell us the problem; we propose the architecture and a transparent estimate — no commitment.',
  form_note: 'Instant response — an AI assistant on our inbox replies right away.',
  form_first: 'First name',
  form_last: 'Last name',
  form_email: 'Email address',
  form_phone: 'Phone',
  form_company: 'Company',
  form_service_placeholder: 'Service of interest',
  form_service_1: 'Autonomous agents in production',
  form_service_2: 'AI workflow automation',
  form_service_3: 'UniSync platform',
  form_service_4: 'Consulting and architecture',
  form_service_5: "Other / not sure",
  form_message: 'Tell us about your project (optional)',
  form_submit: 'Request a proposal',
  notify_contact_success: 'Message sent successfully!',
  notify_contact_error: 'Error: message could not be sent.',
  notify_contact_network_error: 'Network error. Please try again.',

  /* ── Footer ─────────────────────────────────────────────────────────── */
  footer_tagline: 'AI engineering. We build and operate autonomous systems in production.',
  footer_location: 'Santo Domingo,<br>Dominican Republic',
  footer_nav_label: 'Navigation',
  footer_assets_label: 'Assets',
  footer_lang_label: 'Language',
  footer_privacy: 'Privacy Policy',
  footer_terms: 'Terms & Conditions',
  footer_operating: 'nexadigit.io — operating',
}
