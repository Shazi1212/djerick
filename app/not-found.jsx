import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section" style={{ paddingTop: 180, minHeight: '70vh' }}>
      <div className="wrap wrap-narrow text-center">
        <div className="kicker" style={{ justifyContent: 'center' }}>404</div>
        <h1>Diese Seite ist <em>nicht auf der Setlist.</em></h1>
        <p className="lead" style={{ marginTop: 'var(--md)' }}>Die Adresse existiert nicht mehr – die Musik aber schon.</p>
        <Link href="/" className="btn-magenta" style={{ marginTop: 'var(--md)' }}><i className="bi bi-house-fill" />Zur Startseite</Link>
      </div>
    </section>
  );
}
