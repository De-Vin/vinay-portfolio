export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const hasFinePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export const pad2 = (n) => String(n).padStart(2, '0');

/** Stable 7-char hex "commit hash" from any string (decorative only). */
export function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7);
}

/** Months between two 'YYYY-MM' strings (end = null → now), counting the start month. */
export function monthsBetween(start, end) {
  const [sy, sm] = start.split('-').map(Number);
  const now = new Date();
  const [ey, em] = end ? end.split('-').map(Number) : [now.getFullYear(), now.getMonth() + 1];
  return Math.max(1, (ey - sy) * 12 + (em - sm) + 1);
}

export function formatDuration(months) {
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y && `${y} yr${y > 1 ? 's' : ''}`, m && `${m} mo${m > 1 ? 's' : ''}`].filter(Boolean).join(' ');
}

/** Decode-style text scramble for labels. Returns a cancel function. */
export function scramble(el, finalText, duration = 700) {
  if (!el || prefersReducedMotion()) return () => {};
  const glyphs = '01<>/{}[]=+*#_$';
  const start = performance.now();
  let raf;
  const tick = (now) => {
    const p = Math.min(1, (now - start) / duration);
    const settled = Math.floor(p * finalText.length);
    el.textContent = [...finalText]
      .map((c, i) => (i < settled || c === ' ' ? c : glyphs[(Math.random() * glyphs.length) | 0]))
      .join('');
    if (p < 1) raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => {
    cancelAnimationFrame(raf);
    el.textContent = finalText;
  };
}
