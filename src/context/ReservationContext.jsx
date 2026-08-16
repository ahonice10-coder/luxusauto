import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { readStorage, STORAGE_KEYS, writeStorage } from '../lib/storage'
import supabase from '../lib/supabaseClient'
import { createReservation as apiCreate, listReservations, updateReservationStatus as apiUpdate } from '../lib/supabaseApi'
import { useAuth } from './AuthContext'

const ReservationContext = createContext(null)

const initialReservations = [
  {
    id: 'r-1',
    vehicleId: 'v-102',
    status: 'confirmed',
    date: '2024-11-15',
    customer: 'Alex Rossi',
    userId: 'demo',
    amount: 2500,
  },
  {
    id: 'r-2',
    vehicleId: 'v-103',
    status: 'completed',
    date: '2024-10-28',
    customer: 'Alex Rossi',
    userId: 'demo',
    amount: 135000,
  },
]

export function ReservationProvider({ children }) {
  const { user, isAuthenticated } = useAuth()
  const [reservations, setReservations] = useState(() => {
    if (supabase) return []
    const saved = readStorage(STORAGE_KEYS.reservations, null)
    return Array.isArray(saved) ? saved : initialReservations
  })
  const [loadError, setLoadError] = useState(null)

  const refresh = useCallback(async () => {
    if (!supabase) return
    if (!isAuthenticated) {
      setReservations([])
      return
    }
    const result = await listReservations()
    if (!result.ok) {
      setLoadError(result.error)
      return
    }
    setLoadError(null)
    setReservations(result.data)
  }, [isAuthenticated])

  useEffect(() => {
    refresh()
  }, [refresh, user?.id])

  useEffect(() => {
    if (!supabase || !isAuthenticated) return undefined
    const channel = supabase
      .channel('reservations-live')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'reservations' }, () => {
        refresh()
      })
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [isAuthenticated, refresh])

  useEffect(() => {
    if (supabase) return
    writeStorage(STORAGE_KEYS.reservations, reservations)
  }, [reservations])

  const addReservation = useCallback(async (reservation) => {
    const result = await apiCreate(reservation)
    if (!result.ok) return result
    setReservations((current) => [result.data, ...current.filter((item) => item.id !== result.data.id)])
    return result
  }, [])

  const cancelReservation = useCallback(async (id) => {
    const result = await apiUpdate(id, 'cancelled')
    if (!result.ok) return result
    setReservations((current) =>
      current.map((item) => (item.id === id ? { ...item, status: 'cancelled' } : item)),
    )
    return result
  }, [])

  const updateReservationStatus = useCallback(async (id, status) => {
    const result = await apiUpdate(id, status)
    if (!result.ok) return result
    setReservations((current) =>
      current.map((item) => (item.id === id ? { ...item, status } : item)),
    )
    return result
  }, [])

  const value = useMemo(
    () => ({ reservations, addReservation, cancelReservation, updateReservationStatus, loadError, refresh }),
    [reservations, addReservation, cancelReservation, updateReservationStatus, loadError, refresh],
  )

  return <ReservationContext.Provider value={value}>{children}</ReservationContext.Provider>
}

export function useReservations() {
  const context = useContext(ReservationContext)
  if (!context) throw new Error('useReservations must be used within ReservationProvider')
  return context
}
