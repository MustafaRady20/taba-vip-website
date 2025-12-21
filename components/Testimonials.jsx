"use client"

import { useEffect, useState } from "react"
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
import { BASE_URL } from "@/constants"

/* ⭐ Rating Stars */
function Stars({ rating }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span 
          key={star}
          className={`text-lg ${star <= rating ? 'text-amber-400' : 'text-gray-300'}`}
        >
          ★
        </span>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const t = useTranslations()
  const locale = useLocale()
  const isRTL = locale === "ar"

  const [reviews, setReviews] = useState([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${BASE_URL}/reviews`, {
        cache: "no-store",
      })
      const data = await res.json()
      setReviews(Array.isArray(data) ? data : data.data)
    } catch (err) {
      console.error("Failed to load reviews", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className={`flex items-center justify-center gap-3 mb-4 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {t("testimonials.title")}
            </h2>
          </div>
        
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-500">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No reviews yet</p>
            <p className="text-gray-400 mt-2">Be the first to leave a review!</p>
          </div>
        ) : (
          <Carousel>
            {reviews.map((item) => (
              <div
                key={item._id}
                className="min-w-[90%] md:min-w-[45%] lg:min-w-[30%] px-3"
              >
                <Card className="h-full border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow duration-300">
                  <CardContent
                    className={`p-6 flex flex-col gap-4 ${
                      isRTL ? "text-right" : "text-left"
                    }`}
                  >
                    {/* Stars */}
                    <Stars rating={item.rating} />

                    {/* Comment */}
                    <p className="text-gray-700 text-base leading-relaxed flex-grow">
                      "{item.comment}"
                    </p>

                    {/* User Info */}
                    <div className="pt-4 border-t border-gray-100">
                      <p className="font-semibold text-gray-900">
                        {item.userName}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(item.createdAt).toLocaleDateString(locale, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </Carousel>
        )}

        {/* Add Review Button */}
        <div className="mt-12 text-center">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-base font-medium transition-colors">
                {t("testimonials.add_review") || "Add Review"}
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">
                  {t("testimonials.add_review") || "Add Review"}
                </DialogTitle>
              </DialogHeader>

              <ReviewForm
                onSuccess={() => {
                  setOpen(false)
                  fetchReviews()
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  )
}