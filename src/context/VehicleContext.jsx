import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { vehiclesSeed } from '../data/vehicles'
import { createId, readStorage, STORAGE_KEYS, writeStorage } from '../lib/storage'
import supabase from '../lib/supabaseClient'
import { insertVehicle, listVehicles, patchVehicle, removeVehicle } from '../lib/supabaseApi'

const VehicleContext = createContext(null)

export function VehicleProvider({ children }) {
  const [vehicles, setVehicles] = useState(() => {
    if (supabase) return []
    const saved = readStorage(STORAGE_KEYS.vehicles, null)
    return Array.isArray(saved) && saved.length ? saved : vehiclesSeed
  })

  const refresh = useCallback(async () => {
    if (!supabase) return
    const result = await listVehicles()
    if (result.ok && result.data.length) {
      setVehicles(result.data)
      return
    }
    if (result.ok && result.data.length === 0) {
      setVehicles([])
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  useEffect(() => {
    if (supabase) return
    writeStorage(STORAGE_KEYS.vehicles, vehicles)
  }, [vehicles])

  const addVehicle = useCallback(async (vehicle) => {
    const record = {
      ...vehicle,
      id: vehicle.id || createId('v'),
      price: Number(vehicle.price || 0),
      mileage: Number(vehicle.mileage || 0),
    }
    if (supabase) {
      const result = await insertVehicle(record)
      if (!result.ok) return result
      setVehicles((current) => [result.data, ...current.filter((item) => item.id !== result.data.id)])
      return result
    }
    setVehicles((current) => [record, ...current])
    return { ok: true, data: record, remote: false }
  }, [])

  const updateVehicle = useCallback(async (id, updatedVehicle) => {
    if (supabase) {
      const result = await patchVehicle(id, { ...updatedVehicle, id })
      if (!result.ok) return result
      setVehicles((current) => current.map((vehicle) => (vehicle.id === id ? result.data : vehicle)))
      return result
    }
    setVehicles((current) =>
      current.map((vehicle) => (vehicle.id === id ? { ...vehicle, ...updatedVehicle } : vehicle)),
    )
    return { ok: true, remote: false }
  }, [])

  const deleteVehicle = useCallback(async (id) => {
    if (supabase) {
      const result = await removeVehicle(id)
      if (!result.ok) return result
    }
    setVehicles((current) => current.filter((vehicle) => vehicle.id !== id))
    return { ok: true }
  }, [])

  const getVehicleById = useCallback((id) => vehicles.find((vehicle) => vehicle.id === id), [vehicles])

  const value = useMemo(
    () => ({ vehicles, addVehicle, updateVehicle, deleteVehicle, getVehicleById, refresh }),
    [vehicles, addVehicle, updateVehicle, deleteVehicle, getVehicleById, refresh],
  )

  return <VehicleContext.Provider value={value}>{children}</VehicleContext.Provider>
}

export function useVehicles() {
  const context = useContext(VehicleContext)
  if (!context) throw new Error('useVehicles must be used within VehicleProvider')
  return context
}
