import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../i18n/LanguageContext'
import { Seo } from '../../components/Seo'
import { PageHeader } from '../../components/PageHeader'
import { AccountNav } from '../../components/AccountNav'

export default function ProfilePage() {
  const { user, logout } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()

  return (
    <div className="page-shell max-w-6xl">
      <Seo title={t('seo.profile')} />
      <AccountNav />
      <PageHeader
        kicker={t('user.profile')}
        title={user?.name || 'Utilisateur'}
        action={(
          <button
            type="button"
            onClick={() => { logout(); navigate('/login') }}
            className="rounded border border-border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground hover:text-primary"
          >
            {t('nav.logout')}
          </button>
        )}
      />

      <div className="grid gap-5 md:grid-cols-2">
        <div className="border border-border bg-card px-6 py-6">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{t('auth.email')}</p>
          <p className="mt-3 text-lg font-semibold text-foreground">{user?.email}</p>
        </div>
        <div className="border border-border bg-card px-6 py-6">
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{t('user.status')}</p>
          <p className="mt-3 text-lg font-semibold text-foreground">{t('user.premiumMember')}</p>
        </div>
      </div>
    </div>
  )
}
