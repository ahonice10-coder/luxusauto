import { useNotifications } from '../../context/NotificationContext'
import { useLanguage } from '../../i18n/LanguageContext'
import { Seo } from '../../components/Seo'
import { EmptyState } from '../../components/EmptyState'
import { PageHeader } from '../../components/PageHeader'
import { AccountNav } from '../../components/AccountNav'

export default function MessagesPage() {
  const { notifications } = useNotifications()
  const { t } = useLanguage()
  const messages = notifications.filter((item) => item.type === 'order' || item.type === 'message')

  return (
    <div className="page-shell max-w-6xl">
      <Seo title={t('seo.messages')} />
      <AccountNav />
      <PageHeader kicker={t('user.messagesKicker')} title={t('user.messagesTitle')} />
      {messages.length === 0 ? (
        <EmptyState title={t('user.emptyMessages')} />
      ) : (
        <div className="space-y-3">
          {messages.map((item) => (
            <div key={item.id} className="border border-border bg-card p-4 sm:p-6">
              <p className="font-semibold text-foreground">{item.title}</p>
              <p className="mt-2 leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
