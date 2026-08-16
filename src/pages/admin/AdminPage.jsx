import { Link } from 'react-router-dom'
import { CarFront, CalendarCheck, Users, Wallet, ArrowUpRight, Plus, Sparkles } from 'lucide-react'
import { useVehicles } from '../../context/VehicleContext'
import { useReservations } from '../../context/ReservationContext'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../i18n/LanguageContext'
import { formatPrice } from '../../lib/config'
import { Seo } from '../../components/Seo'
import { SafeImage } from '../../components/SafeImage'
import { EmptyState } from '../../components/EmptyState'

const statusTone = {
  confirmed: 'bg-primary/15 text-primary',
  completed: 'bg-success/15 text-success',
  cancelled: 'bg-destructive/15 text-destructive',
  pending: 'bg-warning/15 text-warning',
}

export default function AdminPage() {
  const { vehicles } = useVehicles()
  const { reservations } = useReservations()
  const { users, user } = useAuth()
  const { t, language } = useLanguage()
  const locale = language === 'en' ? 'en-GB' : `${language}-${language.toUpperCase()}`

  const confirmed = reservations.filter((item) => item.status === 'confirmed').length
  const cancelled = reservations.filter((item) => item.status === 'cancelled').length
  const completed = reservations.filter((item) => item.status === 'completed').length
  const deposits = reservations
    .filter((item) => item.status !== 'cancelled')
    .reduce((sum, item) => sum + Number(item.amount || 0), 0)
  const featured = vehicles.filter((item) => item.featured).slice(0, 3)
  const recent = reservations.slice(0, 5)

  const kpis = [
    { to: '/admin/vehicles', label: t('admin.vehicles'), value: vehicles.length, icon: CarFront },
    { to: '/admin/reservations', label: t('admin.reservations'), value: reservations.length, icon: CalendarCheck },
    { to: '/admin/users', label: t('admin.users'), value: users.length, icon: Users },
    { to: '/admin/reservations', label: t('admin.deposits'), value: formatPrice(deposits, locale), icon: Wallet },
  ]

  return (
    <div className="space-y-8">
      <Seo title={t('seo.admin')} />

      <div data-reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">{t('admin.live')}</p>
          <h2 className="mt-2 text-3xl font-black text-foreground md:text-4xl">
            {t('admin.welcome')}{user?.name ? `, ${user.name}` : ''}
          </h2>
          <p className="mt-2 text-muted-foreground">{t('admin.overviewHint')}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/admin/vehicles" className="inline-flex items-center gap-2 rounded bg-primary px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground transition hover:brightness-110">
            <Plus size={14} /> {t('admin.addVehicle')}
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 rounded border border-border px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground transition hover:border-primary hover:text-primary">
            <ArrowUpRight size={14} /> {t('admin.backToSite')}
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((item, index) => {
          const Icon = item.icon
          return (
            <Link
              key={item.label}
              to={item.to}
              data-reveal
              data-delay={String(index)}
              className="group glass-panel p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/40"
            >
              <div className="flex items-start justify-between">
                <span className="rounded bg-primary/10 p-2 text-primary">
                  <Icon size={18} />
                </span>
                <ArrowUpRight size={14} className="text-muted-foreground opacity-0 transition group-hover:opacity-100" />
              </div>
              <p className="mt-6 text-3xl font-black tracking-tight text-foreground">{item.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
            </Link>
          )
        })}
      </div>

      <div className="grid gap-3 sm:grid-cols-3" data-reveal>
        {[
          [t('admin.confirmed'), confirmed, 'text-primary'],
          [t('admin.completed'), completed, 'text-success'],
          [t('admin.cancelled'), cancelled, 'text-destructive'],
        ].map(([label, value, tone]) => (
          <div key={label} className="rounded border border-border bg-card px-4 py-3">
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
            <p className={`mt-1 text-2xl font-black ${tone}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <section data-reveal className="glass-panel overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <h3 className="text-lg font-bold text-foreground">{t('admin.recentReservations')}</h3>
            <Link to="/admin/reservations" className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground transition hover:text-primary">
              {t('home.seeAll')}
            </Link>
          </div>
          {recent.length === 0 ? (
            <div className="p-5">
              <EmptyState title={t('admin.emptyReservations')} />
            </div>
          ) : (
            <ul className="divide-y divide-white/5">
              {recent.map((reservation) => {
                const vehicle = vehicles.find((item) => item.id === reservation.vehicleId)
                return (
                  <li key={reservation.id} className="flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-white/[0.03]">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-foreground">{vehicle?.name || reservation.vehicleName || reservation.vehicleId}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{reservation.customerEmail || reservation.customer} · {reservation.date}</p>
                    </div>
                    <span className={`shrink-0 rounded px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${statusTone[reservation.status] || statusTone.pending}`}>
                      {reservation.status}
                    </span>
                  </li>
                )
              })}
            </ul>
          )}
        </section>

        <section data-reveal data-delay="1" className="glass-panel overflow-hidden">
          <div className="flex items-center gap-2 border-b border-border px-5 py-4">
            <Sparkles size={16} className="text-primary" />
            <h3 className="text-lg font-bold text-foreground">{t('admin.featuredVehicles')}</h3>
          </div>
          {featured.length === 0 ? (
            <div className="p-5">
              <EmptyState title={t('admin.noFeatured')} />
            </div>
          ) : (
            <ul className="divide-y divide-white/5">
              {featured.map((vehicle) => (
                <li key={vehicle.id} className="flex items-center gap-3 px-5 py-3">
                  <SafeImage src={vehicle.image} alt={vehicle.name} className="h-12 w-16 rounded object-cover" />
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-foreground">{vehicle.name}</p>
                    <p className="text-sm text-primary">{formatPrice(vehicle.price, locale)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}
