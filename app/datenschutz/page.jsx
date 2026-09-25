import PageHead from '@/components/PageHead';
import { BIZ } from '@/lib/content';

export const metadata = { title: 'Datenschutzerklärung', robots: { index: false } };

export default function Page() {
  return (
    <>
      <PageHead kicker="Rechtliches" title="Datenschutzerklärung" narrow />
      <section className="section legal" style={{ paddingTop: 0 }}>
        <div className="wrap wrap-narrow">
          <h3>Verantwortliche Stelle</h3>
          <p>
            Verantwortliche Stelle im Sinne der Datenschutzgesetze, insbesondere der EU-Datenschutz-Grundverordnung
            (DSGVO), ist:
          </p>
          <address>
            {BIZ.owner} – {BIZ.fullName}
            <br />
            <span style={{ color: 'var(--warning)' }}>[Straße und Hausnummer, PLZ Ort – bitte ergänzen]</span>
            <br />
            Tel. {BIZ.phone} · <a href={`mailto:${BIZ.email}`}>{BIZ.email}</a>
          </address>

          <h3>Erhebung und Verarbeitung von Daten</h3>
          <p>
            Diese Website setzt keine Analyse-, Tracking- oder Werbe-Cookies ein. Es sind keine Dienste von Google
            Analytics, Google Maps, YouTube, Facebook oder Instagram eingebunden. Links zu sozialen Netzwerken öffnen
            die jeweilige Plattform erst nach einem ausdrücklichen Klick in einem neuen Tab; ab diesem Zeitpunkt gilt
            die Datenschutzerklärung des jeweiligen Anbieters.
          </p>

          <h3>Kontaktformular und Kontaktaufnahme</h3>
          <p>
            Das Kontaktformular auf dieser Website überträgt keine Daten an einen Server. Beim Absenden wird Ihr
            E-Mail-Programm mit den von Ihnen eingegebenen Angaben geöffnet; der Versand erfolgt ausschließlich über
            Ihr eigenes E-Mail-Konto. Wenn Sie mich per Telefon oder E-Mail kontaktieren, werden Ihre Angaben zwecks
            Bearbeitung der Anfrage und für den Fall von Anschlussfragen gespeichert. Diese Daten gebe ich nicht ohne
            Ihre Einwilligung weiter. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO.
          </p>

          <h3>Server-Logfiles</h3>
          <p>
            Der Hosting-Anbieter dieser Website (Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA)
            erhebt und speichert automatisch Informationen in Server-Logfiles, die Ihr Browser automatisch übermittelt
            (Browsertyp und -version, verwendetes Betriebssystem, Referrer-URL, IP-Adresse, Uhrzeit der
            Serveranfrage). Diese Daten werden nicht mit anderen Datenquellen zusammengeführt. Rechtsgrundlage ist
            Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse am technisch fehlerfreien Betrieb). Vercel ist unter
            dem EU-US Data Privacy Framework zertifiziert.
          </p>

          <h3>Schriftarten</h3>
          <p>
            Die verwendeten Schriftarten werden lokal vom Server dieser Website ausgeliefert. Es findet keine
            Verbindung zu Servern von Google Fonts statt.
          </p>

          <h3>Ihre Rechte</h3>
          <p>
            Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen
            Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung,
            Sperrung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten
            können Sie sich jederzeit unter der oben angegebenen Adresse an mich wenden. Ihnen steht zudem ein
            Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
          </p>
        </div>
      </section>
    </>
  );
}
