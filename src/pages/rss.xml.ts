// /rss.xml — the blog feed. Summaries only (MDX components can't be rendered
// to plain HTML here); each item links to the full post.
import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { tr } from '../components/i18n'
import { postUrl, sortPosts } from '../blog/utils'

export const GET: APIRoute = async (context) => {
  const t = tr('es')
  const posts = sortPosts(await getCollection('blog'))
  return rss({
    title: 'NexaDigit — Blog',
    description: t('blog_meta_description'),
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: postUrl(post.id),
      categories: post.data.tags,
      author: post.data.author,
    })),
    customData: '<language>es-do</language>',
  })
}
