// /robots.txt — generated at build so the Sitemap URL always matches `site`.
import type { APIRoute } from 'astro'

const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'Google-Extended',
  'PerplexityBot',
]

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site)
  const lines = [
    '# nexadigit.io — crawl policy',
    '# Search engines and answer engines are welcome everywhere. Nothing on this',
    '# site is private; /api/ is a POST-only form endpoint, not a page.',
    '',
    'User-agent: *',
    'Allow: /',
    '',
    '# Answer-engine / AI crawlers — explicitly allowed (a group with no rule for a',
    '# bot falls back to "*", but we spell them out so intent is unambiguous).',
    ...AI_CRAWLERS.flatMap((bot) => [`User-agent: ${bot}`, 'Allow: /', '']),
    `Sitemap: ${sitemap.href}`,
    '',
  ]
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
