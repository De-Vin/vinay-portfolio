import { config } from '../config.js';
import { hash } from '../lib/utils.js';
import { useClock } from '../hooks/useClock.js';

const buildId = hash(__BUILD_TIME__);

export default function Footer() {
  const time = useClock();
  return (
    <footer className="footer">
      <div className="wrap footer__row">
        <span className="footer__build"><i aria-hidden="true" />build {buildId} · passing</span>
        <span>Designed &amp; engineered by {config.person.name} — React + Vite, no templates.</span>
        <span>HYD {time} IST</span>
        <span>
          <a href={config.links.github} target="_blank" rel="noopener noreferrer">GitHub</a> ·{' '}
          <a href={config.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a> ·{' '}
          <a href="#init">Back to top ↑</a>
        </span>
        <span>© {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
