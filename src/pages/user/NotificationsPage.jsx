import { Link } from 'react-router-dom'
import { useNotifications } from '../../context/NotificationContext'
import { useLanguage } from '../../i18n/LanguageContext'
import { Seo } from '../../components/Seo'
import { EmptyState } from '../../components/EmptyState'
import { PageHeader } from '../../components/PageHeader'
import { AccountNav } from '../../components/AccountNav'

export default function NotificationsPage() {
  const { notifications, markAsRead } = useNotifications()
  const { t } = useLanguage()

  return (
    <div className="page-shell max-w-6xl">
      <Seo title={t('seo.notifications')} />
      <AccountNav />
      <PageHeader kicker={t('user.notificationsKicker')} title={t('user.notificationsTitle')} />

      {notifications.length === 0 ? (
        <EmptyState title={t('user.emptyNotifications')} />
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`border p-4 sm:p-6 ${notification.read ? 'border-border bg-card' : 'border-primary/30 bg-primary/5'}`}
            >
              <button type="button" onClick={() => markAsRead(notification.id)} className="w-full text-left">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-foreground">{notification.title}</h2>
                    <p className="mt-2 leading-relaxed text-muted-foreground">{notification.body}</p>
                  </div>
                  {!notification.read ? <span className="mt-1.5 h-2 w-2 shrink-0 rounded bg-primary" /> : null}
                </div>
              </button>
              {notification.vehicleId ? (
                <Link to={`/vehicle/${notification.vehicleId}`} className="mt-4 inline-block text-sm font-medium text-primary hover:text-foreground">
                  {t('vehicle.seeVehicle')}
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
