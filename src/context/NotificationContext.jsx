import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { createId, writeStorage, STORAGE_KEYS } from '../lib/storage'
import supabase from '../lib/supabaseClient'
import { createNotification as apiCreate, listNotifications, markNotificationRead } from '../lib/supabaseApi'
import { useAuth } from './AuthContext'

const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState([])

  const refresh = useCallback(async () => {
    if (!user) {
      setNotifications([])
      return
    }
    const result = await listNotifications(user.id)
    if (result.ok) setNotifications(result.data)
  }, [user])

  useEffect(() => {
    refresh()
  }, [refresh])

  useEffect(() => {
    if (!supabase || !user) return undefined
    const channel = supabase
      .channel(`notifications-${user.id}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` },
        () => { refresh() },
      )
      .subscribe()
    return () => {
      supabase.removeChannel(channel)
    }
  }, [user, refresh])

  useEffect(() => {
    if (supabase || !user) return
    writeStorage(STORAGE_KEYS.notifications(user.id), notifications)
  }, [notifications, user])

  const addNotification = useCallback(async (notification) => {
    if (!user) return { ok: false }
    const result = await apiCreate({ ...notification, userId: user.id })
    if (!result.ok) {
      const local = { read: false, ...notification, id: notification.id || createId('n') }
      setNotifications((current) => [local, ...current])
      return { ok: true, data: local }
    }
    setNotifications((current) => [result.data, ...current.filter((item) => item.id !== result.data.id)])
    return result
  }, [user])

  const markAsRead = useCallback(async (id) => {
    await markNotificationRead(id, user?.id)
    setNotifications((current) =>
      current.map((item) => (item.id === id ? { ...item, read: true } : item)),
    )
  }, [user])

  const unreadCount = notifications.filter((item) => !item.read).length
  const unreadReservations = notifications.filter((item) => !item.read && item.type === 'reservation').length

  const value = useMemo(
    () => ({ notifications, addNotification, markAsRead, unreadCount, unreadReservations, refresh }),
    [notifications, addNotification, markAsRead, unreadCount, unreadReservations, refresh],
  )

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider')
  }
  return context
}
