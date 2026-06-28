import { useEffect } from 'react';
import Lenis from 'lenis';

export function useLenis({ enabled = true, wrapperRef, contentRef, onScroll } = {}) {
  useEffect(() => {
    if (!enabled || !wrapperRef?.current || !contentRef?.current) return undefined;

    const lenis = new Lenis({
      wrapper: wrapperRef.current,
      content: contentRef.current,
      duration: 1.25,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 0.75,
      touchMultiplier: 1.05,
    });

    const handleScroll = ({ progress }) => onScroll?.(progress);
    lenis.on('scroll', handleScroll);

    let frame = 0;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.off('scroll', handleScroll);
      lenis.destroy();
    };
  }, [contentRef, enabled, onScroll, wrapperRef]);
}
