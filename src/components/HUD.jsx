import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/portfolio';

const sections = ['Intro', 'Skills', 'Education', 'Projects', 'Contact'];
const sectionBreaks = [0, 0.2, 0.4, 0.6, 0.82];

function getActiveSection(progress) {
  for (let i = sectionBreaks.length - 1; i >= 0; i--) {
    if (progress >= sectionBreaks[i] - 0.05) return i;
  }
  return 0;
}

export function HUD({ progress, onNavigate }) {
  const [time, setTime] = useState('');
  const active = getActiveSection(progress);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Kolkata',
        }).format(new Date())
      );
    tick();
    const timer = setInterval(tick, 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <motion.div
        className="hud"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        <div className="hud__top">
          <div className="hud__identity">
            <span>{profile.name}</span>
            <small>{profile.role}</small>
          </div>
          <div className="hud__identity" style={{ textAlign: 'right' }}>
            <span>PORTFOLIO</span>
            <small>{time} IST</small>
          </div>
        </div>

        <div className="hud__bottom">
          <div className="hud__identity">
            <small>SCROLL TO EXPLORE</small>
          </div>
          <div className="hud__progress-container">
            <div
              className="hud__progress"
              style={{ transform: `scaleX(${progress})`, transformOrigin: 'left' }}
            />
          </div>
        </div>
      </motion.div>

      {/* Section navigation dots */}
      <motion.nav
        className="hud__nav"
        aria-label="Section navigation"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        {sections.map((label, i) => (
          <button
            key={label}
            className={`hud__nav-dot ${active === i ? 'hud__nav-dot--active' : ''}`}
            onClick={() => onNavigate?.(sectionBreaks[i])}
            aria-label={`Go to ${label}`}
            title={label}
          >
            <span className="hud__nav-label">{label}</span>
          </button>
        ))}
      </motion.nav>
    </>
  );
}
