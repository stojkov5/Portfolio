export default function Marquee({ items, reverse = false }) {
  const Group = () => (
    <div className="marquee-group" aria-hidden="true">
      {items.map((item, i) => (
        <span key={i} className={`marquee-item${i % 2 === 0 ? ' filled' : ''}`}>
          {item}
          <span className="marquee-sep">✦</span>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee">
      <div className={`marquee-track${reverse ? ' reverse' : ''}`}>
        <Group />
        <Group />
      </div>
    </div>
  );
}
