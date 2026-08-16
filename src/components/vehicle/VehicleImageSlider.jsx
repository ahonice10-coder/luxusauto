import { useEffect, useState } from 'react'
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

  if (!slides.length) {
    return <SafeImage src="" alt={alt} className={cn('h-full w-full object-cover', imageClassName)} />
  }

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
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
                'h-1.5 rounded-full transition-all',
                slideIndex === index ? 'w-5 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80',
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
