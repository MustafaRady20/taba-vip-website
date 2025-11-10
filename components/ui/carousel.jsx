"use client"

import * as React from "react"
import useEmblaCarousel from "embla-carousel-react"
import { Button } from "@/components/ui/button"


export function Carousel({children} ) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  return (
    <div className="relative w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">{children}</div>
      </div>
      <div className="absolute inset-y-1/2 -translate-y-1/2 flex justify-between w-full px-2">
        <Button
          variant="secondary"
          size="icon"
          onClick={scrollPrev}
          className="rounded-full bg-white shadow-md hover:bg-gray-100"
        >
          ‹
        </Button>
        <Button
          variant="secondary"
          size="icon"
          onClick={scrollNext}
          className="rounded-full bg-white shadow-md hover:bg-gray-100"
        >
          ›
        </Button>
      </div>
    </div>
  )
}
