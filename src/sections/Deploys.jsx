import { experience } from '../data/content.js';
import { formatDuration, monthsBetween } from '../lib/utils.js';
import SplitText from '../components/SplitText.jsx';
import StageHead from '../components/StageHead.jsx';

const ENV_LABEL = { production: 'production · running', stable: 'stable · superseded', preview: 'preview · completed' };

/** 05 · deploy — professional experience as a rollout history with changelogs. */
export default function Deploys() {
  const chronological = [...experience].reverse();
  const total = monthsBetween(chronological[0].start, null);

  return (
    <section className="deploys stage" id="deploy" aria-labelledby="deploy-title">
      <div className="wrap">
        <StageHead id="deploy" />
        <div className="split-head">
          <h2 className="section-title" id="deploy-title">
            <SplitText text="Rollout" by="words" />
            <br />
            <SplitText text="history." by="words" delay={120} className="serif" />
          </h2>
          <p data-reveal style={{ '--d': 3 }}>
            Three releases at Techsophy, Hyderabad — from intern to the engineer leading authentication on a healthcare platform. {formatDuration(total)} and counting.
          </p>
        </div>

        <div className="track" aria-hidden="true">
          <div className="track__bar">
            {chronological.map((r, i) => (
              <div key={r.version} className="track__seg" data-env={r.env} style={{ '--w': monthsBetween(r.start, r.end), '--i': i }}>
                <span>{r.version} · {r.short}</span>
              </div>
            ))}
          </div>
          <div className="track__axis"><span>Aug 2023</span><span>today</span></div>
        </div>

        <ol className="releases">
          {experience.map((r) => (
            <li className="release" data-env={r.env} key={r.version}>
              <div className="release__side" data-reveal>
                <span className="release__v">{r.version}</span>
                <span className={`env ${r.env === 'production' ? 'is-live' : ''}`}><i aria-hidden="true" />{ENV_LABEL[r.env]}</span>
                <span className="release__range">{r.range}</span>
                <span className="release__dur">{formatDuration(monthsBetween(r.start, r.end))}</span>
              </div>
              <div className="release__main">
                <h3 className="release__role" data-reveal style={{ '--d': 1 }}>{r.role}</h3>
                <p className="release__org" data-reveal style={{ '--d': 2 }}>
                  <b>{r.team}</b> · {r.company} · {r.location}
                </p>
                <ul className="changelog">
                  {r.changes.map(([t, d], i) => (
                    <li key={d} data-reveal style={{ '--d': 3 + i }}>
                      <span className={`t t-${t}`}>{t}:</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
                <div className="release__stack" data-reveal style={{ '--d': 7 }}>
                  {r.stack.map((s) => <span key={s} className="chip">{s}</span>)}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
