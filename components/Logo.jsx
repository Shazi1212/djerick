/* DJ Erick wordmark: gold vinyl ring + Bodoni italic lettering. Pure SVG, no image file. */
export default function Logo({ height = 40, stacked = false, className = '' }) {
  if (stacked) {
    // square lockup for footer / social avatars
    return (
      <svg className={className} viewBox="0 0 200 200" height={height} width={height} role="img" aria-label="DJ Erick">
        <circle cx="100" cy="100" r="96" fill="none" stroke="#d8b46e" strokeWidth="1.2" strokeDasharray="1.5 3" />
        <circle cx="100" cy="100" r="84" fill="none" stroke="#d8b46e" strokeWidth="0.6" />
        <circle cx="100" cy="100" r="66" fill="none" stroke="#d8b46e" strokeWidth="0.4" strokeDasharray="0.6 1.8" />
        <circle cx="100" cy="100" r="46" fill="#ff3d8a" />
        <text x="100" y="96" textAnchor="middle" fontFamily="var(--font-display), Didot, Georgia, serif" fontStyle="italic" fontSize="30" fill="#f3ece0">DJ</text>
        <text x="100" y="124" textAnchor="middle" fontFamily="var(--font-display), Didot, Georgia, serif" fontStyle="italic" fontSize="26" fill="#f3ece0">Erick</text>
        <text x="100" y="168" textAnchor="middle" fontFamily="var(--font-body), sans-serif" fontSize="9" letterSpacing="3" fill="#d8b46e">HOCHZEITS- & EVENT-DJ</text>
      </svg>
    );
  }
  const w = height * 5.4;
  return (
    <svg className={className} viewBox="0 0 216 40" height={height} width={w} role="img" aria-label="DJ Erick – Hochzeits- & Event-DJ">
      <g transform="translate(20 20)">
        <circle r="19" fill="none" stroke="#d8b46e" strokeWidth="1" strokeDasharray="1.2 2.2" />
        <circle r="14" fill="none" stroke="#d8b46e" strokeWidth="0.6" />
        <circle r="9" fill="none" stroke="#d8b46e" strokeWidth="0.4" strokeDasharray="0.5 1.4" />
        <circle r="5.5" fill="#ff3d8a" />
        <circle r="1.2" fill="#131016" />
      </g>
      <text x="48" y="25" fontFamily="var(--font-display), Didot, Georgia, serif" fontStyle="italic" fontSize="27" fill="#f3ece0" letterSpacing="-0.5">
        DJ <tspan fill="#d8b46e">Erick</tspan>
      </text>
      <text x="49" y="36" fontFamily="var(--font-body), sans-serif" fontSize="6.2" letterSpacing="2.1" fill="#d8b46e">HOCHZEITS- & EVENT-DJ</text>
    </svg>
  );
}
