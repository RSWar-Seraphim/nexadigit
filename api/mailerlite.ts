// api/mailerlite.ts — Vercel Function · POST /api/mailerlite
// nexadigit.io is served by Vercel (Cloudflare only proxies DNS), so THIS is the
// handler that runs in production. It adapts Node's (req, res) to the Web
// Request/Response handler in ../functions/api/mailerlite.ts, so Vercel,
// Cloudflare Pages and `astro dev` share one implementation. Secrets come from
// the Vercel project env vars: MAILERLITE_API_KEY, MAILERLITE_GROUP_ID.
import type { IncomingMessage, ServerResponse } from 'node:http'
import { onRequestOptions, onRequestPost } from '../functions/api/mailerlite'

type Req = IncomingMessage & { body?: unknown }

/* Vercel pre-parses JSON bodies into req.body; fall back to the raw stream. */
async function rawBody(req: Req): Promise<string> {
  if (req.body !== undefined && req.body !== null) {
    return typeof req.body === 'string' ? req.body : JSON.stringify(req.body)
  }
  const chunks: Buffer[] = []
  for await (const chunk of req) chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  return Buffer.concat(chunks).toString('utf8')
}

export default async function handler(req: Req, res: ServerResponse): Promise<void> {
  const method = req.method ?? 'GET'
  const headers = new Headers()
  for (const [key, value] of Object.entries(req.headers)) {
    if (typeof value === 'string') headers.set(key, value)
    else if (Array.isArray(value)) headers.set(key, value.join(', '))
  }
  const request = new Request(`https://${req.headers.host ?? 'nexadigit.io'}/api/mailerlite`, {
    method,
    headers,
    body: method === 'POST' ? await rawBody(req) : undefined,
  })
  const env = {
    MAILERLITE_API_KEY: process.env.MAILERLITE_API_KEY ?? '',
    MAILERLITE_GROUP_ID: process.env.MAILERLITE_GROUP_ID ?? '',
  }

  let out: Response
  if (method === 'OPTIONS') out = await onRequestOptions({ request })
  else if (method === 'POST') out = await onRequestPost({ request, env })
  else out = new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } })

  res.statusCode = out.status
  out.headers.forEach((value, key) => res.setHeader(key, value))
  res.end(await out.text())
}
