import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function PageTransition({ children }) {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })

    let observer
    const fallback = window.setTimeout(() => {
      document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((node) => {
        node.classList.add('is-visible')
      })
    }, 900)

    const start = window.setTimeout(() => {
      const nodes = document.querySelectorAll('[data-reveal]:not(.is-visible)')
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          })
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
      )
      nodes.forEach((node) => observer.observe(node))
    }, 40)

    return () => {
      window.clearTimeout(start)
      window.clearTimeout(fallback)
      observer?.disconnect()
    }
  }, [location.pathname])

  return (
    <div key={location.pathname} className="page-enter">
      {children}
    </div>
  )
}
