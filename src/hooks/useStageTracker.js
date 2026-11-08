import { useEffect } from 'react';
import { stages } from '../data/content.js';
import { useUI } from '../context/UIContext.jsx';

/**
 * Marks the section crossing the upper-middle of the viewport as the "running" stage
 * and drives the 1px scroll progress bar under the top bar.
 */
export function useStageTracker(progressRef) {
  const { setActiveStage } = useUI();

  useEffect(() => {
    let ticking = false;
    const els = stages.map((s) => document.getElementById(s.id));
    const update = () => {
      ticking = false;
      const probe = window.innerHeight * 0.4;
      let idx = 0;
      els.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= probe) idx = i;
      });
      const max = document.documentElement.scrollHeight - window.innerHeight;
      // the last stage can be too short to reach the probe line — finish when at the bottom
      if (max > 0 && window.scrollY >= max - 4) idx = els.length - 1;
      setActiveStage(idx);
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [setActiveStage, progressRef]);
}
