import { Suspense } from 'react';
import PageHead from '@/components/PageHead';
import ContactForm from '@/components/ContactForm';
import { Reveal } from '@/components/Motion';
import { BIZ } from '@/lib/content';

export const metadata = {
  title: 'Kontakt – Unverbindlich anfragen',
  description:
    'Kontakt zu DJ Erick, Hochzeits- und Event-DJ im Rhein-Main-Gebiet: kostenfreies, unverbindliches Angebot für Hochzeit, Firmenevent, Geburtstag und mehr.',
};

export default function Page() {
  return (
    <>
      <PageHead
        kicker="Kontakt"
        title="Kontaktieren Sie mich <em>unverbindlich.</em>"
        lead="Ich berate Sie gerne und freue mich auf Ihre Anfrage. Wurde ich Ihnen empfohlen? Erwähnen Sie das ruhig in Ihrer Nachricht – ich würde mich gerne beim Empfehlungsgeber bedanken."
        narrow
      />
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="row g-5">
            <div className="col-lg-7">
              <Suspense fallback={null}>
                <ContactForm />
              </Suspense>
            </div>
            <div className="col-lg-5">
              <Reveal delay={0.15}>
                <div className="contact-card">
                  <img src="/img/contact-hands.jpg" alt="" aria-hidden="true" loading="lazy" />
                  <div className="kicker">Direkt</div>
                  <h3>Lieber anrufen?</h3>
                  <div className="contact-row"><i className="bi bi-telephone-fill" /><div><a href={BIZ.phoneHref}>{BIZ.phone}</a><br /><small className="muted">Mobil</small></div></div>
                  <div className="contact-row"><i className="bi bi-envelope-fill" /><div><a href={`mailto:${BIZ.email}`}>{BIZ.email}</a><br /><small className="muted">E-Mail</small></div></div>
                  <div className="contact-row"><i className="bi bi-geo-alt-fill" /><div><span style={{ fontWeight: 600 }}>Raum {BIZ.base}</span><br /><small className="muted">Einsätze in ganz Hessen und deutschlandweit</small></div></div>
                  <div className="contact-row" style={{ borderBottom: 0 }}>
                    <i className="bi bi-share-fill" />
                    <div style={{ display: 'flex', gap: 10 }}>
                      <a className="social" href={BIZ.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="bi bi-instagram" /></a>
                      <a className="social" href={BIZ.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="bi bi-facebook" /></a>
                      <a className="social" href={BIZ.socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="bi bi-youtube" /></a>
                    </div>
                  </div>
                  <p className="muted" style={{ fontSize: 14, marginTop: 'var(--md)', marginBottom: 0 }}>
                    <i className="bi bi-info-circle me-2" style={{ color: 'var(--gold)' }} />
                    Jede Veranstaltung ist einzigartig. Nach einem Kennenlern- bzw. Beratungsgespräch erstelle ich Ihnen ein
                    auf Ihre Feier abgestimmtes, kostenfreies und unverbindliches Angebot.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
