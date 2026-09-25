'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Stagger, Item, Reveal, itemLeft } from '@/components/Motion';
import { TOP10, DECADES } from '@/lib/content';
import PREVIEWS from '@/lib/previews.json';

/* 30-second previews come from Apple's public iTunes Search API (lib/previews.json).
   Browsers block sound before the first click/tap, so: hover plays once the page is
   "unlocked", a click always plays; a hint explains this until the first successful play. */
export default function Setlist({ showLink = true }) {
  const reduce = useReducedMotion();
  const audio = useRef(null);
  const hoverTimer = useRef(null);
  const [active, setActive] = useState(null); // hovered index
  const [playing, setPlaying] = useState(null); // playing index
  const [progress, setProgress] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [needsClick, setNeedsClick] = useState(false);

  useEffect(() => {
    const a = new Audio();
    a.preload = 'none';
    a.volume = 0.85;
    a.addEventListener('timeupdate', () => a.duration && setProgress(a.currentTime / a.duration));
    a.addEventListener('ended', () => { setPlaying(null); setProgress(0); });
    audio.current = a;
    return () => { a.pause(); audio.current = null; };
  }, []);

  const stop = () => {
    const a = audio.current;
    if (!a) return;
    a.pause();
    setPlaying(null);
    setProgress(0);
  };

  const play = async (i, fromHover = false) => {
    const a = audio.current;
    if (!a) return;
    if (playing === i && !fromHover) { stop(); return; }
    if (playing === i) return;
    const src = PREVIEWS[i]?.preview;
    if (!src) return;
    try {
      a.src = src;
      a.currentTime = 0;
      await a.play();
      setPlaying(i);
      setProgress(0);
      setUnlocked(true);
      setNeedsClick(false);
    } catch {
      // autoplay blocked until the first user gesture
      if (fromHover) setNeedsClick(true);
    }
  };

  const onEnter = (i) => {
    setActive(i);
    if (!unlocked) { setNeedsClick(true); return; }
    clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => play(i, true), 180);
  };
  const onLeave = () => {
    setActive(null);
    clearTimeout(hoverTimer.current);
  };

  const label = playing !== null ? TOP10[playing] : active !== null ? TOP10[active] : null;
  const labelSub = playing !== null ? 'läuft · 30 s' : active !== null ? (unlocked ? 'Vorschau' : 'Klicken zum Hören') : 'Top 10 · Side A';

  return (
    <section className="section" onMouseLeave={() => { clearTimeout(hoverTimer.current); }}>
      <div className="wrap">
        <div className="row align-items-center g-5">
          <div className="col-lg-5">
            <Reveal>
              <div className="vinyl" aria-hidden="true">
                <motion.div
                  className="vinyl-disc"
                  animate={reduce ? {} : { rotate: 360 }}
                  transition={{ duration: playing !== null ? 4 : 14, ease: 'linear', repeat: Infinity }}
                >
                  <img src="/img/hand-ddj.jpg" alt="" />
                  <div className="vinyl-grooves" />
                </motion.div>
                <div className="vinyl-label">
                  <div>
                    <strong>{label ? label[0] : 'DJ Erick'}</strong>
                    <small>{label ? label[1] : labelSub}</small>
                    {label && <small>{labelSub}</small>}
                  </div>
                </div>
                <div className="vinyl-hole" />
                {playing !== null && (
                  <svg className="vinyl-progress" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="48" pathLength="1" style={{ strokeDashoffset: 1 - progress }} />
                  </svg>
                )}
              </div>
            </Reveal>
          </div>
          <div className="col-lg-7">
            <Reveal>
              <div className="kicker">Die Setlist</div>
              <h2>Von Rock’n’Roll bis <em>Bachata.</em></h2>
              <p className="lead" style={{ marginTop: 'var(--sm)' }}>
                Hits aus den 50ern bis zu den aktuellen Charts. Zehn Songs, die auf Ihrer Feier laufen könnten –
                Musikwünsche von Ihnen und Ihren Gästen baue ich am Abend gerne mit ein.
              </p>
              <div style={{ margin: 'var(--sm) 0 var(--md)' }}>
                {DECADES.map((d, i) => (
                  <span className={`chip ${i === DECADES.length - 1 ? 'hot' : ''}`} key={d}>{d}</span>
                ))}
              </div>
              <p className="setlist-hint" aria-live="polite">
                <i className={`bi ${playing !== null ? 'bi-volume-up-fill' : 'bi-headphones'}`} />
                {playing !== null
                  ? `Läuft: ${TOP10[playing][0]} – ${TOP10[playing][1]}`
                  : needsClick
                    ? 'Titel anklicken, um die 30-Sekunden-Vorschau zu hören – danach reicht Darüberfahren.'
                    : unlocked
                      ? 'Mit der Maus über einen Titel fahren, um ihn anzuhören.'
                      : 'Titel anklicken oder darüberfahren – 30-Sekunden-Vorschau.'}
              </p>
            </Reveal>
            <Stagger as="ol" className="tracklist" gap={0.05}>
              {TOP10.map(([artist, title], i) => (
                <Item
                  as="li"
                  key={artist}
                  variants={itemLeft}
                  className={playing === i ? 'is-playing' : ''}
                  onMouseEnter={() => onEnter(i)}
                  onMouseLeave={onLeave}
                  onClick={() => play(i)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); play(i); } }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={playing === i}
                  aria-label={`${artist} – ${title} anhören`}
                >
                  <span className="no">
                    {playing === i ? <i className="bi bi-pause-fill" /> : active === i ? <i className="bi bi-play-fill" /> : String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="artist">{artist}</span>
                  <span className="title">{title}</span>
                  {playing === i && <span className="track-progress" style={{ transform: `scaleX(${progress})` }} />}
                </Item>
              ))}
            </Stagger>
            <p className="muted" style={{ fontSize: 12, marginTop: 'var(--sm)' }}>
              Hörproben: 30-Sekunden-Vorschauen über Apple Music / iTunes.
            </p>
            {showLink && (
              <Reveal>
                <div style={{ marginTop: 'var(--sm)' }}>
                  <Link href="/musik" className="btn-ghost"><i className="bi bi-music-note-list" />Ganze Musikseite</Link>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
