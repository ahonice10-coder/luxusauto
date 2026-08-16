import { useLanguage } from '../i18n/LanguageContext'
import { Skeleton } from '@/components/ui/skeleton'

export function PageLoader() {
  const { t } = useLanguage()

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4" role="status">
      <Skeleton className="h-10 w-10 rounded-full" />
      <p className="text-sm text-muted-foreground">{t('common.loading')}</p>
    </div>
  )
}
