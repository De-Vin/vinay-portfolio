import { useMemo, useState } from 'react';
import { builds, skills } from '../data/content.js';
import { useUI } from '../context/UIContext.jsx';
import { hasFinePointer } from '../lib/utils.js';
import SplitText from '../components/SplitText.jsx';
import StageHead from '../components/StageHead.jsx';

const buildName = (id) => builds.find((b) => b.id === id)?.name ?? id;
const all = skills.flatMap((g) => g.items.map((s) => ({ ...s, group: g })));

const P = ({ children }) => <span className="tk-p">{children}</span>;
const K = ({ children }) => <span className="tk-k">{children}</span>;
const S = ({ children }) => <span className="tk-s">{children}</span>;

/** 03 · deps — skills as an interactive package.json with a dependency inspector. */
export default function Arsenal() {
  const { openBuild } = useUI();
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState('React');
  const current = all.find((s) => s.name === selected);
  const fine = useMemo(hasFinePointer, []);

  const chooseFilter = (key) => {
    setFilter(key);
    const first = skills.find((g) => g.key === key)?.items[0];
    if (first) setSelected(first.name);
  };

  // Build the editor lines once; each line knows its group so filters can dim blocks.
  const lines = useMemo(() => {
    const out = [];
    const push = (node, group = '') => out.push({ node, group });
    push(<P>{'{'}</P>);
    push(<>  <K>"name"</K><P>:</P> <S>"vinay-avvaru"</S><P>,</P></>);
    push(<>  <K>"role"</K><P>:</P> <S>"software-engineer"</S><P>,</P></>);
    push(<>  <K>"dependencies"</K><P>: {'{'}</P></>);
    skills.forEach((g, gi) => {
      push(<span className="tk-c">    // {g.label}</span>, g.key);
      push(<>    <K>"{g.key}"</K><P>: {'{'}</P></>, g.key);
      g.items.forEach((s, si) => {
        const val = s.used.length ? s.used.map(buildName).join(' · ') : 'core toolkit';
        push(
          <>
            {'      '}
            <button type="button" className={`dep ${s.name === selected ? 'is-active' : ''}`} data-dep={s.name}>"{s.name}"</button>
            <P>:</P> <S>"{val}"</S><P>{si < g.items.length - 1 ? ',' : ''}</P>
          </>,
          g.key
        );
      });
      push(<P>    {'}'}{gi < skills.length - 1 ? ',' : ''}</P>, g.key);
    });
    push(<P>  {'}'}</P>);
    push(<P>{'}'}</P>);
    return out;
  }, [selected]);

  // group consecutive lines by category
  const groups = useMemo(() => {
    const out = [];
    lines.forEach((l, n) => {
      const line = { n: n + 1, node: l.node };
      const last = out[out.length - 1];
      if (last && last.group === l.group) last.lines.push(line);
      else out.push({ group: l.group, lines: [line] });
    });
    return out;
  }, [lines]);

  const onCodeEvent = (e) => {
    const dep = e.target.closest('[data-dep]');
    if (dep) setSelected(dep.dataset.dep);
  };

  return (
    <section className="deps stage" id="deps" aria-labelledby="deps-title">
      <div className="wrap">
        <StageHead id="deps" />
        <div className="split-head">
          <h2 className="section-title" id="deps-title">
            <SplitText text="Dependencies I" by="words" />
            <br />
            <SplitText text="actually ship with." by="words" delay={120} className="serif" />
          </h2>
          <p data-reveal style={{ '--d': 3 }}>
            No skill bars, no self-scored percentages. Just the toolkit — and, where it applies, the product it shipped in. Click any dependency to inspect it.
          </p>
        </div>

        <div data-reveal>
          <div className="deps__grid">
            <div className="editor">
              <div className="editor__tabs" role="tablist" aria-label="Filter skills by category">
                <button className="editor__tab" role="tab" aria-selected={filter === ''} onClick={() => chooseFilter('')}>package.json</button>
                {skills.map((g) => (
                  <button key={g.key} className="editor__tab" role="tab" aria-selected={filter === g.key} onClick={() => chooseFilter(g.key)}>
                    {g.label}
                  </button>
                ))}
              </div>
              <div
                className={`code ${filter ? 'is-filtered' : ''}`}
                onClick={onCodeEvent}
                onMouseOver={fine ? onCodeEvent : undefined}
                onFocus={onCodeEvent}
              >
                <div className="code__lines">
                  {groups.map((g, gi) => (
                    <div key={gi} className={`code__group ${g.group === filter ? 'is-match' : ''}`}>
                      {g.lines.map((l) => (
                        <div className="ln" key={l.n}>
                          <span className="ln__n" aria-hidden="true">{l.n}</span>
                          <span className="ln__c">{l.node}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="dep-inspector" aria-live="polite">
              <div className="dep-inspector__ghost" aria-hidden="true">{current.name.slice(0, 2)}</div>
              <div className="dep-inspector__label">
                <span>inspect: dependency</span>
                <span>{all.indexOf(current) + 1}/{all.length}</span>
              </div>
              <div className="swap" key={current.name}>
                <p className="dep-inspector__name">{current.name}</p>
                <p className="dep-inspector__cat">{current.group.label}</p>
                <p className="dep-inspector__note">{current.note}</p>
                <div className="dep-inspector__used">
                  <h4>{current.used.length ? 'shipped in →' : 'listed in core skills'}</h4>
                  {current.used.length ? (
                    <ul>
                      {current.used.map((id) => (
                        <li key={id}>
                          <button type="button" className="chip" onClick={() => openBuild(id)}>{buildName(id)} ↗</button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mono mute">Part of the everyday toolkit across roles.</p>
                  )}
                </div>
              </div>
            </aside>
          </div>
          <div className="deps__summary">
            <span>{all.length} dependencies · {skills.length} groups</span>
            <span>sourced from resume · 0 self-ratings</span>
          </div>
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...all, ...all].map((s, i) => <span key={i}>{s.name}</span>)}
        </div>
      </div>
    </section>
  );
}
