import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BootSequence } from './components/BootSequence';
import { Experience, ProductSpecsOverlay } from './components/Experience';
import { HUD } from './components/HUD';
import { ProjectWindow } from './components/ProjectWindow';
import './App.css';

function shouldDriveCamera(target) {
  return !target.closest?.('input, textarea, button, a, .terminal, .project-window__panel');
}

export default function App() {
  const [booting, setBooting] = useState(true);
  const [activeProject, setActiveProject] = useState(null);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef(0);
  const touchYRef = useRef(0);

  /* Direct update — no velocity, no snap, no fighting.
     Just set target and let the lerp catch up. */
  const moveCamera = useCallback((delta) => {
    targetRef.current = Math.max(0, Math.min(1, targetRef.current + delta));
  }, []);

  const navigateTo = useCallback((target) => {
    targetRef.current = Math.max(0, Math.min(1, target));
  }, []);

  /* Simple lerp loop — tight interpolation, no spring physics */
  useEffect(() => {
    const tick = () => {
      const diff = targetRef.current - progressRef.current;
      if (Math.abs(diff) > 0.0001) {
        // Lerp factor 0.12 = responsive but smooth. No velocity accumulation.
        progressRef.current += diff * 0.12;
        progressRef.current = Math.max(0, Math.min(1, progressRef.current));
        setProgress(progressRef.current);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <main className="app-shell">
      <AnimatePresence mode="wait">
        {booting ? <BootSequence key="boot" onComplete={() => setBooting(false)} /> : null}
      </AnimatePresence>

      <AnimatePresence>
        {!booting ? (
          <motion.div
            key="experience"
            className="experience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            onWheel={(e) => {
              if (!shouldDriveCamera(e.target)) return;
              e.preventDefault();
              /* Direct: deltaY / innerHeight gives ~0.1 per full wheel tick.
                 No cap, no damping — you scroll, it moves. */
              moveCamera(e.deltaY / (window.innerHeight * 1.8));
            }}
            onTouchStart={(e) => {
              if (!shouldDriveCamera(e.target)) return;
              touchYRef.current = e.touches[0]?.clientY ?? 0;
            }}
            onTouchMove={(e) => {
              if (!shouldDriveCamera(e.target)) return;
              const y = e.touches[0]?.clientY ?? touchYRef.current;
              moveCamera((touchYRef.current - y) / (window.innerHeight * 1.5));
              touchYRef.current = y;
            }}
            onKeyDown={(e) => {
              if (!shouldDriveCamera(e.target)) return;
              if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') moveCamera(0.15);
              if (e.key === 'ArrowUp' || e.key === 'PageUp') moveCamera(-0.15);
            }}
            tabIndex={0}
          >
            <HUD progress={progress} onNavigate={navigateTo} />
            <ProductSpecsOverlay progress={progress} onProjectSelect={setActiveProject} />
            <Experience progress={progress} />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <ProjectWindow project={activeProject} onClose={() => setActiveProject(null)} />
    </main>
  );
}
