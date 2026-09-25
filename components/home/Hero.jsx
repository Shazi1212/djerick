'use client';
import Link from 'next/link';
import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Ticker from '@/components/Ticker';
import { TICKER } from '@/lib/content';

const ease = [0.22, 1, 0.36, 1];
const words = ['Musik,', 'die', 'Ihre', 'Gäste', 'auf', 'die', 'Tanzfläche', 'holt.'];

export default function Hero() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const copyO = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section className="hero" ref={ref}>
      <motion.div
        className="hero-media"
        style={reduce ? {} : { y: mediaY }}
        initial={reduce ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease }}
      >
        <img src="/img/hero-crowd.jpg" alt="Hochzeitsgäste jubeln auf der Tanzfläche im warmen Bühnenlicht" fetchPriority="high" />
      </motion.div>
      <motion.div className="hero-shade" initial={reduce ? false : { opacity: 1 }} animate={{ opacity: 1 }} />

      {/* rotating gold vinyl ring */}
      <motion.svg
        className="hero-ring"
        viewBox="0 0 200 200"
        animate={reduce ? {} : { rotate: 360 }}
        transition={{ duration: 24, ease: 'linear', repeat: Infinity }}
        aria-hidden="true"
      >
        <circle cx="100" cy="100" r="96" fill="none" stroke="#d8b46e" strokeWidth="0.6" strokeDasharray="1.2 2.4" />
        <circle cx="100" cy="100" r="86" fill="none" stroke="#d8b46e" strokeWidth="0.35" />
        <circle cx="100" cy="100" r="74" fill="none" stroke="#d8b46e" strokeWidth="0.25" strokeDasharray="0.5 1.5" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="#d8b46e" strokeWidth="0.35" />
        <circle cx="100" cy="100" r="32" fill="none" stroke="#ff3d8a" strokeWidth="0.8" />
        <circle cx="100" cy="100" r="3" fill="#d8b46e" />
      </motion.svg>

      <motion.div className="hero-content wrap wrap-wide" style={reduce ? {} : { y: copyY, opacity: copyO }}>
        <div className="row">
          <div className="col-lg-8">
            <motion.div
              className="kicker"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease }}
            >
              Erick Hernández · Hochzeits- & Event-DJ · 4,8 ★ bei Google
            </motion.div>
            <h1 aria-label="Musik, die Ihre Gäste auf die Tanzfläche holt.">
              {words.map((w, i) => (
                <motion.span
                  key={i}
                  style={{ display: 'inline-block', marginRight: '0.25em' }}
                  className={w.startsWith('Tanzfläche') ? 'hl' : ''}
                  initial={reduce ? false : { opacity: 0, y: 28, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease }}
                >
                  {w}
                </motion.span>
              ))}
            </h1>
            <motion.p
              className="lead"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7, ease }}
            >
              Ihr Profi-DJ für jede Art von Events – Hochzeiten, Firmenevents und Feiern in Gießen, Marburg,
              Frankfurt, im Rhein-Main-Gebiet und deutschlandweit. Seit mehr als 10 Jahren an den Decks.
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.7, ease }}
            >
              <Link href="/kontakt" className="btn-magenta"><i className="bi bi-send-fill" />Unverbindlich anfragen</Link>
              <Link href="/musik" className="btn-ghost"><i className="bi bi-vinyl-fill" />Musik & Referenzen</Link>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <Ticker items={TICKER} duration={38} />
    </section>
  );
}
