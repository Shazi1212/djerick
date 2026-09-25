import Link from 'next/link';
import PageHead from '@/components/PageHead';
import { Stagger, Item } from '@/components/Motion';
import { getPosts } from '@/lib/blog';

export const metadata = {
  title: 'Blog – Tipps für Hochzeit, Firmenevent & Party',
  description:
    'Ratgeber von DJ Erick: Musik, Ablauf und Locations für Hochzeiten, Firmenevents und Feiern in Gießen, Marburg, Frankfurt und Hessen.',
};

const fmt = (d) => new Date(d + 'T12:00:00').toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' });

export default function Page() {
  const posts = getPosts();
  return (
    <>
      <PageHead
        kicker="Blog"
        title="Tipps aus <em>über 10 Jahren</em> an den Decks."
        lead="Was ich Paaren, Gastgebern und Unternehmen immer wieder erzähle – jede Woche ein neuer Beitrag zu Musik, Ablauf und Locations in Gießen, Marburg, Frankfurt und Hessen."
        narrow
      />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          {posts.length === 0 && <p className="muted">Der erste Beitrag erscheint in Kürze.</p>}
          <Stagger className="row g-4">
            {posts.map((p) => (
              <Item className="col-md-6 col-lg-4" key={p.slug}>
                <Link href={`/blog/${p.slug}`} className="card-dark d-block" style={{ padding: 0, overflow: 'hidden', color: 'inherit' }}>
                  <div style={{ aspectRatio: '16/10', overflow: 'hidden' }}>
                    <img src={`/img/${p.image}.jpg`} alt={p.imageAlt || p.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: 'var(--md)' }}>
                    <div className="kicker" style={{ marginBottom: 8 }}>{p.category || 'Ratgeber'}</div>
                    <h3 style={{ fontSize: 22 }}>{p.title}</h3>
                    <p className="muted" style={{ fontSize: 15, margin: '10px 0 12px' }}>{p.description}</p>
                    <small className="muted">{fmt(p.date)} · {p.readMinutes} Min. Lesezeit</small>
                  </div>
                </Link>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
