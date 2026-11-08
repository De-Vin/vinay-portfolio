import { useEffect, useRef, useState } from 'react';
import { builds } from '../data/content.js';
import { config } from '../config.js';
import { useUI } from '../context/UIContext.jsx';
import { hasFinePointer, pad2, prefersReducedMotion } from '../lib/utils.js';
import SplitText from '../components/SplitText.jsx';
import StageHead from '../components/StageHead.jsx';
import Mock from '../components/Mock.jsx';
import { Status } from '../components/CaseDrawer.jsx';

/** Product sketch that trails the cursor over the list (desktop only). */
function FloatingPreview({ listRef }) {
  const ref = useRef(null);
  const [type, setType] = useState(null);

  useEffect(() => {
    if (!hasFinePointer()) return;
    const list = listRef.current;
    const el = ref.current;
    const reduced = prefersReducedMotion();
    let x = 0, y = 0, tx = 0, ty = 0, raf = 0, on = false;

    const apply = () => {
      el.style.setProperty('--x', `${x}px`);
      el.style.setProperty('--y', `${y}px`);
      el.style.setProperty('--r', `${Math.max(-6, Math.min(6, (tx - x) * 0.04))}deg`);
    };
    const loop = () => {
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      apply();
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(loop) : 0;
    };
    const onMove = (e) => {
      const row = e.target.closest('.build-row');
      if (!row) return;
      const w = el.offsetWidth, h = el.offsetHeight;
      tx = Math.min(window.innerWidth - w - 16, e.clientX + 32);
      ty = Math.max(76, Math.min(window.innerHeight - h - 16, e.clientY - h / 2));
      setType(builds.find((b) => b.id === row.dataset.build).mock);
      if (!on) { x = tx; y = ty; on = true; el.classList.add('is-on'); }
      if (reduced) { x = tx; y = ty; apply(); }
      else if (!raf) raf = requestAnimationFrame(loop);
    };
    const onLeave = () => { on = false; el.classList.remove('is-on'); };
    list.addEventListener('pointermove', onMove);
    list.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      list.removeEventListener('pointermove', onMove);
      list.removeEventListener('pointerleave', onLeave);
    };
  }, [listRef]);

  return <div className="build-preview" ref={ref} aria-hidden="true">{type && <Mock type={type} />}</div>;
}

/** 04 · build — release artifacts; each row opens a case file. */
export default function Builds() {
  const { openBuild } = useUI();
  const listRef = useRef(null);

  return (
    <section className="builds stage" id="build" aria-labelledby="build-title">
      <div className="wrap">
        <StageHead id="build" />
        <div className="split-head">
          <h2 className="section-title" id="build-title">
            <SplitText text="Release" by="words" />
            <br />
            <SplitText text="artifacts." by="words" delay={120} className="serif" />
          </h2>
          <p data-reveal style={{ '--d': 3 }}>
            Products and platform work I’ve built, led or contributed to. Each one opens as a case file — the brief, what I did, and what made it hard.
          </p>
        </div>

        <ul className="build-list" ref={listRef}>
          {builds.map((b, i) => (
            <li key={b.id} data-reveal>
              <button type="button" className="build-row" data-build={b.id} aria-haspopup="dialog" onClick={() => openBuild(b.id)}>
                <span className="build-row__n">{pad2(i + 1)} / {pad2(builds.length)}</span>
                <span className="build-row__thumb" aria-hidden="true"><Mock type={b.mock} /></span>
                <span className="build-row__main">
                  <span className="build-row__name">{b.name}</span>
                  <span className="build-row__tagline">{b.tagline}</span>
                </span>
                <span className="build-row__meta">
                  <span className="build-row__kind">{b.kind}</span>
                  <Status build={b} />
                  <span className="build-row__stack">
                    {b.stack.slice(0, 3).map((s) => <span key={s} className="chip">{s}</span>)}
                  </span>
                </span>
                <span className="build-row__open" aria-hidden="true">↗</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="builds__more" data-reveal>
          <span>{builds.length} artifacts · built at Techsophy, Hyderabad</span>
          <a href={config.links.github} target="_blank" rel="noopener noreferrer">more on github.com/De-Vin ↗</a>
        </div>
      </div>
      <FloatingPreview listRef={listRef} />
    </section>
  );
}
