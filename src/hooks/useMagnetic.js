import { useEffect } from 'react';
import { hasFinePointer, prefersReducedMotion } from '../lib/utils.js';

/** Subtle magnetic pull on every `[data-magnetic]` element (fine pointers only). */
export function useMagnetic() {
  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    const els = [...document.querySelectorAll('[data-magnetic]')];
    const cleanups = els.map((el) => {
      el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      const move = (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * 0.22;
        const y = (e.clientY - (r.top + r.height / 2)) * 0.32;
        el.style.transform = `translate(${x}px, ${y}px)`;
      };
      const leave = () => (el.style.transform = '');
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      return () => {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave', leave);
      };
    });
    return () => cleanups.forEach((c) => c());
  }, []);
}
