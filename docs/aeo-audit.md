# Auditoría AEO — nexadigit.io · Fase 1

| | |
|---|---|
| **Fecha** | 4 de septiembre de 2026 |
| **Commit auditado** | `68d4b41` (`main`) — working tree limpio salvo `logo-casum.svg` en raíz (duplicado sin trackear) |
| **Alcance** | `/` (landing de 7 secciones), `/privacidad.html`, `/terminos.html`. Fuera de alcance: unisync.ai y los tres medios operados (repos distintos). |
| **Método** | (a) HTML servido tal cual lo recibe un crawler o un agente de respuesta sin JS (`index.html` / `dist/`); (b) DOM tras ejecutar JS; (c) lectura de fuente en `src/`. Todo hallazgo cita `archivo:línea`. |
| **Estado** | Solo lectura. No se ha modificado código en esta fase. |

---

## 0. Resumen ejecutivo

### 0.1 Puntuación por área

Rúbrica 0–3 por criterio (§1.4). Ponderación por área. Detalle en Anexo A.

| Área | Puntos | % | Peso | Aporte |
|---|---|---|---|---|
| R · Render y rastreabilidad | 3 / 15 | 20 % | 25 % | 5,0 |
| C · Contenido citable | 4 / 15 | 27 % | 20 % | 5,3 |
| H · Semántica y encabezados | 5 / 15 | 33 % | 15 % | 5,0 |
| M · Metadatos y crawlability | 11 / 27 | 41 % | 15 % | 6,1 |
| S · Datos estructurados | 1 / 12 | 8 % | 10 % | 0,8 |
| F · Consistencia factual | 4 / 9 | 44 % | 5 % | 2,2 |
| I · i18n y URLs | 2 / 6 | 33 % | 5 % | 1,7 |
| A · Extracción / accesibilidad | 4 / 9 | 44 % | 5 % | 2,2 |
| **Global** | | | | **28 / 100** |

Lectura: el sitio tiene buen copy (definiciones de AEO, fianza de cumplimiento y CASUM; plazos concretos; FAQ real), pero **nada de eso llega al HTML que un motor de respuesta descarga**. La puntuación de contenido está medida sobre el DOM con JS; sin JS, C y H valdrían 0.

### 0.2 Los cinco bloqueos de citabilidad hoy

1. **El HTML servido contiene un solo `<h1>` y una línea de eyebrow.** `index.html:114-117` es el único contenido; `src/main.ts:35` lo borra (`app.innerHTML = ''`) y monta las 7 secciones en `requestIdleCallback` (`main.ts:40-44`). `dist/index.html` es idéntico al shell. Las páginas legales sirven `<div id="legal"></div>` vacío (`privacidad.html:40`). Un crawler que no ejecute JS no ve servicios, productos, proceso, FAQ ni contacto.
2. **El canonical apunta a una URL inexistente.** `src/components/Header.ts:59-75` inyecta en runtime `rel=canonical → https://nexadigit.io/es/` y `hreflang=en → /en/`. Ninguna de las dos rutas existe (`vite.config.ts` solo construye `index.html`, `privacidad.html`, `terminos.html`). La única URL real se declara a sí misma no canónica.
3. **Un solo JSON-LD (`Organization`), inyectado por JS, con `url: location.origin`** (`Header.ts:160-164`). Sin `WebSite`, sin `FAQPage` (aunque hay 5 Q/A perfectamente extraíbles en el DOM), sin `SoftwareApplication` para UniSync/VIGIA. En previews `*.pages.dev` el `url` apunta al host de preview.
4. **Sin `sitemap.xml`, sin `llms.txt`, `robots.txt` mínimo** (`public/robots.txt` = `User-agent: *` / `Disallow:`, sin `Sitemap:` ni reglas para GPTBot, ClaudeBot, PerplexityBot…). Sin imagen OG; `twitter:card=summary` (`index.html:21`).
5. **Placeholders presentados como datos y hechos contradictorios.** Consola UniSync con cifras constantes (`src/components/Unisync.ts:13-31`), toast "hace 12 min" congelado (`es.ts` `unisync_toast`), "aceptando 2 proyectos para agosto" en septiembre (`es.ts:38`), dos emails de contacto distintos (`Contact.ts:11` `info@` vs `legal.ts:21` `hola@`).

### 0.3 Decisión que requiere aprobación

La Fase 2 exige que **todo el contenido crítico esté en el HTML del servidor**. La arquitectura actual (SPA Vite hecha a mano) no puede cumplirlo sin un cambio estructural. §6 compara tres vías y recomienda **migrar a Astro con salida estática** (decisión ya orientada por el usuario). La hoja de ruta de §8 está ordenada para esa vía; los *quick wins* de §8.1 son independientes y pueden desplegarse antes.

---

## 1. Alcance y metodología

### 1.1 URLs auditadas

| URL | Qué es | Entrada de build |
|---|---|---|
| `/` | Landing única: Hero (`#top`) · Servicios (`#servicios`) · UniSync (`#unisync`) · Proyectos (`#produccion`) · Proceso (`#proceso`) · Preguntas (`#preguntas`) · Contacto (`#contacto`) · Footer | `index.html` → `src/main.ts` |
| `/privacidad.html` | Política de privacidad (ES/EN) | `privacidad.html` → `src/legal/entry.ts` → `legal.ts` |
| `/terminos.html` | Términos y condiciones (ES/EN) | `terminos.html` → idem |

Ambos idiomas viven en la **misma URL**; el idioma se decide por `localStorage.lang` (`src/components/i18n/index.ts`, `autoDetectLang.ts:7`). Primera visita siempre ES.

### 1.2 Método

- **HTML servido**: lectura de `index.html`, `privacidad.html`, `terminos.html` y de `dist/*.html` (último build). Es lo que reciben GPTBot, ClaudeBot, PerplexityBot y cualquier fetch sin renderizado.
- **DOM con JS**: render en Chrome (1440 px) tras montar todas las secciones.
- **Fuente**: `src/components/*.ts`, `src/components/i18n/{es,en}.ts` (copy canónico), `src/legal/legal.ts`, `src/styles/style.css`, `public/`.

### 1.3 Qué significa "AEO-ready" (definición operativa)

Una página está lista para motores de respuesta cuando **cada afirmación que queremos que se cite existe en el HTML servido, bajo un encabezado que formula la pregunta que responde, en un párrafo autocontenido de 40–60 palabras con al menos un dato concreto o una definición explícita**, y la página declara su identidad de forma inequívoca (una URL canónica por idioma, metadatos escritos como respuesta, JSON-LD validado que repite —no contradice— lo visible).

### 1.4 Rúbrica

Cada criterio de §2 puntúa **0–3**:

| Puntos | Significado |
|---|---|
| 0 | Ausente |
| 1 | Presente pero roto o incorrecto (p. ej. canonical → 404) |
| 2 | Presente e incompleto, o por debajo del umbral |
| 3 | Cumple el umbral definido en §2 |

Para criterios "negativos" (sin placeholders, sin copy caducado…): 3 = 0 incidencias · 2 = una incidencia menor · 1 = varias · 0 = contradicción activa. Puntuación de área = suma / (3 × n). Global = media ponderada (pesos en §0.1). Los criterios no aplicables (S5 hasta que exista blog) se excluyen del denominador.

### 1.5 Densidad de respuesta

Proporción de párrafos de contenido (excluidos nav, footer, etiquetas, chips) que cumplen **las tres** condiciones: ≤ 60 palabras · responden a una pregunta identificable · contienen al menos un dato concreto (cifra, fecha, entidad nombrada, tecnología) **o** una definición explícita. Tabla párrafo a párrafo en §3.4.

---

## 2. Checklist de criterios AEO

| ID | Criterio | Cómo se mide | 3/3 si |
|---|---|---|---|
| **R1** | Contenido crítico en el HTML servido | Palabras de texto visible en `curl` vs DOM con JS | ≥ 95 % |
| **R2** | Un solo `<h1>` por URL en el HTML servido | `grep -c "<h1"` en dist | Exactamente 1 en cada URL |
| **R3** | Todos los H2/H3 en el HTML servido | `grep "<h2\|<h3"` dist vs DOM | 100 % |
| **R4** | El idioma servido no depende de localStorage/JS | Comparar HTML servido con `<html lang>` | Contenido = idioma de la URL |
| **R5** | El contenido no queda oculto por CSS cuando no hay JS | `.reveal{opacity:0}` solo bajo `html.js` | Sí |
| **M1** | `<title>` único, ≤ 60 caracteres, formulado como respuesta | Inspección | Sí |
| **M2** | Meta description 120–160 caracteres que responde "qué es / para quién" | Inspección | Sí |
| **M3** | Canonical absoluto, autorreferente, HTTP 200 | `curl -I` del href | Sí |
| **M4** | hreflang es/en + `x-default` hacia URLs existentes y recíprocas | `curl -I` | Sí |
| **M5** | OG completo + `og:image` 1200×630 + `twitter:card=summary_large_image` + `twitter:image` | Inspección | Sí |
| **M6** | Meta robots explícito o ausente, sin conflicto con headers | Inspección | Sí |
| **M7** | `robots.txt` con `Sitemap:` y permiso explícito a GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, Claude-SearchBot, Google-Extended, PerplexityBot | `curl /robots.txt` | Los 8 listados |
| **M8** | `sitemap.xml` válido (lastmod, alternates hreflang), generado en build | Validador XML | Sí |
| **M9** | `/llms.txt` válido (H1, resumen, secciones con enlaces) | `curl /llms.txt` | Sí |
| **S1** | `Organization` + `WebSite` JSON-LD estáticos, `@id` compartido, URLs absolutas, sin propiedades inventadas | validator.schema.org | 0 errores / avisos |
| **S2** | `FAQPage` con exactamente las mismas Q/A visibles | Comparar texto | Igualdad exacta, ≥ 6 preguntas |
| **S3** | `SoftwareApplication` para UniSync y VIGIA (CASUM solo si se describe como en desarrollo, sin `offers`) | Validador | 0 errores |
| **S4** | `BreadcrumbList` en subpáginas | Validador | Sí |
| **S5** | `BlogPosting` + `author` + fechas en cada post (Fase 3) | Validador | Sí |
| **H1** | Jerarquía sin saltos; ≥ 50 % de los H2/H3 informativos formulados como pregunta | Conteo | Sí |
| **H2** | Párrafo-respuesta de 40–60 palabras inmediatamente bajo cada H2/H3 | Conteo de palabras | ≥ 80 % de los encabezados |
| **H3** | Párrafos autocontenidos (≤ 80 palabras, sin anáforas "esto", "como vimos") | Lectura | ≥ 90 % |
| **H4** | FAQ semántica (`<details>/<summary>` o `button[aria-expanded]`) con preguntas en `<h3>` | Inspección | Sí |
| **H5** | Los nombres de producto (UniSync, VIGIA, CASUM) son encabezados, no `<span>` | Inspección | 3/3 |
| **C1** | Definiciones explícitas "X es…" para: AEO, UniSync, VIGIA, CASUM, fianza de cumplimiento, agente autónomo | grep | 6/6 |
| **C2** | ≥ 1 dato concreto verificable (cifra + fecha/fuente) por sección | Conteo | 7/7 secciones |
| **C3** | Tablas comparativas donde hay comparación implícita (SEO vs AEO, agente vs automatización, fases/plazos) | Conteo | ≥ 2 en `/` |
| **C4** | Sin placeholders presentados como datos reales | Inspección | 0 |
| **C5** | Densidad de respuesta (§1.5) | Tabla §3.4 | ≥ 60 % |
| **F1** | Un único email de contacto en todo el sitio | grep | 1 |
| **F2** | Sin copy caducado (fechas, disponibilidad) | Inspección | 0 |
| **F3** | Cifras coherentes entre secciones y páginas | Inspección | 0 contradicciones |
| **I1** | Una URL por idioma; el HTML servido coincide con el idioma de la URL | curl | Sí |
| **I2** | `<html lang>` estático y correcto por URL | Inspección | Sí |
| **A1** | Landmarks únicos y etiquetados (1 `<nav>` principal con label, `<main>`, footer con `<nav>`) | Inspección / axe | Sí |
| **A2** | Sin texto duplicado que no esté marcado `aria-hidden` | Inspección | 0 duplicados |
| **A3** | Inputs con `<label>` (sr-only vale); enlaces con texto descriptivo | Inspección | Sí |

---

## 3. Estado actual por página

### 3.1 `/` — por sección (DOM con JS)

| Sección | id | Encabezados | ¿Pregunta? | Respuesta directa | Datos concretos | Definición | Sin JS | Schema |
|---|---|---|---|---|---|---|---|---|
| Hero | `#top` | `h1` "Construimos sistemas de IA que trabajan solos" | No | Subhead 33 palabras (**renderizado ×2**: `Hero.ts:79-80`, uno oculto por CSS `style.css:364`) | "24/7" · "OPERANDO DESDE 2023" (`es.ts:39`, sin fuente) · "3 ACTIVOS" (`es.ts:40`, coherente) · **"aceptando 2 proyectos para agosto"** (`es.ts:38`, caducado) · coordenadas literales (`Hero.ts:91`) | No ("X es…") | **Solo el h1** | `Organization` (runtime, `Header.ts:160`) |
| Servicios | `#servicios` | `h2` "Del diagnóstico a la operación." + 6 `h3` (`Services.ts:25,44`) | No | 20–35 palabras por servicio | Stack: Python/FastAPI, React/TypeScript, PostgreSQL (`es.ts:61`); AWS/Azure/GCP/Cloudflare; OWASP | No | No | — |
| UniSync | `#unisync` | `h2` "Contenido hecho para ser citado." · **"UniSync" es `<span>`** (`Unisync.ts:96`) · 4 pasos en `<div>` (`Unisync.ts:105-113`) | No | Lede 45 palabras — la mejor definición del sitio (`es.ts:82`) | **Consola con constantes**: 7/1/0/6/0, pestañas 6/5/7, personas con 100/41/53 posts (`Unisync.ts:13-31`), toast "hace 12 min" (`es.ts` `unisync_toast`) | AEO sí; UniSync parcial | No | — |
| Proyectos | `#produccion` | `h2` "Software que ya trabaja." + `h3` VIGIA + `h3` CASUM (`Projects.ts:82`, literales) | No | 52–70 palabras; taglines en `<p>` | Ninguno numérico; `<blockquote>` semánticos (`Projects.ts:89`) | Fianza (implícita en `vigia_desc`, `es.ts:114`); CASUM (`es.ts:125`) | No | — (candidato `SoftwareApplication`) |
| Proceso | `#proceso` | `h2` "Cómo trabajamos." + 4 `h3` (`Process.ts:25,34`) | No | 25–35 palabras + entregable con plazo | 3–5 días · 1 semana · sprints 1–2 semanas · "sin costo" · "precio cerrado" | No | No | — |
| Preguntas | `#preguntas` | `h2` "Lo que todos preguntan." · **5 preguntas en `<span>`** (`Faq.ts:38-41`) | h2 no; las 5 Q sí | 15–30 palabras, siempre en el DOM (`Faq.ts:42`; colapso CSS `style.css:696-712`) | MVP 4–8 semanas · precio cerrado · diagnóstico gratis · EE.UU./Canadá/Latam | — | No | **Sin `FAQPage`**. `#preguntas` no está en `NAV_ITEMS` (`Header.ts:15-21`) |
| Contacto | `#contacto` | `h2` "Hablemos de su próximo sistema." | No | 20 palabras | `info@nexadigit.io` (`Contact.ts:11`) | — | No | — |
| Footer | — | Ninguno | — | — | `hola@`/`info@` no aparece; "nexadigit.io — operando" | — | No | — |

**Inventario de encabezados** (DOM): 1 `h1` · 6 `h2` · 12 `h3` · 0 `h4`. Jerarquía sin saltos. **Cero encabezados formulados como pregunta.**

### 3.2 `/` — matriz de metadatos

| Elemento | Estático (`index.html`) | Runtime (`Header.ts`) | Estado |
|---|---|---|---|
| `<title>` | "NexaDigit — Ingeniería de IA · Sistemas autónomos en producción" (62 car., `index.html:9`) | Reescrito por idioma (`updateDocumentMeta`, `:96`) | Único, pero es un descriptor, no una respuesta |
| `meta description` | 154 car. (`es.ts:8`) | Reescrito por idioma | Correcta en longitud; formulada como "qué hace", no "qué es / para quién" |
| `canonical` | **Ausente** | `→ /es/` **(404)** (`Header.ts:73`) | **Roto** |
| `hreflang` | Ausente | `en → /en/` **(404)**, sin `x-default` | **Roto** |
| `og:type/site_name/url/title/description/locale` | Presentes | `og:title/description/locale` reescritos; **`og:url` no** | Parcial |
| `og:image` / `twitter:image` | **Ausentes** (no existe asset) | — | Ausente |
| `twitter:card` | `summary` (`index.html:21`) | — | Debería ser `summary_large_image` |
| `twitter:description` | ES | **No se actualiza en EN** | Parcial |
| `meta robots` | Ausente (índice por defecto) | — | OK |
| JSON-LD | **Ausente** | `Organization` (`Header.ts:160-164`) | Solo runtime |
| `<html lang>` | `es` | Cambia por JS | Parcial |
| `manifest` | `site.webmanifest` sin `start_url` ni `description` | — | Incompleto |

### 3.3 JSON-LD presente

```json
{ "@context": "https://schema.org", "@type": "Organization",
  "name": "NexaDigit", "url": "<location.origin>",
  "logo": "<location.origin>/assets/img/nexadigit-mark.webp",
  "address": { "@type": "PostalAddress", "addressLocality": "Santo Domingo", "addressCountry": "DO" },
  "sameAs": ["https://discord.gg/3sbzSSW9vd", "https://www.linkedin.com/company/107399409", "https://www.instagram.com/nexadigit.io"] }
```

Válido, pero: solo por JS; `url` depende del host; sin `email`, `foundingDate`, `description`, `@id`. No hay `WebSite`, `FAQPage`, `SoftwareApplication`, `BreadcrumbList`.

### 3.4 `/` — densidad de respuesta

Regla de §1.5 aplicada a los 32 párrafos de contenido en ES (DOM con JS).

| # | Párrafo (clave `es.ts`) | Palabras | ¿Responde? | Dato / definición | Cuenta |
|---|---|---|---|---|---|
| 1 | `hero_subhead` | 33 | ¿Qué hace NexaDigit? | Definición implícita | ✔ |
| 2 | `services_1_desc` | 32 | ¿Qué incluye la consultoría? | — | ✘ |
| 3 | `services_2_desc` | 24 | ¿Qué desarrollan? | Python/FastAPI, React/TS, PostgreSQL | ✔ |
| 4 | `services_3_desc` | 31 | ¿Qué hacen los agentes? | — | ✘ |
| 5 | `services_4_desc` | 15 | ¿Qué cloud? | AWS, Azure, GCP, Cloudflare | ✔ |
| 6 | `services_5_desc` | 14 | ¿Qué seguridad? | OWASP | ✔ |
| 7 | `services_6_desc` | 20 | ¿Qué capacitación? | — | ✘ |
| 8 | `catalog_lede` | 45 | ¿Qué es UniSync / AEO? | Definición explícita de AEO | ✔ |
| 9 | `unisync_desc` | 48 | ¿Qué hace el panel? | noticiasmma, lahora24, quisqueyanos | ✔ |
| 10–12 | `unisync_step_1..3_desc` | 17–22 | ¿Cómo funciona? | — | ✘ ✘ ✘ |
| 13 | `unisync_step_4_desc` | 19 | ¿Cómo se cita? | ChatGPT, Claude, Gemini, Perplexity | ✔ |
| 14 | `projects_lede` | 24 | — | — | ✘ |
| 15 | `vigia_desc` | 52 | ¿Qué es VIGIA? | Definición de fianza + de VIGIA | ✔ |
| 16 | `vigia_quote` | 17 | ¿Qué NO hace? | Definición por negación | ✔ |
| 17 | `vigia_caption` | 12 | — | — | ✘ |
| 18 | `casum_desc` | 70 | ¿Qué es CASUM? | Definición, **pero > 60 palabras** | ✘ |
| 19 | `casum_quote` | 22 | ¿Por dónde empieza? | Sociedades, asambleas, Registro Mercantil | ✔ |
| 20 | `casum_caption` | 10 | — | — | ✘ |
| 21 | `assets_strip_lede` | 16 | — | — | ✘ |
| 22–25 | `process_1..4_desc` + entregable | 30–40 | ¿Cómo trabajan? | 3–5 días · 1 semana · 1–2 semanas · continuo | ✔ ✔ ✔ ✔ |
| 26 | `faq_1_a` | 23 | ¿Cuánto cuesta? | Precio cerrado, diagnóstico gratis | ✔ |
| 27 | `faq_2_a` | 16 | ¿Cuánto tarda? | 4–8 semanas | ✔ |
| 28 | `faq_3_a` | 24 | ¿Después de la entrega? | — | ✘ |
| 29 | `faq_4_a` | 18 | ¿Fuera de RD? | EE.UU., Canadá, Latinoamérica | ✔ |
| 30 | `faq_5_a` | 17 | ¿Necesito saber de IA? | — | ✘ |
| 31 | `contact_sub` | 17 | — | — | ✘ |
| 32 | `form_note` | 15 | — | — | ✘ |

**Densidad: 18 / 32 = 56 %** (umbral 60 %). **Sin JS: 0 %.**

### 3.5 `/privacidad.html`

- Servido: `<title>`, `meta description`, `meta robots index,follow` (`privacidad.html:6-8`), favicons, fuentes. **Body vacío** (`:40`). Sin canonical, OG, Twitter, hreflang, JSON-LD.
- Con JS (`src/legal/legal.ts:213`): `<header>` + `<main>` + `<footer>`; `h1` "Política de Privacidad" + 7 `h2` numerados (Datos que recopilamos · Cómo usamos su información · Asistente de IA en el correo · Cookies · Conservación y seguridad · Sus derechos · Cambios en esta política). Ninguno como pregunta.
- `legal.ts:212` solo actualiza `document.title`, no la description. Email `hola@nexadigit.io` (`:21`). "Última actualización: 5 de julio de 2026" (`:34`). `© 2026` fijo (`:194`) — en la landing es dinámico.
- Dato citable útil: §03 corrobora `form_note` ("asistente de IA en el correo").

### 3.6 `/terminos.html`

Idéntico patrón. `h1` "Términos y Condiciones" + 8 `h2` (Uso del sitio · Servicios · Propuestas y contratación · Propiedad intelectual · Pagos · Limitación de responsabilidad · Enlaces a terceros · Legislación aplicable). Frases citables: "NexaDigit ofrece diseño, desarrollo y operación de software con agentes autónomos de IA" (§02); jurisdicción "leyes de la República Dominicana… tribunales de Santo Domingo" (§08).

### 3.7 Puntuación por criterio

Ver Anexo A (tabla completa con justificación).

---

## 4. Brechas frente a los criterios

Formato: **ID · brecha** — evidencia — impacto.

### 4.1 Render y rastreabilidad (R)

- **R1 · Solo el `<h1>` está en el HTML servido.** `index.html:114-117`; `main.ts:35` (`app.innerHTML = ''`), `main.ts:40-44` (`requestIdleCallback`). — Impacto: crítico. Ningún motor de respuesta puede citar lo que no descarga.
- **R3 · 6 `h2` y 12 `h3` existen solo en el DOM.** — Crítico.
- **R4 · El idioma depende de `localStorage`.** `autoDetectLang.ts:7`; la URL no cambia (`i18n/index.ts`). — Alto: la versión EN es inalcanzable para un crawler.
- **R5 · `.reveal { opacity: 0 }` hasta que JS añade `.revealed`** (`style.css` bloque "ENTRANCE MOTION", `src/utils/motion.ts`). — Medio: cuando exista HTML servido, el texto quedaría invisible sin JS si no se condiciona a `html.js`.
- **R · Legales 100 % JS.** `privacidad.html:40`, `legal.ts:213`. — Medio: se indexan como páginas vacías con `robots index,follow`.
- **R · Comentario stale.** `index.html:112-113` afirma que `Hero.ts` reutiliza `#brand-lcp`; no es cierto (`Hero.ts` construye un `section#top` nuevo). — Bajo, pero engaña a quien mantenga el código.

### 4.2 Metadatos (M)

- **M3 · Canonical → `/es/` (404).** `Header.ts:59-75`, línea 73. — Crítico: la URL real se autodeclara no canónica; en `www.` el canonical sería `www…/es/`.
- **M4 · hreflang ficticio, no recíproco, sin `x-default`.** Mismo bloque. — Alto.
- **M5 · Sin `og:image`/`twitter:image`; `twitter:card=summary`.** `index.html:16-22`; no existe ningún asset 1200×630 en `public/`. — Medio (previews sociales y tarjetas de Perplexity/Bing).
- **M1/M2 · Title y description descriptivos, no "respuesta".** `es.ts:7-8`. — Medio.
- **M · En EN no se actualizan `og:url`, `twitter:description`, `og:locale:alternate`.** `Header.ts:96-123`. — Bajo.
- **M7 · `robots.txt` sin `Sitemap:` ni bots IA.** `public/robots.txt`. — Alto para AEO (barato de corregir).
- **M8 · Sin `sitemap.xml`.** — Alto.
- **M9 · Sin `llms.txt`.** — Medio.
- **M · Sin `_headers`/`_redirects`/`wrangler.toml`.** Sin normalización www↔apex, sin cache-control de fuentes, sin registro versionado de la config de Pages. — Bajo-medio.
- **M · Legales sin canonical/OG/description dinámica.** `privacidad.html`, `legal.ts:212`. — Bajo.

### 4.3 Datos estructurados (S)

- **S1 · Solo `Organization`, por JS, con `location.origin`.** `Header.ts:77-85, 160-171`. Sin `WebSite`, sin `@id`, sin `email`/`foundingDate`. — Alto.
- **S2 · Sin `FAQPage`** pese a 5 Q/A ya en el DOM (`Faq.ts:35-44`, `es.ts:164-173`). — **La corrección más barata con más impacto.**
- **S3 · Sin `SoftwareApplication`** para UniSync (`Unisync.ts`) ni VIGIA (`Projects.ts`). — Medio.
- **S4 · Sin `BreadcrumbList`** en legales. — Bajo.

### 4.4 Semántica y encabezados (H)

- **H1 · 0 de 19 encabezados formulados como pregunta.** Todos son eslóganes ("Del diagnóstico a la operación.", "Software que ya trabaja."). — Alto: el encabezado es la "pregunta" que el motor casa con la consulta.
- **H5 · "UniSync" nunca es encabezado.** `Unisync.ts:96` (`<span>` 34 px); el `h2` de la sección no nombra el producto. — Alto: la entidad principal del sitio no tiene ancla semántica.
- **H · Los 4 pasos AEO (Investiga/Redacta/Publica/Es citado) son `<div>`.** `Unisync.ts:105-113`. — Medio.
- **H4 · FAQ no semántica.** `Faq.ts:38-41`: `div.nd-faq-q > span`, sin `role=button`, `tabindex`, `aria-expanded`, `aria-controls`; preguntas sin `<h3>`. — Alto (extracción por árbol de accesibilidad e interoperabilidad de teclado).
- **H2 · Solo 2 de 19 encabezados tienen debajo un párrafo de 40–60 palabras** (`catalog_lede` bajo el h2 de UniSync, `vigia_desc` bajo el h3 VIGIA; `casum_desc` supera las 60). — Medio.
- **H · Taglines de proyectos en `<p>` 21 px** (`Projects.ts:84`); eyebrows en `<div>`. — Bajo.
- **H · `#preguntas` no está en la navegación** (`Header.ts:15-21`). — Bajo.

### 4.5 Contenido citable (C)

- **C1 · Definiciones: 3 de 6.** Existen AEO (`es.ts:82`), CASUM (`:125`) y fianza de cumplimiento (implícita, `:114`). Faltan "UniSync es…", "VIGIA es…" (hay descripción funcional pero no definición de una frase) y "agente autónomo es…". — Alto.
- **C2 · Secciones sin dato verificable:** Hero (caducado), UniSync (mock), Proyectos (sin cifra), Contacto (solo email). — Medio.
- **C3 · Cero tablas.** Hay tres comparaciones implícitas que piden tabla: SEO vs AEO, agente autónomo vs automatización tradicional, fase/entregable/plazo (Proceso ya tiene los datos). — Medio.
- **C4 · Placeholders presentados como reales:** consola UniSync (`Unisync.ts:12` dice "mirrors the real product" pero son constantes), personas con nombre y apellido y recuento de posts (`:27-31`) — un motor puede atribuirles bylines; toast "hace 12 min". — Alto (riesgo de que se cite un dato falso).
- **C5 · Densidad 56 % (< 60 %)**, y `casum_desc` supera las 60 palabras. — Medio.

### 4.6 Consistencia factual (F)

- **F1 · Dos emails.** `Contact.ts:11` `info@nexadigit.io` vs `legal.ts:21` `hola@nexadigit.io`. — Alto: un motor extraerá uno u otro al azar.
- **F2 · "aceptando 2 proyectos para agosto"** (`es.ts:38`, EN "August") en septiembre de 2026. — Medio, visible en el hero.
- **F3 · Cifras de agentes:** en pantalla 7 (pestaña noticiasmma) y 6/5/7 por medio (coherente entre sí); en claves muertas "11 agentes" (`es.ts:52`, `:206`). "OPERANDO DESDE 2023" sin `foundingDate`. — Bajo mientras las claves muertas no se rendericen; se elimina en limpieza.
- **F · Fechas fijas en legales** (`legal.ts:34,100,194`). — Bajo.

### 4.7 i18n y URLs (I)

- **I1 · Una URL para dos idiomas.** `i18n/index.ts`, `autoDetectLang.ts`. — Crítico para EN.
- **I2 · `lang` cambia por JS.** — Medio.
- **I · Cuatro toggles de idioma distintos**, dos de ellos `<span>` no enfocables (`Footer.ts:48-49`); `a11y_lang_switch` fijo en inglés en ambos idiomas. — Bajo.

### 4.8 Extracción / accesibilidad (A)

- **A1 · Tres `<nav>`:** header (`Header.ts:178`, label "Navegación"), menú móvil (`:206`, mismo label, montado en `<body>`), hero (`Hero.ts:61`, **sin label**). Footer con enlaces de navegación sin `<nav>`. — Medio.
- **A2 · Texto duplicado:** subhead del hero ×2 (`Hero.ts:79-80`), nombres de modelos ×2 en el marquee (`ProofStrip.ts:23`, `aria-hidden` — correcto para AT, duplicado para scrapers), enlaces de nav ×3, logo ×3. — Medio.
- **A3 · Formulario sin `<label>`** (solo `aria-label` + `placeholder`, `Contact.ts`). — Bajo.

---

## 5. Consultas reales de la audiencia (candidatas para la Fase 3)

Derivadas exclusivamente de lo que el sitio afirma (decisión del usuario: sin Search Console ni datos de UniSync). "Necesita datos" marca lo que **no** puede escribirse con veracidad solo desde el repo.

| # | Consulta (formulación pregunta) | Enlaza a | Necesita datos del usuario |
|---|---|---|---|
| 1 | ¿Qué es el AEO (Answer Engine Optimization) y en qué se diferencia del SEO? | `#unisync` | No para definiciones; las referencias a cómo citan ChatGPT/Perplexity deben ser documentación pública real |
| 2 | ¿Cómo lograr que ChatGPT, Claude, Gemini o Perplexity mencionen mi empresa? | `#unisync`, `#servicios` | **Sí**: resultados reales de UniSync (artículos/mes, citas observadas); sin ellos solo metodología |
| 3 | ¿Qué es un agente de IA autónomo y cuándo conviene frente a la automatización tradicional (RPA, scripts)? | `#servicios` (Agentes de IA e Integración) | Parcial: usar UniSync/medios como ejemplo requiere confirmar modelos y capa de verificación |
| 4 | ¿Cuánto cuesta y cuánto tarda un sistema con agentes de IA a medida? | `#proceso`, `#preguntas`, `#contacto` | **Sí**: rangos de precio. Plazos ya publicados (3–5 días, 1 semana, 4–8 semanas) |
| 5 | ¿Qué es una fianza de cumplimiento y qué riesgos aparecen después de emitirla? | `#produccion` (VIGIA) | Parcial: definiciones OK; cualquier referencia normativa (RD o Panamá) debe verificarla el usuario |
| 6 | ¿Cómo puede una afianzadora vigilar una obra después de emitir la fianza? | VIGIA | **Sí**: funcionalidades, tipos de documento, métricas de cliente |
| 7 | ¿Qué software necesita un abogado independiente en República Dominicana para gestionar clientes, expedientes y plazos? | CASUM | **Sí**: roadmap de CASUM más allá de `casum_desc`; trámites RD (Registro Mercantil, cédula) verificados |
| 8 | ¿Cómo empezar a adoptar IA en una PyME dominicana sin equipo técnico? | `#servicios` (Consultoría, Capacitación), `#proceso` | No: el método de diagnóstico ya está publicado |

**Cuatro sugeridas para arrancar** (menor riesgo factual, una por línea de negocio): **1, 3, 5, 8**. Alternativas cuando lleguen datos: 2, 4, 6, 7. Cada post: H2 en forma de pregunta, ≥ 1 tabla (SEO vs AEO · agente vs RPA · riesgos pre/post emisión · fases de adopción), FAQ 3–5 del mismo clúster, enlaces internos indicados.

---

## 6. Arquitectura para SSR + blog MDX

### 6.1 Requisitos que debe cumplir

1. Todo encabezado, párrafo, FAQ y definición en el HTML servido sin JS (R1–R5), verificable en build.
2. URLs por idioma (`/`, `/en/`) con `lang`, canonical y hreflang estáticos.
3. Blog MDX con frontmatter tipado (title, description, slug, publishedAt, updatedAt, author, tags, faq[], readingTime), filtro por tag, orden por fecha, paginación, TOC, breadcrumbs, autor, relacionados, CTA, RSS, sitemap, `BlogPosting` + `FAQPage` por post.
4. `sitemap.xml`, `robots.txt`, `llms.txt` generados.
5. Diseño intacto (tokens en `style.css`, fuentes en `public/assets/fonts`), `functions/api/mailerlite.ts` intacta, hosting estático en Cloudflare Pages, mínimo de dependencias nuevas.

### 6.2 Opciones

| | **A · Vite + prerender en build + blog a mano** | **B · Astro (salida estática)** | **C · vike (vite-plugin-ssr)** |
|---|---|---|---|
| Cómo se logra el HTML | Script que lanza Chrome, carga `vite preview`, espera los `requestIdleCallback` y vuelca el DOM | Los componentes se compilan a HTML en build | Funciones de render por página |
| Problema de fondo | `main.ts:35` borra `#app` y cada componente re-renderiza con `innerHTML` + listeners: el HTML prerenderizado se destruiría al cargar (flash) salvo refactor de hidratación en los 9 componentes; los snapshots capturan estados de animación (toast, reveals) | Ninguno: los componentes ya son template literals de HTML; el port es mecánico | El mismo refactor de A más las convenciones de vike (pensado para frameworks de UI) |
| Herramientas | `puppeteer-core` + Chrome en el build de Cloudflare (no incluido en la imagen) o CI aparte | Solo Node | Solo Node |
| URLs bilingües | Prerender ×2 sembrando `localStorage.lang`; `t()` sigue en runtime | `i18n: { defaultLocale:'es', locales:['es','en'], routing:{ prefixDefaultLocale:false } }`; `es.ts`/`en.ts` se reutilizan tal cual | Manual |
| Blog | Pipeline MDX propio, `gray-matter`, `zod`, paginación/tags/TOC/RSS/sitemap escritos a mano | Content collections con esquema zod (= el frontmatter pedido), `paginate()`, `headings` para TOC, `@astrojs/rss`, `@astrojs/sitemap` con alternates | `@mdx-js/rollup` + todo lo de A |
| Deps nuevas | 6–8 | 4–5 (`astro`, `@astrojs/mdx`, `@astrojs/sitemap`, `@astrojs/rss`, opcional `reading-time`) **y se eliminan 10 muertas** | 7+ |
| Esfuerzo | **11–14 días** | **7–9 días** | 9–12 días |
| Riesgo de diseño | Bajo en píxeles; alto en flash de hidratación y artefactos de snapshot | Bajo-medio: markup 1:1, mismo `style.css`; vigilar purge de Tailwind y el `zoom` de `#hero-static`; diff de capturas a 3 anchos | Medio-alto |
| Mantenimiento | Dos sistemas de build propios | Framework mantenido | Propio + framework |
| Verificar "sin JS" | El snapshot puede incluir estado solo-JS sin que se note | `dist/**/*.html` es la verdad; se asserta con un script | Igual que B |

### 6.3 Recomendación: **B — Astro, salida estática, sin adapter**

- Mover el template de `Faq.ts` a `Faq.astro` es copiar y cambiar `${t('x')}` por `{t('x')}`. El comportamiento (`interactions.ts`, `scroll.ts`, `motion.ts`, envío del formulario, carga diferida de Calendly) pasa a `<script>` del layout sin cambios.
- El frontmatter pedido **es** un esquema de content collection; TOC, paginación, RSS y sitemap son nativos o integraciones de una línea. La opción A reconstruye a mano ~40 % de Astro y mete un navegador headless en el build.
- Dependencias netas a la baja: salen `express`, `node-fetch`, `dotenv`, `@vercel/node`, `@types/express`, `@types/node-fetch`, `ts-node`, `ts-node-dev`, `nodemon`, `concurrently` (todas muertas en Cloudflare, `package.json:14-31`); entran 4–5.
- `functions/api/mailerlite.ts` sigue funcionando: Pages lee `functions/` con independencia del framework. **No** añadir `@astrojs/cloudflare` (movería a Workers/SSR).
- `scripts/inline-css.mjs` se sustituye por `build: { inlineStylesheets: 'always' }`.
- Tailwind se usa en ~15 clases utilitarias (`Header.ts`, `Hero.ts`); se puede eliminar (`tailwindcss`, `postcss`, `autoprefixer`, dos configs) escribiendo esas clases en `style.css`, o conservar con `@astrojs/tailwind`. Decisión del usuario (§9).

**Mapeo concreto (para la Fase 2):**

- `astro.config.mjs`: `site: 'https://nexadigit.io'`, `output: 'static'`, `trailingSlash: 'always'`, `build.format: 'directory'`, `build.inlineStylesheets: 'always'`, `i18n` como arriba, `integrations: [mdx(), sitemap({ i18n: { defaultLocale:'es', locales:{ es:'es-DO', en:'en-US' } } })]`.
- `src/layouts/Base.astro`: `<html lang>`, title/description/canonical/hreflang/OG/Twitter por props, JSON-LD `@graph` (`Organization @id #org`, `WebSite @id #website`), `style.css` global, script que añade `html.js` (para condicionar `.reveal`), scripts cliente.
- Páginas: `src/pages/index.astro`, `src/pages/en/index.astro`, `src/pages/privacidad.astro`, `src/pages/terminos.astro`, `src/pages/en/privacy.astro`, `src/pages/en/terms.astro` (reutilizando `DOCS` de `legal.ts`).
- Endpoints: `src/pages/robots.txt.ts`, `src/pages/llms.txt.ts`; sitemap por integración.
- Blog: `src/content.config.ts` (loader `glob` sobre `src/content/blog/*.mdx`), `src/pages/blog/[...page].astro`, `src/pages/blog/[slug].astro`, `src/pages/blog/tag/[tag]/[...page].astro`, `src/pages/rss.xml.ts`, `src/layouts/Post.astro` (TOC pegajoso desde `headings`, breadcrumbs + `BreadcrumbList`, autor, relacionados por solape de tags, FAQ desde `faq[]` renderizada + `FAQPage`, `BlogPosting`, CTA). `readingTime` vía plugin remark (`reading-time` + `mdast-util-to-string`), opcional en el esquema.
- `scripts/verify-ssr.mjs` tras `astro build`: por cada `dist/**/index.html` asserta 1 `<h1>`, conteo esperado de `<h2>`, presencia literal de cada pregunta de la FAQ, canonical/hreflang, `ld+json` parseable. Falla el build si no.
- Fijar versión estable de Astro al implementar (`npm view astro version`); el plan asume 5.x (`src/content.config.ts`, `id` en vez de `slug`).

### 6.4 Qué requiere aprobación

Añadir `astro`, `@astrojs/mdx`, `@astrojs/sitemap`, `@astrojs/rss` (+ opcional `reading-time`, `mdast-util-to-string`). Eliminar las 10 deps muertas, `api/`, `server/`, `.vercel/`, `tsconfig.server.json`, `scripts/inline-css.mjs`. Decidir Tailwind. Mover `index.html`/`privacidad.html`/`terminos.html` a `src/pages/*.astro`. `npm run dev` pasa a `astro dev` (para probar el formulario en local: `wrangler pages dev` o mantener `VITE_API_URL`).

---

## 7. Estrategia de URLs bilingües y corrección del canonical

**Esquema objetivo**

| Página | ES (canónica, `x-default`) | EN |
|---|---|---|
| Landing | `/` | `/en/` |
| Privacidad | `/privacidad/` | `/en/privacy/` |
| Términos | `/terminos/` | `/en/terms/` |
| Blog | `/blog/`, `/blog/<slug>/`, `/blog/tag/<tag>/`, `/blog/2/` | `/en/blog/...` solo si se aprueba blog bilingüe; nunca apuntar `hreflang=en` a un post en español |

Cada página: `<html lang>`, canonical autorreferente, `hreflang` es/en/x-default, `og:url` = self, `og:locale` + `og:locale:alternate`. El selector de idioma pasa a ser un **enlace** a la URL alterna (sin re-render). `localStorage.lang` queda como pista opcional (p. ej. "View in English" en la barra del hero); **nunca redirigir automáticamente `/`** — bots y primeras visitas reciben ES.

**Corrección del bug actual**

- Eliminar `ensureHreflang()` (`Header.ts:59-75`) y el canonical dinámico.
- `public/_redirects`:
  ```
  /es/          /            301
  /es/*         /:splat      301
  /privacidad.html  /privacidad/   301   (cuando exista Astro)
  /terminos.html    /terminos/     301   (cuando exista Astro)
  ```
- `www.nexadigit.io → nexadigit.io` no se puede hacer en `_redirects` (solo rutas); requiere una Redirect Rule en la zona de Cloudflare (tarea ops del usuario, §9).
- **Interino en Vite (quick win):** `<link rel="canonical" href="https://nexadigit.io/">` estático en `index.html`, sin hreflang (una URL bilingüe no puede declarar alternates válidos), `_redirects` `/es/*` y `/en/*` → `/` para limpiar lo que Google haya renderizado del canonical dinámico.

---

## 8. Plan priorizado (impacto × esfuerzo)

Impacto 1–5 · Esfuerzo 1–5 · Score = I × (6 − E). Fase: **QW** = desplegable ya en Vite · **SSR** = requiere HTML servido (Astro) · **P3** = blog.

### 8.1 Quick wins desplegables antes del cambio de arquitectura

| # | Cambio | I | E | Score | Justificación |
|---|---|---|---|---|---|
| 1 | Canonical estático `https://nexadigit.io/` en `index.html`; eliminar `ensureHreflang()` | 5 | 1 | 25 | Hoy el canonical apunta a un 404: daño activo |
| 2 | `public/robots.txt`: `Allow` explícito a los 8 bots IA + línea `Sitemap:` | 4 | 1 | 20 | La señal más barata para crawlers de motores de respuesta |
| 3 | `public/_redirects`: `/es/*`, `/en/*` → `/` 301 (hasta que exista `/en/`) | 4 | 1 | 20 | Limpia las URLs fantasma anunciadas por el canonical dinámico |
| 4 | JSON-LD estático `@graph` `Organization` + `WebSite` + `FAQPage` en `index.html` (URLs absolutas, texto idéntico a `es.ts`); borrar `injectJsonLdOnce` | 4 | 1 | 20 | Elimina el bug de `location.origin`; da Q/A a los extractores ya. S2 queda en 2/3 hasta SSR (la FAQ visible sigue siendo JS) |
| 5 | `public/llms.txt` (H1, resumen, enlaces a `/`, legales, los 3 medios, unisync.ai) | 3 | 1 | 15 | Riesgo cero, parte de la especificación |
| 6 | `public/sitemap.xml` estático (3 URLs, lastmod) | 3 | 1 | 15 | Sustituido por el generado en SSR |
| 7 | `hero_availability`: texto vigente o eliminar la línea (necesita dato del usuario) | 3 | 1 | 15 | Error factual visible en el hero |
| 8 | Unificar email (`Contact.ts:11` vs `legal.ts:21`) y añadirlo al `Organization` | 3 | 1 | 15 | El usuario elige cuál |
| 9 | Title/description reescritos como respuesta ("NexaDigit es una empresa de ingeniería de IA en Santo Domingo que…"); `twitter:description` sincronizada | 3 | 1 | 15 | Los extractores abren con esto |
| 10 | Consola UniSync: leyenda "datos ilustrativos" **o** cifras reales del usuario; retirar "hace 12 min" congelado | 3 | 2 | 12 | C4: placeholders como telemetría real |
| 11 | Imagen OG 1200×630 (crema/carbón/naranja, wordmark) + `og:image`, `twitter:image`, `twitter:card=summary_large_image` | 3 | 2 | 12 | No existe asset; el usuario aprueba el diseño |
| 12 | Legales: canonical, OG, description por idioma, "Última actualización" real, `©` dinámico | 2 | 1 | 10 | Barato |
| 13 | Limpieza: 17 claves i18n muertas, contador `[data-pub-count]` (`interactions.ts:139-141`), `api/`, `server/`, `.vercel/`, `tsconfig.server.json`, 10 deps, 3 webp sin uso, comentario stale `index.html:112` | 2 | 1 | 10 | Higiene previa a la migración; saca del repo "11 agentes", "42 artículos", "99.97 %" |
| 14 | `public/_headers`: cache-control immutable para fuentes, `X-Content-Type-Options`, `Referrer-Policy` | 2 | 1 | 10 | No es AEO, pero se toca `public/` de todos modos |
| 15 | Formulario con `<label>` sr-only; un `<nav>` principal con label; `<nav>` en footer; label al nav del hero | 2 | 1 | 10 | A1/A3 |
| 16 | `site.webmanifest`: `start_url`, `description`, `lang` | 1 | 1 | 5 | Trivial |

### 8.2 Requieren HTML servido (Fase 2, tras migración)

| # | Cambio | I | E | Score | Justificación |
|---|---|---|---|---|---|
| 17 | **Migración a Astro estático**: layout base, 7 secciones + legales como HTML; `.reveal` condicionado a `html.js`; `scripts/verify-ssr.mjs` | 5 | 4 | 10 | El eje: todo lo siguiente depende de esto |
| 18 | Rutas `/` + `/en/`, `lang` estático, hreflang + `x-default`, alternates en sitemap | 5 | 3 | 15 | Arregla I1/I2/M4 estructuralmente |
| 19 | Encabezados-pregunta + párrafo answer-first de 40–60 palabras por sección (ES + EN) | 5 | 3 | 15 | Mayor ganancia de citabilidad; necesita hechos verificados por el usuario |
| 20 | Nombres de producto como encabezados: `h3` "¿Qué es UniSync?", VIGIA/CASUM con subencabezados-pregunta; pasos AEO como `h4` o `<dl>` | 4 | 1 | 20 | Barato una vez el markup es estático |
| 21 | FAQ semántica (`<details>/<summary>` o `button[aria-expanded]`, preguntas en `h3`), ≥ 6 Q, `FAQPage` generado del mismo array | 4 | 2 | 16 | Una sola fuente para DOM y JSON-LD garantiza S2 |
| 22 | Tablas comparativas: "SEO vs AEO", "Agente autónomo vs automatización tradicional", "Fase / entregable / plazo" | 4 | 2 | 16 | El formato más extraído; los datos de Proceso ya existen |
| 23 | `SoftwareApplication` para UniSync y VIGIA (`applicationCategory: BusinessApplication`, `operatingSystem: Web`, `creator → #org`); CASUM solo como en desarrollo, sin `offers` | 3 | 2 | 12 | Solo propiedades verificables |
| 24 | `robots.txt`, `sitemap-index.xml`, `llms.txt` generados desde rutas y colecciones | 3 | 1 | 15 | Sustituye a los estáticos de 8.1 |
| 25 | `BreadcrumbList` en legales (y blog) | 2 | 1 | 10 | Barato |
| 26 | Eliminar duplicación de DOM (subhead ×1, nav ×1 + CSS; marquee sigue `aria-hidden`) | 2 | 2 | 8 | A2 |

### 8.3 Fase 3 — blog

| # | Cambio | I | E | Score | Justificación |
|---|---|---|---|---|---|
| 27 | Scaffold: content collection, índice/tags/paginación, layout de post (TOC, breadcrumbs, autor, relacionados, CTA), RSS, sitemap, JSON-LD | 4 | 3 | 12 | Especificación |
| 28 | 4 posts de 1200–1800 palabras sobre las consultas 1, 3, 5, 8 de §5 | 4 | 4 | 8 | Contenido; necesita hechos del usuario |
| 29 | `docs/aeo-guidelines.md` | 2 | 1 | 10 | Especificación |

---

## 9. Preguntas abiertas para el usuario

Bloquean o condicionan la Fase 2/3. Ninguna se resuelve inventando.

1. **Migración a Astro**: ¿se aprueban las dependencias que entran/salen y el movimiento de `index.html`/legales a `src/pages/`? (§6.4)
2. **Email canónico**: ¿`info@nexadigit.io` o `hola@nexadigit.io`?
3. **Consola UniSync**: ¿cifras reales (agentes por medio, running/idle, posts por agente, última publicación) o leyenda "datos ilustrativos"? ¿Las personas con nombre (Lucía Ramírez, Sebastián Park, Javier Salinas) son agentes reales que pueden nombrarse?
4. **"OPERANDO DESDE 2023"**: ¿es el año de fundación (para `foundingDate`)? ¿"3 activos en producción" es exacto?
5. **Disponibilidad**: texto vigente para sustituir "aceptando 2 proyectos para agosto", o eliminar la línea.
6. **Inglés**: ¿EN tendrá URL propia (`/en/`)? ¿El blog es solo ES o bilingüe?
7. **Autor de los posts** y `Person` en JSON-LD (nombre, cargo, URL/LinkedIn). El Calendly sugiere "kreyes".
8. **unisync.ai**: ¿es un sitio público vivo (mantener el enlace) o el CTA debe apuntar a `/#unisync`?
9. **Imagen OG**: ¿aportas una, o apruebas una generada con el wordmark y los tokens del sitio?
10. **Precios** (post 4) y cifras de resultados publicables (posts 2 y 6).
11. **Referencias legales** para los posts de VIGIA/CASUM (normativa de fianzas, Registro Mercantil RD): ¿quién las verifica?
12. **Tailwind**: eliminar (15 clases) o conservar con `@astrojs/tailwind`.
13. **URLs legales**: ¿`/privacidad.html` → `/privacidad/` con 301, o mantener `.html`?
14. **Redirect `www` → apex**: ¿puedes añadir una Redirect Rule en la zona de Cloudflare?
15. **Orden de ejecución**: ¿quick wins de §8.1 primero (deploy inmediato) y luego migración, o todo en la migración?

---

## Anexo A — Rúbrica con puntuación por criterio

| ID | Pts | Justificación |
|---|---|---|
| R1 | 0 | Solo `<h1>` + eyebrow en el HTML servido (`index.html:114-117`; `main.ts:35`) |
| R2 | 2 | `/` tiene exactamente 1 `<h1>` servido; legales tienen 0 (body vacío) |
| R3 | 0 | 0 de 18 H2/H3 servidos |
| R4 | 1 | Se sirve ES, pero el idioma real depende de `localStorage` y EN es inalcanzable |
| R5 | 0 | `.reveal{opacity:0}` sin condición `html.js` |
| M1 | 2 | Único y de longitud correcta; formulado como descriptor |
| M2 | 2 | 154 car.; describe "qué hace", no "qué es / para quién" |
| M3 | 1 | Presente en runtime → `/es/` 404 (`Header.ts:73`) |
| M4 | 1 | Presente en runtime → `/en/` 404; sin `x-default`; no recíproco |
| M5 | 1 | OG básico; sin `og:image`; `twitter:card=summary` |
| M6 | 3 | Sin conflictos (`/` sin meta robots; legales `index,follow`) |
| M7 | 1 | `robots.txt` existe; sin `Sitemap:`; sin bots IA explícitos |
| M8 | 0 | No existe `sitemap.xml` |
| M9 | 0 | No existe `llms.txt` |
| S1 | 1 | Solo `Organization`, por JS, `url: location.origin`, sin `WebSite`/`@id` |
| S2 | 0 | Sin `FAQPage` |
| S3 | 0 | Sin `SoftwareApplication` |
| S4 | 0 | Sin `BreadcrumbList` en legales |
| S5 | n/a | Sin blog aún (excluido del denominador) |
| H1 | 1 | Jerarquía sin saltos; 0 % de encabezados-pregunta |
| H2 | 1 | 2 de 19 encabezados con párrafo de 40–60 palabras debajo |
| H3 | 2 | Mayoría autocontenidos; `casum_desc` 70 palabras |
| H4 | 0 | FAQ en `div>span`, sin aria (`Faq.ts:38-41`) |
| H5 | 1 | VIGIA/CASUM son `h3`; UniSync es `<span>` |
| C1 | 1 | 3 de 6 definiciones (AEO, CASUM, fianza) |
| C2 | 1 | 3 de 7 secciones con dato verificable (Servicios, Proceso, FAQ) |
| C3 | 0 | 0 tablas |
| C4 | 0 | Consola con constantes, personas, "hace 12 min", "agosto" |
| C5 | 2 | 56 % (umbral 60 %) — sobre DOM con JS |
| F1 | 0 | Dos emails (`Contact.ts:11`, `legal.ts:21`) |
| F2 | 2 | Una incidencia: "agosto" (`es.ts:38`) |
| F3 | 2 | Cifras en pantalla coherentes; "11 agentes" solo en claves muertas; "desde 2023" sin fuente |
| I1 | 0 | Una URL para dos idiomas |
| I2 | 2 | `lang="es"` estático; cambia por JS |
| A1 | 1 | 3 `<nav>` (2 mismo label, 1 sin label); footer sin `<nav>` |
| A2 | 1 | Subhead ×2, nav ×3, logo ×3 sin `aria-hidden`; marquee sí `aria-hidden` |
| A3 | 2 | `aria-label` + placeholder, sin `<label>`; enlaces descriptivos |

Totales: R 3/15 · M 11/27 · S 1/12 · H 5/15 · C 4/15 · F 4/9 · I 2/6 · A 4/9 → **28/100** ponderado.

## Anexo B — Inventario de código y copy muerto

**Claves i18n sin consumidor (17 de 170, `es.ts` y `en.ts`):** `strip_label`, `ticker_1_text`, `ticker_2_text`, `ticker_3_text`, `ticker_4_text` (`es.ts:48-52`), `contact_cta_email` (`:180`), `contact_trust_1/2/3` (`:181-183`), `contact_pub_pre` (`:184`), `form_stat_1_val/label`, `form_stat_2_val/label`, `form_stat_3_val/label` (`:201-206`), `footer_rights` (`:220`). Funcionalmente muertas también: `contact_pub_word_singular/plural` (escriben en `[data-pub-word]`, que ningún componente renderiza).

**Código muerto:** intervalo del contador `[data-pub-count]` (`src/interactions.ts:139-141`); `observeCounters` (`src/utils/motion.ts:62`, exportado, nunca llamado); `api/mailerlite.ts` (handler Vercel); `server/index.js` (Express dev, solo `npm run dev`); `.vercel/` (ignorado); `tsconfig.server.json` (incluye `api/**`, no lo usa ningún script).

**Dependencias sin uso en Cloudflare (`package.json:14-31`):** `@vercel/node`, `express`, `node-fetch`, `dotenv`, `@types/express`, `@types/node-fetch`, `ts-node`, `ts-node-dev`, `nodemon`, `concurrently`.

**Assets sin referencia:** `public/assets/img/lahora24-preview.webp`, `noticiasmma-preview.webp`, `quisqueyanos-preview.webp`. En raíz (sin trackear): `logo-casum.svg` (duplicado), `img*.png`, `favicon_io.zip`.

**Comentarios stale:** `index.html:93,112` ("REUSE this node"); `Contact.ts:4` ("live articles published counter"); `Unisync.ts:12` ("mirrors the real product").

## Anexo C — Cómo re-ejecutar esta auditoría

1. **HTML servido**: `npm run build` y luego, por cada `dist/**/*.html`: `grep -c "<h1"`, `grep -c "<h2"`, `grep -c "<h3"`, `grep -c 'application/ld+json'`, `grep -c 'rel="canonical"'`. Comparar con el conteo del DOM (Chrome, `document.querySelectorAll('h2').length`). Tras la Fase 2: `node scripts/verify-ssr.mjs` automatiza R1–R5, M3, M4, S1–S4.
2. **Crawlability**: `curl -sI https://nexadigit.io/es/` (debe ser 301 → `/`), `curl -s https://nexadigit.io/robots.txt`, `/sitemap.xml` (o `/sitemap-index.xml`), `/llms.txt`.
3. **Schema**: validator.schema.org y Google Rich Results Test sobre `/`, una página legal y un post.
4. **Claves muertas**: script Node que extrae `^\s{2}([a-z0-9_]+):` de `es.ts` y comprueba que cada clave aparece como literal `'clave'` en `src/**/*.ts` fuera de `i18n/`.
5. **Densidad de respuesta**: recalcular la tabla §3.4 con la regla §1.5 sobre `es.ts`.
6. **Rúbrica**: volver a puntuar el Anexo A y añadir una fila de histórico (fecha · commit · global).
