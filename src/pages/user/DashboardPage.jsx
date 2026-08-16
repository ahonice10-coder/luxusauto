import { Link } from 'react-router-dom'
import { Bell, Calendar, Heart } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useFavorites } from '../../context/FavoritesContext'
import { useReservations } from '../../context/ReservationContext'
import { useNotifications } from '../../context/NotificationContext'
import { useLanguage } from '../../i18n/LanguageContext'
import { Seo } from '../../components/Seo'
import { EmptyState } from '../../components/EmptyState'
import { PageHeader } from '../../components/PageHeader'
import { AccountNav } from '../../components/AccountNav'

export default function DashboardPage() {
  const { user } = useAuth()
  const { ids } = useFavorites()
  const { reservations } = useReservations()
  const { unreadCount } = useNotifications()
  const { t } = useLanguage()
  const mine = reservations.filter((reservation) => reservation.userId === user?.id)

  return (
    <div className="page-shell max-w-6xl">
      <Seo title={t('seo.dashboard')} />
      <AccountNav />
      <PageHeader
        kicker={t('user.dashboard')}
        title={`${t('user.mySpace')}${user?.name ? ` — ${user.name}` : ''}`}
        description={t('user.spaceHint')}
      />

      <div className="grid gap-5 sm:grid-cols-3">
        <Link to="/favorites" className="glass-panel p-6 transition hover:border-primary/40">
          <Heart className="mb-4 text-primary" size={20} />
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{t('nav.favorites')}</p>
          <p className="mt-3 text-4xl font-black text-foreground">{ids.length}</p>
        </Link>
        <Link to="/reservations" className="glass-panel p-6 transition hover:border-primary/40">
          <Calendar className="mb-4 text-primary" size={20} />
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{t('nav.reservations')}</p>
          <p className="mt-3 text-4xl font-black text-foreground">{mine.length}</p>
        </Link>
        <Link to="/notifications" className="glass-panel p-6 transition hover:border-primary/40">
          <Bell className="mb-4 text-primary" size={20} />
          <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{t('nav.notifications')}</p>
          <p className="mt-3 text-4xl font-black text-foreground">{unreadCount}</p>
        </Link>
      </div>

      <div className="mt-14">
        <div className="mb-6 flex items-end justify-between gap-4">
          <h2 className="text-xl font-bold text-foreground">{t('user.latestReservations')}</h2>
          <Link to="/reservations" className="text-sm text-muted-foreground hover:text-primary">{t('common.seeAll')}</Link>
        </div>
        {mine.length === 0 ? (
          <EmptyState
            title={t('user.emptyReservations')}
            action={<Link to="/vehicles" className="rounded bg-primary px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground">{t('home.browseVehicles')}</Link>}
          />
        ) : (
          <div className="space-y-3">
            {mine.slice(0, 5).map((reservation) => (
              <div key={reservation.id} className="flex items-center justify-between border border-border bg-card px-5 py-4">
                <div>
                  <p className="font-semibold text-foreground">#{reservation.id.slice(-4)}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{reservation.date}</p>
                </div>
                <span className="rounded bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-primary">{reservation.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
