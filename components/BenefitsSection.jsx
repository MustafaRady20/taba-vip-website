"use client";

import { useTranslations } from "next-intl";
import { Bus, Headphones, UserRound, FileBadge2 } from "lucide-react";

export default function BenefitsSection() {
  const t = useTranslations("Benefits");

  const benefits = [
    {
      icon: <FileBadge2 className="w-10 h-10 text-green-600 mb-4" />,
      title: t("items.fastProcedures.title"),
      text: t("items.fastProcedures.text"),
    },
    {
      icon: <UserRound className="w-10 h-10 text-green-600 mb-4" />,
      title: t("items.service1.title"),
      text: t("items.service1.text"),
    },
    {
      icon: <UserRound className="w-10 h-10 text-green-600 mb-4" />,
      title: t("items.service6.title"),
      text: t("items.service6.text"),
    },
     {
      icon: <UserRound className="w-10 h-10 text-green-600 mb-4" />,
      title: t("items.service5.title"),
      text: t("items.service5.text"),
    },
    {
      icon: <UserRound className="w-10 h-10 text-green-600 mb-4" />,
      title: t("items.service4.title"),
      text: t("items.service4.text"),
    },
    {
      icon: <UserRound className="w-10 h-10 text-green-600 mb-4" />,
      title: t("items.personalAssistant.title"),
      text: t("items.personalAssistant.text"),
    },
    {
      icon: <Bus className="w-10 h-10 text-green-600 mb-4" />,
      title: t("items.transportation.title"),
      text: t("items.transportation.text"),
    },
    {
      icon: <Headphones className="w-10 h-10 text-green-600 mb-4" />,
      title: t("items.support.title"),
      text: t("items.support.text"),
    },
  ];

  return (
    <section className="py-20 bg-gray-50 text-center" id="benefits">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          {t("title")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-center">{b.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {b.title}
              </h3>
              <p className="text-gray-600 text-sm">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
