import { useMemo } from 'react';

const CrowSVG = () => (
  <svg width="30" height="18" viewBox="0 0 40 24" fill="currentColor" aria-hidden="true">
    <path d="M20 13 C15 9, 6 5.5, 2 8.5 C7 8.5, 11.5 10.5, 16.5 14.5 C17.8 13.5, 19 13, 20 13Z" />
    <path d="M20 13 C25 9, 34 5.5, 38 8.5 C33 8.5, 28.5 10.5, 23.5 14.5 C22.2 13.5, 21 13, 20 13Z" />
    <ellipse cx="20" cy="14.5" rx="4.5" ry="2.5" />
    <circle cx="25.5" cy="11" r="2.8" />
    <path d="M27.5 10.5 L32 9.5 L29 12Z" />
    <path d="M16.5 16 L13 21 L16 20 L15 23.5 L18.5 18.5Z" />
  </svg>
);

/* Large Sharingan SVG used as section watermark */
export const SharinganSVG = ({ className }) => {
  const tomoe = [0, 1, 2].map((i) => {
    const a = (i / 3) * Math.PI * 2 - Math.PI / 2;
    const r = 1.55;
    const bx = Math.cos(a) * r;
    const by = Math.sin(a) * r;
    // tail center slightly inward
    const tx = bx + Math.cos(a + Math.PI) * 0.36;
    const ty = by + Math.sin(a + Math.PI) * 0.36;
    return { bx, by, tx, ty, a };
  });

  return (
    <svg viewBox="-4 -4 8 8" className={className} aria-hidden="true">
      {/* Outer ring */}
      <circle r="3.6" fill="none" stroke="currentColor" strokeWidth="0.11" />
      {/* 8 outer tick marks */}
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const r0 = 3.3, r1 = 3.7;
        return (
          <line
            key={i}
            x1={Math.cos(a) * r0} y1={Math.sin(a) * r0}
            x2={Math.cos(a) * r1} y2={Math.sin(a) * r1}
            stroke="currentColor" strokeWidth="0.1"
          />
        );
      })}
      {/* Iris ring */}
      <circle r="2.5" fill="none" stroke="currentColor" strokeWidth="0.14" />
      {/* Iris fill */}
      <circle r="2.5" fill="currentColor" fillOpacity="0.08" />
      {/* Inner ring */}
      <circle r="1.0" fill="none" stroke="currentColor" strokeWidth="0.1" />
      {/* Pupil */}
      <circle r="0.55" fill="currentColor" fillOpacity="0.6" />
      {/* 3 Tomoe */}
      {tomoe.map(({ bx, by, tx, ty, a }, i) => (
        <g key={i} fill="currentColor" fillOpacity="0.85">
          <circle cx={bx} cy={by} r="0.3" />
          {/* tail arc approximated with a small crescent */}
          <circle cx={tx} cy={ty} r="0.2" fillOpacity="0.5" />
        </g>
      ))}
      {/* Cross lines through center */}
      {[0, 1, 2, 3].map((i) => {
        const a = (i / 4) * Math.PI;
        return (
          <line
            key={i}
            x1={Math.cos(a) * 2.4} y1={Math.sin(a) * 2.4}
            x2={Math.cos(a + Math.PI) * 2.4} y2={Math.sin(a + Math.PI) * 2.4}
            stroke="currentColor" strokeWidth="0.04" strokeOpacity="0.4"
          />
        );
      })}
    </svg>
  );
};

export default function CrowsBackground() {
  const crows = useMemo(
    () =>
      Array.from({ length: 11 }, (_, i) => ({
        id: i,
        top: 5 + (i * 8.5) % 82,
        duration: 16 + (i * 5) % 22,
        delay: -(i * 3.7) % 30,
        opacity: 0.07 + (i % 4) * 0.03,
        scale: 0.55 + (i % 3) * 0.3,
      })),
    []
  );

  return (
    <div className="crows-bg">
      {crows.map((crow) => (
        <div
          key={crow.id}
          className="crow-fly"
          style={{
            top: `${crow.top}%`,
            animationDuration: `${crow.duration}s`,
            animationDelay: `${crow.delay}s`,
          }}
        >
          <div
            style={{
              transform: `scale(${crow.scale})`,
              opacity: crow.opacity,
              color: '#cc1100',
            }}
          >
            <CrowSVG />
          </div>
        </div>
      ))}
    </div>
  );
}
