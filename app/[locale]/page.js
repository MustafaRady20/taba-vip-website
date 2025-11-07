"use client";
import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Users, Plane, Clock, Shield, Briefcase, Star } from "lucide-react";

import ReservationPopup from "@/components/ReservationForm";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import BenefitsSection from "@/components/BenefitsSection";
import WhyUsSection from "@/components/WhyUsSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";
  const [scrolled, setScrolled] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const whatsappNumber = "201158881839";
  const whatsappMessage = isRTL
    ? "مرحباً، أرغب في الاستفسار عن خدماتكم"
    : "Hello, I would like to inquire about your services";

  const handleWhatsAppClick = () =>
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
    );

  const handleReservationClick = () => setIsReservationOpen(true);

  const services = [
    { icon: <Users className="w-8 h-8" />, title: t("services.service1.title"), description: t("services.service1.description") },
    { icon: <Plane className="w-8 h-8" />, title: t("services.service2.title"), description: t("services.service2.description") },
    { icon: <Clock className="w-8 h-8" />, title: t("services.service3.title"), description: t("services.service3.description") },
    { icon: <Shield className="w-8 h-8" />, title: t("services.service4.title"), description: t("services.service4.description") },
    { icon: <Briefcase className="w-8 h-8" />, title: t("services.service5.title"), description: t("services.service5.description") },
    { icon: <Star className="w-8 h-8" />, title: t("services.service6.title"), description: t("services.service6.description") },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <ReservationPopup
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        locale={locale}
      />

      <Header
        scrolled={scrolled}
        isRTL={isRTL}
        t={t}
        handleWhatsAppClick={handleWhatsAppClick}
      />

      <HeroSection
        t={t}
        handleReservationClick={handleReservationClick}
        handleWhatsAppClick={handleWhatsAppClick}
      />

      <BenefitsSection t={t} />
      <WhyUsSection t={t} />
      <Footer t={t} handleReservationClick={handleReservationClick} handleWhatsAppClick={handleWhatsAppClick} />
    </div>
  );
}
