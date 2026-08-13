import { Heart, ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export function VehicleCard({ vehicle }) {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  const handleFavorite = (event) => {
    event.stopPropagation()
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/vehicle/${vehicle.id}` } })
      return
    }
    alert(`Véhicule ajouté aux favoris : ${vehicle.name}`)
  }

  return (
    <article
      onClick={() => navigate(`/vehicle/${vehicle.id}`)}
      className="card-hover glass-panel group overflow-hidden rounded-2xl transition duration-300"
    >
      <div className="relative overflow-hidden">
        <img src={vehicle.image} alt={vehicle.name} className="h-64 w-full object-cover transition duration-500 group-hover:scale-105" />
        <button
          type="button"
          onClick={handleFavorite}
          className="absolute right-3 top-3 rounded-full border border-white/10 bg-background/60 p-2 text-text-soft transition hover:border-primary hover:text-primary"
          aria-label="Ajouter aux favoris"
        >
          <Heart size={16} />
        </button>
        {vehicle.featured && (
          <div className="absolute left-3 top-3 rounded-full bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#001452]">
            Nouveauté
          </div>
        )}
      </div>

      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-2xl font-semibold text-text">{vehicle.name}</h3>
            <p className="text-sm text-text-soft">{vehicle.engine} • {vehicle.year}</p>
          </div>
          <span className="text-lg font-bold text-primary">{vehicle.price.toLocaleString('fr-FR')} €</span>
        </div>

        <div className="grid grid-cols-2 gap-3 border-y border-border/50 py-3 text-xs uppercase tracking-[0.14em] text-text-soft">
          <span>{vehicle.power}</span>
          <span>{vehicle.transmission}</span>
          <span>{vehicle.mileage.toLocaleString('fr-FR')} km</span>
          <span>{vehicle.location}</span>
        </div>

        <div className="flex items-center justify-between">
          <Link to={`/vehicle/${vehicle.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-white">
            Voir le véhicule <ArrowRight size={15} />
          </Link>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/vehicle/${vehicle.id}`)
            }}
            className="rounded-lg bg-primary px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#001452] hover:brightness-110"
          >
            Réserver
          </button>
        </div>
      </div>
    </article>
  )
}
