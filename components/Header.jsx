import Image from "next/image";
import { useState, useEffect } from "react";
import LanguageSwitcher from "./LanguageSwitcher"; 

export default function Header({ isRTL, t, handleWhatsAppClick }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* Logo */}
          <div
            className={`flex items-center gap-2 ${
              isRTL ? "" : "flex-row-reverse"
            }`}
          >
            <Image
              width={110}
              height={110}
              src="/new-taba-logo.png"
              alt="Taba VIP logo"
              className="w-20 md:w-24 h-auto transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Contact Button */}
            <button
              onClick={handleWhatsAppClick}
              className={`px-5 md:px-6 py-2 md:py-2.5 rounded-full font-semibold text-sm md:text-base transition-all duration-300 ${
                scrolled
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-white text-green-600 hover:bg-gray-100"
              }`}
            >
              {t("header.contactBtn")}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
