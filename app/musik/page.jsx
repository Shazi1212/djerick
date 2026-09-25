import Link from 'next/link';
import PageHead from '@/components/PageHead';
import Setlist from '@/components/Setlist';
import { Reveal, Stagger, Item } from '@/components/Motion';
import { DECADES, GENRES } from '@/lib/content';

export const metadata = {
  title: 'Musik – Repertoire von den 50ern bis zu den Charts',
  description:
    'Rock’n’Roll, Standardtänze, NDW, House, Eurodance, Hip-Hop, Reggaeton, Salsa, Bachata und Merengue: DJ Erick spielt nahezu jede Musikrichtung – für 30 bis 2000 Gäste.',
};

export default function Page() {
  return (
    <>
      <PageHead
        kicker="Musik"
        title="Nahezu jede <em>Musikrichtung.</em>"
        lead="Aufgrund der zahlreichen Parties und Events, die ich musikalisch begleiten durfte, bin ich in der Lage, nahezu jede Musikrichtung zu spielen. Bei der Musikbesprechung berate ich Sie gern und helfe Ihnen, den musikalischen Rahmen Ihrer Feier zu gestalten."
        image="crowd-beams"
        imageAlt="Partycrowd unter violetten und pinken Lichtstrahlen"
      />

      <section className="section" style={{ paddingTop: 'var(--lg)' }}>
        <div className="wrap">
          <div className="row g-5">
            <div className="col-lg-5">
              <Reveal>
                <div className="kicker">Sieben Jahrzehnte</div>
                <h2>Hits aus den 50ern bis <em>heute.</em></h2>
              </Reveal>
              <Stagger style={{ marginTop: 'var(--md)' }} gap={0.07}>
                {DECADES.map((d, i) => (
                  <Item key={d} style={{ display: 'inline-block' }}>
                    <span className={`chip ${i === DECADES.length - 1 ? 'hot' : ''}`} style={{ fontSize: 16, padding: '10px 20px' }}>{d}</span>
                  </Item>
                ))}
              </Stagger>
            </div>
            <div className="col-lg-7">
              <Reveal delay={0.1}>
                <div className="kicker">Genres</div>
                <h2 style={{ fontSize: 'clamp(28px,3.4vw,44px)' }}>Von Rock’n’Roll bis <em>Merengue.</em></h2>
                <p className="muted" style={{ marginTop: 'var(--sm)' }}>
                  Rock’n’Roll, Classic Rock, Standardtänze, Pop, NDW, über House, Dance Classics, Eurodance, Electro
                  Swing, R&B, Hip-Hop bis hin zu Reggae, Reggaeton, Salsa, Bachata und Merengue.
                </p>
              </Reveal>
              <Stagger style={{ marginTop: 'var(--sm)' }} gap={0.04}>
                {GENRES.map((g) => (
                  <Item key={g} style={{ display: 'inline-block' }}>
                    <span className={`chip ${['Salsa', 'Bachata', 'Merengue', 'Reggaeton'].includes(g) ? 'hot' : ''}`}>{g}</span>
                  </Item>
                ))}
              </Stagger>
              <p className="muted" style={{ marginTop: 'var(--md)', fontSize: 15 }}>
                <i className="bi bi-stars me-2" style={{ color: 'var(--magenta)' }} />
                Latin ist eine Spezialität: Salsa, Bachata, Merengue und Reggaeton – vom Changó Latin Palace in
                Frankfurt bis zur Tanzschule Conexión.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Setlist showLink={false} />

      <section className="section on-ivory">
        <div className="wrap wrap-narrow text-center">
          <Reveal>
            <div className="kicker" style={{ justifyContent: 'center' }}>Musikbesprechung</div>
            <h2>Ihre Wünsche, <em>mein Feingefühl.</em></h2>
            <p className="lead" style={{ marginTop: 'var(--sm)' }}>
              Von 30 bis 2000 Gästen war bisher alles dabei. Im Vorfeld besprechen wir Eröffnungstanz, Lieblingssongs
              und No-Gos – am Abend lese ich die Tanzfläche und baue Musikwünsche von Ihnen und Ihren Gästen gerne
              mit ein.
            </p>
            <div style={{ display: 'flex', gap: 'var(--sm)', justifyContent: 'center', flexWrap: 'wrap', marginTop: 'var(--md)' }}>
              <Link href="/kontakt" className="btn-magenta"><i className="bi bi-send-fill" />Musikbesprechung anfragen</Link>
              <Link href="/technik" className="btn-ghost"><i className="bi bi-speaker-fill" />Zur Technik</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
