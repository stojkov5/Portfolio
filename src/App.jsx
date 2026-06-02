import { useEffect } from 'react';
import { useScroll, useSpring, motion } from 'framer-motion';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import CrowsBackground from './components/CrowsBackground';
import Header from './components/Header';
import Main from './components/Main';
import Marquee from './components/Marquee';
import Statement from './components/Statement';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  /* ── Lenis smooth momentum scroll (GTA VI feel) ── */
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      smoothWheel: true,
    });
    window.__lenis = lenis;

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Smooth anchor navigation
    const onClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute('href');
      if (id && id.length > 1) {
        e.preventDefault();
        lenis.scrollTo(id, { offset: -80, duration: 1.6 });
      }
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return (
    <div className="app-container">
      <CustomCursor />
      <CrowsBackground />
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <Header />
      <Main />
      <Marquee
        items={['Front-End Developer', 'React', 'Three.js', 'UI Engineer', 'Uchiha Clan']}
      />
      <Statement />
      <Skills />
      <Projects />
      <Marquee
        reverse
        items={['Selected Work', 'Field Operations', 'Open to Missions', 'Let’s Build', 'Sharingan']}
      />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
