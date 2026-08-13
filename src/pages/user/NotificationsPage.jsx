import { useNotifications } from '../../context/NotificationContext'
import { Link } from 'react-router-dom'

export default function NotificationsPage() {
  const { notifications, markAsRead } = useNotifications()

  return (
    <div className="mx-auto max-w-4xl px-4 py-20 md:px-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Notifications</p>
          <h1 className="mt-2 text-4xl font-black text-text">Vos alertes</h1>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <button
            key={notification.id}
            onClick={() => markAsRead(notification.id)}
            className={`w-full rounded-2xl border p-5 text-left transition ${notification.read ? 'border-white/10 bg-surface/40' : 'border-primary/40 bg-primary/5'}`}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-text">{notification.title}</h2>
                <p className="mt-2 text-text-soft">{notification.body}</p>
              </div>
              {!notification.read && <span className="h-3 w-3 rounded-full bg-primary" />}
            </div>

            {notification.vehicleId && (
              <Link to={`/vehicle/${notification.vehicleId}`} className="mt-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-primary">Voir le véhicule</Link>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
