import { useEffect, useRef, useState } from 'react';
import { builds } from '../data/content.js';
import { useUI } from '../context/UIContext.jsx';
import { useFocusTrap } from '../hooks/useFocusTrap.js';
import { pad2, prefersReducedMotion } from '../lib/utils.js';
import Mock from './Mock.jsx';

export function Status({ build }) {
  return (
    <span className={`status ${build.live ? 'is-live' : ''}`}>
      <i aria-hidden="true" />
      {build.status}
    </span>
  );
}

function Links({ links }) {
  if (!links.live && !links.github) {
    return <span className="note">Built at Techsophy — source and demo are private to the company. Happy to walk through it in a conversation.</span>;
  }
  return (
    <>
      {links.live && (
        <a className="btn btn--solid" href={links.live} target="_blank" rel="noopener noreferrer">
          Live demo <span className="btn__arrow" aria-hidden="true">↗</span>
        </a>
      )}
      {links.github && (
        <a className="btn" href={links.github} target="_blank" rel="noopener noreferrer">
          Source <span className="btn__arrow" aria-hidden="true">↗</span>
        </a>
      )}
    </>
  );
}

/** Slide-in case file for a build. Deep-linkable via #build/<id>. */
export default function CaseDrawer() {
  const { openBuildId, openBuild, closeBuild } = useUI();
  const [shownId, setShownId] = useState(null); // keeps content mounted during the close animation
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);
  const panelRef = useRef(null);
  const wasOpen = useRef(false);
  useFocusTrap(rootRef, !!openBuildId);

  // open / close transitions
  useEffect(() => {
    if (openBuildId) {
      setShownId(openBuildId);
      document.body.classList.add('is-locked');
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setIsOpen(true)));
      history.replaceState(null, '', `#build/${openBuildId}`);
      wasOpen.current = true;
      return () => cancelAnimationFrame(raf);
    }
    if (!wasOpen.current) return; // first mount: leave any #build/<id> deep link alone
    wasOpen.current = false;
    setIsOpen(false);
    document.body.classList.remove('is-locked');
    if (location.hash.startsWith('#build/')) history.replaceState(null, '', '#build');
    const t = setTimeout(() => setShownId(null), prefersReducedMotion() ? 0 : 650);
    return () => clearTimeout(t);
  }, [openBuildId]);

  useEffect(() => {
    if (!shownId) return;
    panelRef.current?.scrollTo(0, 0);
    panelRef.current?.focus({ preventScroll: true });
  }, [shownId]);

  // Esc to close, and deep links on first load
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && closeBuild();
    window.addEventListener('keydown', onKey);
    const deep = location.hash.match(/^#build\/([\w-]+)/);
    const t = deep && builds.some((b) => b.id === deep[1]) ? setTimeout(() => openBuild(deep[1]), 500) : null;
    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const build = builds.find((b) => b.id === shownId);
  if (!build) return null;

  const i = builds.indexOf(build);
  const prev = builds[(i - 1 + builds.length) % builds.length];
  const next = builds[(i + 1) % builds.length];

  return (
    <div className={`drawer ${isOpen ? 'is-open' : ''}`} role="dialog" aria-modal="true" aria-labelledby="drawer-title" ref={rootRef}>
      <div className="drawer__scrim" onClick={closeBuild} />
      <article className="drawer__panel" tabIndex={-1} ref={panelRef}>
        <div className="case">
          <div className="case__bar">
            <span>case-file / {pad2(i + 1)} · {build.id}.md</span>
            <button type="button" className="case__close" onClick={closeBuild}>
              close <kbd className="kbd">esc</kbd>
            </button>
          </div>

          <header className="case__head">
            <p className="case__kind">{build.kind}</p>
            <h2 className="case__title" id="drawer-title">{build.name}</h2>
            <p className="case__tagline">{build.tagline}</p>
          </header>

          <div className="case__mock"><Mock type={build.mock} /></div>
          <dl className="case__facts">
            <div><dt>my role</dt><dd>{build.role}</dd></div>
            <div><dt>timeline</dt><dd>{build.period}</dd></div>
            <div><dt>status</dt><dd><Status build={build} /></dd></div>
          </dl>

          <section className="case__sec">
            <h3><span>01</span>the brief — what it solves</h3>
            <p className="case__brief">{build.brief}</p>
          </section>
          <section className="case__sec">
            <h3><span>02</span>my contribution</h3>
            <ul className="case__did">{build.did.map((d) => <li key={d}>{d}</li>)}</ul>
          </section>
          <section className="case__sec">
            <h3><span>03</span>engineering challenges</h3>
            <ul className="case__challenges">
              {build.challenges.map(([t, d]) => (
                <li key={t}><b>{t}</b><p>{d}</p></li>
              ))}
            </ul>
          </section>
          <section className="case__sec">
            <h3><span>04</span>stack</h3>
            <div className="case__stack">{build.stack.map((s) => <span key={s} className="chip">{s}</span>)}</div>
          </section>
          <section className="case__sec">
            <h3><span>05</span>links</h3>
            <div className="case__links"><Links links={build.links} /></div>
          </section>

          <nav className="case__nav" aria-label="Other builds">
            <button type="button" onClick={() => openBuild(prev.id)}>← previous<b>{prev.name}</b></button>
            <button type="button" onClick={() => openBuild(next.id)}>next →<b>{next.name}</b></button>
          </nav>
        </div>
      </article>
    </div>
  );
}
