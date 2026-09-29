'use client';
import { useEffect, useRef } from 'react';

const BLOCKS = 'p, ul, ol, blockquote, table';

// Sliding white box that follows the paragraph currently being read.
export default function ProseReader({ html }) {
  const root = useRef(null);
  const box = useRef(null);
  const wrap = useRef(null);

  useEffect(() => {
    const el = root.current;
    const lens = box.current;
    if (!el || !lens) return;
    const blocks = [...el.querySelectorAll(`:scope > ${BLOCKS.split(', ').join(', :scope > ')}`)];
    if (!blocks.length) return;
    el.classList.add('reader-on');
    let active = null;
    let raf = 0;

    const place = () => {
      raf = 0;
      const mid = window.innerHeight * 0.45;
      let best = null;
      let bestD = Infinity;
      for (const b of blocks) {
        const r = b.getBoundingClientRect();
        const d = mid >= r.top && mid <= r.bottom ? 0 : Math.min(Math.abs(r.top - mid), Math.abs(r.bottom - mid));
        if (d < bestD) { bestD = d; best = b; }
      }
      const article = wrap.current.getBoundingClientRect();
      const r = best.getBoundingClientRect();
      const inView = r.bottom > 0 && r.top < window.innerHeight;
      lens.style.opacity = inView ? '1' : '0';
      lens.style.height = `${r.height + 24}px`;
      lens.style.transform = `translateY(${r.top - article.top - 12}px)`;
      if (best !== active) {
        active?.classList.remove('is-active');
        best.classList.add('is-active');
        active = best;
      }
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(place); };

    place();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    return () => {
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
      if (raf) cancelAnimationFrame(raf);
      el.classList.remove('reader-on');
      active?.classList.remove('is-active');
    };
  }, [html]);

  return (
    <div className="reader-wrap" ref={wrap}>
      <div className="reader-box" ref={box} aria-hidden="true" />
      <article className="prose prose-reader" ref={root} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
