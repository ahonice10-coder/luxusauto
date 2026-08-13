import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

export function AdminRoute({ children }) {
  const { user } = useAuth()

  if (!user || user.role !== 'admin') {
    return <Navigate to="/admin/login" />
  }

  return children
}
