"use client";
import * as React from "react"
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const CarouselContext = React.createContext(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

function Carousel({
  orientation = "horizontal",
  opts,
  setApi,
  plugins,
  className,
  children,
  ...props
}) {
  const [carouselRef, api] = useEmblaCarousel({
    ...opts,
    axis: orientation === "horizontal" ? "x" : "y",
  }, plugins)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  const onSelect = React.useCallback((api) => {
    if (!api) return
    setCanScrollPrev(api.canScrollPrev())
    setCanScrollNext(api.canScrollNext())
    setCurrent(api.selectedScrollSnap())
    setCount(api.scrollSnapList().length)
  }, [])

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev()
  }, [api])

  const scrollNext = React.useCallback(() => {
    api?.scrollNext()
  }, [api])

  const scrollTo = React.useCallback((index) => {
    api?.scrollTo(index)
  }, [api])

  const handleKeyDown = React.useCallback((event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      scrollPrev()
    } else if (event.key === "ArrowRight") {
      event.preventDefault()
      scrollNext()
    }
  }, [scrollPrev, scrollNext])

  React.useEffect(() => {
    if (!api || !setApi) return
    setApi(api)
  }, [api, setApi])

  React.useEffect(() => {
    if (!api) return
    onSelect(api)
    api.on("reInit", onSelect)
    api.on("select", onSelect)

    return () => {
      api?.off("select", onSelect)
    };
  }, [api, onSelect])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        api: api,
        opts,
        orientation:
          orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        scrollTo,
        canScrollPrev,
        canScrollNext,
        current,
        count,
      }}>
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({
  className,
  ...props
}) {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      data-slot="carousel-content">
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props} />
    </div>
  );
}

function CarouselItem({
  className,
  ...props
}) {
  const { orientation } = useCarousel()

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props} />
  );
}

function CarouselPrevious({
  className,
  variant = "outline",
  size = "icon",
  ...props
}) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn("absolute size-8 rounded-full", orientation === "horizontal"
        ? "top-1/2 -left-12 -translate-y-1/2"
        : "-top-12 left-1/2 -translate-x-1/2 rotate-90", className)}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}>
      <ArrowLeft />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
}

function CarouselNext({
  className,
  variant = "outline",
  size = "icon",
  ...props
}) {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      data-slot="carousel-next"
      variant={variant}
      size={size}
      className={cn("absolute size-8 rounded-full", orientation === "horizontal"
        ? "top-1/2 -right-12 -translate-y-1/2"
        : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90", className)}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}>
      <ArrowRight />
      <span className="sr-only">Next slide</span>
    </Button>
  );
}

// 1. Oddiy Dots - Active bo'lgani kattaroq
function CarouselDots({
  className,
  dotClassName,
  activeDotClassName,
  ...props
}) {
  const { current, count, scrollTo } = useCarousel()

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 mt-4",
        className
      )}
      data-slot="carousel-dots"
      {...props}
    >
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          type="button"
          className={cn(
            "w-2 h-2 rounded-full transition-all duration-300 ease-in-out",
            current === index
              ? cn(
                  "w-3 h-3 bg-primary scale-125 shadow-lg",
                  activeDotClassName
                )
              : cn(
                  "bg-muted-foreground/30 hover:bg-muted-foreground/50",
                  dotClassName
                ),
          )}
          onClick={() => scrollTo(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  )
}

// 2. Long Dots - Active bo'lgani uzunroq
function CarouselLongDots({
  className,
  dotClassName,
  activeDotClassName,
  ...props
}) {
  const { current, count, scrollTo } = useCarousel()

  return (
    <div
      className={cn(
        "absolute left-[40%] bottom-2 flex items-center justify-center gap-2 mt-4",
        className
      )}
      data-slot="carousel-long-dots"
      {...props}
    >
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          type="button"
          className={cn(
            "h-3 xl:h-2 rounded-full transition-all duration-500 ease-in-out",
            current === index
              ? cn(
                  "w-8 bg-white shadow-md",
                  activeDotClassName
                )
              : cn(
                  "w-3 xl:w-2 bg-[#B8B8B8] hover:bg-muted-foreground/50 hover:w-4",
                  dotClassName
                ),
          )}
          onClick={() => scrollTo(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  )
}

// 3. Progress Bar - Current slide progress
function CarouselProgressBar({
  className,
  progressClassName,
  trackClassName,
  showNumbers = false,
  ...props
}) {
  const { current, count } = useCarousel()
  const progress = count > 0 ? ((current + 1) / count) * 100 : 0

  return (
    <div
      className={cn(
        "w-11/12 mx-auto mt-4 absolute z-10 bottom-1 md:bottom-5 px-2 ",
        className
      )}
      data-slot="carousel-progress"
      {...props}
    >
      {showNumbers && (
        <div className="flex justify-between items-center mb-2 text-sm text-muted-foreground">
          <span>{current + 1} / {count}</span>
          <span>{Math.round(progress)}%</span>
        </div>
      )}
      <div
        className={cn(
          "w-full h-1 md:h-2 bg-[#D9D9D9] rounded-full overflow-hidden",
          trackClassName
        )}
      >
        <div
          className={cn(
            "h-full bg-primary transition-all duration-500 ease-out rounded-full",
            progressClassName
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

// Thumbnail Dots - Kichik rasmlar bilan
function CarouselThumbnails({
  className,
  thumbnailClassName,
  activeThumbnailClassName,
  images = [],
  renderThumbnail,
  ...props
}) {
  const { current, count, scrollTo } = useCarousel()

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 mt-4",
        className
      )}
      data-slot="carousel-thumbnails"
      {...props}
    >
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          type="button"
          className={cn(
            "relative w-12 h-8 rounded overflow-hidden border-2 transition-all duration-300",
            current === index
              ? cn(
                  "border-primary shadow-lg scale-110",
                  activeThumbnailClassName
                )
              : cn(
                  "border-muted-foreground/20 hover:border-muted-foreground/40 opacity-70 hover:opacity-90",
                  thumbnailClassName
                ),
          )}
          onClick={() => scrollTo(index)}
          aria-label={`Go to slide ${index + 1}`}
        >
          {renderThumbnail ? (
            renderThumbnail(index)
          ) : images[index] ? (
            <img
              src={images[index]}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center text-xs text-muted-foreground">
              {index + 1}
            </div>
          )}
        </button>
      ))}
    </div>
  )
}

export { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext,
  CarouselDots,
  CarouselLongDots,
  CarouselProgressBar,
  CarouselThumbnails
};