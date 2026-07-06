// functions/api/mailerlite.ts — Cloudflare Pages Function · POST /api/mailerlite
// Creates a MailerLite subscriber from the "Solicitar propuesta" form. Runs on
// the Cloudflare Workers runtime (NOT the Vercel handler in ../api). Secrets are
// read from the Pages project env vars: MAILERLITE_API_KEY, MAILERLITE_GROUP_ID.
// Typed dependency-free so the local `tsc` (scoped to src/) never sees it.

interface Env {
  MAILERLITE_API_KEY: string
  MAILERLITE_GROUP_ID: string
}

const ALLOWED_ORIGINS = [
  'https://nexadigit.io',
  'https://www.nexadigit.io',
  'http://localhost:5173',
]

function corsHeaders(origin: string): Record<string, string> {
  const h: Record<string, string> = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
  if (ALLOWED_ORIGINS.includes(origin)) h['Access-Control-Allow-Origin'] = origin
  return h
}

export async function onRequestOptions(context: { request: Request }): Promise<Response> {
  const origin = context.request.headers.get('Origin') || ''
  return new Response(null, { status: 204, headers: corsHeaders(origin) })
}

export async function onRequestPost(context: {
  request: Request
  env: Env
}): Promise<Response> {
  const { request, env } = context
  const origin = request.headers.get('Origin') || ''
  const headers = { 'Content-Type': 'application/json', ...corsHeaders(origin) }

  let body: { firstName?: string; lastName?: string; email?: string; message?: string }
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_json' }), { status: 400, headers })
  }

  const { firstName = '', lastName = '', email = '', message = '' } = body

  try {
    const resp = await fetch(
      `https://api.mailerlite.com/api/v2/groups/${env.MAILERLITE_GROUP_ID}/subscribers`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-MailerLite-ApiKey': env.MAILERLITE_API_KEY,
        },
        body: JSON.stringify({
          email,
          name: `${firstName} ${lastName}`.trim(),
          fields: { first_name: firstName, last_name: lastName, message },
        }),
      }
    )

    const data: any = await resp.json().catch(() => ({}))
    if (!resp.ok) {
      return new Response(
        JSON.stringify({ error: data?.error?.message || 'Failed to subscribe' }),
        { status: 400, headers }
      )
    }
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers })
  } catch {
    return new Response(JSON.stringify({ error: 'internal_server_error' }), { status: 500, headers })
  }
}
