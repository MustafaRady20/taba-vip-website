import { getTranslation } from "../../lib/translations";
import { locales } from "../../middleware";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Services from "../../components/Services";
import WhyUs from "../../components/WhyUs";
import Gallery from "../../components/Gallery";
import Footer from "../../components/Footer";
import WhatsAppFloat from "../../components/WhatsAppFloat";
import Reviews from "../../components/Reviews";
import BookingSection from '../../components/BookingSection';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }) {
  const { locale } = await params;
  const t = getTranslation(locale);

  return (
    <>
      <Navbar t={t} locale={locale} />
      <main>
        <Hero t={t} />
        <div className="gold-divider" />
        <Services t={t} />
        <div className="gold-divider" />
        <WhyUs t={t} />
        <div className="gold-divider" />
        
        <Gallery t={t} />
        <BookingSection t={t} />
        <Reviews t={t} />
        <div className="gold-divider" />
      </main>
      <Footer t={t} />
      <WhatsAppFloat />
    </>
  );
}
