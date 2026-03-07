'use client';

import { useState, useEffect, useRef } from 'react';

const images = [
  "/images/im1.jpeg",
  "/images/im2.jpg",
  "/images/im3.jpg",
  "/images/im4.jpeg",
  "/images/im5.jpg",
  "/images/im6.jpeg",
  "/images/im4.jpeg",
  "/images/im5.jpg",
  "/images/im6.jpeg",
];

export default function Gallery() {
  const [current, setCurrent] = useState(0);
  const autoRef = useRef(null);
  const total = images.length;

  const go = (index) => setCurrent((index + total) % total);
  const next = () => go(current + 1);
  const prev = () => go(current - 1);

  useEffect(() => {
    autoRef.current = setInterval(next, 4500);
    return () => clearInterval(autoRef.current);
  }, [current]);

  const prev2 = (current - 2 + total) % total;
  const prev1 = (current - 1 + total) % total;
  const next1 = (current + 1) % total;
  const next2 = (current + 2) % total;

  return (
    <section id="gallery" className="py-20 overflow-hidden" style={{ background: '#0D0D0D' }}>

      {/* Film strip */}
      <div className="flex items-center justify-center gap-3 px-6 mb-6">

        {/* Far left — tiny */}
        <div className="shrink-0 overflow-hidden rounded-sm cursor-pointer transition-all duration-500"
          style={{ width: '7%', height: '180px', opacity: 0.3, border: '1px solid rgba(201,168,76,0.1)' }}
          onClick={prev}>
          <img src={images[prev2]} alt="" className="w-full h-full object-contain" draggable={false} />
        </div>

        {/* Left — medium */}
        <div className="shrink-0 overflow-hidden rounded-sm cursor-pointer transition-all duration-500"
          style={{ width: '16%', height: '260px', opacity: 0.55, border: '1px solid rgba(201,168,76,0.15)' }}
          onClick={prev}>
          <img src={images[prev1]} alt="" className="w-full h-full object-contain" draggable={false} />
        </div>

        {/* Center — hero */}
        <div className="shrink-0 overflow-hidden rounded-sm relative transition-all duration-500"
          style={{
            width: '46%',
            height: '420px',
            border: '1px solid rgba(201,168,76,0.45)',
            boxShadow: '0 0 40px rgba(201,168,76,0.12)',
          }}>
          <img
            key={current}
            src={images[current]}
            alt={`Gallery ${current + 1}`}
            className="w-full h-full object-contain"
            style={{ background: '#111', animation: 'fadeIn 0.45s ease both' }}
            draggable={false}
          />
          {/* Gold top bar */}
          <div className="absolute top-0 left-0 right-0 h-0.5"
            style={{ background: 'linear-gradient(to right, transparent, #C9A84C, transparent)' }} />
          {/* Counter */}
          <div className="absolute bottom-3 right-3 text-[11px] tracking-[2px] px-2.5 py-1 rounded-sm"
            style={{ background: 'rgba(0,0,0,0.6)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.25)' }}>
            {current + 1} / {total}
          </div>
        </div>

        {/* Right — medium */}
        <div className="shrink-0 overflow-hidden rounded-sm cursor-pointer transition-all duration-500"
          style={{ width: '16%', height: '260px', opacity: 0.55, border: '1px solid rgba(201,168,76,0.15)' }}
          onClick={next}>
          <img src={images[next1]} alt="" className="w-full h-full object-contain" draggable={false} />
        </div>

        {/* Far right — tiny */}
        <div className="shrink-0 overflow-hidden rounded-sm cursor-pointer transition-all duration-500"
          style={{ width: '7%', height: '180px', opacity: 0.3, border: '1px solid rgba(201,168,76,0.1)' }}
          onClick={next}>
          <img src={images[next2]} alt="" className="w-full h-full object-contain" draggable={false} />
        </div>
      </div>

      {/* Arrows + dots */}
      <div className="flex items-center justify-center gap-6">
        <button onClick={prev} aria-label="Previous"
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="flex gap-2">
          {images.map((_, i) => (
            <button key={i} onClick={() => go(i)} aria-label={`Slide ${i + 1}`}
              className="transition-all duration-300"
              style={{
                width: i === current ? '22px' : '7px',
                height: '7px',
                borderRadius: '4px',
                background: i === current ? '#C9A84C' : 'rgba(201,168,76,0.25)',
              }} />
          ))}
        </div>

        <button onClick={next} aria-label="Next"
          className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </section>
  );
}