import { useEffect, useRef, useState } from 'react';
import { stages } from '../data/content.js';
import { useUI } from '../context/UIContext.jsx';
import { useStageTracker } from '../hooks/useStageTracker.js';

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

/** Fixed top bar: brand, the live CI pipeline of sections, and global actions. */
export default function TopBar() {
  const { activeStage, stageState, inspect, setInspect, setPaletteOpen } = useUI();
  const progressRef = useRef(null);
  const [times, setTimes] = useState(() => stages.map(() => 0));
  useStageTracker(progressRef);

  // the running stage accumulates "build time" while the visitor reads it
  useEffect(() => {
    const id = setInterval(() => {
      if (document.hidden) return;
      setTimes((t) => t.map((v, i) => (i === activeStage ? v + 1 : v)));
    }, 1000);
    return () => clearInterval(id);
  }, [activeStage]);

  return (
    <header className="topbar">
      <a className="brand" href="#init" aria-label="Vinay Avvaru — back to top">
        <span className="brand__mark" aria-hidden="true">va</span>
        <span className="brand__repo"><span className="mute">vinay-avvaru</span><span className="slash">/</span>main</span>
      </a>

      <nav className="pipeline" aria-label="Sections">
        <ol>
          {stages.map((s, i) => {
            const state = stageState(i);
            return (
              <li key={s.id} className={`is-${state}`}>
                <a className="stage-link" href={`#${s.id}`} aria-current={state === 'running' ? 'step' : undefined}>
                  <span className="stage-dot" aria-hidden="true" />
                  <span className="stage-label">{s.label}</span>
                  <span className="stage-time" aria-hidden="true">{state === 'queued' ? '—' : fmt(times[i])}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="topbar__actions">
        <button className="tb-btn tb-btn--inspect" type="button" aria-pressed={inspect} onClick={() => setInspect(!inspect)} title="Inspect mode (I)">
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 3h6M3 3v6M17 17h-6M17 17v-6" /><path d="M8 8l7 3-3 1-1 3z" /></svg>
          <span className="tb-btn__label">Inspect</span>
        </button>
        <button className="tb-btn" type="button" aria-haspopup="dialog" onClick={() => setPaletteOpen(true)} title="Command palette">
          <kbd className="kbd">{isMac ? '⌘K' : 'Ctrl K'}</kbd>
          <span className="tb-btn__label">Run</span>
        </button>
        <a className="tb-cta" href="#ship" data-magnetic>Let’s build <span aria-hidden="true">↗</span></a>
      </div>
      <div className="progress" aria-hidden="true"><span ref={progressRef} /></div>
    </header>
  );
}
