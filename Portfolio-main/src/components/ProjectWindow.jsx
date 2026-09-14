import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export function ProjectWindow({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="project-window"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onMouseDown={onClose}
        >
          <motion.article
            className="project-window__panel"
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 40, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button className="project-window__close" onClick={onClose} aria-label="Close project">
              CLOSE
            </button>

            <header>
              <motion.span
                className="project-window__category"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
              >
                {project.category}
              </motion.span>

              <motion.h2
                className="project-window__title"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {project.title}
              </motion.h2>

              <motion.p
                className="project-window__overview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                {project.overview}
              </motion.p>
            </header>

            <motion.section
              className="project-window__grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              {project.highlights && project.highlights.length > 0 && (
                <div>
                  <strong>Highlights</strong>
                  <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.7, fontWeight: 300 }}>
                    {project.highlights.map((h, i) => (
                      <li key={i} style={{ marginBottom: '0.4rem' }}>{h}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <strong>Architecture</strong>
                <span>{project.architecture}</span>
              </div>
              <div>
                <strong>Challenges</strong>
                <span>{project.challenges}</span>
              </div>
            </motion.section>

            <motion.div
              className="project-window__tech"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <span className="project-window__tech-label">Technology Stack</span>
              {project.tech.map((tech) => (
                <span key={tech} className="project-window__tech-tag">{tech}</span>
              ))}
            </motion.div>

            <motion.div
              className="project-window__links"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.4 }}
            >
              {project.links.map((link) => (
                <a href={link.href} key={link.href} className="project-window__link">
                  <ExternalLink size={13} />
                  {link.label}
                </a>
              ))}
            </motion.div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
