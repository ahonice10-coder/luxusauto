import { Link } from 'react-router-dom'
import { useVehicles } from '../../context/VehicleContext'

const favoriteIds = ['v-101', 'v-104']

export default function FavoritesPage() {
  const { vehicles, deleteVehicle } = useVehicles()
  const favorites = vehicles.filter((vehicle) => favoriteIds.includes(vehicle.id))

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Favoris</p>
          <h1 className="mt-2 text-4xl font-black text-text">Mes véhicules préférés</h1>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {favorites.map((vehicle) => (
          <div key={vehicle.id} className="glass-panel overflow-hidden rounded-2xl">
            <img src={vehicle.image} alt={vehicle.name} className="h-56 w-full object-cover" />
            <div className="p-5">
              <Link to={`/vehicle/${vehicle.id}`} className="text-2xl font-bold text-text hover:text-primary">{vehicle.name}</Link>
              <p className="mt-2 text-text-soft">{vehicle.price.toLocaleString('fr-FR')} €</p>
              <button onClick={() => deleteVehicle(vehicle.id)} className="mt-4 rounded-xl border border-red-500/50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-red-300 hover:bg-red-500/10">Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
