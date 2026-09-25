'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Stagger, Item } from '@/components/Motion';
import { STATS } from '@/lib/content';

function Counter({ value, prefix = '', suffix = '', decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const start = performance.now();
    const dur = 1600;
    let raf;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setN(value * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduce]);
  return (
    <span ref={ref}>
      {prefix}
      {n.toLocaleString('de-DE', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="section-lg on-deep grain">
      <div className="wrap">
        <Stagger className="row g-4 g-lg-5">
          {STATS.map((s) => (
            <Item className="col-md-4" key={s.label}>
              <div className="stat">
                <div className="stat-num"><Counter value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} /></div>
                <motion.div
                  className="stat-line"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
                <h4><i className={`bi ${s.icon} me-2`} style={{ color: 'var(--gold)' }} />{s.label}</h4>
                <p className="muted" style={{ fontSize: 14, marginTop: 6 }}>{s.href ? <a href={s.href} target="_blank" rel="noopener noreferrer">{s.note} <i className="bi bi-box-arrow-up-right" /></a> : s.note}</p>
              </div>
            </Item>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
