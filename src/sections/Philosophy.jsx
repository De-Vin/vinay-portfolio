import { useEffect, useRef } from 'react';
import { philosophy } from '../data/content.js';
import { pad2, prefersReducedMotion } from '../lib/utils.js';
import StageHead from '../components/StageHead.jsx';

const EMPHASIS = new Set(['done', 'platform', 'puzzle.']);
const words = philosophy.manifesto.split(' ');

/** 06 · config — a scroll-lit manifesto plus an .engineeringrc where every rule cites evidence. */
export default function Philosophy() {
  const pRef = useRef(null);

  // words light up as the paragraph scrolls through the viewport
  useEffect(() => {
    const p = pRef.current;
    const ws = [...p.querySelectorAll('.w')];
    if (prefersReducedMotion()) {
      ws.forEach((w) => w.classList.add('is-lit'));
      return;
    }
    let ticking = false;
    const update = () => {
      ticking = false;
      const r = p.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
      const lit = Math.round(progress * ws.length);
      ws.forEach((w, i) => w.classList.toggle('is-lit', i < lit));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="config stage" id="config" aria-labelledby="config-title">
      <div className="wrap">
        <StageHead id="config" />
        <h2 className="sr-only" id="config-title">Engineering philosophy</h2>
        <p className="manifesto" ref={pRef}>
          {words.map((w, i) => (
            <span key={i}>
              <span className={`w ${EMPHASIS.has(w.replace(/,/g, '')) ? 'em' : ''}`}>{w}</span>{' '}
            </span>
          ))}
        </p>

        <div className="rc" data-reveal>
          <div className="rc__bar">
            <span>~/.engineeringrc</span>
            <span>{philosophy.rules.length} rules · each backed by real work</span>
          </div>
          <ul className="rc__grid">
            {philosophy.rules.map((r, i) => (
              <li className="rule" key={r.key} data-reveal style={{ '--d': i }}>
                <span className="rule__n">rule {pad2(i + 1)}</span>
                <p className="rule__kv"><span className="k">{r.key}</span> = <span className="v">{r.value}</span></p>
                <p className="rule__ev">{r.evidence}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
