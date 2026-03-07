'use client';

import { useEffect, useRef, useState } from 'react';

function useCounter(target, duration = 1600, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

export default function Hero({ t }) {
  const statsRef = useRef(null);
  const [animate, setAnimate] = useState(false);
  const h = t.hero;

  const c0 = useCounter(h.stats[0].value, 1600, animate);
  const c1 = useCounter(h.stats[1].value, 1000, animate);
  const c2 = useCounter(h.stats[2].value, 1400, animate);
  const counts = [c0, c1, c2];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setAnimate(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true"
        style={{ background: `radial-gradient(ellipse 80% 80% at 30% 50%, rgba(201,168,76,0.06) 0%, transparent 60%),
          radial-gradient(ellipse 60% 100% at 70% 20%, rgba(201,168,76,0.04) 0%, transparent 50%),
          linear-gradient(160deg, #0D0D0D 0%, #1A1510 50%, #0D0D0D 100%)` }} />
      <div className="absolute inset-0 grid-pattern" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-24 w-full">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs tracking-[2px] uppercase mb-7"
            style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse-dot" aria-hidden="true" />
            {h.badge}
          </div>

          <h1 className="text-[clamp(48px,7vw,86px)] font-bold leading-[1.1] mb-4">
            {h.titleLine1}
            <span className="block gold-text">{h.titleLine2}</span>
          </h1>

          <p className="text-[clamp(16px,2vw,20px)] leading-[1.8] mb-11 font-light"
            style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '520px' }}>
            {h.subtitle}
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#book" className="btn-primary">{h.ctaBook}</a>
            <a href="https://wa.me/201158881839" target="_blank" rel="noopener noreferrer" className="btn-ghost">
              {h.ctaContact}
            </a>
          </div>
        </div>

        <div ref={statsRef} className="flex flex-wrap gap-10 mt-20">
          {h.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-bold tabular-nums" style={{ color: '#C9A84C' }}>
                {animate ? counts[i] : 0}{stat.suffix}
              </div>
              <div className="text-[11px] tracking-[1.5px] mt-1" style={{ color: '#8A7A60' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10" aria-hidden="true">
        <span className="text-[10px] tracking-[3px] uppercase font-light"
          style={{ color: '#8A7A60', writingMode: 'vertical-rl' }}>{h.scroll}</span>
        <span className="w-px h-12 animate-scroll-line"
          style={{ background: 'linear-gradient(to bottom, rgba(201,168,76,0.8), transparent)' }} />
      </div>
    </section>
  );
}
