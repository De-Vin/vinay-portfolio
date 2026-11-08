import { useEffect } from 'react';

const SELECTOR = '[data-reveal], .split, .commit, .track, [data-frame], .hero__title';

/**
 * One shared IntersectionObserver for every reveal target on the page
 * (cheaper than an observer per component). Adds `.is-in` once, then unobserves.
 */
export function useRevealAll(enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const targets = document.querySelectorAll(SELECTOR);
    if (!('IntersectionObserver' in window)) {
      targets.forEach((t) => t.classList.add('is-in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [enabled]);
}
