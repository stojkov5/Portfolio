import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const socials = [
  { icon: <FaGithub />,   href: 'https://github.com/stojkov5',                               label: 'GitHub' },
  { icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/aleksandar-stojkov-b37ab0304/', label: 'LinkedIn' },
  { icon: <FaEnvelope />, href: 'mailto:a.stojkov5@gmail.com',                               label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-quote">
         
          <span style={{ fontSize: 11, marginTop: 6, display: 'block', fontStyle: 'normal' }}>
            © 2024 Aleksandar Stojkov · Built with React &amp; Three.js
          </span>
        </p>

        <div className="footer-socials">
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
        </div>
      </div>
    </footer>
  );
}
