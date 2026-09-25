import { BIZ } from '@/lib/content';
import { getPosts } from '@/lib/blog';

export default function sitemap() {
  const now = new Date();
  const pages = ['', '/leistungen', '/ueber-mich', '/musik', '/technik', '/referenzen', '/faq', '/kontakt', '/blog'].map((p) => ({
    url: BIZ.url + p,
    lastModified: now,
    changeFrequency: p === '/blog' ? 'weekly' : 'monthly',
    priority: p === '' ? 1 : 0.7,
  }));
  const posts = getPosts().map((p) => ({
    url: `${BIZ.url}/blog/${p.slug}`,
    lastModified: new Date(p.updated || p.date),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));
  return [...pages, ...posts];
}
