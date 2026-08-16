import { Globe } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function LanguageSwitcher({ id = 'language-switcher', compact = false }) {
  const { language, setLanguage, t } = useLanguage()

  const languages = [
    { code: 'it', name: t('language.italian') },
    { code: 'fr', name: t('language.french') },
    { code: 'en', name: t('language.english') },
    { code: 'de', name: t('language.german') },
  ]

  return (
    <div className="flex items-center gap-2">
      {compact ? null : <Globe size={16} className="text-muted-foreground" aria-hidden="true" />}
      <label className="sr-only" htmlFor={id}>{t('language.label')}</label>
      <Select value={language} onValueChange={setLanguage}>
        <SelectTrigger id={id} size="sm" className={compact ? 'h-8 min-w-[3.5rem] px-2 text-xs sm:h-8 sm:min-w-[4.5rem]' : 'min-w-[8rem]'}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {compact ? lang.code.toUpperCase() : lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
