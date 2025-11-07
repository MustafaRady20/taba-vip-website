import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import './globals.css';
// import { Reem_Kufi } from 'next/font/google';
import { Cairo } from "next/font/google";


// Arabic display font
const cairo = Cairo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-cairo",
});

export const metadata = {
  title: "Taba VIP | Luxury Travel & Tourism",
  description:
    "Experience luxury travel and exclusive tourism services with Taba VIP. Premium transport, personalized tours, and top-tier hospitality.",
  keywords: [
    "Taba VIP",
    "Egypt tourism",
    "luxury travel",
    "private tours",
    "VIP transfer",
    "Taba tours",
    "Sinai travel",
    "airport transfer Egypt",
  ],
  authors: [{ name: "Taba VIP Team" }],
  openGraph: {
    title: "Taba VIP | Luxury Travel & Tourism",
    description:
      "Premium tourism and transportation experiences in Egypt with Taba VIP.",
    url: "https://www.tabavip.com",
    siteName: "Taba VIP",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Taba VIP luxury travel",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://www.tabavip.com",
  },
};


export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  // Providing all messages to the client side
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={cairo.variable}>
      <body className="font-cairo">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}