import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

export function UserRoute({ children }) {
  const { user, isAuthenticated } = useAuth()

  // Si l'utilisateur n'est pas authentifié ou s'il est admin, rediriger
  if (!isAuthenticated || !user || user.role === 'admin') {
    return <Navigate to="/login" />
  }

  return children
}
