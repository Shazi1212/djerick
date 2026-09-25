import Link from 'next/link';
import Ticker from '@/components/Ticker';
import { Reveal } from '@/components/Motion';
import { REFERENCES } from '@/lib/content';

/* Typographic reference wall – the names are the graphic, no fake logos. */
export default function Wall() {
  const clubs = REFERENCES.clubs.flatMap((c) => c.names);
  return (
    <section className="section" style={{ paddingInline: 0 }}>
      <div className="wrap" style={{ marginBottom: 'var(--lg)' }}>
        <Reveal>
          <div className="row align-items-end g-4">
            <div className="col-lg-7">
              <div className="kicker">Referenzen</div>
              <h2>Firmen, Clubs und Locations, die ich <em>begleiten durfte.</em></h2>
            </div>
            <div className="col-lg-5">
              <p className="lead">
                Eine Aufzählung aller Events würde den Rahmen sprengen – hier eine Auswahl. Von 30 bis 2000 Gästen war
                bisher alles dabei.
              </p>
              <Link href="/referenzen" className="btn-ghost btn-sm"><i className="bi bi-images" />Alle Referenzen & Eindrücke</Link>
            </div>
          </div>
        </Reveal>
      </div>
      <div className="wall-row wall-firmen" style={{ borderTop: '1px solid var(--border)' }}>
        <Ticker items={REFERENCES.firmen} className="wall" itemClass="wall-item" duration={60} />
      </div>
      <div className="wall-row wall-clubs">
        <Ticker items={clubs} className="wall" itemClass="wall-item" duration={75} reverse />
      </div>
      <div className="wall-row wall-locations">
        <Ticker items={REFERENCES.locations} className="wall" itemClass="wall-item" duration={65} />
      </div>
    </section>
  );
}
