'use client';

import { useState, useEffect, useRef } from 'react';
import { BASE_API_URL } from '../lib/constants';


function normalise(raw) {
  return {
    id:      raw._id ?? raw.id ?? Math.random().toString(36).slice(2),
    name:    raw.userName,
    stars:   raw.rating,
    comment: raw.comment,
  };
}

function StarDisplay({ count, size = 18 }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24"
          fill={i <= count ? '#C9A84C' : 'none'}
          stroke={i <= count ? '#C9A84C' : 'rgba(201,168,76,0.25)'}
          strokeWidth="1.5" aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1" role="radiogroup" aria-label="Star rating">
      {[1, 2, 3, 4, 5].map((i) => (
        <button key={i} type="button" role="radio" aria-checked={value === i}
          aria-label={`${i} star${i > 1 ? 's' : ''}`}
          onClick={() => onChange(i)}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform duration-150 hover:scale-110 focus:outline-none focus:scale-110">
          <svg width="32" height="32" viewBox="0 0 24 24"
            fill={(hovered || value) >= i ? '#C9A84C' : 'none'}
            stroke={(hovered || value) >= i ? '#C9A84C' : 'rgba(201,168,76,0.3)'}
            strokeWidth="1.5" aria-hidden="true">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

function ReviewCard({ review, index }) {
  const cardRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible'); },
      { threshold: 0.15 }
    );
    const el = cardRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const initials = review.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);

  return (
    <article ref={cardRef}
      className="reveal group flex flex-col gap-4 p-7 rounded-sm transition-all duration-400 cursor-default"
      style={{ background: '#1A1510', border: '1px solid rgba(201,168,76,0.1)', transitionDelay: `${index * 60}ms` }}>
      <StarDisplay count={review.stars} />
      <p className="text-sm leading-[1.75] font-light flex-1" style={{ color: 'rgba(255,255,255,0.7)' }}>
        "{review.comment}"
      </p>
      <div className="flex items-center gap-3 pt-3" style={{ borderTop: '1px solid rgba(201,168,76,0.08)' }}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
          style={{ background: 'linear-gradient(135deg, #C9A84C, #9A7A30)', color: '#0D0D0D' }} aria-hidden="true">
          {initials}
        </div>
        <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>{review.name}</span>
      </div>
    </article>
  );
}

function ReviewPopup({ t, onClose, onSubmit }) {
  const r = t.reviews;
  const isRTL = t.dir === 'rtl';
  const [name,      setName]      = useState('');
  const [stars,     setStars]     = useState(0);
  const [comment,   setComment]   = useState('');
  const [loading,   setLoading]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error,     setError]     = useState('');
  const overlayRef = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim())    { setError(isRTL ? 'الرجاء إدخال اسمك'    : 'Please enter your name');   return; }
    if (stars === 0)     { setError(isRTL ? 'الرجاء اختيار تقييم'  : 'Please select a rating');   return; }
    if (!comment.trim()) { setError(isRTL ? 'الرجاء كتابة تعليقك'  : 'Please write a comment');   return; }
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${BASE_API_URL}/reviews`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName: name.trim(), rating: stars, comment: comment.trim() }),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      const created = await res.json();
      onSubmit(normalise(created));
      setSubmitted(true);
      setTimeout(onClose, 1800);
    } catch {
      setError(isRTL ? 'حدث خطأ أثناء الإرسال، يرجى المحاولة مجدداً' : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(201,168,76,0.15)', borderRadius: '2px',
    padding: '13px 16px', color: '#fff', fontFamily: 'inherit',
    fontSize: '14px', outline: 'none', transition: 'border-color 0.3s',
    direction: isRTL ? 'rtl' : 'ltr',
  };
  const focusIn  = (e) => (e.target.style.borderColor = '#C9A84C');
  const focusOut = (e) => (e.target.style.borderColor = 'rgba(201,168,76,0.15)');

  return (
    <div ref={overlayRef}
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      role="dialog" aria-modal="true" aria-labelledby="popup-title">

      <div className="relative w-full max-w-md rounded-sm overflow-hidden"
        style={{
          background: '#1A1510', border: '1px solid rgba(201,168,76,0.2)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
          animation: 'popupIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both',
        }}>

        <div className="h-0.5 w-full" style={{ background: 'linear-gradient(to right, transparent, #C9A84C, transparent)' }} />

        <div className="p-8">
          <div className="flex items-center justify-between mb-7">
            <h2 id="popup-title" className="text-xl font-bold" style={{ color: '#C9A84C' }}>{r.popup.title}</h2>
            <button onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 hover:bg-white/10"
              style={{ color: 'rgba(255,255,255,0.5)' }} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {submitted ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">✨</div>
              <p className="text-lg font-semibold" style={{ color: '#C9A84C' }}>{r.popup.submitSuccess}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-5">
                <label className="block text-xs tracking-[1.5px] uppercase mb-2" style={{ color: '#8A7A60' }}>{r.popup.name}</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder={r.popup.namePlaceholder} style={inputStyle} disabled={loading}
                  onFocus={focusIn} onBlur={focusOut} />
              </div>

              <div className="mb-5">
                <label className="block text-xs tracking-[1.5px] uppercase mb-3" style={{ color: '#8A7A60' }}>{r.popup.rating}</label>
                <StarPicker value={stars} onChange={setStars} />
              </div>

              <div className="mb-6">
                <label className="block text-xs tracking-[1.5px] uppercase mb-2" style={{ color: '#8A7A60' }}>{r.popup.comment}</label>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)}
                  rows={4} placeholder={r.popup.commentPlaceholder}
                  style={{ ...inputStyle, resize: 'none' }} disabled={loading}
                  onFocus={focusIn} onBlur={focusOut} />
              </div>

              {error && <p className="text-xs mb-4" style={{ color: '#e74c3c' }}>{error}</p>}

              <div className="flex gap-3">
                <button type="submit" disabled={loading}
                  className="flex-1 py-3.5 font-bold text-sm tracking-wider rounded-[2px] transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #C9A84C, #9A7A30)', color: '#0D0D0D', boxShadow: '0 4px 20px rgba(201,168,76,0.3)' }}>
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                      </svg>
                      {isRTL ? 'جارٍ الإرسال...' : 'Sending...'}
                    </>
                  ) : r.popup.submit}
                </button>
                <button type="button" onClick={onClose} disabled={loading}
                  className="px-5 py-3.5 text-sm font-medium rounded-[2px] transition-all duration-200 disabled:opacity-40"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.55)' }}>
                  {r.popup.cancel}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes popupIn {
          from { opacity: 0; transform: scale(0.88) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default function Reviews({ t }) {
  const r = t.reviews;
  const isRTL = t.dir === 'rtl';
  const headerRef = useRef(null);
  const [reviews,    setReviews]    = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [showPopup,  setShowPopup]  = useState(false);

  const loadReviews = async () => {
    setLoading(true);
    setFetchError(false);
    try {
      const res = await fetch(`${BASE_API_URL}/reviews`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();
      const list = Array.isArray(data) ? data : (data.data ?? data.reviews ?? []);
      setReviews(list.map(normalise));
    } catch {
      setFetchError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible'); },
      { threshold: 0.1 }
    );
    if (headerRef.current) observer.observe(headerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleAdd = (review) => setReviews((prev) => [review, ...prev]);

  const avg = reviews.length
    ? (reviews.reduce((s, rv) => s + rv.stars, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <>
      <section id="reviews"
        className="py-24 px-6 lg:px-12 relative overflow-hidden"
        style={{ background: '#0D0D0D' }}
        aria-labelledby="reviews-heading">

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none" aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%)' }} />

        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div ref={headerRef} className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <div className="section-label">{r.sectionLabel}</div>
              <h2 id="reviews-heading" className="text-[clamp(32px,4vw,54px)] font-bold leading-[1.2]">
                {r.title} <span className="gold-text">{r.titleAccent}</span>
              </h2>
              <p className="text-sm mt-3 font-light" style={{ color: 'rgba(255,255,255,0.45)' }}>{r.desc}</p>
            </div>

            <div className="flex items-center gap-6 shrink-0">
              {!loading && !fetchError && reviews.length > 0 && (
                <div className="flex flex-col items-center px-6 py-4 rounded-sm"
                  style={{ background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.15)' }}>
                  <span className="text-3xl font-bold tabular-nums" style={{ color: '#C9A84C' }}>{avg}</span>
                  <StarDisplay count={Math.round(Number(avg))} size={14} />
                  <span className="text-[10px] mt-1 tracking-[1px]" style={{ color: '#8A7A60' }}>
                    {reviews.length} {isRTL ? 'تقييم' : 'reviews'}
                  </span>
                </div>
              )}
              <button onClick={() => setShowPopup(true)} className="btn-primary whitespace-nowrap" aria-label={r.addReview}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                {r.addReview}
              </button>
            </div>
          </div>

          {/* Loading skeleton */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-7 rounded-sm animate-pulse" style={{ background: '#1A1510', border: '1px solid rgba(201,168,76,0.07)' }}>
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map((s) => <div key={s} className="w-4 h-4 rounded-sm" style={{ background: 'rgba(201,168,76,0.15)' }} />)}
                  </div>
                  <div className="h-3 rounded mb-2" style={{ background: 'rgba(255,255,255,0.06)', width: '90%' }} />
                  <div className="h-3 rounded mb-2" style={{ background: 'rgba(255,255,255,0.06)', width: '75%' }} />
                  <div className="h-3 rounded mb-6" style={{ background: 'rgba(255,255,255,0.06)', width: '60%' }} />
                  <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(201,168,76,0.06)' }}>
                    <div className="w-9 h-9 rounded-full" style={{ background: 'rgba(201,168,76,0.15)' }} />
                    <div className="h-3 w-24 rounded" style={{ background: 'rgba(255,255,255,0.06)' }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && fetchError && (
            <div className="text-center py-16">
              <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {isRTL ? 'تعذّر تحميل التقييمات' : 'Could not load reviews'}
              </p>
              <button onClick={loadReviews}
                className="text-xs tracking-wider px-5 py-2.5 rounded-sm transition-all duration-200 hover:bg-[rgba(201,168,76,0.08)]"
                style={{ border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}>
                {isRTL ? 'إعادة المحاولة' : 'Retry'}
              </button>
            </div>
          )}

          {/* Empty */}
          {!loading && !fetchError && reviews.length === 0 && (
            <p className="text-center py-16 text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>{r.noReviews}</p>
          )}

          {/* Cards */}
          {!loading && !fetchError && reviews.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reviews.map((review, i) => (
                <ReviewCard key={review.id} review={review} index={i} />
              ))}
            </div>
          )}

        </div>
      </section>

      {showPopup && (
        <ReviewPopup t={t} onClose={() => setShowPopup(false)} onSubmit={handleAdd} />
      )}
    </>
  );
}