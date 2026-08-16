import { useLanguage } from '../../i18n/LanguageContext'
import { Seo } from '../../components/Seo'
import { FaqAccordion } from '../../components/FaqAccordion'
import { PageHeader } from '../../components/PageHeader'

export default function FaqPage() {
  const { t } = useLanguage()

  return (
    <div className="page-shell max-w-3xl">
      <Seo title={t('seo.faq')} description={t('home.findAnswers')} />
      <PageHeader kicker={t('nav.faq')} title={t('home.faq')} description={t('home.findAnswers')} />
      <FaqAccordion />
    </div>
  )
}
