import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../i18n/LanguageContext'
import { Seo } from '../../components/Seo'
import { EmptyState } from '../../components/EmptyState'

export default function AdminUsersPage() {
  const { users } = useAuth()
  const { t } = useLanguage()

  return (
    <div data-reveal>
      <Seo title={t('admin.users')} />
      <h2 className="text-3xl font-black text-foreground">{t('admin.users')}</h2>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {users.length === 0 ? (
          <EmptyState title={t('admin.emptyUsers')} />
        ) : users.map((item, index) => (
          <div key={item.id} data-reveal data-delay={String(index % 4)} className="glass-panel flex items-center gap-4 p-5 transition hover:border-primary/30">
            <div className="flex h-11 w-11 items-center justify-center rounded bg-primary/15 text-sm font-bold text-primary">
              {(item.name || item.email || '?').slice(0, 1).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate text-lg font-bold text-foreground">{item.name}</p>
              <p className="truncate text-sm text-muted-foreground">{item.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
