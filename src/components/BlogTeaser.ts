// ══════════════════════════════════════════════════════════════════════════════
// BLOG (landing teaser) — the three most recent posts as the same cards the
// blog index uses (.nd-post-card), under the section head, plus a link to
// /blog/. Posts arrive as plain fields (HomePage.astro reads the content
// collection at build time) so this module stays pure markup like the others.
// The blog is Spanish-only: on the English landing the cards carry lang="es"
// and the eyebrow says so.
// ══════════════════════════════════════════════════════════════════════════════
import { tr, type Lang } from './i18n'
import { BLOG_URL } from '../blog/utils'

export interface TeaserPost {
  url: string
  title: string
  description: string
  /** Display date, already formatted for `lang`. */
  date: string
  dateIso: string
  minutes: number
  tags: string[]
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function blogTeaserMarkup(lang: Lang, posts: TeaserPost[]): string {
  const t = tr(lang)
  const minRead = (n: number) => t('blog_min_read').replace('{n}', String(n))
  const postLang = lang === 'es' ? '' : ' lang="es"'

  const card = (p: TeaserPost) => `
          <article class="nd-post-card"${postLang}>
            <a href="${p.url}">
              <div class="nd-post-card__meta">
                <time datetime="${p.dateIso}">${p.date}</time>
                <span aria-hidden="true">·</span>
                <span>${minRead(p.minutes)}</span>
              </div>
              <h3>${esc(p.title)}</h3>
              <p>${esc(p.description)}</p>
              <span class="nd-post-card__tags">${p.tags.map((tg) => `<span class="nd-chip">${esc(tg)}</span>`).join('')}</span>
              <span class="nd-visit">${t('blog_read')} →</span>
            </a>
          </article>`

  return `
    <section id="blog" data-screen-label="Blog" style="border-bottom:1px solid var(--line);">
      <div class="nd-wrap" style="padding:104px clamp(20px,5vw,40px) 112px;border-left:1px solid var(--line);border-right:1px solid var(--line);">
        <div class="reveal nd-eyebrow" style="margin-bottom:20px;">${t('home_blog_eyebrow')}</div>
        <div class="nd-head2" style="display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:end;margin-bottom:56px;">
          <h2 class="reveal nd-h2" style="--reveal-delay:80ms;">${t('blog_title')}</h2>
          <p class="reveal" style="--reveal-delay:140ms;margin:0;font-family:var(--font-serif);font-size:18px;line-height:1.65;color:var(--slate);">${t('blog_lede')}</p>
        </div>
        <!-- .reveal sits on the grid, not the cards: .reveal.revealed pins
             transform:none and would cancel the card's hover lift. -->
        <div class="reveal nd-post-grid" style="--reveal-delay:120ms;">${posts.map(card).join('')}
        </div>
        <div class="reveal" style="--reveal-delay:200ms;margin-top:44px;display:flex;justify-content:flex-end;">
          <a href="${BLOG_URL}" class="nd-btn-ghost">${t('home_blog_all')}</a>
        </div>
      </div>
    </section>
  `
}
