import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import ThreeScene from './ThreeScene';
import { SharinganSVG } from './CrowsBackground';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const socials = [
  { icon: <FaGithub />,   href: 'https://github.com/stojkov5',                               label: 'GitHub' },
  { icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/aleksandar-stojkov-b37ab0304/', label: 'LinkedIn' },
  { icon: <FaEnvelope />, href: 'mailto:a.stojkov5@gmail.com',                               label: 'Email' },
];

export default function Main() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Parallax: text drifts up + fades, 3D scene sinks + scales (GTA VI depth)
  const textY = useTransform(scrollYProgress, [0, 1], [0, -130]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const canvasY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const watermarkY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section id="home" className="hero-section" ref={ref}>
      <motion.div style={{ y: watermarkY }}>
        <SharinganSVG className="sharingan-watermark" />
      </motion.div>

      <div className="hero-container">
        <motion.div style={{ y: textY, opacity: textOpacity }}>
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={itemVariants} className="hero-badge">
              <span className="hero-badge-dot" />
              Available for work · 2026
            </motion.div>

            <motion.p variants={itemVariants} className="hero-greeting">
              Hi, I&apos;m
            </motion.p>

            <motion.h1 variants={itemVariants} className="hero-name">
              Aleksandar<br />Stojkov
            </motion.h1>

            <motion.p variants={itemVariants} className="hero-title">
              Front-End Developer
            </motion.p>

            <motion.div variants={itemVariants}>
              <TypeAnimation
                className="hero-typed"
                sequence={[
                  'HTML & CSS', 900,
                  'JavaScript', 900,
                  'Next.js', 900,
                  'React', 900,
                  'Bootstrap', 900,
                  'TailwindCSS', 900,
                  'Git', 900,
                  'GitHub', 900,
                ]}
                wrapper="span"
                speed={55}
                repeat={Infinity}
              />
            </motion.div>

            <motion.div variants={itemVariants} className="hero-cta">
              <a href="#portfolio">
                <motion.button className="btn-primary-glow" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  View Missions
                </motion.button>
              </a>
              <a href="#contact">
                <motion.button className="btn-outline-glow" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  Make Contact
                </motion.button>
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="hero-socials">
              {socials.map(({ icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {icon}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-canvas"
          style={{ y: canvasY, scale: canvasScale }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <ThreeScene />
        </motion.div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-indicator-line" />
        <span>scroll</span>
      </div>
    </section>
  );
}
