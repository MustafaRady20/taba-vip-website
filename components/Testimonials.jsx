"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Carousel } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import ReviewForm from "@/components/ReviewForm"
import { useTranslations, useLocale } from "next-intl"

const testimonials = [
  {
    name: "Hazem VR",
    reviews: "3 reviews",
    text: "بصراحه بعد ان جربت الشراء ... شكراً جزيلاً ❤️",
    time: "11 months ago",
  },
  {
    name: "Mustafa Hassan",
    reviews: "2 reviews",
    text: "All books listed on their website are available and ready to be shipped once you order it...",
    time: "11 months ago",
  },
  {
    name: "Ahmed El-Sharkawy",
    reviews: "2 reviews",
    text: "High quality printing and good service. even I received wrong book but once called them...",
    time: "10 months ago",
  },
  {
    name: "Dasa Bazzan",
    reviews: "8 reviews",
    text: "Amazing quality, good and very quick delivery.",
    time: "10 months ago",
  },
]

export default function Testimonials() {
  const t = useTranslations()
  const locale = useLocale()
  const isRTL = locale === "ar"

  const [open, setOpen] = useState(false)

  return (
    <section className="py-12 bg-neutral-50">
      <div className="container mx-auto px-4 text-center">
        {/* Title and Button Row */}
        <div
          className={`flex items-center justify-center max-w-4xl mx-auto mb-8 ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <img src="/logo-icon.svg" alt="Logo" className="h-6 w-6" />
            {t("testimonials.title")}
          </h2>

  
        </div>

        {/* Carousel */}
        <Carousel>
          {testimonials.map((item, idx) => (
            <div key={idx} className="min-w-[90%] md:min-w-[40%] lg:min-w-[25%] px-3">
              <Card className="rounded-xl shadow-sm border bg-white">
                <CardContent className="p-6 text-left">
                  <div className="flex flex-col gap-2">
                    <div>
                      <p className="font-semibold text-lg">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.reviews}</p>
                    </div>
                    <p className="text-gray-700 text-sm">{item.text}</p>
                    <p className="text-xs text-gray-400">{item.time}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </Carousel>
         <div className="mt-6">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>{t("testimonials.add_review") || "Add Review"}</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{t("testimonials.add_review") || "Add Review"}</DialogTitle>
              </DialogHeader>
              <ReviewForm onSuccess={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
         </div>
      </div>
    </section>
  )
}
