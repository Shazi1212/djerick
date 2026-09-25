'use client';
import { motion, useReducedMotion } from 'framer-motion';

/* Infinite marquee. Items are duplicated once; the track moves from 0 to -50 %. */
export default function Ticker({ items, className = 'ticker', itemClass = 'ticker-item', duration = 40, reverse = false, render }) {
  const reduce = useReducedMotion();
  const list = [...items, ...items];
  return (
    <div className={className} aria-hidden="true">
      <motion.div
        className={className === 'ticker' ? 'ticker-track' : 'wall-track'}
        animate={reduce ? {} : { x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      >
        {list.map((it, i) => (
          <span className={itemClass} key={i}>
            {render ? render(it) : it}
            <i className="bi bi-circle-fill" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
