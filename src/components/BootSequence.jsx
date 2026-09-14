import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/portfolio';

export function BootSequence({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = null;
    const duration = 3200;

    const tick = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const next = Math.min(1, elapsed / duration);
      setProgress(next);

      if (next < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(onComplete, 600);
      }
    };

    requestAnimationFrame(tick);
  }, [onComplete]);

  return (
    <motion.div
      className="boot"
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    >
      <div className="boot__content">
        <motion.div
          className="boot__subtitle"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          PORTFOLIO
        </motion.div>

        <motion.div
          className="boot__title"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {profile.name}
        </motion.div>

        <motion.div
          style={{
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--blue, #00A3FF)',
            fontWeight: 400,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {profile.role}
        </motion.div>

        <motion.div
          className="boot__meter-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <div
            className="boot__meter"
            style={{ transform: `scaleX(${progress})`, transformOrigin: 'left' }}
          />
        </motion.div>

        <motion.div
          style={{
            fontSize: '0.55rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--text-muted, #3A5070)',
            fontFamily: 'var(--font-body)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: progress > 0.3 ? 0.6 : 0 }}
          transition={{ duration: 0.4 }}
        >
          {progress < 0.3
            ? 'INITIALIZING...'
            : progress < 0.6
            ? 'LOADING SYSTEMS...'
            : progress < 0.9
            ? 'PREPARING EXPERIENCE...'
            : 'READY'}
        </motion.div>
      </div>
    </motion.div>
  );
}
