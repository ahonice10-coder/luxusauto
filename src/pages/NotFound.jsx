import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { Seo } from '../components/Seo'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-5 py-24 text-center">
      <Seo title="404" description={t('errors.notFoundBody')} />
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">404</p>
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{t('errors.notFound')}</h1>
      <p className="mt-5 max-w-md leading-relaxed text-muted-foreground">{t('errors.notFoundBody')}</p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button asChild>
          <Link to="/">{t('errors.backHome')}</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/vehicles">{t('errors.seeVehicles')}</Link>
        </Button>
      </div>
    </div>
  )
}
