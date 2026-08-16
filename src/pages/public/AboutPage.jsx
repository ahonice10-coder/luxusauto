import { useLanguage } from '../../i18n/LanguageContext'
import { Seo } from '../../components/Seo'
import { PageHeader } from '../../components/PageHeader'

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <div className="page-shell max-w-5xl">
      <Seo title={t('seo.about')} description={t('about.body')} />
      <PageHeader kicker={t('about.kicker')} title={t('about.title')} description={t('about.body')} />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="border-t border-border pt-6">
          <h3 className="text-xl font-bold text-foreground">{t('about.expertise')}</h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">{t('about.expertiseDesc')}</p>
        </div>
        <div className="border-t border-border pt-6">
          <h3 className="text-xl font-bold text-foreground">{t('about.selection')}</h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">{t('about.selectionDesc')}</p>
        </div>
        <div className="border-t border-border pt-6">
          <h3 className="text-xl font-bold text-foreground">{t('about.service')}</h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">{t('about.serviceDesc')}</p>
        </div>
      </div>
    </div>
  )
}
