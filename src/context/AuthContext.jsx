import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react'
import {
  createId,
  readStorage,
  STORAGE_KEYS,
  writeStorage,
} from '../lib/storage'
import supabase from '../lib/supabaseClient'
import { getProfile, listProfiles, upsertProfile } from '../lib/supabaseApi'

const AuthContext = createContext(null)

const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL || '').trim().toLowerCase()
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || ''

function sanitizeUser(record) {
  if (!record) return null
  return {
    id: record.id,
    name: record.user_metadata?.name || record.name || null,
    email: record.email,
    role: record.role || record.user_metadata?.role || 'user',
  }
}

function isAdminEmail(email) {
  return Boolean(ADMIN_EMAIL && String(email || '').trim().toLowerCase() === ADMIN_EMAIL)
}

function mapSignUpError(error) {
  const msg = String(error?.message || error?.error_description || '')
  const code = String(error?.code || '')
  if (error?.status === 429 || /429|rate limit|too many/i.test(msg)) return 'tooManyRequests'
  if (/already|exists|registered/i.test(msg) || code === 'user_already_exists') return 'emailExists'
  if (/leaked|pwned|compromised|weak_password|weak password/i.test(msg) || code === 'weak_password') {
    return 'weakPassword'
  }
  if (/database error/i.test(msg)) return 'databaseError'
  if (/signups? not allowed|signup is disabled/i.test(msg)) return 'signupDisabled'
  if (/confirm/i.test(msg)) return 'confirmEmail'
  return 'serverError'
}

function loadUsers() {
  return readStorage(STORAGE_KEYS.users, [])
}

async function hydrateUser(authUser, forceRole) {
  if (!authUser) return null
  let role = forceRole || authUser.user_metadata?.role || 'user'
  if (isAdminEmail(authUser.email)) role = 'admin'

  let name = authUser.user_metadata?.name || null
  if (supabase) {
    const profile = await getProfile(authUser.id)
    if (profile.data?.role === 'admin') role = 'admin'
    if (profile.data?.name) name = profile.data.name
    await upsertProfile({
      id: authUser.id,
      email: authUser.email,
      name: name || (role === 'admin' ? 'Admin' : authUser.email),
    })
  }

  return {
    id: authUser.id,
    email: authUser.email,
    name: name || (role === 'admin' ? 'Admin' : authUser.email),
    role,
  }
}

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(() =>
    sanitizeUser(readStorage(STORAGE_KEYS.session, null)),
  )
  const [users, setUsers] = useState(() => loadUsers().map(sanitizeUser))

  const persistSession = useCallback((nextUser) => {
    const safe = nextUser ? {
      id: nextUser.id,
      name: nextUser.name,
      email: nextUser.email,
      role: nextUser.role || 'user',
    } : null
    setUserState(safe)
    writeStorage(STORAGE_KEYS.session, safe)
  }, [])

  useEffect(() => {
    if (!supabase) return
    const saved = readStorage(STORAGE_KEYS.session, null)
    if (saved?.id === 'admin-1') persistSession(null)
  }, [persistSession])

  const refreshUsers = useCallback(async () => {
    if (supabase && user?.role === 'admin') {
      const result = await listProfiles()
      if (result.ok) {
        setUsers(result.data)
        return
      }
    }
    setUsers(loadUsers().map(sanitizeUser))
  }, [user?.role])

  useEffect(() => {
    if (!supabase) return undefined
    let mounted = true

    const applySession = async (sessionUser) => {
      if (!mounted || !sessionUser) return
      const hydrated = await hydrateUser(sessionUser)
      if (mounted) persistSession(hydrated)
    }

    supabase.auth.getSession().then(({ data }) => {
      if (data?.session?.user) applySession(data.session.user)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) applySession(session.user)
    })

    return () => {
      mounted = false
      listener?.subscription?.unsubscribe()
    }
  }, [persistSession])

  useEffect(() => {
    refreshUsers()
  }, [refreshUsers])

  const login = useCallback(
    async (credentials) => {
      const email = String(credentials?.email || '').trim().toLowerCase()
      const password = String(credentials?.password || '')
      const adminAttempt = isAdminEmail(email) && password === ADMIN_PASSWORD

      if (supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (!error && data?.user) {
          const hydrated = await hydrateUser(data.user, adminAttempt ? 'admin' : undefined)
          persistSession(hydrated)
          return { ok: true, user: hydrated }
        }

        const signInMessage = String(error?.message || '')
        if (/confirm|not confirmed/i.test(signInMessage)) {
          return { ok: false, error: 'confirmEmail' }
        }

        if (adminAttempt) {
          const signed = await supabase.auth.signUp({
            email,
            password,
            options: { data: { name: 'Admin', role: 'admin' } },
          })
          if (signed.data?.user && signed.data?.session) {
            const hydrated = await hydrateUser(signed.data.user, 'admin')
            persistSession(hydrated)
            return { ok: true, user: hydrated }
          }
          if (signed.data?.user && !signed.data?.session) {
            return { ok: false, error: 'confirmEmail' }
          }
          if (/already|registered|exists/i.test(String(signed.error?.message || ''))) {
            return { ok: false, error: 'confirmEmail' }
          }
          return { ok: false, error: 'wrongCredentials' }
        }

        return { ok: false, error: 'wrongCredentials' }
      }

      if (adminAttempt) {
        const admin = {
          id: 'admin-1',
          name: 'Admin',
          email: ADMIN_EMAIL,
          role: 'admin',
        }
        persistSession(admin)
        return { ok: true, user: admin }
      }

      const stored = loadUsers()
      const found = stored.find(
        (item) => item.email.toLowerCase() === email && item.password === password,
      )
      if (!found) return { ok: false, error: 'wrongCredentials' }

      const safe = sanitizeUser(found)
      persistSession(safe)
      return { ok: true, user: safe }
    },
    [persistSession],
  )

  const loginAdmin = useCallback(
    (email, password) => login({ email, password }),
    [login],
  )

  const register = useCallback(
    async (payload) => {
      const name = String(payload?.name || '').trim()
      const email = String(payload?.email || '').trim().toLowerCase()
      const password = String(payload?.password || '')

      if (!name || !email || password.length < 8) {
        return { ok: false, error: 'passwordMin' }
      }

      if (isAdminEmail(email)) {
        return { ok: false, error: 'emailExists' }
      }

      if (supabase) {
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { name, role: 'user' } },
          })

          if (error) {
            console.error('[auth] signUp', error)
            return { ok: false, error: mapSignUpError(error), detail: error.message }
          }

          if (data.user && !data.session) {
            return { ok: false, error: 'confirmEmail' }
          }

          const hydrated = await hydrateUser(data.user || {
            id: data.user?.id,
            email,
            user_metadata: { name, role: 'user' },
          })
          persistSession(hydrated)
          return { ok: true, user: hydrated }
        } catch (caught) {
          console.error('[auth] register', caught)
          return { ok: false, error: 'serverError', detail: caught?.message }
        }
      }

      const stored = loadUsers()
      if (stored.some((item) => item.email.toLowerCase() === email)) {
        return { ok: false, error: 'emailExists' }
      }

      const record = {
        id: createId('u'),
        name,
        email,
        password,
        role: 'user',
      }
      writeStorage(STORAGE_KEYS.users, [record, ...stored])
      persistSession(sanitizeUser(record))
      return { ok: true, user: sanitizeUser(record) }
    },
    [persistSession],
  )

  const logout = useCallback(async () => {
    if (supabase) {
      try {
        await supabase.auth.signOut()
      } catch {
        // ignore
      }
    }
    persistSession(null)
  }, [persistSession])

  const setUser = useCallback((next) => persistSession(next), [persistSession])

  const value = useMemo(
    () => ({
      user,
      users,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'admin',
      login,
      loginAdmin,
      register,
      logout,
      setUser,
    }),
    [user, users, login, loginAdmin, register, logout, setUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
