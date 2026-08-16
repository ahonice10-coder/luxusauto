import { useEffect, useRef, useState } from 'react'
import { SafeImage } from '../SafeImage'
import { cn } from '@/lib/utils'

export function VehicleImageSlider({
  images = [],
  alt = '',
  interval = 3000,
  className,
  imageClassName,
}) {
  const slides = images.filter(Boolean)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const touchStartX = useRef(0)
  const swiped = useRef(false)

  useEffect(() => {
    setIndex(0)
  }, [slides.join('|')])

  useEffect(() => {
    if (slides.length <= 1 || paused) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, interval)
    return () => window.clearInterval(timer)
  }, [slides.length, paused, interval])

  const goTo = (nextIndex) => {
    const total = slides.length
    if (!total) return
    setIndex(((nextIndex % total) + total) % total)
  }

  if (!slides.length) {
    return <SafeImage src="" alt={alt} className={cn('h-full w-full object-cover', imageClassName)} />
  }

  return (
    <div
      className={cn('relative overflow-hidden touch-pan-y', className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(event) => {
        if (slides.length <= 1) return
        setPaused(true)
        swiped.current = false
        touchStartX.current = event.touches[0].clientX
      }}
      onTouchEnd={(event) => {
        if (slides.length <= 1) return
        const delta = event.changedTouches[0].clientX - touchStartX.current
        if (Math.abs(delta) > 40) {
          swiped.current = true
          goTo(index + (delta < 0 ? 1 : -1))
        }
        window.setTimeout(() => setPaused(false), interval)
      }}
      onClickCapture={(event) => {
        if (!swiped.current) return
        event.preventDefault()
        event.stopPropagation()
        swiped.current = false
      }}
    >
      {slides.map((src, slideIndex) => (
        <SafeImage
          key={`${src}-${slideIndex}`}
          src={src}
          alt={slideIndex === 0 ? alt : `${alt} ${slideIndex + 1}`}
          className={cn(
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-700',
            slideIndex === index ? 'opacity-100' : 'opacity-0',
            imageClassName,
          )}
        />
      ))}
      {slides.length > 1 ? (
        <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-1.5">
          {slides.map((src, slideIndex) => (
            <button
              key={`dot-${src}-${slideIndex}`}
              type="button"
              aria-label={`${slideIndex + 1} / ${slides.length}`}
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                setIndex(slideIndex)
              }}
              className={cn(
                'min-h-6 min-w-6 rounded-full p-1.5',
              )}
            >
              <span
                className={cn(
                  'block h-1.5 rounded-full transition-all',
                  slideIndex === index ? 'w-5 bg-white' : 'w-1.5 bg-white/50',
                )}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
