import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

const defaultUser = {
  id: 'u-1',
  name: 'Alex Rossi',
  email: 'alex@luxusauto.fr',
  role: 'user',
}

const ADMIN_CREDENTIALS = {
  email: 'ahoglelenice@gmail.com',
  password: '200625',
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(defaultUser)
  const [isAuthenticated, setIsAuthenticated] = useState(true)

  const login = (credentials) => {
    setUser({ ...defaultUser, email: credentials?.email || defaultUser.email })
    setIsAuthenticated(true)
    return true
  }

  const loginAdmin = (email, password) => {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      setUser({ id: 'admin-1', name: 'Admin', email: email, role: 'admin' })
      setIsAuthenticated(true)
      return true
    }
    return false
  }

  const register = (payload) => {
    setUser({ ...defaultUser, name: payload?.name || defaultUser.name, email: payload?.email || defaultUser.email })
    setIsAuthenticated(true)
    return true
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
  }

  const value = useMemo(
    () => ({ user, isAuthenticated, login, loginAdmin, register, logout, setUser }),
    [user, isAuthenticated],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
