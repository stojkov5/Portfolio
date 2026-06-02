import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaReact, FaCode, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { SiJavascript, SiNextdotjs } from 'react-icons/si';

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
  { category: 'NextJS',     title: 'ABGCC',                         gitproject: 'https://github.com/stojkov5/abgcc', demo: 'https://abgcc.org/' },
];

const filters = ['All', 'HTML, CSS', 'JavaScript', 'React', 'NextJS'];

const categoryIcon = (cat) => {
  if (cat === 'React')      return <FaReact />;
  if (cat === 'JavaScript') return <SiJavascript />;
  if (cat === 'NextJS')     return <SiNextdotjs />;
  return <FaCode />;
};

function useCardWidth() {
  const [w, setW] = useState(300);
  useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth;
      setW(vw < 600 ? 220 : vw < 900 ? 260 : 300);
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);
  return w;
}

function Carousel({ items }) {
  const cardW = useCardWidth();
  const cardH = cardW < 240 ? 320 : 360;
  const count = items.length;

  const { theta, radius } = useMemo(() => {
    const t = 360 / count;
    let r = 0;
    if (count > 1) {
      r = Math.max(Math.round((cardW / 2) / Math.tan((t / 2) * (Math.PI / 180))), 240);
    }
    return { theta: t, radius: r };
  }, [count, cardW]);

  const [rotation, setRotation] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [paused, setPaused] = useState(false);
  const drag = useRef({ active: false, startX: 0, startRot: 0, moved: false });

  // Reset when the filtered set changes
  useEffect(() => { setRotation(0); }, [count]);

  const activeIndex = count > 0 ? (((Math.round(-rotation / theta) % count) + count) % count) : 0;

  const next = useCallback(() => setRotation((r) => r - theta), [theta]);
  const prev = useCallback(() => setRotation((r) => r + theta), [theta]);

  const goTo = useCallback((i) => {
    const base = -i * theta;
    setRotation((r) => {
      const k = Math.round((r - base) / 360);
      return base + k * 360;
    });
  }, [theta]);

  // Auto-rotate
  useEffect(() => {
    if (paused || count <= 1) return;
    const id = setInterval(() => setRotation((r) => r - theta), 3800);
    return () => clearInterval(id);
  }, [paused, theta, count]);

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  const onPointerDown = (e) => {
    drag.current = { active: true, startX: e.clientX, startRot: rotation, moved: false };
    setDragging(true);
    setPaused(true);
  };
  const onPointerMove = (e) => {
    if (!drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    setRotation(drag.current.startRot + dx * 0.28);
  };
  const endDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setDragging(false);
    setPaused(false);
    setRotation((r) => Math.round(r / theta) * theta);
  };

  const active = items[activeIndex];

  return (
    <>
      <div
        className="carousel-viewport"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { setPaused(false); endDrag(); }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
      >
        <div
          className={`carousel-ring${dragging ? ' dragging' : ''}`}
          style={{
            width: cardW,
            height: cardH,
            transform: `translateZ(-${radius}px) rotateY(${rotation}deg)`,
          }}
        >
          {items.map((project, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={project.title}
                className="carousel-card"
                style={{
                  width: cardW,
                  height: cardH,
                  transform: `rotateY(${i * theta}deg) translateZ(${radius}px)`,
                }}
                onClick={() => { if (!drag.current.moved) goTo(i); }}
              >
                <div className={`carousel-card-inner${isActive ? ' is-active' : ''}`}>
                  <span className="carousel-num">{String(i + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span>
                  <div className="project-header">
                    <div className="project-icon">{categoryIcon(project.category)}</div>
                    <div className="project-links">
                      {project.gitproject && (
                        <a href={project.gitproject} target="_blank" rel="noopener noreferrer" className="project-link" aria-label="GitHub" onClick={(e) => e.stopPropagation()}>
                          <FaGithub />
                        </a>
                      )}
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link" aria-label="Live demo" onClick={(e) => e.stopPropagation()}>
                          <FaExternalLinkAlt />
                        </a>
                      )}
                    </div>
                  </div>
                  <h3 className="project-title">{project.title}</h3>
                  <span className="project-category">{project.category}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="carousel-controls">
        <button className="carousel-btn" onClick={prev} aria-label="Previous project"><FaChevronLeft /></button>
        <div className="carousel-dots">
          {items.map((p, i) => (
            <button
              key={p.title}
              className={`carousel-dot${i === activeIndex ? ' active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to ${p.title}`}
            />
          ))}
        </div>
        <button className="carousel-btn" onClick={next} aria-label="Next project"><FaChevronRight /></button>
      </div>

      <p className="carousel-hint">
        {active ? active.title : ''} — drag · swipe · or use ← →
      </p>
    </>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });

  const filtered = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section id="portfolio" className="section-wrapper">
      <div className="section-ghost">WORK</div>
      <div className="section-inner">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="section-label">Completed Missions</p>
          <h2 className="section-title">Field Operations</h2>
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

        <Carousel key={filter} items={filtered} />
      </div>
    </section>
  );
}
