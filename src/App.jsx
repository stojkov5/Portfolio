import { useScroll, useSpring, motion } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Main from './components/Main';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="app-container">
      <CustomCursor />
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <Header />
      <Main />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
