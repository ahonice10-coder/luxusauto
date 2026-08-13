import { Link } from 'react-router-dom'
import { Activity, CarFront, Bell, Settings } from 'lucide-react'
import { useVehicles } from '../../context/VehicleContext'
import { useReservations } from '../../context/ReservationContext'

export default function DashboardPage() {
  const { vehicles } = useVehicles()
  const { reservations } = useReservations()

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Dashboard</p>
          <h1 className="mt-2 text-4xl font-black text-text">Mon espace</h1>
        </div>
        <Link to="/profile" className="rounded-xl border border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-text-soft hover:text-primary">Voir le profil</Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="glass-panel rounded-2xl p-6">
          <Activity className="mb-4 text-primary" />
          <p className="text-xs uppercase tracking-[0.18em] text-text-soft">Véhicules</p>
          <p className="mt-3 text-4xl font-black text-text">{vehicles.length}</p>
        </div>
        <div className="glass-panel rounded-2xl p-6">
          <CarFront className="mb-4 text-primary" />
          <p className="text-xs uppercase tracking-[0.18em] text-text-soft">Réservations</p>
          <p className="mt-3 text-4xl font-black text-text">{reservations.length}</p>
        </div>
        <div className="glass-panel rounded-2xl p-6">
          <Bell className="mb-4 text-primary" />
          <p className="text-xs uppercase tracking-[0.18em] text-text-soft">Notifications</p>
          <p className="mt-3 text-4xl font-black text-text">3</p>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="glass-panel rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-text">Dernières réservations</h2>
          <div className="mt-5 space-y-4">
            {reservations.map((reservation) => (
              <div key={reservation.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-background/50 p-4">
                <div>
                  <p className="font-semibold text-text">Réservation #{reservation.id.slice(-4)}</p>
                  <p className="text-sm text-text-soft">{reservation.date}</p>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">{reservation.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6">
          <div className="flex items-center gap-3">
            <Settings className="text-primary" />
            <h2 className="text-2xl font-bold text-text">Accès rapide</h2>
          </div>
          <div className="mt-5 space-y-3">
            <Link to="/reservations" className="block rounded-xl border border-white/10 px-4 py-3 text-sm text-text-soft hover:text-primary">Mes réservations</Link>
            <Link to="/favorites" className="block rounded-xl border border-white/10 px-4 py-3 text-sm text-text-soft hover:text-primary">Mes favoris</Link>
            <Link to="/notifications" className="block rounded-xl border border-white/10 px-4 py-3 text-sm text-text-soft hover:text-primary">Notifications</Link>
            <Link to="/admin" className="block rounded-xl border border-white/10 px-4 py-3 text-sm text-text-soft hover:text-primary">Administration</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
