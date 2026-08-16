import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { readStorage, STORAGE_KEYS, writeStorage } from '../lib/storage'
import supabase from '../lib/supabaseClient'
import { addFavorite, listFavoriteIds, removeFavoriteRow } from '../lib/supabaseApi'
import { useAuth } from './AuthContext'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const { user } = useAuth()
  const storageKey = user ? STORAGE_KEYS.favorites(user.id) : null
  const [ids, setIds] = useState([])

  useEffect(() => {
    if (!user) {
      setIds([])
      return undefined
    }
    let cancelled = false
    ;(async () => {
      if (supabase) {
        const result = await listFavoriteIds(user.id)
        if (!cancelled && result.ok) setIds(result.data)
        return
      }
      if (!cancelled) setIds(readStorage(STORAGE_KEYS.favorites(user.id), []))
    })()
    return () => { cancelled = true }
  }, [user])

  useEffect(() => {
    if (supabase || !storageKey) return
    writeStorage(storageKey, ids)
  }, [ids, storageKey])

  const isFavorite = useCallback((id) => ids.includes(id), [ids])

  const toggleFavorite = useCallback(async (id) => {
    if (!user) return false
    const exists = ids.includes(id)
    setIds((current) => (exists ? current.filter((item) => item !== id) : [...current, id]))
    if (supabase) {
      const result = exists ? await removeFavoriteRow(user.id, id) : await addFavorite(user.id, id)
      if (!result.ok) {
        setIds((current) => (exists ? [...current, id] : current.filter((item) => item !== id)))
        return false
      }
    }
    return true
  }, [user, ids])

  const removeFavorite = useCallback(async (id) => {
    if (!user) return
    setIds((current) => current.filter((item) => item !== id))
    if (supabase) await removeFavoriteRow(user.id, id)
  }, [user])

  const value = useMemo(
    () => ({ ids, isFavorite, toggleFavorite, removeFavorite }),
    [ids, isFavorite, toggleFavorite, removeFavorite],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider')
  return context
}
