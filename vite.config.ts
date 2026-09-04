import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import { onRequestPost } from './functions/api/mailerlite'

const entry = (p: string) => fileURLToPath(new URL(p, import.meta.url))

/* Dev-only: run the Cloudflare Pages Function (functions/api/mailerlite.ts)
   inside `vite` so the contact form works locally without a second server.
   Secrets come from .env (MAILERLITE_API_KEY, MAILERLITE_GROUP_ID) and never
   reach the client bundle. In production Cloudflare serves the same handler. */
function mailerliteDev(): Plugin {
  return {
    name: 'nd-mailerlite-dev',
    apply: 'serve',
    configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), '')
      server.middlewares.use('/api/mailerlite', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end()
          return
        }
        const chunks: Buffer[] = []
        for await (const chunk of req) chunks.push(chunk as Buffer)
        const request = new Request('http://localhost:5173/api/mailerlite', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Origin: 'http://localhost:5173' },
          body: Buffer.concat(chunks),
        })
        const out = await onRequestPost({
          request,
          env: { MAILERLITE_API_KEY: env.MAILERLITE_API_KEY, MAILERLITE_GROUP_ID: env.MAILERLITE_GROUP_ID },
        })
        res.statusCode = out.status
        out.headers.forEach((v, k) => res.setHeader(k, v))
        res.end(await out.text())
      })
    },
  }
}

export default defineConfig({
  plugins: [mailerliteDev()],
  build: {
    rollupOptions: {
      input: {
        main: entry('./index.html'),
        privacidad: entry('./privacidad.html'),
        terminos: entry('./terminos.html'),
      },
    },
  },
})
