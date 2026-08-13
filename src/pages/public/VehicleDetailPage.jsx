import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { ArrowLeft, Calendar, Gauge, MapPin, ShieldCheck, Star, MessageCircle } from 'lucide-react'
import { useVehicles } from '../../context/VehicleContext'
import { useAuth } from '../../context/AuthContext'
import { useReservations } from '../../context/ReservationContext'
import { useNotifications } from '../../context/NotificationContext'

export default function VehicleDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { getVehicleById } = useVehicles()
  const { isAuthenticated, user } = useAuth()
  const { addReservation } = useReservations()
  const { addNotification } = useNotifications()
  const vehicle = getVehicleById(id)

  if (!vehicle) {
    return <div className="mx-auto max-w-4xl px-4 py-24 text-center text-text-soft">Véhicule introuvable.</div>
  }

  const handleReserve = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } })
      return
    }

    addReservation({
      vehicleId: vehicle.id,
      status: 'confirmed',
      date: new Date().toISOString().slice(0, 10),
      customer: user.name,
      amount: vehicle.price * 0.05,
    })
    navigate('/reservations')
  }

  const handleOrder = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } })
      return
    }

    // Message WhatsApp
    const message = `Bonjour, j'aimerais commander le véhicule: ${vehicle.name} (${vehicle.brand}) - ${vehicle.price.toLocaleString('fr-FR')} €`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')

    // Ajouter une notification
    addNotification({
      id: `n-${Date.now()}`,
      type: 'order',
      title: 'Commande envoyée',
      body: `Vous avez commandé le ${vehicle.name} (${vehicle.brand}). Veuillez attendre la confirmation sur WhatsApp.`,
      vehicleId: vehicle.id,
      read: false,
    })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
      <button type="button" onClick={() => navigate(-1)} className="mb-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-text-soft hover:text-primary">
        <ArrowLeft size={16} /> Retour
      </button>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-surface/40">
        <img src={vehicle.image} alt={vehicle.name} className="h-[420px] w-full object-cover md:h-[520px]" />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-primary/50 bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{vehicle.category === 'new' ? 'Neuf' : 'Occasion'}</span>
            <span className="text-text-soft">{vehicle.brand}</span>
          </div>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-text md:text-5xl">{vehicle.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-text-soft">{vehicle.description}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="glass-panel rounded-2xl p-4">
              <Gauge className="mb-2 text-primary" />
              <p className="text-xs uppercase tracking-[0.16em] text-text-soft">Puissance</p>
              <p className="mt-2 text-lg font-bold text-text">{vehicle.power}</p>
            </div>
            <div className="glass-panel rounded-2xl p-4">
              <Calendar className="mb-2 text-primary" />
              <p className="text-xs uppercase tracking-[0.16em] text-text-soft">Année</p>
              <p className="mt-2 text-lg font-bold text-text">{vehicle.year}</p>
            </div>
            <div className="glass-panel rounded-2xl p-4">
              <MapPin className="mb-2 text-primary" />
              <p className="text-xs uppercase tracking-[0.16em] text-text-soft">Localisation</p>
              <p className="mt-2 text-lg font-bold text-text">{vehicle.location}</p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-surface/30 p-5">
            <h2 className="mb-4 text-2xl font-bold text-text">Spécifications</h2>
            <ul className="space-y-3 text-text-soft">
              <li>• Moteur : {vehicle.engine}</li>
              <li>• Transmission : {vehicle.transmission}</li>
              <li>• Kilométrage : {vehicle.mileage.toLocaleString('fr-FR')} km</li>
              <li>• État : {vehicle.status === 'new' ? 'Neuf' : 'Occasion certifiée'}</li>
            </ul>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="glass-panel rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-text-soft">Prix</p>
            <p className="mt-3 text-4xl font-black text-primary">{vehicle.price.toLocaleString('fr-FR')} €</p>
            <button onClick={handleOrder} className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#001452] transition hover:brightness-110">
              <MessageCircle size={16} /> Commander
            </button>
            <button onClick={handleReserve} className="mt-3 w-full rounded-xl border border-white/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-text-soft transition hover:border-primary hover:text-primary">
              Réserver
            </button>
            <button onClick={() => navigate('/vehicles')} className="mt-3 w-full rounded-xl border border-white/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-text-soft">
              Voir d’autres véhicules
            </button>
          </div>

          <div className="glass-panel rounded-2xl p-6">
            <div className="flex items-center gap-2 text-primary">
              <ShieldCheck /> <span className="text-sm font-semibold uppercase tracking-[0.2em]">Avis cliente</span>
            </div>
            <div className="mt-4 flex items-center gap-2 text-yellow-400">
              {Array.from({ length: 5 }).map((_, idx) => <Star key={idx} size={16} fill="currentColor" />)}
            </div>
            <p className="mt-3 text-text-soft">"Excellence de fabrication, sensation de conduite irréprochable. Un achat premium sans compromis."</p>
          </div>
        </aside>
      </div>
    </div>
  )
}
