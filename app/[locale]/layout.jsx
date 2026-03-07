import { Tajawal } from 'next/font/google';
import '../globals.css';
import { locales } from '../..//middleware';
import { getTranslation } from '../../lib/translations';

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-tajawal',
});

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = getTranslation(locale);
  const baseUrl = 'https://taba-vip-website.vercel.app';

  return {
    title: {
      default: t.meta.title,
      template: `%s | ${locale === 'ar' ? 'طابا VIP' : 'Taba VIP'}`,
    },
    description: t.meta.description,
    keywords: t.meta.keywords,
    authors: [{ name: 'Taba VIP', url: baseUrl }],
    creator: 'Taba VIP',
    publisher: 'Taba VIP',
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    openGraph: {
      type: 'website',
      locale: t.locale,
      alternateLocale: locale === 'ar' ? 'en_US' : 'ar_EG',
      url: `${baseUrl}/${locale}`,
      siteName: 'Taba VIP',
      title: t.meta.title,
      description: t.meta.description,
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Taba VIP' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.meta.title,
      description: t.meta.description,
      images: ['/og-image.jpg'],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'ar': `${baseUrl}/ar`,
        'en': `${baseUrl}/en`,
      },
    },
  };
}

// JSON-LD structured data (static, bilingual)
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'TravelAgency',
      '@id': 'https://taba-vip-website.vercel.app/#organization',
      name: 'Taba VIP',
      alternateName: 'طابا VIP',
      url: 'https://taba-vip-website.vercel.app',
      description: 'Luxury VIP travel services at Taba Border Crossing, Egypt.',
      telephone: '+201158881839',
      email: 'Safwat22236@gmail.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Taba',
        addressRegion: 'South Sinai',
        addressCountry: 'EG',
        streetAddress: 'Taba Border Crossing',
      },
      geo: { '@type': 'GeoCoordinates', latitude: '29.4955', longitude: '34.8954' },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
      sameAs: ['https://wa.me/201158881839'],
      priceRange: '$$',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://taba-vip-website.vercel.app/#website',
      url: 'https://taba-vip-website.vercel.app',
      name: 'Taba VIP',
      inLanguage: ['ar', 'en'],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What services does Taba VIP provide?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Taba VIP provides comprehensive VIP services at Taba Border Crossing including: personal escort, luxury VIP lounge, queue-free processing, free luggage transfer, and private transfers.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I book Taba VIP services?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can book via the form on our website, WhatsApp at 01158881839, or email Safwat22236@gmail.com.',
          },
        },
      ],
    },
  ],
};

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const t = getTranslation(locale);

  return (
    <html lang={t.lang} dir={t.dir} className={tajawal.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0D0D0D" />
        <meta name="geo.region" content="EG-JS" />
        <meta name="geo.placename" content="Taba, South Sinai, Egypt" />
        <meta name="geo.position" content="29.4955;34.8954" />
        <meta name="ICBM" content="29.4955, 34.8954" />
      </head>
      <body className="font-tajawal bg-dark text-white antialiased">
        {children}
      </body>
    </html>
  );
}
