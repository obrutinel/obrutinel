import { absoluteUrl, SITE_NAME } from '~/utils/site'

interface PageSeo {
  title: string
  description: string
  /** Chemin canonique — par défaut la route courante. */
  path?: string
  ogType?: 'website' | 'article' | 'product'
}

/** Title, description, canonical et Open Graph/Twitter en un appel. */
export function usePageSeo(seo: PageSeo) {
  const route = useRoute()
  const url = absoluteUrl(seo.path ?? route.path)

  useSeoMeta({
    title: seo.title,
    description: seo.description,
    ogTitle: `${seo.title} · ${SITE_NAME}`,
    ogDescription: seo.description,
    ogType: (seo.ogType ?? 'website') as 'website',
    ogUrl: url,
    ogSiteName: SITE_NAME,
    ogLocale: 'fr_FR',
    twitterCard: 'summary',
  })

  useHead({
    link: [{ rel: 'canonical', href: url }],
  })
}

/** Injecte un ou plusieurs blocs JSON-LD schema.org dans le <head>. */
export function useJsonLd(data: object | object[]) {
  const blocks = Array.isArray(data) ? data : [data]
  useHead({
    script: blocks.map(block => ({
      type: 'application/ld+json',
      innerHTML: JSON.stringify(block),
    })),
  })
}
