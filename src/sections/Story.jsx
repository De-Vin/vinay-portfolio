import { story } from '../data/content.js';
import { hash } from '../lib/utils.js';
import SplitText from '../components/SplitText.jsx';
import StageHead from '../components/StageHead.jsx';

const branches = story.commits.map((c) => c.branch);
const firstSide = branches.indexOf('side');
const lastSide = branches.lastIndexOf('side');

/** Where the side branch line (hackathons, talks, leadership) starts, runs and ends. */
function sideState(i) {
  if (i < firstSide || i > lastSide) return 'none';
  if (i === firstSide) return 'start';
  if (i === lastSide) return 'end';
  return undefined;
}

/** 02 · log — the engineering story as a git graph, oldest commit first. */
export default function Story() {
  return (
    <section className="story stage" id="log" aria-labelledby="log-title">
      <div className="wrap">
        <StageHead id="log" />
        <div className="split-head">
          <h2 className="section-title" id="log-title">
            <SplitText text={story.title[0]} by="words" />
            <br />
            <SplitText text={story.title[1]} by="words" delay={120} className="serif" />
          </h2>
          <p data-reveal style={{ '--d': 3 }}>{story.intro}</p>
        </div>

        <ol className="graph">
          {story.commits.map((c, i) => (
            <li className="commit" key={c.msg} data-branch={c.branch} data-type={c.type} data-side={sideState(i)}>
              <div className="commit__date">{c.date}</div>
              <div className="commit__rail" aria-hidden="true"><i className="commit__node" /></div>
              <div className="commit__body">
                <div className="commit__line">
                  <span className="commit__hash" aria-hidden="true">{hash(c.msg + c.date)}</span>
                  <span className="commit__type">{c.type}:</span>
                  {c.head && (
                    <span className="commit__head"><span>HEAD → main</span><span>origin/main</span></span>
                  )}
                </div>
                <p className="commit__msg">{c.msg}</p>
                <p className="commit__desc">{c.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="graph-legend" aria-hidden="true">
          <span className="l-main">main — career</span>
          <span className="l-edu">edu — education</span>
          <span className="l-side">side — hackathons, talks, leadership</span>
        </div>
      </div>
    </section>
  );
}
