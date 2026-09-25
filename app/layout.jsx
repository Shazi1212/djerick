import { Bodoni_Moda, Manrope } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { BIZ } from '@/lib/content';

const display = Bodoni_Moda({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: 'variable',
  axes: ['opsz'],
  variable: '--font-display',
  display: 'swap',
});
const body = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(BIZ.url),
  title: {
    default: 'DJ Erick – Hochzeits-DJ & Event-DJ in Gießen, Marburg, Frankfurt & Hessen',
    template: '%s · DJ Erick',
  },
  description:
    'DJ Erick (Erick Hernández): Profi-DJ für Hochzeiten, Firmenevents, Geburtstage und Clubs in Gießen, Marburg, Frankfurt, dem Rhein-Main-Gebiet und deutschlandweit. Seit mehr als 10 Jahren an den Decks, von 30 bis 2000 Gästen.',
  keywords: [
    'DJ Hochzeit Gießen', 'Hochzeits-DJ Marburg', 'Event-DJ Frankfurt', 'DJ Rhein-Main', 'DJ Firmenevent Hessen',
    'Hochzeits DJ Hessen', 'Salsa DJ Frankfurt', 'DJ Geburtstag Marburg', 'DJ Erick', 'DJErick',
  ],
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: BIZ.fullName,
    title: 'DJ Erick – Musik, die Ihre Gäste auf die Tanzfläche holt',
    description: 'Profi-DJ für Hochzeiten, Firmenevents und Feiern in Gießen, Marburg, Frankfurt und deutschlandweit.',
    images: [{ url: '/og.jpg', width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
  icons: { icon: '/icon.png', apple: '/icon.png' },
};

export const viewport = { themeColor: '#131016' };

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': BIZ.url,
  name: BIZ.fullName,
  alternateName: 'DJErick',
  founder: { '@type': 'Person', name: BIZ.owner },
  telephone: '+49 1525 3748413',
  email: BIZ.email,
  url: BIZ.url,
  image: BIZ.url + '/img/hero-crowd.jpg',
  logo: BIZ.url + '/icon.png',
  description: 'Event- und Hochzeits-DJ in Gießen, Marburg, Frankfurt, dem Rhein-Main-Gebiet und deutschlandweit.',
  areaServed: ['Gießen', 'Marburg', 'Frankfurt am Main', 'Rhein-Main-Gebiet', 'Hessen', 'Deutschland'],
  address: { '@type': 'PostalAddress', addressLocality: 'Marburg', addressRegion: 'Hessen', addressCountry: 'DE' },
  sameAs: [BIZ.socials.facebook, BIZ.socials.instagram, BIZ.socials.youtube],
  priceRange: '€€',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '27', bestRating: '5' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={`${display.variable} ${body.variable}`}>
      <body>
        <a href="#main" className="skip-link">Zum Inhalt springen</a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
