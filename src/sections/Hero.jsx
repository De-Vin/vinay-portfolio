import { useEffect, useRef } from 'react';
import { hero } from '../data/content.js';
import { config } from '../config.js';
import { useClock } from '../hooks/useClock.js';
import { hasFinePointer } from '../lib/utils.js';
import SplitText from '../components/SplitText.jsx';
import HeroField from './HeroField.jsx';

const TICKS = Array.from({ length: 30 }, (_, i) => i * 100);

/** 01 · init — a design-tool canvas: rulers, guides, a selected Figma frame… that ships. */
export default function Hero() {
  const time = useClock();
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const dimRef = useRef(null);
  const guides = useRef({});
  const pointer = useRef({ x: -9999, y: -9999, onChange: null });

  // rulers + crosshair guides follow the pointer like a design tool
  useEffect(() => {
    const section = sectionRef.current;
    if (!hasFinePointer()) return;
    const { gx, gy, mx, my } = guides.current;
    const onMove = (e) => {
      const r = section.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      pointer.current.x = x;
      pointer.current.y = y;
      pointer.current.onChange?.();
      section.classList.add('has-pointer');
      gx.style.transform = `translateX(${x}px)`;
      gy.style.transform = `translateY(${y}px)`;
      mx.style.transform = `translateX(${x}px)`;
      my.style.transform = `translateY(${y - 64}px)`;
    };
    const onLeave = () => {
      section.classList.remove('has-pointer');
      pointer.current.x = pointer.current.y = -9999;
      pointer.current.onChange?.();
    };
    section.addEventListener('pointermove', onMove, { passive: true });
    section.addEventListener('pointerleave', onLeave);
    return () => {
      section.removeEventListener('pointermove', onMove);
      section.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  // live W × H readout on the selection frame
  useEffect(() => {
    const frame = frameRef.current;
    const ro = new ResizeObserver(() => {
      dimRef.current.textContent = `${Math.round(frame.offsetWidth)} × ${Math.round(frame.offsetHeight)}`;
    });
    ro.observe(frame);
    return () => ro.disconnect();
  }, []);

  return (
    <section className="hero stage" id="init" ref={sectionRef} aria-labelledby="hero-title">
      <HeroField pointer={pointer} />
      <div className="ruler ruler--x" aria-hidden="true">
        {TICKS.map((t) => <span key={t} style={{ left: t }}>{t}</span>)}
        <i className="ruler__mark" ref={(el) => (guides.current.mx = el)} />
      </div>
      <div className="ruler ruler--y" aria-hidden="true">
        {TICKS.map((t) => <span key={t} style={{ top: t }}>{t}</span>)}
        <i className="ruler__mark" ref={(el) => (guides.current.my = el)} />
      </div>
      <div className="guide guide--x" aria-hidden="true" ref={(el) => (guides.current.gx = el)} />
      <div className="guide guide--y" aria-hidden="true" ref={(el) => (guides.current.gy = el)} />

      <div className="wrap hero__inner">
        <div className="hero__meta" data-reveal="fade" style={{ '--d': 2 }}>
          <span className="mono hero__kicker">{hero.kicker}</span>
          <span className="mono"><b>17.38°N 78.48°E</b> · Hyderabad · <b>{time}</b> IST</span>
        </div>

        <h1 className="hero__title" id="hero-title">
          <span className="hero__line">
            <span className="frame" data-frame ref={frameRef}>
              <SplitText text="Pixels in." delay={150} />
              <span className="frame__box" aria-hidden="true">
                <i className="frame__h" /><i className="frame__h" /><i className="frame__h" /><i className="frame__h" />
                <span className="frame__tag">Frame 01 — figma</span>
                <span className="frame__dim" ref={dimRef}>— × —</span>
              </span>
            </span>
          </span>
          <span className="hero__line hero__line--2">
            <SplitText text="Production" delay={520} className="serif" /> <SplitText text="out." delay={760} />
            <span className="deployed" aria-hidden="true"><i />deployed · main</span>
          </span>
        </h1>

        <div className="hero__body">
          <p className="hero__lede" data-reveal style={{ '--d': 10 }}>{hero.lede}</p>
          <div className="hero__ctas" data-reveal style={{ '--d': 12 }}>
            <a className="btn btn--solid" href="#build" data-magnetic>
              See the builds <span className="btn__arrow" aria-hidden="true">→</span>
            </a>
            <a className="btn" href={config.links.resume} download>
              Resume.pdf <span className="btn__arrow" aria-hidden="true">↓</span>
            </a>
          </div>
        </div>

        <dl className="hero__stats">
          {hero.stats.map((s, i) => (
            <div className="stat" data-reveal style={{ '--d': 14 + i }} key={s.label}>
              <dt className="stat__l">{s.label}</dt>
              <dd className="stat__v">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <a className="scroll-cue" href="#log">scroll to run the pipeline</a>
    </section>
  );
}
