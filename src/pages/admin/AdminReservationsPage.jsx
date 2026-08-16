import { useEffect } from 'react'
import { useReservations } from '../../context/ReservationContext'
import { useVehicles } from '../../context/VehicleContext'
import { useLanguage } from '../../i18n/LanguageContext'
import { useToast } from '../../context/ToastContext'
import { useNotifications } from '../../context/NotificationContext'
import { Seo } from '../../components/Seo'
import { EmptyState } from '../../components/EmptyState'
import { formatPrice } from '../../lib/config'

const statusTone = {
  confirmed: 'bg-primary/15 text-primary',
  completed: 'bg-success/15 text-success',
  cancelled: 'bg-destructive/15 text-destructive',
  pending: 'bg-warning/15 text-warning',
}

export default function AdminReservationsPage() {
  const { reservations, updateReservationStatus, loadError } = useReservations()
  const { getVehicleById } = useVehicles()
  const { t, language } = useLanguage()
  const { toast } = useToast()
  const { notifications, markAsRead } = useNotifications()
  const locale = language === 'en' ? 'en-GB' : `${language}-${language.toUpperCase()}`

  useEffect(() => {
    notifications
      .filter((item) => !item.read && item.type === 'reservation')
      .forEach((item) => { markAsRead(item.id) })
  }, [notifications, markAsRead])

  return (
    <div data-reveal>
      <Seo title={t('admin.reservations')} />
      <h2 className="text-3xl font-black text-foreground">{t('admin.reservations')}</h2>
      {loadError ? (
        <p className="mt-4 text-sm text-destructive">{t('admin.schemaMissing')}</p>
      ) : null}
      <div className="mt-8 space-y-3">
        {reservations.length === 0 ? (
          <EmptyState title={t('admin.emptyReservations')} />
        ) : reservations.map((reservation) => {
          const vehicle = getVehicleById(reservation.vehicleId)
          return (
            <div key={reservation.id} className="glass-panel flex flex-col gap-4 p-5 transition hover:border-primary/30 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-lg font-bold text-foreground">{vehicle?.name || reservation.vehicleName || reservation.vehicleId}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {reservation.customerEmail || reservation.customer} · {reservation.date} · {formatPrice(reservation.amount, locale)}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${statusTone[reservation.status] || statusTone.pending}`}>
                  {reservation.status}
                </span>
                {reservation.status === 'confirmed' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => { updateReservationStatus(reservation.id, 'completed'); toast(t('admin.saved'), 'success') }}
                      className="rounded border border-border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground transition hover:border-success hover:text-success"
                    >
                      {t('admin.completed')}
                    </button>
                    <button
                      type="button"
                      onClick={() => { updateReservationStatus(reservation.id, 'cancelled'); toast(t('user.cancelled'), 'success') }}
                      className="rounded border border-border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground transition hover:border-destructive hover:text-destructive"
                    >
                      {t('user.cancelReservation')}
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
