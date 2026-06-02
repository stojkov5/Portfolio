import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const words = [
  { text: 'I', accent: false },
  { text: 'craft', accent: false },
  { text: 'cinematic', accent: true },
  { text: 'web', accent: false },
  { text: 'interfaces', accent: true },
  { text: 'with', accent: false },
  { text: 'the', accent: false },
  { text: 'precision', accent: false },
  { text: 'of', accent: false },
  { text: 'the', accent: false },
  { text: 'Sharingan.', accent: true },
];

function Word({ children, accent, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [12, 0]);
  return (
    <motion.span className={`statement-word${accent ? ' accent' : ''}`} style={{ opacity, y }}>
      {children}
    </motion.span>
  );
}

export default function Statement() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.45'],
  });

  return (
    <section ref={ref} className="statement-section">
      <p className="statement">
        {words.map((w, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={i} accent={w.accent} progress={scrollYProgress} range={[start, end]}>
              {w.text}
            </Word>
          );
        })}
      </p>
    </section>
  );
}
