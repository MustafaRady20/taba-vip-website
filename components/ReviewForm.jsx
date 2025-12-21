"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useTranslations, useLocale } from "next-intl"
import { BASE_URL } from "@/constants"

export default function ReviewForm({ onSuccess }) {
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const [rating, setRating] = useState(0)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState("")

  const t = useTranslations()
  const locale = useLocale()
  const isRTL = locale === "ar"

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !comment || rating === 0) {
      setError(t("reviewForm.error") || "Please fill all fields")
      return
    }

    setLoading(true)
    setError("")

    try {
      const res = await fetch(`${BASE_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: name,
          rating,
          comment,
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to submit review")
      }

      setSubmitted(true)
      setName("")
      setComment("")
      setRating(0)

      setTimeout(() => {
        setSubmitted(false)
        if (onSuccess) onSuccess()
      }, 1000)
    } catch (err) {
      setError("Something went wrong. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      {submitted ? (
        <div className="text-center text-green-600 font-medium py-6">
          🎉 {t("reviewForm.success") || "Thank you for your feedback!"}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 mb-3">
          {/* Name */}
          <div>
            <Label htmlFor="name" className="mb-2 block">
              {t("reviewForm.name")}
            </Label>
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
            <Label className="block">{t("reviewForm.rating")}</Label>
            <div className="flex gap-2 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-2xl transition ${
                    star <= rating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  } hover:text-yellow-500`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div>
            <Label htmlFor="comment" className="mb-2 block">
              {t("reviewForm.comment")}
            </Label>
            <Textarea
              id="comment"
              placeholder={t("reviewForm.comment")}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              className="min-h-[100px]"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading
              ? t("reviewForm.loading") || "Submitting..."
              : t("reviewForm.submit")}
          </Button>
        </form>
      )}
    </div>
  )
}
