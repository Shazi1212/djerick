'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/Motion';

const ease = [0.22, 1, 0.36, 1];

export function FramedPortrait({ image, alt }) {
  return (
    <div className="frame-portrait">
      <motion.img
        src={`/img/${image}.jpg`}
        alt={alt}
        loading="lazy"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease }}
      />
      <div className="frame" aria-hidden="true">
        <motion.span style={{ top: -14, left: -14, right: 14, height: 1, transformOrigin: 'left' }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5, ease }} />
        <motion.span style={{ bottom: 14, left: -14, right: 14, height: 1, transformOrigin: 'right' }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5, ease }} />
        <motion.span style={{ top: -14, bottom: 14, left: -14, width: 1, transformOrigin: 'top' }} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 1.0, ease }} />
        <motion.span style={{ top: -14, bottom: 14, right: 14, width: 1, transformOrigin: 'bottom' }} initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 1.0, ease }} />
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="row align-items-center g-5">
          <div className="col-lg-5 col-md-6">
            <FramedPortrait image="erick-studio" alt="DJ Erick Hernández – Studioporträt mit Kopfhörern" />
          </div>
          <div className="col-lg-6 offset-lg-1 col-md-6">
            <Reveal>
              <div className="kicker">Über mich</div>
              <h2>Erick Hernández. <em>DJ Erick</em> ist der Mann an den Decks.</h2>
              <div className="values">
                <span>persönlich</span><span>zuverlässig</span><span>kundenorientiert</span><span>professionell</span>
              </div>
              <p className="lead">
                Seit mehr als 10 Jahren stehe ich vor allem in Gießen, Marburg und Frankfurt, aber auch im gesamten
                Rhein-Main-Gebiet und deutschlandweit an den Decks – auf Hochzeiten, Geburtstagen, Firmenevents,
                Studentenparties und in Clubs. Mein Anspruch: beste Stimmung und volle Tanzflächen.
              </p>
              <p className="muted">
                Begeisterte Kunden, zahlreiche Empfehlungen und Mundpropaganda sind in meiner Branche das A und O.
                Ich bin darauf angewiesen, immer das Beste von mir zu geben.
              </p>
              <div style={{ display: 'flex', gap: 'var(--sm)', flexWrap: 'wrap', marginTop: 'var(--md)' }}>
                <Link href="/ueber-mich" className="btn-ghost"><i className="bi bi-person-badge" />Mehr über mich</Link>
                <Link href="/technik" className="btn-ghost"><i className="bi bi-speaker-fill" />Meine Technik</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
