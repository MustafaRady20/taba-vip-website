"use client";
import { Phone } from "lucide-react";

export default function HeroSection({ t, handleReservationClick, handleWhatsAppClick }) {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden text-center">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-slow-zoom"
        style={{ backgroundImage: "url(/ahmad-safwat-w20uDl32UgI-unsplash.jpg)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-blue-800/40 to-blue-900/50" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#ffffff_1px,_transparent_1px)] bg-[size:20px_20px]" />

      {/* Content */}
      <div className="relative z-10 px-6 max-w-3xl mx-auto space-y-8 animate-fade-in">
        <h2 className="text-5xl md:text-6xl font-extrabold text-yellow-400 drop-shadow-lg font-[Cairo] tracking-wide">
          {t("hero.Name")} <span className="text-white">VIP</span>
        </h2>

        <h1 className="text-4xl md:text-6xl xl:text-7xl font-extrabold leading-tight text-white drop-shadow-lg">
          {t("hero.title")}
        </h1>

        <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-2xl mx-auto">
          {t("hero.subtitle")}
        </p>

        <div className="flex flex-wrap justify-center gap-5 pt-4">
          <button
            onClick={handleReservationClick}
            className="relative group bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl overflow-hidden"
          >
            <span className="relative z-10">{t("hero.bookBtn")}</span>
          </button>

          <button
            onClick={handleWhatsAppClick}
            className="relative group bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center gap-3"
          >
            <Phone className="w-5 h-5" />
            <span>{t("hero.contactBtn")}</span>
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
}
