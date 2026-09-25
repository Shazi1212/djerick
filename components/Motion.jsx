'use client';
import { motion, useReducedMotion } from 'framer-motion';

export function Reveal({ children, delay = 0, y = 22, className, as = 'div' }) {
  const reduce = useReducedMotion();
  const M = motion[as] || motion.div;
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}

export function Stagger({ children, className, gap = 0.08, as = 'div', ...rest }) {
  const reduce = useReducedMotion();
  const M = motion[as] || motion.div;
  return (
    <M
      className={className}
      {...rest}
      initial={reduce ? false : 'hide'}
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </M>
  );
}

export const itemUp = {
  hide: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
export const itemLeft = {
  hide: { opacity: 0, x: -18 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
export const Item = ({ children, className, variants = itemUp, as = 'div', ...rest }) => {
  const M = motion[as] || motion.div;
  return (
    <M className={className} variants={variants} {...rest}>
      {children}
    </M>
  );
};
