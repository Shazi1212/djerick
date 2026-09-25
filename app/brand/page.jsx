import Logo from '@/components/Logo';

export const metadata = { title: 'Logo', robots: { index: false, follow: false } };

/* Interne Seite: Logo-Varianten zum Screenshot/Download (nicht verlinkt, noindex). */
export default function Page() {
  return (
    <div style={{ paddingTop: 100 }}>
      <div id="og" style={{ width: 1200, height: 630, background: 'radial-gradient(circle at 70% 30%, #2a1d33, #131016 60%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28 }}>
        <Logo height={120} />
        <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 40, color: '#f3ece0' }}>Musik, die Ihre Gäste auf die <span style={{ color: '#ff3d8a' }}>Tanzfläche</span> holt.</div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 18, letterSpacing: '.2em', textTransform: 'uppercase', color: '#d8b46e' }}>Gießen · Marburg · Frankfurt · Hessen · 4,8 ★ bei Google</div>
      </div>
      <div id="icon" style={{ width: 512, height: 512, background: '#131016', display: 'grid', placeItems: 'center' }}>
        <Logo stacked height={480} />
      </div>
      <div id="wordmark" style={{ width: 1200, height: 240, background: '#131016', display: 'grid', placeItems: 'center' }}>
        <Logo height={180} />
      </div>
    </div>
  );
}
