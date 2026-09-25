'use client';
import Link from 'next/link';
import Accordion from 'react-bootstrap/Accordion';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/Motion';
import { BIZ, FAQ } from '@/lib/content';

export default function FaqCta() {
  const faqs = [FAQ[1], FAQ[3], FAQ[4]];
  return (
    <section className="section">
      <div className="wrap">
        <div className="row g-5">
          <div className="col-lg-6">
            <Reveal>
              <div className="kicker">Häufige Fragen</div>
              <h2>Sie haben Fragen? <em>Gerne.</em></h2>
              <div className="faq" style={{ marginTop: 'var(--md)' }}>
                <Accordion flush>
                  {faqs.map((f, i) => (
                    <Accordion.Item eventKey={String(i)} key={f.q}>
                      <Accordion.Header>{f.q}</Accordion.Header>
                      <Accordion.Body>{f.a}</Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
              <Link href="/faq" style={{ fontWeight: 700 }}>Alle Fragen & Antworten <i className="bi bi-arrow-right" /></Link>
            </Reveal>
          </div>
          <div className="col-lg-6">
            <Reveal delay={0.15}>
              <div className="contact-card" style={{ height: '100%' }}>
                <img src="/img/contact-hands.jpg" alt="" aria-hidden="true" loading="lazy" />
                <div className="kicker">Kontakt</div>
                <h3 style={{ fontSize: 30 }}>Kontaktieren Sie mich unverbindlich.</h3>
                <p className="muted" style={{ marginTop: 'var(--sm)' }}>
                  Ich berate Sie gerne und freue mich auf Ihre Anfrage. Wurde ich Ihnen empfohlen? Erwähnen Sie das
                  ruhig in Ihrer Nachricht – ich würde mich gerne beim Empfehlungsgeber bedanken.
                </p>
                <div className="contact-row"><i className="bi bi-telephone-fill" /><div><a href={BIZ.phoneHref}>{BIZ.phone}</a><br /><small className="muted">Mobil</small></div></div>
                <div className="contact-row" style={{ borderBottom: 0 }}><i className="bi bi-envelope-fill" /><div><a href={`mailto:${BIZ.email}`}>{BIZ.email}</a><br /><small className="muted">E-Mail</small></div></div>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} style={{ display: 'inline-block', marginTop: 'var(--md)' }}>
                  <Link href="/kontakt" className="btn-magenta"><i className="bi bi-send-fill" />Anfrage senden</Link>
                </motion.div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
