'use client';
import { useEffect, useRef } from 'react';

const BLOCKS = ['p', 'ul', 'ol', 'blockquote', 'table'];
const LINES = 3; // maximum height of the reading box, in text lines
const PAD = 12;

// Sliding white box (max. 3 lines) that follows the line currently being read.
// The box holds a black copy of the article, offset so it lines up with the text below.
export default function ProseReader({ html }) {
  const wrap = useRef(null);
  const root = useRef(null);
  const box = useRef(null);
  const clone = useRef(null);

  useEffect(() => {
    const el = root.current;
    const lens = box.current;
    const copy = clone.current;
    if (!el || !lens || !copy) return;
    const blocks = [...el.children].filter((c) => BLOCKS.includes(c.tagName.toLowerCase()));
    if (!blocks.length) return;
    el.classList.add('reader-on');
    let raf = 0;

    const place = () => {
      raf = 0;
      const mid = window.innerHeight * 0.45;
      const wrapTop = wrap.current.getBoundingClientRect().top;
      const lh = parseFloat(getComputedStyle(el).lineHeight) || 30;
      let best = null;
      let bestD = Infinity;
      for (const b of blocks) {
        const r = b.getBoundingClientRect();
        const d = mid >= r.top && mid <= r.bottom ? 0 : Math.min(Math.abs(r.top - mid), Math.abs(r.bottom - mid));
        if (d < bestD) { bestD = d; best = b; }
      }
      const r = best.getBoundingClientRect();
      const maxH = lh * LINES;
      const h = Math.min(r.height, maxH);
      // snap to the line grid, keep the box inside the block
      const line = Math.floor((mid - r.top) / lh);
      let top = r.top + Math.max(0, line - 1) * lh;
      top = Math.max(r.top, Math.min(top, r.bottom - h));
      const y = top - wrapTop - PAD;
      lens.style.opacity = r.bottom > 0 && r.top < window.innerHeight ? '1' : '0';
      lens.style.height = `${h + PAD * 2}px`;
      lens.style.transform = `translateY(${y}px)`;
      copy.style.width = `${el.offsetWidth}px`;
      copy.style.transform = `translateY(${-y}px)`;
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
    };
  }, [html]);

  return (
    <div className="reader-wrap" ref={wrap}>
      <div className="reader-box" ref={box} aria-hidden="true">
        <div className="prose prose-clone" ref={clone} dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      <article className="prose prose-reader" ref={root} dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
