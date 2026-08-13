import { Link } from 'react-router-dom'
import { useReservations } from '../../context/ReservationContext'
import { useVehicles } from '../../context/VehicleContext'

export default function ReservationsPage() {
  const { reservations } = useReservations()
  const { getVehicleById } = useVehicles()

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 md:px-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Réservations</p>
        <h1 className="mt-2 text-4xl font-black text-text">Mes réservations</h1>
      </div>

      <div className="space-y-6">
        {reservations.map((reservation) => {
          const vehicle = getVehicleById(reservation.vehicleId)
          return (
            <div key={reservation.id} className="glass-panel rounded-2xl p-5">
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex gap-4">
                  <img src={vehicle?.image} alt={vehicle?.name} className="h-24 w-32 rounded-xl object-cover" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-primary">{reservation.status}</p>
                    <h2 className="mt-2 text-2xl font-bold text-text">{vehicle?.name}</h2>
                    <p className="mt-1 text-sm text-text-soft">Date : {reservation.date}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link to={`/vehicle/${reservation.vehicleId}`} className="rounded-xl border border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-text-soft hover:text-primary">Voir le véhicule</Link>
                  <button className="rounded-xl bg-primary px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#001452]">Gérer</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
