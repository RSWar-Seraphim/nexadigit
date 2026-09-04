// Post-build gate: every page must be complete in the served HTML (no JS
// needed), with the SEO/AEO surface an answer engine reads. Fails the build.
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const dist = resolve(process.cwd(), 'dist')
const SITE = 'https://nexadigit.io'
const failures = []
const ok = (cond, msg) => {
  if (!cond) failures.push(msg)
}

const count = (html, re) => (html.match(re) || []).length
const i18nKeys = (file) => {
  const src = readFileSync(resolve('src/components/i18n', file), 'utf8')
  const out = {}
  for (const m of src.matchAll(/^\s{2}([a-z0-9_]+):\s*'((?:\\'|[^'])*)',?$/gm)) out[m[1]] = m[2].replace(/\\'/g, "'")
  return out
}
const ES = i18nKeys('es.ts')
const EN = i18nKeys('en.ts')

const PAGES = [
  { file: 'index.html', lang: 'es', path: '/', h1: 1, minH2: 6, faq: ES, types: ['Organization', 'WebSite', 'WebPage', 'FAQPage', 'SoftwareApplication'] },
  { file: 'en/index.html', lang: 'en', path: '/en/', h1: 1, minH2: 6, faq: EN, types: ['Organization', 'WebSite', 'WebPage', 'FAQPage', 'SoftwareApplication'] },
  { file: 'privacidad/index.html', lang: 'es', path: '/privacidad/', h1: 1, minH2: 7, types: ['Organization', 'WebSite', 'WebPage', 'BreadcrumbList'] },
  { file: 'terminos/index.html', lang: 'es', path: '/terminos/', h1: 1, minH2: 8, types: ['Organization', 'WebSite', 'WebPage', 'BreadcrumbList'] },
  { file: 'en/privacy/index.html', lang: 'en', path: '/en/privacy/', h1: 1, minH2: 7, types: ['Organization', 'WebSite', 'WebPage', 'BreadcrumbList'] },
  { file: 'en/terms/index.html', lang: 'en', path: '/en/terms/', h1: 1, minH2: 8, types: ['Organization', 'WebSite', 'WebPage', 'BreadcrumbList'] },
]

for (const p of PAGES) {
  const file = resolve(dist, p.file)
  if (!existsSync(file)) {
    failures.push(`${p.file}: missing`)
    continue
  }
  const html = readFileSync(file, 'utf8')
  const tag = `[${p.file}]`

  ok(html.includes(`<html lang="${p.lang}"`), `${tag} <html lang="${p.lang}"> missing`)
  ok(count(html, /<h1[\s>]/g) === p.h1, `${tag} expected ${p.h1} <h1>, found ${count(html, /<h1[\s>]/g)}`)
  ok(count(html, /<h2[\s>]/g) >= p.minH2, `${tag} expected ≥${p.minH2} <h2>, found ${count(html, /<h2[\s>]/g)}`)
  ok(html.includes(`<link rel="canonical" href="${SITE}${p.path}"`), `${tag} canonical must be ${SITE}${p.path}`)
  ok(count(html, /<link rel="alternate" hreflang="/g) === 3, `${tag} expected 3 <link hreflang> (es, en, x-default)`)
  ok(html.includes('property="og:image"'), `${tag} og:image missing`)
  ok(!/<link[^>]+rel="stylesheet"/.test(html), `${tag} external stylesheet found (should be inlined)`)

  const ld = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
  ok(ld, `${tag} JSON-LD missing`)
  if (ld) {
    try {
      const graph = JSON.parse(ld[1])['@graph'].map((n) => n['@type'])
      for (const type of p.types) ok(graph.includes(type), `${tag} JSON-LD lacks ${type}`)
    } catch (e) {
      failures.push(`${tag} JSON-LD does not parse: ${e.message}`)
    }
  }

  if (p.faq) {
    for (let i = 1; i <= 6; i++) {
      const q = p.faq[`faq_${i}_q`]
      ok(q && html.includes(q), `${tag} FAQ question ${i} not in served HTML`)
    }
    ok(count(html, /<section id="/g) >= 7, `${tag} expected the 7 sections in served HTML`)
    ok(html.includes('id="contact-form"'), `${tag} contact form not in served HTML`)
  }
}

for (const f of ['robots.txt', 'llms.txt', 'sitemap-index.xml', 'sitemap-0.xml', '_redirects', '_headers']) {
  ok(existsSync(resolve(dist, f)), `dist/${f} missing`)
}
if (existsSync(resolve(dist, 'sitemap-0.xml'))) {
  const sm = readFileSync(resolve(dist, 'sitemap-0.xml'), 'utf8')
  for (const path of ['/', '/en/', '/privacidad/', '/terminos/', '/en/privacy/', '/en/terms/']) {
    ok(sm.includes(`<loc>${SITE}${path}</loc>`), `sitemap lacks ${path}`)
  }
  ok(sm.includes('hreflang="en-US"'), 'sitemap lacks hreflang alternates for /en/')
}
if (existsSync(resolve(dist, 'robots.txt'))) {
  const robots = readFileSync(resolve(dist, 'robots.txt'), 'utf8')
  for (const bot of ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'Google-Extended', 'PerplexityBot']) {
    ok(robots.includes(`User-agent: ${bot}`), `robots.txt lacks ${bot}`)
  }
  ok(robots.includes(`Sitemap: ${SITE}/sitemap-index.xml`), 'robots.txt lacks Sitemap line')
}

if (failures.length) {
  console.error(`\n[verify-ssr] ${failures.length} problem(s):`)
  for (const f of failures) console.error('  ✗ ' + f)
  process.exit(1)
}
console.log(`[verify-ssr] ok — ${PAGES.length} pages complete in served HTML, crawl files present`)
