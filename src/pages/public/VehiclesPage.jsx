import { useEffect, useMemo, useState } from 'react'
import { useVehicles } from '../../context/VehicleContext'
import { VehicleCard } from '../../components/vehicle/VehicleCard'

export default function VehiclesPage({ filter = 'all' }) {
  const { vehicles } = useVehicles()
  const [selectedFilter, setSelectedFilter] = useState(filter)

  useEffect(() => {
    setSelectedFilter(filter)
  }, [filter])

  const filteredVehicles = useMemo(() => {
    if (selectedFilter === 'all') return vehicles
    return vehicles.filter((vehicle) => vehicle.category === selectedFilter)
  }, [selectedFilter, vehicles])

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Marketplace</p>
          <h1 className="mt-2 text-4xl font-black text-text md:text-5xl">{selectedFilter === 'new' ? 'Véhicules neufs' : selectedFilter === 'used' ? 'Véhicules d’occasion' : 'Tous nos véhicules'}</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          {['all', 'new', 'used'].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSelectedFilter(option)}
              className={`rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] ${
                selectedFilter === option ? 'border-primary bg-primary text-[#001452]' : 'border-white/10 bg-white/5 text-text-soft'
              }`}
            >
              {option === 'all' ? 'Tous' : option === 'new' ? 'Neufs' : 'Occasion'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredVehicles.map((vehicle) => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  )
}
