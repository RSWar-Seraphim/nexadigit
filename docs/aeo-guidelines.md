# Guía AEO para escribir posts en nexadigit.io

Checklist para que cada artículo nuevo mantenga el estándar del blog: citable por motores de respuesta (ChatGPT, Claude, Gemini, Perplexity), verificable y fiel al diseño del sitio. Úsala antes de abrir el PR.

## 1. Antes de escribir

- [ ] **La pregunta existe.** El título es una pregunta que alguien le hace a un chatbot (formúlala en ChatGPT/Perplexity y mira qué responden hoy). Si nadie la pregunta, no es un post.
- [ ] **Tienes los hechos.** Toda cifra, fecha, plazo o precio tiene fuente (el sitio, un documento del producto, una fuente pública). Si falta un dato, **pregunta antes de escribir**; no se inventa ni se estima.
- [ ] **Sabes a qué página enlaza.** Cada post enlaza a al menos una sección de producto o servicio: `/#unisync`, `/#produccion` (VIGIA, CASUM), `/#servicios`, `/#proceso`, `/#contacto`.
- [ ] **Eliges 1–5 tags** de la lista existente antes de crear uno nuevo (`AEO`, `Agentes de IA`, `Automatización`, `Fianzas`, `VIGIA`, `UniSync`, `PyMEs`, `Adopción de IA`, `Servicios`, `Proceso`, `Contenido`, `Gestión de riesgo`).

## 2. Frontmatter (obligatorio, lo valida el build)

```yaml
---
title: '¿Pregunta exacta que responde el post?'          # 20–110 caracteres
description: 'Respuesta directa a esa pregunta.'          # 80–200 caracteres; es la meta description
slug: mismo-nombre-que-el-archivo                         # kebab-case, sin acentos
publishedAt: 2026-09-04
updatedAt: 2026-09-04                                     # cámbialo cuando edites el contenido
author: Kenny Reyes                                      # o 'Equipo NexaDigit' para un post sin firma personal
tags: ['AEO', 'Contenido']                                # 1–5
faq:                                                      # 3–5; se renderiza y va al JSON-LD FAQPage
  - q: '¿Pregunta corta?'
    a: 'Respuesta autocontenida de 40–600 caracteres.'
readingTime: 7                                            # opcional; si falta se calcula (~200 ppm)
draft: false
---
```

Reglas: el archivo va en `src/content/blog/<slug>.mdx`; `description` **es la respuesta**, no un teaser ("Descubre cómo…" está prohibido); las preguntas de la FAQ no repiten los H2 del post.

## 3. Estructura del cuerpo

- [ ] **1200–1800 palabras** de prosa (el build falla fuera de 1100–2000).
- [ ] **Sin H1 en el cuerpo** (el título ya es el H1). Solo `##` y `###`.
- [ ] **Todos los H2 son preguntas** ("¿Qué es…?", "¿Cómo…?", "¿Cuándo conviene…?", "¿Cuánto…?"). Mínimo 4.
- [ ] **Respuesta-primero bajo cada H2**: el primer párrafo (40–60 palabras) contiene la conclusión, en negrita si es una definición o una afirmación clave. El desarrollo va después.
- [ ] **Párrafos autocontenidos** (≤ 80 palabras): sin "como vimos", "esto", "lo anterior". Copiado solo, cada párrafo debe seguir siendo verdad y tener sentido.
- [ ] **Definición explícita** de cada término del dominio la primera vez que aparece: "X es…".
- [ ] **Al menos una tabla** (Markdown GFM) cuando hay comparación, fases, riesgos o criterios. Primera columna = concepto, cabeceras cortas, celdas de una o dos frases.
- [ ] **Un dato concreto por sección** (cifra, fecha, tecnología, nombre). Si una sección no tiene ninguno, revísala.
- [ ] **Un `<Callout label="…">`** como máximo cada dos secciones, para la regla práctica o la advertencia. Se importa arriba: `import Callout from '../../components/Callout.astro'`.
- [ ] **Enlaces internos** con texto descriptivo ("el [diagnóstico inicial](/#proceso)"), nunca "haz clic aquí".
- [ ] **Cierre con siguiente paso**: último párrafo con un enlace a `/#proceso` o `/#contacto`.

## 4. Lo que no se hace

- Cifras, estadísticas o porcentajes sin fuente. "Los estudios dicen" no es una fuente.
- Citas de leyes o artículos normativos de memoria. Si el post lo necesita, el usuario aporta la referencia.
- Nombres de clientes, resultados de clientes o datos de la consola de UniSync presentados como reales (la consola del sitio es ilustrativa).
- Keyword stuffing, sinónimos en cadena, párrafos de relleno para llegar a la cuenta de palabras.
- Promesas sobre lo que hará un motor de respuesta ("garantizamos que ChatGPT te cite").
- Texto en inglés en un post en español (salvo nombres propios y términos técnicos sin traducción asentada: AEO, SaaS, MVP, AutoPilot).

## 5. Diseño

- No hay nada que decidir: el layout, la tipografía (Schibsted Grotesk / Source Serif 4 / IBM Plex Mono), los colores y los componentes vienen del sistema. No se añaden estilos inline, clases nuevas ni librerías.
- Elementos con estilo ya definido en `.nd-prose`: `h2`, `h3`, `h4`, `p`, `ul`/`ol`, `a`, `strong`, `code`, `pre`, `blockquote`, `table`, `figure` + `figcaption`, `hr`, `<Callout>`.
- Imágenes: `public/assets/img/blog/<slug>-<n>.webp` (≤ 200 KB, ancho 1400 px) dentro de `<figure>` con `<figcaption>` y `alt` descriptivo. Sin imágenes decorativas.
- Código: bloque ```` ``` ```` con lenguaje. Sin capturas de pantalla de código.

## 6. Comprobar antes del PR

```bash
npm run build          # astro check + astro build + scripts/verify-ssr.mjs
```

`verify-ssr` comprueba por post: 1 `<h1>`, ≥ 4 `<h2>`, canonical, ≥ 1 `<table>`, ≥ 3 FAQ, `og:type=article`, JSON-LD con `BlogPosting` + `BreadcrumbList` + `FAQPage`, y 1100–2000 palabras de prosa. Si falla, el mensaje dice qué.

Luego, con `npm run preview`:

- [ ] `/blog/<slug>/` se ve bien a 1440 px y a 390 px (tabla con scroll horizontal si hace falta, TOC arriba en móvil).
- [ ] `curl -s http://localhost:4321/blog/<slug>/ | grep -c "<h2"` devuelve tus H2 (el contenido está en el HTML servido).
- [ ] `/rss.xml` y `/llms.txt` listan el post.
- [ ] Pega el JSON-LD en validator.schema.org: 0 errores.

## 7. Después de publicar

- Pregunta a los cuatro motores la pregunta del título a las 2 y a las 6 semanas; anota si citan el post y qué fragmento.
- Si cambias el contenido, actualiza `updatedAt`. Si cambia un dato del sitio (plazo, precio, correo), búscalo en todos los posts: `grep -rn "4–8 semanas" src/content/blog`.
- Un post que deja de ser cierto se corrige o se borra; no se deja "por el tráfico".

## Plantilla mínima

```mdx
---
title: '¿…?'
description: '…'
slug: …
publishedAt: 2026-01-01
updatedAt: 2026-01-01
author: Kenny Reyes
tags: ['…']
faq:
  - q: '¿…?'
    a: '…'
  - q: '¿…?'
    a: '…'
  - q: '¿…?'
    a: '…'
---

import Callout from '../../components/Callout.astro'

## ¿Qué es …?

**… es …** (definición en una frase, luego 2–3 frases de contexto).

## ¿Cómo funciona …?

**Respuesta directa.** Desarrollo.

| Concepto | Columna A | Columna B |
| --- | --- | --- |
| … | … | … |

<Callout label="En la práctica">…</Callout>

## ¿Cuándo conviene …?

…

## ¿Por dónde empezar?

… enlace a [cómo trabajamos](/#proceso).
```
