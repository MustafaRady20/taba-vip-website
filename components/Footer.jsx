"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { Phone, Mail, MapPin, Facebook, Instagram, Globe } from "lucide-react";

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <footer className="bg-blue-900 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Top Grid */}
        <div
          className={`grid md:grid-cols-3 gap-8 ${
            isRTL ? "text-right" : "text-left"
          }`}
        >
          {/* Logo & About */}
          <div>
            <div
              className={`flex items-center gap-2 mb-4 ${
          "flex-row"
              }`}
            >
              <Image
                src="/new-taba-logo.png"
                alt="Taba VIP logo"
                width={60}
                height={60}
                className="w-14 h-auto"
              />
              <h3 className="text-2xl font-bold">{t("header.logo")}</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-4">{t("footer.contact")}</h4>
            <div className="space-y-3">
              <a
                href="https://wa.me/201158881839"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-yellow-500 transition-colors"
              >
                <Phone className="w-5 h-5 text-yellow-500" />
                <span>01158881839</span>
              </a>
              <div className="flex items-center gap-2 text-gray-300">
                <Mail className="w-5 h-5 text-yellow-500" />
                <span>info@tabavip.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-5 h-5 text-yellow-500" />
                <span>{t("footer.location")}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-4">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#services"
                  className="text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  {t("footer.services")}
                </a>
              </li>
              <li>
                <a
                  href="#benefits"
                  className="text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  {t("footer.benefits")}
                </a>
              </li>
              <li>
                <a
                  href="#why-us"
                  
                  className="text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  {t("footer.whyUs")}
                </a>
              </li>
              <li>
                <a
                  href="#book"
                  className="text-gray-300 hover:text-yellow-500 transition-colors"
                >
                  {t("footer.bookNow")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
          <p>&copy; 2025 Taba VIP. {t("footer.rights")}</p>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a
            target="_blank"
              href="https://www.facebook.com/profile.php?id=61575092787052&mibextid=wwXIfr&rdid=VHWl8h1ZGR5VUYep&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1ZXuoqXxtu%2F%3Fmibextid%3DwwXIfr#"
              className="hover:text-yellow-500 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
            target="_blank"
              href="https://www.instagram.com/viptaba"
              className="hover:text-yellow-500 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
           
          </div>
        </div>
      </div>
    </footer>
  );
}
