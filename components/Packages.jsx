'use client';

import { useRef, useEffect, useState } from 'react';

const packagesData = {
  ar: {
    sectionLabel: '✦ باقاتنا ✦',
    title: 'اختر',
    titleAccent: 'باقتك المناسبة',
    desc: 'باقات مصممة لتناسب جميع احتياجاتك — احجز مسبقاً قبل أسبوع واستمتع بأفضل تجربة.',
    earlyBird: 'خصم الحجز المبكر',
    earlyBirdDesc: 'احجز قبل أسبوع من موعد سفرك واحصل على أولوية في الخدمة',
    childNote: '🎁 جميع الأطفال تحت سن 4 سنوات مجانًا',
    bookBtn: 'احجز هذه الباقة',
    popular: 'الأكثر طلبًا',
    currency: '$',
    packages: [
      {
        name: 'الباقة الأساسية',
        price: 10,
        color: '#8A9BB0',
        features: [
          'استقبال عند الباب',
          'مرافق شخصي',
          'إنهاء جميع الإجراءات في 10 دقائق',
          'خدمة حمل الحقائب',
          'توديع إلى باب المغادرة',
        ],
      },
      {
        name: 'الباقة القياسية',
        price: 13,
        popular: true,
        color: '#C9A84C',
        features: [
          'استقبال عند الباب',
          'مرافق شخصي',
          'استقبال في قاعة مكيفة',
          'إنهاء جميع الإجراءات في 10 دقائق',
          'خدمة حمل الحقائب',
          'توديع',
        ],
      },
      {
        name: 'الباقة المميزة',
        price: 15,
        color: '#C9A84C',
        premium: true,
        features: [
          'استقبال عند الباب',
          'مرافق شخصي',
          'استقبال في قاعة مكيفة',
          'مشروب مجاني',
          'إنهاء جميع الإجراءات',
          'سيم كارد مجاني',
          'خدمة حمل الحقائب',
          'توديع',
        ],
      },
    ],
  },
  en: {
    sectionLabel: '✦ Our Packages ✦',
    title: 'Choose Your',
    titleAccent: 'Perfect Package',
    desc: 'Tailored packages to suit all your needs — book a week early for priority service.',
    earlyBird: 'Early Bird Booking',
    earlyBirdDesc: 'Book one week before your travel date and get priority service',
    childNote: '🎁 All children under 4 years old travel free',
    bookBtn: 'Book This Package',
    popular: 'Most Popular',
    currency: '$',
    packages: [
      {
        name: 'Basic Package',
        price: 10,
        color: '#8A9BB0',
        features: [
          'Welcome at the door',
          'Personal escort',
          'Complete all procedures in 10 minutes',
          'Luggage carrying service',
          'Farewell to departure gate',
        ],
      },
      {
        name: 'Standard Package',
        price: 13,
        popular: true,
        color: '#C9A84C',
        features: [
          'Welcome at the door',
          'Personal escort',
          'Reception in air-conditioned lounge',
          'Complete all procedures in 10 minutes',
          'Luggage carrying service',
          'Farewell',
        ],
      },
      {
        name: 'Premium Package',
        price: 15,
        color: '#C9A84C',
        premium: true,
        features: [
          'Welcome at the door',
          'Personal escort',
          'Reception in air-conditioned lounge',
          'Free welcome drink',
          'Complete all procedures',
          'Free SIM card',
          'Luggage carrying service',
          'Farewell',
        ],
      },
    ],
  },
};

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export default function Packages({ t ,onSelectPackage}) {
  const locale = t?.lang === 'ar' ? 'ar' : 'en';
  const d = packagesData[locale];
  const isRTL = locale === 'ar';
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    cardsRef.current.forEach((el) => { if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="packages" className="py-24 px-6 lg:px-12 relative overflow-hidden"
      style={{ background: '#1A1510' }}>

      {/* Ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16 reveal">
          <div className="section-label justify-center">{d.sectionLabel}</div>
          <h2 className="text-[clamp(32px,4vw,54px)] font-bold leading-[1.2] mb-4">
            {d.title} <span className="gold-text">{d.titleAccent}</span>
          </h2>
          <p className="text-base font-light mx-auto" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '500px' }}>
            {d.desc}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {d.packages.map((pkg, i) => (
            <div
              key={i}
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
              {/* Popular badge */}
              {pkg.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 text-[11px] font-bold tracking-[2px] uppercase rounded-full"
                  style={{ background: 'linear-gradient(135deg, #C9A84C, #9A7A30)', color: '#0D0D0D' }}>
                  {d.popular}
                </div>
              )}

              {/* Top gold bar for popular */}
              {pkg.popular && (
                <div className="h-0.5 w-full rounded-t-sm"
                  style={{ background: 'linear-gradient(to right, transparent, #C9A84C, transparent)' }} />
              )}

              <div className="p-8 flex flex-col flex-1">
                {/* Package name & price */}
                <div className="mb-7">
                  <p className="text-xs tracking-[2px] uppercase font-medium mb-3"
                    style={{ color: pkg.popular ? '#C9A84C' : 'rgba(255,255,255,0.4)' }}>
                    {pkg.name}
                  </p>
                  <div className="flex items-end gap-1">
                    <span className="text-[56px] font-black leading-none" style={{ color: pkg.popular ? '#C9A84C' : '#fff' }}>
                      {pkg.price}
                    </span>
                    <span className="text-xl font-bold mb-2" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      {d.currency}
                    </span>
                    <span className="text-sm mb-2 font-light" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      / {isRTL ? 'شخص' : 'person'}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="mb-6" style={{ height: '1px', background: 'rgba(201,168,76,0.1)' }} />

                {/* Features */}
                <ul className="flex flex-col gap-3.5 flex-1 mb-8">
                  {pkg.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm font-light"
                      style={{ color: 'rgba(255,255,255,0.75)', flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                      <span className="shrink-0"><CheckIcon /></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a href="#book"
                 onClick={() => onSelectPackage?.(pkg.name)} 
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
                  {d.bookBtn}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Early bird + child note */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Early bird */}
          <div className="flex items-start gap-4 p-5 rounded-sm"
            style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.12)' }}>
            <div className="text-2xl shrink-0">⏰</div>
            <div>
              <p className="text-sm font-bold mb-1" style={{ color: '#C9A84C' }}>{d.earlyBird}</p>
              <p className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.45)' }}>{d.earlyBirdDesc}</p>
            </div>
          </div>

          {/* Children note */}
          <div className="flex items-start gap-4 p-5 rounded-sm"
            style={{ background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.12)' }}>
            <div className="text-2xl shrink-0">👶</div>
            <div className="flex items-center h-full">
              <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>{d.childNote}</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}