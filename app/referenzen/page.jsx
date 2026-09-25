import PageHead from '@/components/PageHead';
import Gallery from '@/components/Gallery';
import Guestbook from '@/components/Guestbook';
import { Reveal, Stagger, Item } from '@/components/Motion';
import { BIZ, REFERENCES } from '@/lib/content';

export const metadata = {
  title: 'Referenzen & Eindrücke – Firmen, Clubs, Locations',
  description:
    'Deutsche Bank, Mercedes Benz, PwC, Samsung, VILA VITA Marburg, Steigenberger Frankfurter Hof, Changó Latin Palace: Referenzen, Kundenstimmen und Eindrücke von DJ Erick – 4,8 Sterne bei Google.',
};

function List({ kicker, title, items, icon }) {
  return (
    <div className="card-dark">
      <div className="icon-badge"><i className={`bi ${icon}`} /></div>
      <div className="kicker">{kicker}</div>
      <h3 style={{ fontSize: 24, marginBottom: 'var(--sm)' }}>{title}</h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, columns: items.length > 8 ? 2 : 1, columnGap: 24 }}>
        {items.map((n) => (
          <li key={n} style={{ padding: '5px 0', borderBottom: '1px dotted var(--border)', breakInside: 'avoid' }}>{n}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <PageHead
        kicker="Referenzen & Kundenmeinungen"
        title="Begeisterte Kunden und Mundpropaganda sind in meiner Branche das <em>A und O.</em>"
        lead="Eine Aufzählung aller Locations und Events, auf denen ich tätig war, würde den Rahmen sprengen. Hier einige der Firmen, Clubs und Locations, die ich bisher begleiten und zu meinen Kunden zählen durfte."
        image="crowd-lasers"
        imageAlt="Partycrowd unter pinken und blauen Lichtstrahlen"
      />

      <section className="section" style={{ paddingTop: 'var(--lg)' }}>
        <div className="wrap">
          <Stagger className="row g-4">
            <Item className="col-lg-4">
              <List kicker="Firmen" title="Von AXA bis Vero Moda" items={REFERENCES.firmen} icon="bi-building" />
            </Item>
            <Item className="col-lg-4">
              <div className="card-dark">
                <div className="icon-badge"><i className="bi bi-cup-straw" /></div>
                <div className="kicker">Clubs</div>
                <h3 style={{ fontSize: 24, marginBottom: 'var(--sm)' }}>Von Marburg bis Cancún</h3>
                {REFERENCES.clubs.map((c) => (
                  <div key={c.city} style={{ marginBottom: 12 }}>
                    <div style={{ fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--magenta)', fontWeight: 700 }}>{c.city}</div>
                    <div className="muted">{c.names.join(' · ')}</div>
                  </div>
                ))}
              </div>
            </Item>
            <Item className="col-lg-4">
              <List kicker="Locations" title="Vom Hofgut bis zum Frankfurter Hof" items={REFERENCES.locations} icon="bi-geo-fill" />
            </Item>
          </Stagger>
          <Reveal>
            <p className="muted" style={{ marginTop: 'var(--md)', fontSize: 14 }}>
              Sie finden mich auch bei <a href={BIZ.directory} target="_blank" rel="noopener noreferrer">hochzeitsservice-online.de</a>.
              Presse: „Revancheball bis in die Nacht“ – Fachbereich Pharmazie der Philipps-Universität Marburg, Technologie- und Tagungszentrum Marburg (2014).
            </p>
          </Reveal>
        </div>
      </section>

      <Guestbook />

      <section className="section" id="eindruecke">
        <div className="wrap wrap-wide">
          <Reveal>
            <div className="row align-items-end g-4" style={{ marginBottom: 'var(--lg)' }}>
              <div className="col-lg-7">
                <div className="kicker">Eindrücke</div>
                <h2>„Ein Bild sagt mehr als <em>1000 Worte.</em>“</h2>
              </div>
              <div className="col-lg-5">
                <p className="lead">
                  Ein kleiner Vorgeschmack davon, wie es auf Ihrem Event aussehen könnte, wenn Sie es mir anvertrauen.
                  Viel Vergnügen beim Reinschauen!
                </p>
              </div>
            </div>
          </Reveal>
          <Gallery />
        </div>
      </section>
    </>
  );
}
