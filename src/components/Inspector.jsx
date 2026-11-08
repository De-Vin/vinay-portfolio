import { useEffect, useRef } from 'react';
import { useUI } from '../context/UIContext.jsx';
import { hasFinePointer } from '../lib/utils.js';

/**
 * DevTools-style inspect mode: hover anything on the page to see its
 * element, class and rendered size. Toggle with the top-bar button or "I".
 */
export default function Inspector() {
  const { inspect, setInspect, toast } = useUI();
  const boxRef = useRef(null);
  const tagRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle('is-inspecting', inspect);
    if (!inspect) return;
    if (!hasFinePointer()) {
      toast('Inspect mode needs a mouse or trackpad');
      setInspect(false);
      return;
    }
    toast('Inspect mode — hover anything · press I or Esc to exit');

    let raf = 0;
    let last = null;
    const draw = (x, y) => {
      raf = 0;
      const el = document.elementFromPoint(x, y);
      if (!el || el === last) return;
      last = el;
      const r = el.getBoundingClientRect();
      Object.assign(boxRef.current.style, { left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px` });
      const cls = typeof el.className === 'string' && el.className.trim() ? `.${el.className.trim().split(/\s+/)[0]}` : '';
      const id = el.id ? `#${el.id}` : '';
      tagRef.current.innerHTML = '';
      const b = document.createElement('b');
      b.textContent = `${el.tagName.toLowerCase()}${id}${cls}`;
      const s = document.createElement('span');
      s.textContent = `${Math.round(r.width)} × ${Math.round(r.height)}`;
      tagRef.current.append(b, s);
      const tagTop = r.top > 28 ? r.top - 24 : Math.min(window.innerHeight - 24, r.bottom + 4);
      Object.assign(tagRef.current.style, {
        left: `${Math.max(4, Math.min(window.innerWidth - 260, r.left))}px`,
        top: `${tagTop}px`,
      });
    };
    const onMove = (e) => {
      if (!raf) raf = requestAnimationFrame(() => draw(e.clientX, e.clientY));
    };
    const onKey = (e) => e.key === 'Escape' && setInspect(false);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('keydown', onKey);
    };
  }, [inspect, setInspect, toast]);

  return (
    <div className="inspector" aria-hidden="true">
      <div className="inspector__box" ref={boxRef} />
      <div className="inspector__tag" ref={tagRef} />
    </div>
  );
}
