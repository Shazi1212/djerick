'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BIZ, NAV } from '@/lib/content';
import Logo from '@/components/Logo';

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <>
      <header className={`nav-bar ${solid || open ? 'solid' : ''}`}>
        <div className="wrap wrap-wide">
          <div className="nav-inner">
            <Link href="/" className="nav-logo" aria-label="DJ Erick – Startseite">
              <Logo height={40} />
            </Link>

            <nav className="nav-links" aria-label="Hauptnavigation">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className={path.startsWith(n.href) ? 'active' : ''}>
                  {n.label}
                  {path.startsWith(n.href) && (
                    <motion.span
                      layoutId="nav-underline"
                      style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 2, background: 'var(--magenta)' }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link href="/kontakt" className="btn-magenta btn-sm">
                  <i className="bi bi-send-fill" />
                  <span className="d-none d-sm-inline">Unverbindlich anfragen</span>
                  <span className="d-sm-none">Anfragen</span>
                </Link>
              </motion.div>
              <button
                className="nav-burger"
                onClick={() => setOpen((o) => !o)}
                aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
                aria-expanded={open}
              >
                <i className={`bi ${open ? 'bi-x-lg' : 'bi-list'}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-panel"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            {[{ href: '/', label: 'Startseite' }, ...NAV, { href: '/kontakt', label: 'Kontakt' }].map((n) => (
              <Link key={n.href} href={n.href}>
                {n.label}
              </Link>
            ))}
            <p style={{ marginTop: 'var(--lg)', color: 'var(--muted)' }}>
              <a href={BIZ.phoneHref} style={{ color: 'var(--gold)' }}>{BIZ.phone}</a>
              <br />
              <a href={`mailto:${BIZ.email}`} style={{ color: 'var(--gold)' }}>{BIZ.email}</a>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
