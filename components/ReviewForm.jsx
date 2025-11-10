"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useTranslations, useLocale } from "next-intl";

export default function ReviewForm({ onSuccess }) {
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !comment || rating === 0) {
      alert("Please fill in all fields and select a rating.")
      return
    }

    console.log({ name, comment, rating })

    setSubmitted(true)
    setName("")
    setComment("")
    setRating(0)

    // Auto-close modal after 1 second
    setTimeout(() => {
      setSubmitted(false)
      if (onSuccess) onSuccess()
    }, 1000)
  }

  return (
    <div>
      {submitted ? (
        <div className="text-center text-green-600 font-medium py-6">
          🎉 Thank you for your feedback!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 mb-3">
          {/* Name */}
          <div>
            <Label htmlFor="name" className="mb-2">{t("reviewForm.name")}</Label>
            <Input
              id="name"
              placeholder={t("reviewForm.name")}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Rating */}
          <div>
        <Label>{t("reviewForm.rating")}</Label>
            <div className="flex gap-2 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-2xl ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  } hover:text-yellow-500 transition`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div>
            <Label htmlFor="comment" className="mb-3">{t("reviewForm.comment")}</Label>
            <Textarea
              id="comment"
              placeholder={t("reviewForm.comment")}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              className="min-h-[100px]"
            />
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full">
            {t("reviewForm.submit")}
          </Button>
        </form>
      )}
    </div>
  )
}
