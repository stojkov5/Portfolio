import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaFacebook, FaPaperPlane } from 'react-icons/fa';

const contactItems = [
  {
    icon: <FaEnvelope />,
    label: 'Email',
    value: 'a.stojkov5@gmail.com',
    href: 'mailto:a.stojkov5@gmail.com',
  },
  {
    icon: <FaLinkedin />,
    label: 'LinkedIn',
    value: 'Aleksandar Stojkov',
    href: 'https://www.linkedin.com/in/aleksandar-stojkov-b37ab0304/',
  },
  {
    icon: <FaFacebook />,
    label: 'Facebook',
    value: 'Stojkov Aleksandar',
    href: '#',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Contact() {
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 });
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 });

  return (
    <section id="contact" className="section-wrapper">
      <div className="section-inner">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="section-label">Let&apos;s Connect</p>
          <h2 className="section-title">Get In Touch</h2>
          <div className="glow-line" />
        </motion.div>

        <motion.div
          ref={gridRef}
          className="contact-grid"
          variants={containerVariants}
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants} className="contact-info-card">
            <h3 className="contact-info-title">Let&apos;s work together</h3>
            <p className="contact-info-subtitle">
              I&apos;m available for freelance projects and full-time opportunities.
              Feel free to reach out — I&apos;d love to hear from you!
            </p>

            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href !== '#' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="contact-item"
              >
                <div className="contact-item-icon">{item.icon}</div>
                <div>
                  <span className="contact-item-label">{item.label}</span>
                  <span className="contact-item-value">{item.value}</span>
                </div>
              </a>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="contact-form-card">
            <form action="https://getform.io/f/bejjpwpa" method="POST">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your message..."
                  className="form-textarea"
                  rows={5}
                  required
                />
              </div>
              <motion.button
                type="submit"
                className="submit-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <FaPaperPlane />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
