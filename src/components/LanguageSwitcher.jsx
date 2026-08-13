import { Globe } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()

  const languages = [
    { code: 'it', name: t('language.italian'), flag: '🇮🇹' },
    { code: 'en', name: t('language.english'), flag: '🇬🇧' },
    { code: 'fr', name: t('language.french'), flag: '🇫🇷' },
    { code: 'de', name: t('language.german'), flag: '🇩🇪' },
  ]

  return (
    <div className="flex items-center gap-2">
      <Globe size={16} className="text-primary" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="rounded-lg bg-background border border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-text-soft hover:border-primary cursor-pointer focus:border-primary focus:outline-none"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  )
}
