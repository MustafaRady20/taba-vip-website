"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Star, HeartHandshake, Globe2 } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function WhyUsSection() {
  const t = useTranslations("WhyUs");

  const reasons = [
    {
      icon: <Star className="w-7 h-7 text-yellow-500" />,
      title: t("reasons.trusted.title"),
      text: t("reasons.trusted.text"),
    },
    {
      icon: <HeartHandshake className="w-7 h-7 text-green-600" />,
      title: t("reasons.vip.title"),
      text: t("reasons.vip.text"),
    },
    {
      icon: <Globe2 className="w-7 h-7 text-blue-600" />,
      title: t("reasons.multilingual.title"),
      text: t("reasons.multilingual.text"),
    },
  ];

  const images = [
    "/slder-image.jpg",
    "/peggy-anke-YxpoB3bvlZQ-unsplash.jpg",
    "/WhatsApp Image 2025-10-19 at 4.37.21 PM.jpeg",
    "/WhatsApp Image 2025-10-19 at 4.37.22 PM.jpeg",
    "/slider-image-4.jpeg",
    "/slider-image2.jpg",
    "/slider-image0.jpeg",
  ];

  return (
    <section className="py-20 bg-white" id="why-us">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Section */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            {t("title")}{" "}
            <span className="text-green-600">{t("highlight")}</span>
          </h2>
          <p className="text-gray-600 mb-8 text-lg">{t("description")}</p>

          <div className="space-y-6">
            {reasons.map((r, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex-shrink-0">{r.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-700">
                    {r.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{r.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Image Slider Section */}
        <div className="flex justify-center">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            navigation={true}
            className="w-[550px] h-[400px] rounded-2xl shadow-lg overflow-hidden"
          >
            {images.map((src, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={src}
                  alt={t("imageAlt")}
                  width={550}
                  height={400}
                  className="rounded-2xl object-contain w-full h-full"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
