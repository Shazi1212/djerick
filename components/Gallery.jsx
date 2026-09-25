'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { GALLERY } from '@/lib/content';

export default function Gallery() {
  const [open, setOpen] = useState(null);
  useEffect(() => {
    const onKey = (e) => {
      if (open === null) return;
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') setOpen((i) => (i + 1) % GALLERY.length);
      if (e.key === 'ArrowLeft') setOpen((i) => (i - 1 + GALLERY.length) % GALLERY.length);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = open !== null ? 'hidden' : '';
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <div className="gallery-grid">
        {GALLERY.map((g, i) => (
          <motion.button
            type="button"
            className={`gallery-tile ${g.span === 2 ? 'span2' : ''}`}
            key={g.image}
            onClick={() => setOpen(i)}
            aria-label={`${g.caption} – vergrößern`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
          >
            <img src={`/img/${g.image}.jpg`} alt={g.alt} loading="lazy" />
            <span>{g.caption}</span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
          >
            <button className="lightbox-close" onClick={() => setOpen(null)} aria-label="Schließen"><i className="bi bi-x-lg" /></button>
            <motion.div
              key={open}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              style={{ textAlign: 'center' }}
            >
              <img src={`/img/${GALLERY[open].image}.jpg`} alt={GALLERY[open].alt} />
              <div className="lightbox-cap">{GALLERY[open].caption} · {open + 1}/{GALLERY.length}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
