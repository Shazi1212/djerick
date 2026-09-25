import Link from 'next/link';
import { Reveal, Stagger, Item } from '@/components/Motion';
import { SERVICES } from '@/lib/content';

/* Ivory interlude: one big photo card (Hochzeit) beside three quiet text cards. */
export default function Services() {
  const [wedding, ...rest] = SERVICES;
  return (
    <section className="section on-ivory">
      <div className="wrap">
        <Reveal>
          <div className="row align-items-end g-4" style={{ marginBottom: 'var(--lg)' }}>
            <div className="col-lg-7">
              <div className="kicker">Leistungen</div>
              <h2>Jeder Anlass hat seinen <em>eigenen Sound.</em></h2>
            </div>
            <div className="col-lg-5">
              <p className="lead">
                Sie suchen einen DJ für Ihre Hochzeit, planen ein Firmenevent oder möchten Ihren Geburtstag oder
                Silvester feiern? Dann kontaktieren Sie mich – ich erstelle Ihnen ein kostenfreies und unverbindliches
                Angebot, gerne auch persönlich.
              </p>
            </div>
          </div>
        </Reveal>
        <Stagger className="row g-4">
          <Item className="col-lg-6">
            <Link href={`/leistungen#${wedding.slug}`} className="photo-card d-block h-100" style={{ minHeight: 460 }}>
              <img src={`/img/${wedding.image}.jpg`} alt={wedding.imageAlt} loading="lazy" />
              <div className="photo-card-body">
                <div className="kicker" style={{ color: 'var(--gold)' }}>{wedding.kicker}</div>
                <h3 style={{ color: '#fff', fontSize: 34 }}>{wedding.title}</h3>
                <p style={{ margin: '8px 0 0', opacity: .9 }}>{wedding.short}</p>
              </div>
            </Link>
          </Item>
          <div className="col-lg-6">
            <div className="row g-4 h-100">
              {rest.map((s) => (
                <Item className="col-md-6" key={s.slug}>
                  <Link href={`/leistungen#${s.slug}`} className="card-ivory d-block" style={{ color: 'inherit' }}>
                    <div className="icon-badge"><i className={`bi ${s.icon}`} /></div>
                    <h3 style={{ fontSize: 24 }}>{s.title}</h3>
                    <p className="muted" style={{ fontSize: 15, marginTop: 8 }}>{s.short}</p>
                    <span style={{ color: 'var(--magenta-deep)', fontWeight: 700, fontSize: 14 }}>Mehr erfahren <i className="bi bi-arrow-right" /></span>
                  </Link>
                </Item>
              ))}
              <Item className="col-md-6">
                <div className="card-ivory d-flex flex-column justify-content-between" style={{ background: 'var(--ink)', color: 'var(--cream)', borderColor: 'var(--ink)' }}>
                  <div>
                    <div className="kicker" style={{ color: 'var(--gold)' }}>Feste Pauschalpreise</div>
                    <p style={{ fontSize: 15, color: 'var(--muted)' }}>
                      Jede Veranstaltung ist einzigartig. Nach einem Kennenlerngespräch erhalten Sie ein auf Ihre
                      Feier abgestimmtes Angebot – kostenfrei und unverbindlich.
                    </p>
                  </div>
                  <Link href="/kontakt" className="btn-magenta btn-sm align-self-start"><i className="bi bi-send-fill" />Angebot anfragen</Link>
                </div>
              </Item>
            </div>
          </div>
        </Stagger>
      </div>
    </section>
  );
}
