import { useEffect } from 'react'
import { SITE } from '../lib/config'

export function Seo({ title, description }) {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE.name}` : SITE.name
    const meta = document.querySelector('meta[name="description"]')
    if (meta && description) meta.setAttribute('content', description)
  }, [title, description])

  return null
}
