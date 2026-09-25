import { BIZ } from '@/lib/content';

export default function robots() {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: BIZ.url + '/sitemap.xml' };
}
