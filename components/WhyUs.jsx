'use client';

import { useEffect, useRef } from 'react';

export default function WhyUs({ t }) {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const w = t.whyUs;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.15 }
    );
    if (leftRef.current) observer.observe(leftRef.current);
    if (rightRef.current) observer.observe(rightRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="why-us" className="py-24 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div ref={leftRef} className="reveal">
          <div className="relative p-12 rounded-sm overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #1A1510, #231E16)', border: '1px solid rgba(201,168,76,0.15)' }}>
            <div className="absolute top-0 right-0 w-0.5 h-full" aria-hidden="true"
              style={{ background: 'linear-gradient(to bottom, #C9A84C, transparent)' }} />
            <div className="absolute -top-5 right-6 text-[200px] leading-none pointer-events-none select-none" aria-hidden="true"
              style={{ color: 'rgba(201,168,76,0.06)', fontFamily: 'Georgia, serif' }}>"</div>
            <blockquote className="relative">
              <p className="text-[22px] font-medium leading-[1.7] mb-8" style={{ color: 'rgba(255,255,255,0.85)' }}>{w.quote}</p>
              <footer className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-base shrink-0" aria-hidden="true"
                  style={{ background: 'linear-gradient(135deg, #C9A84C, #9A7A30)', color: '#0D0D0D' }}>T</div>
                <div>
                  <cite className="not-italic font-semibold text-sm block">{w.quoteAuthor}</cite>
                  <span className="text-xs" style={{ color: '#8A7A60' }}>{w.quoteRole}</span>
                </div>
              </footer>
            </blockquote>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-5">
            {w.stats.map((s, i) => (
              <div key={i} className="py-6 text-center rounded-sm"
                style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.1)' }}>
                <div className="text-3xl font-bold" style={{ color: '#C9A84C' }}>{s.val}</div>
                <div className="text-xs tracking-[1px] mt-1" style={{ color: '#8A7A60' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div ref={rightRef} className="reveal">
          <div className="section-label">{w.sectionLabel}</div>
          <h2 className="text-[clamp(32px,4vw,54px)] font-bold leading-[1.2] mb-4">
            {w.title} <span className="block gold-text">{w.titleAccent}</span>
          </h2>
          <p className="text-base leading-[1.8] font-light mb-12" style={{ color: 'rgba(255,255,255,0.5)' }}>{w.desc}</p>
          <ol className="flex flex-col gap-8 list-none">
            {w.points.map((p) => (
              <li key={p.num} className="flex gap-5 items-start">
                <span className="text-sm font-bold shrink-0 pt-0.5 opacity-40" style={{ color: '#C9A84C', minWidth: '28px' }}>{p.num}</span>
                <div>
                  <h3 className="text-[18px] font-semibold mb-2">{p.title}</h3>
                  <p className="text-sm leading-[1.75] font-light" style={{ color: 'rgba(255,255,255,0.45)' }}>{p.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
