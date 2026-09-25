import Link from 'next/link';
import PageHead from '@/components/PageHead';
import { Reveal, Stagger, Item } from '@/components/Motion';
import Guestbook from '@/components/Guestbook';
import { BIZ } from '@/lib/content';

export const metadata = {
  title: 'Über mich – DJ Erick Hernández',
  description:
    'DJ Erick (Erick Hernández) steht für persönliche, zuverlässige, kundenorientierte und professionelle Arbeit – seit mehr als 10 Jahren in Gießen, Marburg, Frankfurt und deutschlandweit.',
};

const PROMISES = [
  { icon: 'bi-chat-quote', title: 'Persönlich', text: 'Kennenlerngespräch und Musikbesprechung im Vorfeld – gerne auch persönlich. Sie bekommen keinen anonymen Dienstleister, sondern mich.' },
  { icon: 'bi-shield-check', title: 'Zuverlässig', text: 'Gute Absprachen, 100%ige Pünktlichkeit und Notfallequipment, das immer dabei ist. Für den unwahrscheinlichen Fall eines Ausfalls steht mein Netzwerk aus DJ-Kollegen bereit – ohne Mehrkosten für Sie.' },
  { icon: 'bi-people', title: 'Kundenorientiert', text: 'Immer das, was Sie sich wünschen – plus das, was die Eigendynamik des Abends verlangt. Musikwünsche Ihrer Gäste baue ich gerne ein.' },
  { icon: 'bi-award', title: 'Professionell', text: 'Hochwertige Licht- und Tontechnik von marktführenden Herstellern und ein Repertoire von den 50ern bis zu den aktuellen Charts.' },
];

export default function Page() {
  return (
    <>
      <PageHead
        kicker="Über mich"
        title="Erick Hernández. Der Mann hinter <em>DJ Erick.</em>"
        image="erick-decks"
        imageAlt="Erick Hernández an den Pioneer-Decks in einem Backstein-Gewölbe"
      />
      <section className="section" style={{ paddingTop: 'var(--lg)' }}>
        <div className="wrap">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6 col-md-6">
              <Reveal>
                <div className="sleeve" style={{ aspectRatio: '2/3', maxWidth: 440, marginInline: 'auto' }}>
                  <img src="/img/erick-portrait.jpg" alt="DJ Erick Hernández – Studioporträt" loading="lazy" />
                </div>
              </Reveal>
            </div>
            <div className="col-lg-5 offset-lg-1 col-md-6">
              <Reveal>
                <div className="values">
                  <span>persönlich</span><span>zuverlässig</span><span>kundenorientiert</span><span>professionell</span>
                </div>
                <p className="lead">
                  Ich bin ein erfahrener Event- und Hochzeits-DJ, der seit mehr als 10 Jahren vor allem in Gießen,
                  Marburg und Frankfurt, aber auch im gesamten Rhein-Main-Gebiet und deutschlandweit an den Decks
                  steht – und auf Hochzeiten, Geburtstagen, Firmenevents, Studentenparties, eigenen Events und in
                  Clubs für beste Stimmung und volle Tanzflächen sorgt.
                </p>
                <p className="muted">
                  Aufgrund der zahlreichen Parties und Events, die ich musikalisch begleiten durfte, bin ich in der
                  Lage, nahezu jede Musikrichtung zu spielen. Von 30 bis 2000 Gästen war bisher alles dabei – vom
                  Tagungszentrum Marburg über die Hessenhallen Gießen bis zum Steigenberger Frankfurter Hof.
                </p>
                <p className="muted">
                  Sie suchen einen DJ für Ihre Hochzeit, planen ein Firmenevent oder möchten Ihren Geburtstag oder
                  Silvester feiern? Dann kontaktieren Sie mich. Ich erstelle Ihnen ein kostenfreies und
                  unverbindliches Angebot, das sich nach Ihren Wünschen und Vorstellungen richtet.
                </p>
                <div style={{ display: 'flex', gap: 'var(--sm)', flexWrap: 'wrap', marginTop: 'var(--md)' }}>
                  <Link href="/kontakt" className="btn-magenta"><i className="bi bi-send-fill" />Unverbindlich anfragen</Link>
                  <a href={BIZ.phoneHref} className="btn-ghost"><i className="bi bi-telephone-fill" />{BIZ.phone}</a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="section on-deep grain">
        <div className="wrap">
          <Reveal>
            <div className="kicker">Wofür ich stehe</div>
            <h2 style={{ marginBottom: 'var(--lg)' }}>Vier Worte, die ich <em>ernst meine.</em></h2>
          </Reveal>
          <Stagger className="row g-4">
            {PROMISES.map((p) => (
              <Item className="col-md-6 col-lg-3" key={p.title}>
                <div className="card-dark">
                  <div className="icon-badge"><i className={`bi ${p.icon}`} /></div>
                  <h3 style={{ fontSize: 24 }}>{p.title}</h3>
                  <p className="muted" style={{ fontSize: 15, marginTop: 8, marginBottom: 0 }}>{p.text}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <Guestbook />
    </>
  );
}
