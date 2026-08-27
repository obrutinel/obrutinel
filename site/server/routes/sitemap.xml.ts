import { bikes } from '../../app/data/bikes'
import { sellers } from '../../app/data/sellers'
import { universes } from '../../app/data/universes'

const SITE_URL = 'https://www.recyclette.fr'

export default defineEventHandler((event) => {
  const staticPaths = ['/', '/vendre', '/pro', '/comment-ca-marche', '/a-propos']

  const urls = [
    ...staticPaths.map(p => ({ loc: p, priority: p === '/' ? '1.0' : '0.7' })),
    ...universes.map(u => ({ loc: `/velos/${u.slug}`, priority: '0.9' })),
    ...bikes.map(b => ({ loc: `/annonce/${b.slug}`, priority: '0.8' })),
    ...sellers.map(s => ({ loc: `/vendeur/${s.slug}`, priority: '0.5' })),
  ]

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(u => `  <url><loc>${SITE_URL}${u.loc === '/' ? '' : u.loc}</loc><priority>${u.priority}</priority></url>`)
  .join('\n')}
</urlset>`

  setHeader(event, 'content-type', 'application/xml')
  return body
})
