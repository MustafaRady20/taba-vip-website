"use client";
import { motion } from "framer-motion";

export default function ServicesSection({ t, services }) {
  return (
    <section className="py-28 bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-6 space-y-24">
        <h2 className="text-center text-5xl font-bold text-blue-900 mb-16">
          {t("services.title")}
        </h2>

        {services.map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`flex flex-col md:flex-row items-center gap-10 ${
              i % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="flex-shrink-0 bg-gradient-to-br from-blue-600 to-blue-800 text-white w-24 h-24 flex items-center justify-center rounded-3xl text-4xl shadow-lg">
              {service.icon}
            </div>

            <div className="md:w-2/3">
              <h3 className="text-3xl font-semibold text-blue-900 mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                {service.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
