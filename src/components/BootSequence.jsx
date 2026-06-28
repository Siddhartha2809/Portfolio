import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/portfolio';

export function BootSequence({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = null;
    const duration = 3000;

    const tick = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const next = Math.min(1, elapsed / duration);
      setProgress(next);

      if (next < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(onComplete, 500);
      }
    };

    requestAnimationFrame(tick);
  }, [onComplete]);

  return (
    <motion.div
      className="boot"
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      <div className="boot__content">
        <motion.div
          className="boot__subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          PORTFOLIO
        </motion.div>

        <motion.div
          className="boot__title"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {profile.name}
        </motion.div>

        <motion.div
          className="boot__meter-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div
            className="boot__meter"
            style={{ transform: `scaleX(${progress})`, transformOrigin: 'left' }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
