import { useState } from 'react'

export function SafeImage({ src, alt, className = '', ...props }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div
        className={`flex items-center justify-center bg-muted text-xs uppercase tracking-[0.16em] text-muted-foreground ${className}`}
        role="img"
        aria-label={alt}
      >
        LuxusAuto
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      onError={() => setFailed(true)}
      {...props}
    />
  )
}
