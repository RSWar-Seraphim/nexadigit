// ══════════════════════════════════════════════════════════════════════════════
// CONTENT COLLECTIONS — the blog. One MDX file per post in src/content/blog/.
// The frontmatter is typed here; a post that doesn't satisfy it fails the build.
// `slug` is the filename (Astro derives the id from it) — keep them identical.
// ══════════════════════════════════════════════════════════════════════════════
import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().min(20).max(110),
    // Written as the direct answer to the title — it is the meta description,
    // the card teaser and the RSS summary.
    description: z.string().min(80).max(200),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string().default('Kenny Reyes'),
    tags: z.array(z.string().min(2)).min(1).max(5),
    // Rendered at the end of the post AND emitted as FAQPage JSON-LD.
    faq: z
      .array(z.object({ q: z.string().min(8), a: z.string().min(40).max(600) }))
      .min(3)
      .max(5),
    // Minutes. Optional: computed from the body (≈200 wpm) when omitted.
    readingTime: z.number().int().positive().optional(),
    draft: z.boolean().default(false),
  }),
})

export const collections = { blog }
