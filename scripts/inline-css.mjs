// Post-build: inline the main stylesheet into index.html and drop the
// render-blocking <link>. The CSS is small (~6KB gzipped) and inlining it lets
// the page paint immediately with no external, render-blocking request.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const dist = resolve(process.cwd(), 'dist')
const htmlPath = resolve(dist, 'index.html')
let html = readFileSync(htmlPath, 'utf8')

const linkRe = /<link[^>]*rel="stylesheet"[^>]*href="([^"]+\.css)"[^>]*>/g
let changed = false

html = html.replace(linkRe, (tag, href) => {
  const cssPath = resolve(dist, href.replace(/^\//, ''))
  if (!existsSync(cssPath)) return tag
  const css = readFileSync(cssPath, 'utf8')
  changed = true
  console.log(`[inline-css] inlined ${href} (${(css.length / 1024).toFixed(1)} KB)`)
  return `<style>${css}</style>`
})

if (changed) writeFileSync(htmlPath, html)
else console.log('[inline-css] no stylesheet link found (nothing to inline)')
