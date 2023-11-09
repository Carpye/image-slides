"use client"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import Image from "next/image"
import React, { ReactNode, useEffect, useState } from "react"
import { cn } from "../../utils"

const SlidesPresenter = ({ images }: { images: string[] }) => {
  const [slide, setSlide] = useState(1)
  const [isFirstSlide, setIsFirstSlide] = useState(true)
  const [isLastSlide, setIsLastSlide] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadedImages, setLoadedImages] = useState<string[]>([])
  useEffect(() => {
    async function handleContentLoaded() {
      const promises = images.map((image) => {
        return new Promise<string>((resolve) => {
          const img = document.createElement("img")
          img.onload = () => resolve(image)
          img.src = image
        })
      })
      const loadedImages = await Promise.all(promises)
      setLoadedImages(loadedImages as string[])
    }

    handleContentLoaded()
  }, [images])

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextSlide()
      }
      if (e.key === "ArrowLeft") {
        previousSlide()
      }
    }
    document.addEventListener("keydown", keyDownHandler)

    // clean up
    return () => {
      document.removeEventListener("keydown", keyDownHandler)
    }
  }, [])

  useEffect(() => {
    setIsFirstSlide(false)
    setIsLastSlide(false)
    if (slide === images.length) setIsLastSlide(true)
    else setIsLastSlide(false)
    if (slide === 1) setIsFirstSlide(true)
    else setIsFirstSlide(false)
  }, [slide])

  function nextSlide() {
    setSlide((prev) => {
      if (prev === images.length) {
        // if you are on the last slide
        return prev
      } else {
        return prev + 1
      }
    })
  }

  function previousSlide() {
    setSlide((prev) => {
      if (prev === 1) {
        // if you are on the first slide
        return prev
      } else {
        return prev - 1
      }
    })
  }
  return (
    <>
      <div
        className={cn(
          "w-full h-full flex justify-center items-center text-zinc-200",
          isLoading ? "" : "hidden"
        )}
      >
        <Loader2 className="animate-spin h-24 w-24" />
      </div>
      <Image
        src={loadedImages[slide - 1] ?? images[0]}
        alt="slide"
        fill
        quality={100}
        priority
        className={isLoading ? "invisible" : "rounded-[10px]"}
        onLoad={() => setIsLoading(false)}
      />
      <div className="absolute max-w-[500px] w-2/5 lg:h-16 h-10 -bottom-4 lg:-bottom-6 left-1/2 -translate-x-1/2 rounded-lg border border-[#3F3F3F] bg-[black]/50 backdrop-blur-[4px] flex justify-center items-center gap-3">
        <IconButton onClick={previousSlide} disabled={isFirstSlide}>
          <ChevronLeft className="lg:w-6 lg:h-6 w-4 h-4" />
        </IconButton>
        <div className="text-zinc-400">{slide}</div>
        <IconButton onClick={nextSlide} disabled={isLastSlide}>
          <ChevronRight className="lg:w-6 lg:h-6 w-4 h-4" />
        </IconButton>
      </div>
    </>
  )
}

function IconButton({
  children,
  onClick,
  disabled,
}: {
  children: ReactNode
  onClick: () => void
  disabled: boolean
}) {
  return (
    <button
      className="lg:w-10 lg:h-10 h-5 w-5 lg:rounded-[10px] rounded-[5px] border border-[#3F3F3F] grid place-items-center text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/25 transition disabled:text-zinc-600 disabled:border-[#252525]"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default SlidesPresenter
