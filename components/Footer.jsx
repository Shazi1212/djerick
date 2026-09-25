import Link from 'next/link';
import Logo from '@/components/Logo';
import { BIZ, NAV, CITIES } from '@/lib/content';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="row g-5">
          <div className="col-lg-4">
            <Link href="/" className="footer-logo" aria-label="DJ Erick – Startseite">
              <Logo stacked height={120} />
            </Link>
            <p style={{ marginTop: 'var(--md)', maxWidth: 360 }}>
              DJ Erick Hernández – Ihr Profi-DJ für Hochzeiten, Firmenevents und Feiern in Gießen, Marburg,
              Frankfurt, im Rhein-Main-Gebiet und deutschlandweit.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 'var(--sm)' }}>
              <a className="social" href={BIZ.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="bi bi-instagram" /></a>
              <a className="social" href={BIZ.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="bi bi-facebook" /></a>
              <a className="social" href={BIZ.socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><i className="bi bi-youtube" /></a>
            </div>
          </div>
          <div className="col-6 col-lg-2">
            <h4>Navigation</h4>
            <ul>
              {NAV.map((n) => (
                <li key={n.href}><Link href={n.href}>{n.label}</Link></li>
              ))}
              <li><Link href="/kontakt">Kontakt</Link></li>
            </ul>
          </div>
          <div className="col-6 col-lg-3">
            <h4>Kontakt</h4>
            <ul>
              <li><a href={BIZ.phoneHref}><i className="bi bi-telephone-fill me-2" style={{ color: 'var(--gold)' }} />{BIZ.phone}</a></li>
              <li><a href={`mailto:${BIZ.email}`}><i className="bi bi-envelope-fill me-2" style={{ color: 'var(--gold)' }} />{BIZ.email}</a></li>
              <li style={{ color: 'var(--muted)' }}><i className="bi bi-geo-alt-fill me-2" style={{ color: 'var(--gold)' }} />Raum {BIZ.base}</li>
            </ul>
            <h4 style={{ marginTop: 'var(--md)' }}>Rechtliches</h4>
            <ul>
              <li><Link href="/impressum">Impressum</Link></li>
              <li><Link href="/datenschutz">Datenschutz</Link></li>
            </ul>
          </div>
          <div className="col-lg-3">
            <h4>Einsatzgebiet</h4>
            <p style={{ fontSize: 14, lineHeight: 1.7 }}>
              {CITIES.join(' · ')} – und deutschlandweit.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} DJ Erick · Erick Hernández</span>
          <span>Fotos: {BIZ.imageCredits}</span>
        </div>
      </div>
    </footer>
  );
}
