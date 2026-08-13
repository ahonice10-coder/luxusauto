import { createContext, useContext, useState, useMemo } from 'react'
import { translations } from './translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('it') // Défaut: Italien

  const t = (path) => {
    const keys = path.split('.')
    let value = translations[language]
    
    for (const key of keys) {
      if (value && typeof value === 'object') {
        value = value[key]
      } else {
        return path // Retourner le chemin si la traduction n'existe pas
      }
    }
    
    return value || path
  }

  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language],
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
