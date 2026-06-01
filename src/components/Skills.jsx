import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaReact, FaBootstrap, FaGitAlt, FaGithub } from 'react-icons/fa';
import { SiJavascript } from 'react-icons/si';

const skills = [
  { name: 'HTML5',      icon: <FaHtml5 />,      color: '#e34f26', level: 95 },
  { name: 'CSS3',       icon: <FaCss3Alt />,     color: '#1572b6', level: 90 },
  { name: 'JavaScript', icon: <SiJavascript />,  color: '#f7df1e', level: 85 },
  { name: 'React',      icon: <FaReact />,       color: '#61dafb', level: 85 },
  { name: 'Bootstrap',  icon: <FaBootstrap />,   color: '#7952b3', level: 80 },
  { name: 'Git',        icon: <FaGitAlt />,      color: '#f05032', level: 80 },
  { name: 'GitHub',     icon: <FaGithub />,      color: '#e2e8f0', level: 85 },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Skills() {
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 });

  return (
    <section id="skills" className="section-wrapper">
      <div className="section-inner">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="section-label">What I Know</p>
          <h2 className="section-title">Skills &amp; Tech</h2>
          <div className="glow-line" />
        </motion.div>

        <motion.div
          ref={gridRef}
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              className="skill-card"
              variants={cardVariants}
              whileHover={{ y: -7, scale: 1.03, transition: { duration: 0.2 } }}
            >
              <span
                className="skill-icon"
                style={{
                  color: skill.color,
                  filter: `drop-shadow(0 0 10px ${skill.color}88)`,
                }}
              >
                {skill.icon}
              </span>
              <p className="skill-name">{skill.name}</p>
              <div className="skill-bar-wrapper">
                <motion.div
                  className="skill-bar"
                  initial={{ width: 0 }}
                  animate={gridInView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 1.1, delay: 0.35, ease: 'easeOut' }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
