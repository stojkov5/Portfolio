import { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 130, damping: 18, mass: 0.15 });
  const springY = useSpring(mouseY, { stiffness: 130, damping: 18, mass: 0.15 });

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const move = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.div
        className="cursor-dot"
        style={{ left: mouseX, top: mouseY }}
      />
      <motion.div
        className="cursor-ring"
        style={{ left: springX, top: springY }}
      />
    </>
  );
}
