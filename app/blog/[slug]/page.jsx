import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Reveal } from '@/components/Motion';
import { getPost, getPosts, renderPost } from '@/lib/blog';
import { BIZ } from '@/lib/content';

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: 'article', title: post.title, description: post.description, images: [{ url: `/img/${post.image}.jpg` }], publishedTime: post.date },
  };
}

const fmt = (d) => new Date(d + 'T12:00:00').toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' });

export default async function Page({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const html = renderPost(post);
  const others = getPosts().filter((p) => p.slug !== slug).slice(0, 3);
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    image: BIZ.url + `/img/${post.image}.jpg`,
    author: { '@type': 'Person', name: BIZ.owner, url: BIZ.url + '/ueber-mich' },
    publisher: { '@type': 'Organization', name: BIZ.fullName, logo: { '@type': 'ImageObject', url: BIZ.url + '/icon.png' } },
    mainEntityOfPage: BIZ.url + `/blog/${post.slug}`,
  };
  return (
    <>
      <section className="page-head with-image">
        <div className="page-head-media" aria-hidden="true"><img src={`/img/${post.image}.jpg`} alt="" /></div>
        <div className="wrap wrap-narrow">
          <Reveal>
            <div className="kicker">{post.category || 'Ratgeber'} · {fmt(post.date)} · {post.readMinutes} Min.</div>
            <h1 style={{ fontSize: 'clamp(34px, 5vw, 64px)' }}>{post.title}</h1>
            <p className="lead" style={{ marginTop: 'var(--md)', maxWidth: 720 }}>{post.description}</p>
          </Reveal>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 'var(--lg)' }}>
        <div className="wrap wrap-narrow">
          <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />
          <div className="contact-card" style={{ marginTop: 'var(--xl)' }}>
            <div className="kicker">Kostenfreies Angebot</div>
            <h3>Sie planen eine Feier in Gießen, Marburg, Frankfurt oder Umgebung?</h3>
            <p className="muted" style={{ marginTop: 'var(--sm)' }}>
              Ich berate Sie gerne persönlich und erstelle Ihnen ein unverbindliches Angebot, das sich nach Ihren
              Wünschen richtet.
            </p>
            <div style={{ display: 'flex', gap: 'var(--sm)', flexWrap: 'wrap' }}>
              <Link href="/kontakt" className="btn-magenta"><i className="bi bi-send-fill" />Unverbindlich anfragen</Link>
              <a href={BIZ.phoneHref} className="btn-ghost"><i className="bi bi-telephone-fill" />{BIZ.phone}</a>
            </div>
          </div>
          {others.length > 0 && (
            <div style={{ marginTop: 'var(--xl)' }}>
              <div className="kicker">Weiterlesen</div>
              <ul className="check-list">
                {others.map((p) => (
                  <li key={p.slug}><i className="bi bi-arrow-right-circle" /><Link href={`/blog/${p.slug}`}>{p.title}</Link></li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </>
  );
}
