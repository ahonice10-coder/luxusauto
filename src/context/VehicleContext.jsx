import { createContext, useContext, useMemo, useState } from 'react'
import { vehiclesSeed } from '../data/vehicles'

const VehicleContext = createContext(null)

export function VehicleProvider({ children }) {
  const [vehicles, setVehicles] = useState(vehiclesSeed)

  const addVehicle = (vehicle) => {
    setVehicles((current) => [
      {
        ...vehicle,
        id: vehicle.id || `v-${Date.now()}`,
        price: Number(vehicle.price || 0),
      },
      ...current,
    ])
  }

  const updateVehicle = (id, updatedVehicle) => {
    setVehicles((current) =>
      current.map((vehicle) => (vehicle.id === id ? { ...vehicle, ...updatedVehicle } : vehicle)),
    )
  }

  const deleteVehicle = (id) => {
    setVehicles((current) => current.filter((vehicle) => vehicle.id !== id))
  }

  const getVehicleById = (id) => vehicles.find((vehicle) => vehicle.id === id)

  const value = useMemo(
    () => ({ vehicles, addVehicle, updateVehicle, deleteVehicle, getVehicleById }),
    [vehicles],
  )

  return <VehicleContext.Provider value={value}>{children}</VehicleContext.Provider>
}

export function useVehicles() {
  const context = useContext(VehicleContext)
  if (!context) throw new Error('useVehicles must be used within VehicleProvider')
  return context
}
