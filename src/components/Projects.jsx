import { useState, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
} from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaReact, FaCode } from 'react-icons/fa';
import { SiJavascript } from 'react-icons/si';

const projects = [
  { category: 'HTML, CSS',  title: 'ZFK-Borec',                    gitproject: 'https://github.com/stojkov5/First-Project-ZFK-Borec' },
  { category: 'HTML, CSS',  title: 'Здружение на музичари',         gitproject: 'https://github.com/stojkov5/Zam-page', demo: 'https://zammk.netlify.app/' },
  { category: 'JavaScript', title: 'City Info',                     demo: 'https://city-info-project.netlify.app/' },
  { category: 'React',      title: 'Tic-Tac-Toe' },
  { category: 'React',      title: 'Padel Federation of Macedonia', gitproject: 'https://github.com/stojkov5/padel-federation-project', demo: 'https://padelfederation.mk' },
  { category: 'React',      title: 'Task Tracker',                  gitproject: 'https://github.com/stojkov5/progress-tracker', demo: 'https://progresstracker05.netlify.app/' },
  { category: 'React',      title: 'FinRule',                       gitproject: 'https://github.com/stojkov5/FinRule', demo: 'https://finrule.io' },
  { category: 'React',      title: 'FankoskArt',                    gitproject: 'https://github.com/stojkov5/FankoskArt', demo: 'https://fankoskart.shop' },
  { category: 'React',      title: 'AquaPro',                       gitproject: 'https://github.com/stojkov5/aqua-pro', demo: 'https://aquaproswim.com' },
  { category: 'React',      title: 'Cowork Konnectivity',           gitproject: 'https://github.com/stojkov5/ConnectivityCowork', demo: 'https://konnectivity.mk/' },
  { category: 'NextJS',     title: 'ABGCC',       gitproject: 'https://github.com/stojkov5/abgcc' , demo: 'https://abgcc.org/' },
];

const filters = ['All', 'HTML, CSS', 'JavaScript', 'React'];

const categoryIcon = (cat) => {
  if (cat === 'React') return <FaReact />;
  if (cat === 'JavaScript') return <SiJavascript />;
  return <FaCode />;
};

function TiltCard({ children }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 24 });
  const springY = useSpring(y, { stiffness: 280, damping: 24 });
  const rotateX = useTransform(springY, [-80, 80], [7, -7]);
  const rotateY = useTransform(springX, [-80, 80], [-7, 7]);

  const onMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    x.set(e.clientX - (rect.left + rect.width / 2));
    y.set(e.clientY - (rect.top + rect.height / 2));
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="project-card-wrapper" ref={cardRef}>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </motion.div>
    </div>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
  exit: { opacity: 0, scale: 0.94, transition: { duration: 0.25 } },
};

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

  const filtered = filter === 'All'
    ? projects
    : projects.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="section-wrapper">
      <div className="section-inner">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="section-label">My Work</p>
          <h2 className="section-title">Projects</h2>
          <div className="glow-line" />
        </motion.div>

        <motion.div
          className="filter-tabs"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.18 }}
        >
          {filters.map((f) => (
            <motion.button
              key={f}
              className={`filter-tab${filter === f ? ' active' : ''}`}
              onClick={() => setFilter(f)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              {f}
            </motion.button>
          ))}
        </motion.div>

        <motion.div className="projects-grid" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <TiltCard key={project.title}>
                <motion.div
                  className="project-card"
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                >
                  <div className="project-header">
                    <div className="project-icon">{categoryIcon(project.category)}</div>
                    <div className="project-links">
                      {project.gitproject && (
                        <a
                          href={project.gitproject}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                          aria-label="GitHub"
                        >
                          <FaGithub />
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-link"
                          aria-label="Live demo"
                        >
                          <FaExternalLinkAlt />
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <span className="project-category">{project.category}</span>
                </motion.div>
              </TiltCard>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
