import Link from 'next/link';
import PageHead from '@/components/PageHead';
import { Reveal } from '@/components/Motion';
import { SERVICES } from '@/lib/content';

export const metadata = {
  title: 'Leistungen – DJ für Hochzeit, Firmenevent, Geburtstag & Club',
  description:
    'DJ Erick legt auf Hochzeiten, Firmenevents, Geburtstagen, Silvester, Abi-Feten und in Clubs auf – in Gießen, Marburg, Frankfurt und deutschlandweit. Kostenfreies, unverbindliches Angebot.',
};

export default function Page() {
  return (
    <>
      <PageHead
        kicker="Leistungen"
        title="Jeder Anlass hat seinen <em>eigenen Sound.</em>"
        lead="Hochzeit, Firmenevent, Geburtstag oder Clubnacht – ich stelle Musik, Technik und Ablauf auf Ihre Feier ein. Nach einem Kennenlerngespräch erhalten Sie ein kostenfreies, unverbindliches Angebot."
        image="wedding-table"
        imageAlt="DJ-Tisch bei einer Hochzeit im Freien in magentafarbenem Licht"
      />
      <div className="wrap" style={{ paddingBottom: 'var(--lg)' }}>
        <nav className="sub-nav" aria-label="Anlässe">
          {SERVICES.map((s) => (
            <a href={`#${s.slug}`} key={s.slug}><i className={`bi ${s.icon} me-2`} style={{ color: 'var(--gold)' }} />{s.title}</a>
          ))}
        </nav>
      </div>

      {SERVICES.map((s, i) => {
        const ivory = i % 2 === 0;
        return (
          <section className={`section ${ivory ? 'on-ivory' : ''}`} id={s.slug} key={s.slug}>
            <div className="wrap">
              <div className={`row g-5 align-items-center ${i % 2 === 1 ? 'flex-lg-row-reverse' : ''}`}>
                <div className="col-lg-6">
                  <Reveal>
                    <div className="sleeve" style={{ aspectRatio: '4/3' }}>
                      <img src={`/img/${s.image}.jpg`} alt={s.imageAlt} loading="lazy" />
                    </div>
                  </Reveal>
                </div>
                <div className="col-lg-6">
                  <Reveal delay={0.1}>
                    <div className="kicker">{s.kicker}</div>
                    <h2><em>{s.title}</em></h2>
                    {s.long.map((p, j) => (
                      <p className={j === 0 ? 'lead' : 'muted'} style={{ marginTop: j === 0 ? 'var(--sm)' : 0 }} key={j}>{p}</p>
                    ))}
                    <ul className="check-list" style={{ margin: 'var(--md) 0' }}>
                      {s.facts.map((f) => (
                        <li key={f}><i className="bi bi-check2-circle" />{f}</li>
                      ))}
                    </ul>
                    <Link href={`/kontakt?anlass=${s.slug}`} className="btn-magenta"><i className="bi bi-send-fill" />Angebot für {s.title.split(' ')[0]} anfragen</Link>
                  </Reveal>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
