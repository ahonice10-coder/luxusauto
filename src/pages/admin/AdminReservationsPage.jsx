import { useReservations } from '../../context/ReservationContext'

export default function AdminReservationsPage() {
  const { reservations } = useReservations()

  return (
    <div className="mx-auto max-w-5xl px-4 py-20 md:px-8">
      <h1 className="text-4xl font-black text-text">Réservations</h1>
      <div className="mt-8 space-y-4">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="flex items-center justify-between rounded-2xl border border-white/10 bg-surface/60 p-5">
            <div>
              <p className="text-xl font-bold text-text">Réservation #{reservation.id}</p>
              <p className="mt-1 text-text-soft">Client : {reservation.customer}</p>
            </div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">{reservation.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
