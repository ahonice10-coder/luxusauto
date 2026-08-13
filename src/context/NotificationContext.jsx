import { createContext, useContext, useMemo, useState } from 'react'

const NotificationContext = createContext(null)

const initialNotifications = [
  {
    id: 'n-1',
    type: 'reservation',
    title: 'Réservation confirmée',
    body: 'Votre réservation pour la BMW M4 Competition a été confirmée.',
    vehicleId: 'v-102',
    reservationId: 'r-1',
    read: false,
  },
  {
    id: 'n-2',
    type: 'vehicle',
    title: 'Nouveau véhicule disponible',
    body: 'Un véhicule correspondant à vos critères de recherche vient d’être ajouté.',
    vehicleId: 'v-101',
    read: true,
  },
]

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(initialNotifications)

  const addNotification = (notification) => {
    setNotifications((current) => [
      { ...notification, id: notification.id || `n-${Date.now()}` },
      ...current,
    ])
  }

  const markAsRead = (id) => {
    setNotifications((current) =>
      current.map((item) => (item.id === id ? { ...item, read: true } : item)),
    )
  }

  const value = useMemo(() => ({ notifications, addNotification, markAsRead }), [notifications])

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) throw new Error('useNotifications must be used within NotificationProvider')
  return context
}
