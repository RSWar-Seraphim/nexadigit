// ══════════════════════════════════════════════════════════════════════════════
// STRUCTURED DATA — one JSON-LD @graph per page, built at build time from the
// same data the visible markup uses (i18n keys, FAQ_ITEMS, DOCS), so schema and
// page can't drift. Only verifiable properties; nothing invented.
// ══════════════════════════════════════════════════════════════════════════════
import { tr, type Lang } from '../components/i18n'
import { ROUTES, SITE } from '../components/i18n/routes'
import { FAQ_ITEMS } from '../components/Faq'
import { CONTACT_EMAIL } from '../components/Contact'
import { SOCIALS } from '../components/Header'
import { DOCS, type Doc } from '../legal/legal'

const ORG_ID = `${SITE}/#org`
const WEBSITE_ID = `${SITE}/#website`
const OG_IMAGE = `${SITE}/assets/img/og-cover.jpg`

const AREA: Record<Lang, string[]> = {
  es: ['República Dominicana', 'Estados Unidos', 'Canadá', 'Latinoamérica'],
  en: ['Dominican Republic', 'United States', 'Canada', 'Latin America'],
}

function organization(lang: Lang) {
  const t = tr(lang)
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'NexaDigit',
    url: `${SITE}/`,
    email: CONTACT_EMAIL,
    foundingDate: '2023',
    logo: { '@type': 'ImageObject', url: `${SITE}/assets/img/nexadigit-mark.webp` },
    description: t('meta_description'),
    address: { '@type': 'PostalAddress', addressLocality: 'Santo Domingo', addressCountry: 'DO' },
    areaServed: AREA[lang],
    sameAs: SOCIALS.map((s) => s.url),
  }
}

const website = () => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE}/`,
  name: 'NexaDigit',
  inLanguage: ['es', 'en'],
  publisher: { '@id': ORG_ID },
})

function webPage(url: string, lang: Lang, name: string, description: string) {
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: lang,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    primaryImageOfPage: { '@type': 'ImageObject', url: OG_IMAGE, width: 1200, height: 630 },
  }
}

function softwareApp(name: string, description: string, url: string, lang: Lang) {
  return {
    '@type': 'SoftwareApplication',
    '@id': `${url}#${name.toLowerCase()}`,
    name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description,
    url,
    inLanguage: lang,
    creator: { '@id': ORG_ID },
  }
}

export function homeGraph(lang: Lang) {
  const t = tr(lang)
  const url = SITE + ROUTES.home[lang]
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization(lang),
      website(),
      webPage(url, lang, t('meta_title'), t('meta_description')),
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        inLanguage: lang,
        mainEntity: FAQ_ITEMS.map((it) => ({
          '@type': 'Question',
          name: t(it.q),
          acceptedAnswer: { '@type': 'Answer', text: t(it.a) },
        })),
      },
      softwareApp('UniSync', t('catalog_lede'), `${url}#unisync`, lang),
      softwareApp('VIGIA', t('vigia_desc'), `${url}#produccion`, lang),
    ],
  }
}

export function legalGraph(doc: Doc, lang: Lang) {
  const url = SITE + ROUTES[doc][lang]
  const c = DOCS[doc][lang]
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization(lang),
      website(),
      webPage(url, lang, c.metaTitle, c.metaDescription),
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: lang === 'es' ? 'Inicio' : 'Home', item: SITE + ROUTES.home[lang] },
          { '@type': 'ListItem', position: 2, name: c.title, item: url },
        ],
      },
    ],
  }
}
