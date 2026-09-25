import PageHead from '@/components/PageHead';
import { BIZ } from '@/lib/content';

export const metadata = { title: 'Impressum', robots: { index: false } };

export default function Page() {
  return (
    <>
      <PageHead kicker="Rechtliches" title="Impressum" narrow />
      <section className="section legal" style={{ paddingTop: 0 }}>
        <div className="wrap wrap-narrow">
          <h3>Angaben gemäß § 5 TMG</h3>
          <address>
            {BIZ.fullName}
            <br />
            Inhaltlich verantwortlich / vertreten durch: {BIZ.owner}
            <br />
            <span style={{ color: 'var(--warning)' }}>[Straße und Hausnummer, PLZ Ort – bitte ergänzen]</span>
          </address>
          <h3>Kontakt</h3>
          <p>
            Telefon: <a href={BIZ.phoneHref}>{BIZ.phone}</a>
            <br />
            E-Mail: <a href={`mailto:${BIZ.email}`}>{BIZ.email}</a>
          </p>
          <h3>Steuernummer</h3>
          <p>{BIZ.taxNumber}</p>

          <h3>Verwendete Bilder</h3>
          <p>Copyright by: {BIZ.imageCredits}. Alle weiteren Fotos: {BIZ.fullName}.</p>

          <h3>Haftung für Inhalte</h3>
          <p>
            Die Inhalte dieser Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und
            Aktualität der Inhalte kann ich jedoch keine Gewähr übernehmen. Als Diensteanbieter bin ich gemäß § 7
            Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8
            bis 10 TMG bin ich als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
            Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
            hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
            allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
            Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
            Rechtsverletzungen werde ich diese Inhalte umgehend entfernen.
          </p>
          <h3>Haftung für Links</h3>
          <p>
            Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe.
            Deshalb kann ich für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
            Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten
            wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren
            zum Zeitpunkt der Verlinkung nicht erkennbar. Bei Bekanntwerden von Rechtsverletzungen werde ich
            derartige Links umgehend entfernen.
          </p>
          <h3>Urheberrecht</h3>
          <p>
            Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
            Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
            Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
            Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
          </p>
        </div>
      </section>
    </>
  );
}
