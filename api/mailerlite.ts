// api/mailerlite.ts — Vercel Function · POST /api/mailerlite
// nexadigit.io is served by Vercel (Cloudflare only proxies DNS), so THIS is the
// handler that runs in production. Secrets come from the Vercel project env
// vars: MAILERLITE_API_KEY, MAILERLITE_GROUP_ID.
//
// Deliberately self-contained (no runtime imports): the project is ESM
// ("type": "module") and a relative import from here failed at invocation on
// Vercel (FUNCTION_INVOCATION_FAILED). functions/api/mailerlite.ts is the same
// logic in Web Request/Response form for `astro dev` and Cloudflare Pages —
// keep the two in sync.
import type { IncomingMessage, ServerResponse } from 'node:http'

type VercelReq = IncomingMessage & { body?: unknown }

interface FormBody {
  firstName?: string
  lastName?: string
  email?: string
  message?: string
}

const ALLOWED_ORIGINS = ['https://nexadigit.io', 'https://www.nexadigit.io', 'http://localhost:4321']

function setCors(req: VercelReq, res: ServerResponse): void {
  const origin = typeof req.headers.origin === 'string' ? req.headers.origin : ''
  if (ALLOWED_ORIGINS.includes(origin)) res.setHeader('Access-Control-Allow-Origin', origin)
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

function send(res: ServerResponse, status: number, payload: unknown): void {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

/* Vercel parses JSON bodies into req.body (object); accept a raw string too. */
function parseBody(raw: unknown): FormBody | null {
  if (raw && typeof raw === 'object') return raw as FormBody
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw) as FormBody
    } catch {
      return null
    }
  }
  return null
}

export default async function handler(req: VercelReq, res: ServerResponse): Promise<void> {
  setCors(req, res)
  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }
  if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed' })

  const body = parseBody(req.body)
  if (!body) return send(res, 400, { error: 'invalid_json' })
  const { firstName = '', lastName = '', email = '', message = '' } = body

  try {
    const resp = await fetch(
      `https://api.mailerlite.com/api/v2/groups/${process.env.MAILERLITE_GROUP_ID ?? ''}/subscribers`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-MailerLite-ApiKey': process.env.MAILERLITE_API_KEY ?? '',
        },
        body: JSON.stringify({
          email,
          name: `${firstName} ${lastName}`.trim(),
          fields: { first_name: firstName, last_name: lastName, message },
        }),
      }
    )
    const data: any = await resp.json().catch(() => ({}))
    if (!resp.ok) return send(res, 400, { error: data?.error?.message || 'Failed to subscribe' })
    return send(res, 200, { ok: true })
  } catch {
    return send(res, 500, { error: 'internal_server_error' })
  }
}
