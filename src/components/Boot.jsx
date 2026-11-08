import { useEffect, useState } from 'react';
import { builds, experience, skills } from '../data/content.js';
import { prefersReducedMotion } from '../lib/utils.js';

const depCount = skills.reduce((n, g) => n + g.items.length, 0);

const LINES = [
  [['p', '$ '], ['', 'git clone github.com/De-Vin/vinay-avvaru']],
  [['dim', "Cloning into 'vinay-avvaru'… done."]],
  [['p', '$ '], ['', 'npm run build -- --profile=software-engineer']],
  [['dim', '› '], ['', `resolving ${depCount} dependencies`]],
  [['dim', '› '], ['', `compiling ${experience.length} roles · Aug 2023 → present`]],
  [['dim', '› '], ['', `bundling ${builds.length} release artifacts`]],
  [['ok', '✓ build passed — pixels in, production out.']],
];

const SEEN_KEY = 'va:booted';

function alreadyBooted() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

/** Terminal boot sequence. Shown once per browser session; skippable; skipped for reduced motion. */
export default function Boot({ onDone }) {
  const [skip] = useState(() => prefersReducedMotion() || alreadyBooted());
  const [shown, setShown] = useState(0);
  const [done, setDone] = useState(skip);

  useEffect(() => {
    if (skip) {
      onDone();
      return;
    }
    let finished = false;
    const timers = [];
    const finish = () => {
      if (finished) return;
      finished = true;
      timers.forEach(clearTimeout);
      setShown(LINES.length);
      setDone(true);
      try { sessionStorage.setItem(SEEN_KEY, '1'); } catch { /* storage unavailable */ }
      onDone();
    };
    let t = 250;
    LINES.forEach((_, i) => {
      t += i === 1 || i === LINES.length - 1 ? 380 : 230;
      timers.push(setTimeout(() => setShown(i + 1), t));
    });
    timers.push(setTimeout(finish, t + 650));
    window.addEventListener('keydown', finish, { once: true });
    window.addEventListener('pointerdown', finish, { once: true });
    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('keydown', finish);
      window.removeEventListener('pointerdown', finish);
    };
  }, [skip, onDone]);

  if (skip) return null;

  return (
    <div className={`boot ${done ? 'is-done' : ''}`} aria-hidden="true">
      <div className="boot__inner">
        <div className="boot__bar"><span /><span /><span /><b>~/vinay-avvaru — zsh</b></div>
        <pre className="boot__log">
          {LINES.slice(0, shown).map((parts, i) => (
            <div key={i}>
              {parts.map(([cls, text], j) => <span key={j} className={cls}>{text}</span>)}
            </div>
          ))}
          {!done && <span className="cursor" />}
        </pre>
        <div className="boot__hint">press any key to skip</div>
      </div>
    </div>
  );
}
