'use client';

import { useEffect, useRef } from 'react';

export default function Services({ t }) {
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const s = t.services;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" className="py-24 px-6 lg:px-12 relative overflow-hidden" style={{ background: '#1A1510' }}>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] -translate-y-1/2 translate-x-1/2 pointer-events-none" aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)' }} />
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="text-center mb-16 reveal">
          <div className="section-label justify-center">{s.sectionLabel}</div>
          <h2 className="text-[clamp(32px,4vw,54px)] font-bold leading-[1.2] mb-4">
            {s.title} <span className="gold-text">{s.titleAccent}</span>
          </h2>
          <p className="text-base leading-[1.8] font-light mx-auto" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '560px' }}>{s.desc}</p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 stagger"
          style={{ gap: '1px', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.1)' }}>
          {s.items.map((service, i) => (
            <article key={i} className="group p-10 relative overflow-hidden cursor-default transition-all duration-400"
              style={{ background: '#1A1510' }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.06) 0%, transparent 60%)' }} aria-hidden="true" />
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-6 transition-all duration-400 group-hover:shadow-[0_0_20px_rgba(201,168,76,0.2)]"
                style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }} aria-hidden="true">
                {service.icon}
              </div>
              <h3 className="text-[17px] font-bold mb-3">{service.title}</h3>
              <p className="text-sm leading-[1.75] font-light" style={{ color: 'rgba(255,255,255,0.45)' }}>{service.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
