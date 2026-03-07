'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar({ t, locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const otherLocale = locale === 'ar' ? 'en' : 'ar';
  const otherLocalePath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const navLinks = [
    { href: '#services', label: t.nav.services },
    { href: '#why-us', label: t.nav.whyUs },
    { href: '#gallery', label: t.nav.gallery },
  ];

  return (
    <header
      role="banner"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-3 border-b' : 'py-5'}`}
      style={{
        background: scrolled ? 'rgba(13,13,13,0.97)' : 'linear-gradient(to bottom, rgba(13,13,13,0.9), transparent)',
        borderColor: scrolled ? 'rgba(201,168,76,0.15)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-3 no-underline" aria-label="Taba VIP">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center font-black text-base "
            // style={{ background: 'linear-gradient(135deg, #C9A84C, #9A7A30)', color: '#0D0D0D', boxShadow: '0 0 20px rgba(201,168,76,0.4)' }}
            aria-hidden="true"
          >
            <img src="/images/logo.jpeg" alt="logo" />
          </div>
          <div className="leading-tight">
            <span className="block text-lg font-bold tracking-wide" style={{ color: '#C9A84C' }}>
              {locale === 'ar' ? 'طابا VIP' : 'Taba VIP'}
            </span>
            <span className="block text-[10px] tracking-[3px] uppercase" style={{ color: '#8A7A60' }}>Taba VIP Services</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}
              className="text-sm font-medium transition-colors duration-300 relative group"
              style={{ color: 'rgba(255,255,255,0.65)' }}>
              {link.label}
              <span className="absolute -bottom-1 right-0 h-px w-0 group-hover:w-full transition-all duration-300" style={{ background: '#C9A84C' }} />
            </a>
          ))}

          <Link
            href={otherLocalePath}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-sm text-xs font-semibold tracking-wider transition-all duration-300 hover:scale-105"
            style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.3)', color: '#C9A84C' }}
            aria-label={locale === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
          >
            <span aria-hidden="true">{locale === 'ar' ? '🇬🇧' : '🇪🇬'}</span>
            <span>{locale === 'ar' ? 'English' : 'العربية'}</span>
          </Link>

          <a href="#book" className="btn-primary text-xs px-6 py-2.5">✦ {t.nav.bookNow}</a>
        </nav>

        <div className="md:hidden flex items-center gap-3">
          <Link href={otherLocalePath}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-semibold"
            style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)', color: '#C9A84C' }}>
            {locale === 'ar' ? 'EN' : 'عر'}
          </Link>
          <button className="flex flex-col gap-1.5 p-2" onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu" aria-expanded={menuOpen}>
            {[0, 1, 2].map((i) => (
              <span key={i} className="block h-px w-6 transition-all duration-300"
                style={{ background: '#C9A84C',
                  transform: menuOpen && i === 0 ? 'rotate(45deg) translateY(8px)'
                    : menuOpen && i === 2 ? 'rotate(-45deg) translateY(-8px)'
                    : menuOpen && i === 1 ? 'scaleX(0)' : 'none' }} />
            ))}
          </button>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ background: 'rgba(13,13,13,0.98)' }}>
        <nav className="flex flex-col px-6 py-4 gap-4">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm py-2 border-b"
              style={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(201,168,76,0.1)' }}
              onClick={() => setMenuOpen(false)}>{link.label}</a>
          ))}
          <a href="#book" className="btn-primary text-xs justify-center mt-2" onClick={() => setMenuOpen(false)}>
            ✦ {t.nav.bookNow}
          </a>
        </nav>
      </div>
    </header>
  );
}
