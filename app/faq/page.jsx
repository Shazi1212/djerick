import Link from 'next/link';
import FaqList from '@/components/FaqList';
import PageHead from '@/components/PageHead';
import { Reveal } from '@/components/Motion';
import { BIZ, FAQ } from '@/lib/content';

export const metadata = {
  title: 'FAQ – Häufig gestellte Fragen',
  description:
    'Was kostet ein DJ? Macht der DJ Pausen? Was passiert bei Krankheit? Antworten von DJ Erick auf die häufigsten Fragen rund um Hochzeits- und Event-DJ.',
};

export default function Page() {
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  return (
    <>
      <PageHead kicker="FAQ" title="Sie haben Fragen? <em>Ich beantworte sie gerne.</em>" narrow />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap wrap-narrow">
          <Reveal>
            <FaqList items={FAQ} />
          </Reveal>
          <Reveal>
            <div className="contact-card" style={{ marginTop: 'var(--lg)', textAlign: 'center' }}>
              <div className="kicker" style={{ justifyContent: 'center' }}>Noch Fragen?</div>
              <h3>Kontaktieren Sie mich unverbindlich.</h3>
              <p className="muted" style={{ marginTop: 'var(--sm)' }}>
                Ich stehe Ihnen gerne telefonisch oder per Mail zur Verfügung und bespreche mit Ihnen gemeinsam alle
                Details Ihrer Feier.
              </p>
              <div style={{ display: 'flex', gap: 'var(--sm)', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/kontakt" className="btn-magenta"><i className="bi bi-send-fill" />Anfrage senden</Link>
                <a href={BIZ.phoneHref} className="btn-ghost"><i className="bi bi-telephone-fill" />{BIZ.phone}</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </>
  );
}
