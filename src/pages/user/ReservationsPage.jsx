import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useReservations } from '../../context/ReservationContext'
import { useVehicles } from '../../context/VehicleContext'
import { useToast } from '../../context/ToastContext'
import { useLanguage } from '../../i18n/LanguageContext'
import { Seo } from '../../components/Seo'
import { EmptyState } from '../../components/EmptyState'
import { SafeImage } from '../../components/SafeImage'
import { PageHeader } from '../../components/PageHeader'
import { AccountNav } from '../../components/AccountNav'

export default function ReservationsPage() {
  const { user } = useAuth()
  const { reservations, cancelReservation } = useReservations()
  const { getVehicleById } = useVehicles()
  const { toast } = useToast()
  const { t } = useLanguage()
  const mine = reservations.filter((reservation) => reservation.userId === user?.id)

  return (
    <div className="page-shell max-w-6xl">
      <Seo title={t('seo.reservations')} />
      <AccountNav />
      <PageHeader kicker={t('user.reservationsKicker')} title={t('user.reservationsTitle')} />

      {mine.length === 0 ? (
        <EmptyState
          title={t('user.emptyReservations')}
          action={<Link to="/vehicles" className="rounded bg-primary px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground">{t('home.browseVehicles')}</Link>}
        />
      ) : (
        <div className="space-y-5">
          {mine.map((reservation) => {
            const vehicle = getVehicleById(reservation.vehicleId)
            const canCancel = reservation.status === 'confirmed' || reservation.status === 'pending'
            return (
              <div key={reservation.id} className="glass-panel p-5 md:p-6">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex gap-5">
                    <SafeImage src={vehicle?.image} alt={vehicle?.name || ''} className="h-24 w-32 rounded object-cover" />
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.16em] text-primary">{reservation.status}</p>
                      <h2 className="mt-2 text-xl font-bold text-foreground">{vehicle?.name || reservation.vehicleId}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{t('user.date')} : {reservation.date}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link to={`/vehicle/${reservation.vehicleId}`} className="rounded border border-border px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground hover:text-primary">{t('vehicle.seeVehicle')}</Link>
                    {canCancel ? (
                      <button
                        type="button"
                        onClick={() => {
                          cancelReservation(reservation.id)
                          toast(t('user.cancelled'), 'success')
                        }}
                        className="rounded bg-primary px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground"
                      >
                        {t('user.cancelReservation')}
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
