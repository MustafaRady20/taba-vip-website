'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const changeLanguage = (newLocale) => {
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, '');
    router.push(`/${newLocale}${pathnameWithoutLocale}`);
    router.refresh();
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md hover:bg-gray-50 transition-all duration-300"
      >
        <Globe className="w-5 h-5 text-gray-700" />
        <span className="font-semibold text-gray-700">
          {locale === 'ar' ? 'AR' : 'EN'}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-2 animate-fadeIn">
          <button
            onClick={() => changeLanguage('en')}
            className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
              locale === 'en'
                ? 'bg-blue-50 text-blue-600'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            English
          </button>
          <button
            onClick={() => changeLanguage('ar')}
            className={`block w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
              locale === 'ar'
                ? 'bg-blue-50 text-blue-600'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            العربية
          </button>
        </div>
      )}
    </div>
  );
}
