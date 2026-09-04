// @ts-check
import { existsSync, readFileSync } from 'node:fs'
import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import { onRequestPost } from './functions/api/mailerlite'

/* ── Dev-only: run the Cloudflare Pages Function in-process ─────────────────
   `astro dev` has no Pages runtime, so POST /api/mailerlite is served by the
   same handler that Cloudflare runs in production (functions/api/mailerlite.ts).
   Secrets are read from .env here and never reach the client bundle. */
function readDotEnv() {
  const out = { MAILERLITE_API_KEY: '', MAILERLITE_GROUP_ID: '' }
  if (!existsSync('.env')) return out
  for (const line of readFileSync('.env', 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*?)\s*$/)
    if (m && m[1] in out) out[/** @type {keyof typeof out} */ (m[1])] = m[2].replace(/^["']|["']$/g, '')
  }
  return out
}

/* ── Sitemap <lastmod> for blog posts ───────────────────────────────────────
   Read from the post's frontmatter (updatedAt, else publishedAt) so the date in
   the sitemap is the one the page shows. Other pages carry no lastmod: a wrong
   date is worse than none. */
function postLastmod(url) {
  const m = new URL(url).pathname.match(/^\/blog\/([^/]+)\/$/)
  if (!m) return undefined
  const file = `src/content/blog/${m[1]}.mdx`
  if (!existsSync(file)) return undefined
  const fm = readFileSync(file, 'utf8')
  const d = fm.match(/^updatedAt:\s*(\S+)/m) ?? fm.match(/^publishedAt:\s*(\S+)/m)
  return d ? new Date(d[1]).toISOString() : undefined
}

/** @returns {import('vite').Plugin} */
function mailerliteDev() {
  return {
    name: 'nd-mailerlite-dev',
    apply: 'serve',
    configureServer(server) {
      const env = readDotEnv()
      server.middlewares.use('/api/mailerlite', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end()
          return
        }
        /** @type {Buffer[]} */
        const chunks = []
        for await (const chunk of req) chunks.push(/** @type {Buffer} */ (chunk))
        const request = new Request('http://localhost:4321/api/mailerlite', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Origin: 'http://localhost:4321' },
          body: Buffer.concat(chunks),
        })
        const out = await onRequestPost({ request, env })
        res.statusCode = out.status
        out.headers.forEach((v, k) => res.setHeader(k, v))
        res.end(await out.text())
      })
    },
  }
}

export default defineConfig({
  site: 'https://nexadigit.io',
  output: 'static',
  trailingSlash: 'always',
  // Keep whitespace exactly as authored: sections are template-literal HTML
  // injected with set:html and the layout is tuned to it.
  compressHTML: false,
  build: {
    format: 'directory',
    // One inline <style> per page: no render-blocking stylesheet request.
    inlineStylesheets: 'always',
  },
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    mdx(),
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es-DO', en: 'en-US' } },
      changefreq: 'weekly',
      // Paginated index pages (/blog/2/…) are navigation, not content.
      filter: (page) => !/\/blog\/\d+\/$/.test(page),
      serialize: (item) => {
        const lastmod = postLastmod(item.url)
        return lastmod ? { ...item, lastmod } : item
      },
    }),
  ],
  vite: { plugins: [mailerliteDev()] },
})
