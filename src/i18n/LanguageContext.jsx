import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { readStorage, STORAGE_KEYS, writeStorage } from '../lib/storage'
import { SUPPORTED_LANGUAGES, translations } from './translations'
import { translate } from './translate'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    const saved = readStorage(STORAGE_KEYS.language, 'it')
    return SUPPORTED_LANGUAGES.includes(saved) ? saved : 'it'
  })

  useEffect(() => {
    writeStorage(STORAGE_KEYS.language, language)
    document.documentElement.lang = language
  }, [language])

  const setLanguage = useCallback((next) => {
    if (SUPPORTED_LANGUAGES.includes(next)) setLanguageState(next)
  }, [])

  const t = useCallback((path) => translate(translations, language, path), [language])

  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t],
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
