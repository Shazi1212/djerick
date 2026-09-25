import Link from 'next/link';
import PageHead from '@/components/PageHead';
import { Reveal, Stagger, Item } from '@/components/Motion';
import { EQUIPMENT } from '@/lib/content';

export const metadata = {
  title: 'Technik – Licht- und Tontechnik ohne Kompromisse',
  description:
    'Pioneer DDJ-SZ und DDJ-RZ, RCF Evox 8, PL-Audio, Sennheiser HD-25, Cameo LED-Bar: DJ Erick arbeitet ausschließlich mit Equipment marktführender Hersteller – inklusive Notfallequipment.',
};

export default function Page() {
  return (
    <>
      <PageHead
        kicker="Technik"
        title="In Sachen Licht- und Tontechnik mache ich <em>keine Kompromisse.</em>"
        lead="Ich arbeite ausschließlich mit hochqualitativem Equipment von marktführenden Herstellern, das meinen und Ihren hohen Anforderungen mehr als gerecht wird. Die genauen Komponenten des Techniksets, das ich auf Ihrer Feier verwende, bespreche ich im Vorfeld mit Ihnen."
        image="setup"
        imageAlt="Der Aufbau: beleuchtetes DJ-Pult mit zwei Säulenlautsprechern und farbigen Uplights"
      />

      <section className="section" style={{ paddingTop: 'var(--lg)' }}>
        <div className="wrap">
          <Stagger className="row g-3">
            {EQUIPMENT.map((e) => (
              <Item className="col-sm-6 col-lg-4" key={e.name}>
                <div className="card-dark" style={{ padding: 0, overflow: 'hidden' }}>
                  <div style={{ aspectRatio: '4/3', background: '#0a0709', overflow: 'hidden' }}>
                    <img src={`/img/${e.image}.jpg`} alt={e.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: 'var(--sm) var(--md) var(--md)' }}>
                    <h4><i className={`bi ${e.icon} me-2`} style={{ color: 'var(--gold)' }} />{e.name}</h4>
                    <p className="muted" style={{ fontSize: 14, margin: '6px 0 0' }}>{e.caption}</p>
                  </div>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section on-ivory">
        <div className="wrap">
          <div className="row g-5 align-items-center">
            <div className="col-lg-7">
              <Reveal>
                <div className="sleeve" style={{ aspectRatio: '3/2' }}>
                  <img src="/img/setup.jpg" alt="Der Aufbau – Standard-Paket mit Evox 8, zwei Lichteffekten und LED-Bar" loading="lazy" />
                </div>
              </Reveal>
            </div>
            <div className="col-lg-5">
              <Reveal delay={0.1}>
                <div className="kicker">Der Aufbau</div>
                <h2>Das <em>Standard-Paket.</em></h2>
                <p className="lead" style={{ marginTop: 'var(--sm)' }}>
                  RCF Evox 8, zwei Lichteffekte und die Cameo LED-Bar für die Tanzfläche – so sieht der Aufbau bei den
                  meisten Feiern aus. Für große Säle kommen PL-Audio F12 und der „Gorilla“-Bass dazu.
                </p>
                <ul className="check-list">
                  <li><i className="bi bi-check2-circle" />Notfallequipment (Traktor X1 & Z1) ist immer dabei</li>
                  <li><i className="bi bi-check2-circle" />Funkmikrofon für Reden und Ansprachen</li>
                </ul>
                <Link href="/kontakt" className="btn-magenta" style={{ marginTop: 'var(--md)' }}><i className="bi bi-send-fill" />Unverbindlich beraten lassen</Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
