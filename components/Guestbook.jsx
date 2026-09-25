'use client';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/Motion';
import { BIZ, TESTIMONIALS } from '@/lib/content';

const ease = [0.22, 1, 0.36, 1];

export default function Guestbook({ limit, title = true }) {
  const items = limit ? TESTIMONIALS.slice(0, limit) : TESTIMONIALS;
  return (
    <section className="section on-ivory">
      <div className="wrap">
        {title && (
          <Reveal>
            <div className="text-center" style={{ maxWidth: 720, margin: '0 auto var(--lg)' }}>
              <div className="kicker" style={{ justifyContent: 'center' }}>Gästebuch</div>
              <h2>Was Paare und Gäste <em>sagen.</em></h2>
              <p className="lead" style={{ marginTop: 'var(--sm)' }}>
                Google-Rezensionen und Dankeskarten, die nach der Feier bei mir ankamen – so, wie sie geschrieben wurden.
              </p>
              <a href={BIZ.google.url} target="_blank" rel="noopener noreferrer" className="google-badge">
                <i className="bi bi-google" /> <strong>{BIZ.google.rating} ★</strong> aus {BIZ.google.count} Google-Bewertungen
              </a>
            </div>
          </Reveal>
        )}
        <div className="row g-4 align-items-stretch">
          {items.map((t, i) => (
            <div className="col-md-6 col-lg-4" key={i}>
              <motion.div
                style={{ height: '100%' }}
                initial={{ opacity: 0, y: 30, rotate: t.rotate }}
                whileInView={{ opacity: 1, y: 0, rotate: t.rotate }}
                whileHover={{ rotate: 0, scale: 1.02 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
              >
                {t.type === 'photo' ? (
                  <figure className="polaroid" style={{ margin: 0 }}>
                    <img src={`/img/${t.image}.jpg`} alt={t.alt} loading="lazy" />
                    <figcaption>
                      „{t.text}“
                      <div className="who" style={{ marginTop: 8, color: 'var(--ink)' }}>{t.who}<small>{t.where}</small></div>
                    </figcaption>
                  </figure>
                ) : (
                  <div className="quote-card">
                    <span className="q" aria-hidden="true">“</span>
                    <p>{t.text}</p>
                    <div className="who">{t.who}<small>{t.where}</small></div>
                  </div>
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
