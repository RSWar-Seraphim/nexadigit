// Blog helpers shared by the index, tag, post, RSS and llms.txt routes.
import type { CollectionEntry } from 'astro:content'

export type Post = CollectionEntry<'blog'>

export const BLOG_URL = '/blog/'
export const postUrl = (id: string): string => `${BLOG_URL}${id}/`
export const tagUrl = (tag: string): string => `${BLOG_URL}tag/${slugify(tag)}/`

export function slugify(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Newest first; drafts out. */
export function sortPosts(posts: Post[]): Post[] {
  return posts
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime())
}

/** Minutes to read: frontmatter override, else ≈200 words per minute. */
export function readingMinutes(post: Post): number {
  if (post.data.readingTime) return post.data.readingTime
  const words = (post.body ?? '').replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

export function wordCount(post: Post): number {
  return (post.body ?? '').replace(/<[^>]+>/g, ' ').trim().split(/\s+/).length
}

export function formatDate(d: Date, lang: 'es' | 'en' = 'es'): string {
  return new Intl.DateTimeFormat(lang === 'es' ? 'es-DO' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(d)
}

export const isoDate = (d: Date): string => d.toISOString().slice(0, 10)

/** Up to `n` other posts sharing the most tags; newest fill the rest. */
export function relatedPosts(post: Post, all: Post[], n = 3): Post[] {
  const mine = new Set(post.data.tags)
  return sortPosts(all)
    .filter((p) => p.id !== post.id)
    .map((p) => ({ p, score: p.data.tags.filter((t) => mine.has(t)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map(({ p }) => p)
}

/** Distinct tags across published posts, most used first. */
export function allTags(posts: Post[]): string[] {
  const count = new Map<string, number>()
  for (const p of sortPosts(posts)) for (const t of p.data.tags) count.set(t, (count.get(t) ?? 0) + 1)
  return [...count.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([t]) => t)
}
