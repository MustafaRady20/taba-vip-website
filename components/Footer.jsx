export default function Footer({ t }) {
  const f = t.footer;

  return (
    <footer className="pt-16 pb-8 px-6 lg:px-12" style={{ background: '#0D0D0D', borderTop: '1px solid rgba(201,168,76,0.1)' }} role="contentinfo">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full flex items-center justify-center font-black text-sm shrink-0" aria-hidden="true"
                style={{ background: 'linear-gradient(135deg, #C9A84C, #9A7A30)', color: '#0D0D0D', boxShadow: '0 0 16px rgba(201,168,76,0.3)' }}>VIP</div>
              <div>
                <span className="block text-base font-bold tracking-wide" style={{ color: '#C9A84C' }}>
                  {t.lang === 'ar' ? 'طابا VIP' : 'Taba VIP'}
                </span>
                <span className="block text-[10px] tracking-[2px] uppercase" style={{ color: '#8A7A60' }}>Luxury Travel & Tourism</span>
              </div>
            </div>
            <p className="text-sm leading-[1.8] font-light" style={{ color: 'rgba(255,255,255,0.35)', maxWidth: '280px' }}>{f.tagline}</p>
          </div>

          <nav aria-label={f.quickLinks}>
            <h4 className="text-[11px] tracking-[3px] uppercase font-semibold mb-5" style={{ color: '#C9A84C' }}>{f.quickLinks}</h4>
            <ul className="flex flex-col gap-3 list-none">
              {f.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm font-light transition-colors duration-300 hover:text-[#C9A84C]"
                    style={{ color: 'rgba(255,255,255,0.4)' }}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <address style={{ fontStyle: 'normal' }}>
            <h4 className="text-[11px] tracking-[3px] uppercase font-semibold mb-5" style={{ color: '#C9A84C' }}>{f.contactUs}</h4>
            <ul className="flex flex-col gap-3 list-none">
              <li><a href="https://wa.me/201158881839" target="_blank" rel="noopener noreferrer"
                className="text-sm font-light transition-colors duration-300 hover:text-[#C9A84C]"
                style={{ color: 'rgba(255,255,255,0.4)' }}>01158881839</a></li>
              <li><a href="mailto:Safwat22236@gmail.com"
                className="text-sm font-light transition-colors duration-300 hover:text-[#C9A84C]"
                style={{ color: 'rgba(255,255,255,0.4)' }}>Safwat22236@gmail.com</a></li>
              <li><span className="text-sm font-light" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {t.lang === 'ar' ? 'معبر طابا الحدودي — مصر' : 'Taba Border Crossing — Egypt'}
              </span></li>
            </ul>
          </address>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 text-xs"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.25)' }}>
          <span>{f.copyright}</span>
          <span style={{ color: '#C9A84C', opacity: 0.6 }}>{f.subtitle}</span>
        </div>
      </div>
    </footer>
  );
}
