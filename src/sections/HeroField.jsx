import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from '../lib/utils.js';

/**
 * Design-canvas dot grid behind the hero. Dots near the pointer swell and warm
 * to signal orange. Renders only while visible and only while something changes.
 */
export default function HeroField({ pointer }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const GAP = 28;
    let w = 0, h = 0, dpr = 1, raf = 0, visible = true;
    let cur = { x: -9999, y: -9999 }; // eased pointer
    const reduced = prefersReducedMotion();

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      schedule();
    };

    const draw = () => {
      raf = 0;
      const target = pointer.current;
      cur.x += (target.x - cur.x) * (reduced ? 1 : 0.12);
      cur.y += (target.y - cur.y) * (reduced ? 1 : 0.12);
      ctx.clearRect(0, 0, w, h);
      const R = 170;
      for (let y = GAP / 2; y < h; y += GAP) {
        for (let x = GAP / 2; x < w; x += GAP) {
          const dx = x - cur.x, dy = y - cur.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          const t = d < R ? 1 - d / R : 0;
          if (t > 0) {
            const e = t * t;
            // dots are pushed slightly away from the pointer, like a lens
            const px = x + (dx / (d || 1)) * e * 8;
            const py = y + (dy / (d || 1)) * e * 8;
            ctx.fillStyle = `rgba(255, ${Math.round(140 - 50 * e)}, ${Math.round(110 - 67 * e)}, ${0.18 + e * 0.7})`;
            ctx.fillRect(px - 0.7 - e * 1.2, py - 0.7 - e * 1.2, 1.4 + e * 2.4, 1.4 + e * 2.4);
          } else {
            ctx.fillStyle = 'rgba(236, 231, 222, 0.11)';
            ctx.fillRect(x - 0.6, y - 0.6, 1.2, 1.2);
          }
        }
      }
      if (Math.abs(target.x - cur.x) + Math.abs(target.y - cur.y) > 0.5) schedule();
    };

    function schedule() {
      if (!raf && visible) raf = requestAnimationFrame(draw);
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      schedule();
    });
    io.observe(canvas);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    pointer.current.onChange = schedule;

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [pointer]);

  return <canvas className="hero__field" ref={ref} aria-hidden="true" />;
}
