import { useLanguage } from '../../i18n/LanguageContext'
import { LanguageSwitcher } from '../../components/LanguageSwitcher'
import { Seo } from '../../components/Seo'

export default function AdminSettingsPage() {
  const { t } = useLanguage()

  return (
    <div className="space-y-4" data-reveal>
      <Seo title={t('admin.settings')} />
      <h2 className="text-3xl font-black text-foreground">{t('admin.settings')}</h2>
      <div className="glass-panel p-5">
        <p className="font-semibold text-foreground">{t('admin.interface')}</p>
        <p className="mt-2 text-sm text-muted-foreground">{t('admin.settingsHint')}</p>
        <div className="mt-4">
          <LanguageSwitcher id="language-switcher-settings" />
        </div>
      </div>
      <div className="glass-panel p-5">
        <p className="font-semibold text-foreground">{t('admin.adminNotifications')}</p>
        <p className="mt-2 text-sm text-muted-foreground">{t('admin.settingsHint')}</p>
      </div>
    </div>
  )
}
