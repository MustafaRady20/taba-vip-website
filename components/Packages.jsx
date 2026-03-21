'use client';

import { useRef, useEffect, useState } from 'react';
import { BASE_API_URL } from '../lib/constants';

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export default function Packages({ t, onSelectPackage }) {
  const locale = t?.lang === 'ar' ? 'ar' : 'en';
  const isRTL = locale === 'ar';

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  // UI strings (not from DB — stay hardcoded)
  const ui = {
    ar: {
      sectionLabel: '✦ باقاتنا ✦',
      title: 'اختر',
      titleAccent: 'باقتك المناسبة',
      desc: 'باقات مصممة لتناسب جميع احتياجاتك — احجز مسبقاً قبل أسبوع.',
      earlyBird: 'خصم الحجز المبكر',
      earlyBirdDesc: 'احجز قبل أسبوع من موعد سفرك واحصل على خصم 10%',
      childNote: '🎁 جميع الأطفال تحت سن سنتين مجانًا',
      bookBtn: 'احجز هذه الباقة',
      popular: 'الأكثر طلبًا',
    },
    en: {
      sectionLabel: '✦ Our Packages ✦',
      title: 'Choose Your',
      titleAccent: 'Perfect Package',
      desc: 'Tailored packages to suit all your needs — book a week early for priority service.',
      earlyBird: 'Early Bird Booking',
      earlyBirdDesc: 'Book one week before your travel date and get 10% discount',
      childNote: '🎁 All children under two years old travel free',
      bookBtn: 'Book This Package',
      popular: 'Most Popular',
    },
  }[locale];

  useEffect(() => {
    fetch(`${BASE_API_URL}/packages`)
      .then((res) => res.json())
      .then((data) => {
        setPackages(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    cardsRef.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [loading]);

  return (
    <section id="packages" className="py-24 px-6 lg:px-12 relative overflow-hidden"
      style={{ background: '#1A1510' }}>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto">

        <div ref={headerRef} className="text-center mb-16 reveal">
          <div className="section-label justify-center">{ui.sectionLabel}</div>
          <h2 className="text-[clamp(32px,4vw,54px)] font-bold leading-[1.2] mb-4">
            {ui.title} <span className="gold-text">{ui.titleAccent}</span>
          </h2>
          <p className="text-base font-light mx-auto" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '500px' }}>
            {ui.desc}
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12" style={{ color: 'rgba(255,255,255,0.4)' }}>...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {packages.map((pkg, i) => {
              // Pick the localized content
              const content = pkg[locale];

              return (
                <div
                  key={pkg._id}
                  ref={(el) => (cardsRef.current[i] = el)}
                  className="reveal relative flex flex-col rounded-sm transition-all duration-400 hover:-translate-y-2"
                  style={{
                    background: pkg.popular ? 'linear-gradient(160deg, #231E16, #1A1510)' : '#1A1510',
                    border: pkg.popular
                      ? '1px solid rgba(201,168,76,0.5)'
                      : '1px solid rgba(201,168,76,0.12)',
                    boxShadow: pkg.popular ? '0 20px 60px rgba(201,168,76,0.1)' : 'none',
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 text-[11px] font-bold tracking-[2px] uppercase rounded-full"
                      style={{ background: 'linear-gradient(135deg, #C9A84C, #9A7A30)', color: '#0D0D0D' }}>
                      {ui.popular}
                    </div>
                  )}

                  {pkg.popular && (
                    <div className="h-0.5 w-full rounded-t-sm"
                      style={{ background: 'linear-gradient(to right, transparent, #C9A84C, transparent)' }} />
                  )}

                  <div className="p-8 flex flex-col flex-1">
                    <div className="mb-7">
                      <p className="text-xs tracking-[2px] uppercase font-medium mb-3"
                        style={{ color: pkg.popular ? '#C9A84C' : 'rgba(255,255,255,0.4)' }}>
                        {content.name}
                      </p>
                      <div className="flex items-end gap-1">
                        <span className="text-[56px] font-black leading-none" style={{ color: pkg.popular ? '#C9A84C' : '#fff' }}>
                          {pkg.price}
                        </span>
                        <span className="text-2xl font-bold mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}> {isRTL ? 'شيكل' : 'Shekel'}</span>
                        <span className="text-sm mb-2 font-light" style={{ color: 'rgba(255,255,255,0.35)' }}>
                          / {isRTL ? 'شخص' : 'person'}
                        </span>
                      </div>
                    </div>

                    <div className="mb-6" style={{ height: '1px', background: 'rgba(201,168,76,0.1)' }} />

                    <ul className="flex flex-col gap-3.5 flex-1 mb-8">
                      {content.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm font-light"
                          style={{ color: 'rgba(255,255,255,0.75)', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                          <span className="shrink-0"><CheckIcon /></span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <a
                      href="#book"
                      onClick={() => onSelectPackage?.(pkg._id)}  // ← sends _id, not name
                      className="text-center py-3.5 text-sm font-bold tracking-wider rounded-[2px] transition-all duration-300 hover:-translate-y-0.5 block"
                      style={pkg.popular ? {
                        background: 'linear-gradient(135deg, #C9A84C, #9A7A30)',
                        color: '#0D0D0D',
                        boxShadow: '0 6px 24px rgba(201,168,76,0.35)',
                      } : {
                        background: 'transparent',
                        border: '1px solid rgba(201,168,76,0.3)',
                        color: '#C9A84C',
                      }}>
                      {ui.bookBtn}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-4 p-5 rounded-sm"
            style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.12)' }}>
            <div className="text-2xl shrink-0">⏰</div>
            <div>
              <p className="text-sm font-bold mb-1" style={{ color: '#C9A84C' }}>{ui.earlyBird}</p>
              <p className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.45)' }}>{ui.earlyBirdDesc}</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-5 rounded-sm"
            style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.12)' }}>
            <div className="text-2xl shrink-0">👶</div>
            <div className="flex items-center h-full">
              <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>{ui.childNote}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
