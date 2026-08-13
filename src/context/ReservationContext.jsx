import { createContext, useContext, useMemo, useState } from 'react'

const ReservationContext = createContext(null)

const initialReservations = [
  {
    id: 'r-1',
    vehicleId: 'v-102',
    status: 'confirmed',
    date: '2024-11-15',
    customer: 'Alex Rossi',
    amount: 2500,
  },
  {
    id: 'r-2',
    vehicleId: 'v-103',
    status: 'completed',
    date: '2024-10-28',
    customer: 'Alex Rossi',
    amount: 135000,
  },
]

export function ReservationProvider({ children }) {
  const [reservations, setReservations] = useState(initialReservations)

  const addReservation = (reservation) => {
    setReservations((current) => [
      {
        ...reservation,
        id: reservation.id || `r-${Date.now()}`,
      },
      ...current,
    ])
  }

  const value = useMemo(() => ({ reservations, addReservation }), [reservations])

  return <ReservationContext.Provider value={value}>{children}</ReservationContext.Provider>
}

export function useReservations() {
  const context = useContext(ReservationContext)
  if (!context) throw new Error('useReservations must be used within ReservationProvider')
  return context
}
