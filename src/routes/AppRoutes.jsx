import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/public/HomePage'
import VehiclesPage from '../pages/public/VehiclesPage'
import VehicleDetailPage from '../pages/public/VehicleDetailPage'
import AboutPage from '../pages/public/AboutPage'
import ContactPage from '../pages/public/ContactPage'
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import DashboardPage from '../pages/user/DashboardPage'
import ProfilePage from '../pages/user/ProfilePage'
import FavoritesPage from '../pages/user/FavoritesPage'
import ReservationsPage from '../pages/user/ReservationsPage'
import NotificationsPage from '../pages/user/NotificationsPage'
import MessagesPage from '../pages/user/MessagesPage'
import AdminLoginPage from '../pages/admin/AdminLoginPage'
import AdminPage from '../pages/admin/AdminPage'
import AdminVehiclesPage from '../pages/admin/AdminVehiclesPage'
import AdminReservationsPage from '../pages/admin/AdminReservationsPage'
import AdminUsersPage from '../pages/admin/AdminUsersPage'
import AdminSettingsPage from '../pages/admin/AdminSettingsPage'
import { AdminRoute } from '../components/AdminRoute'
import { UserRoute } from '../components/UserRoute'
import NotFound from '../pages/NotFound'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/vehicles" element={<VehiclesPage />} />
      <Route path="/vehicles/new" element={<VehiclesPage filter="new" />} />
      <Route path="/vehicles/used" element={<VehiclesPage filter="used" />} />
      <Route path="/vehicle/:id" element={<VehicleDetailPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<AdminRoute><DashboardPage /></AdminRoute>} />
      <Route path="/profile" element={<UserRoute><ProfilePage /></UserRoute>} />
      <Route path="/favorites" element={<UserRoute><FavoritesPage /></UserRoute>} />
      <Route path="/reservations" element={<UserRoute><ReservationsPage /></UserRoute>} />
      <Route path="/notifications" element={<UserRoute><NotificationsPage /></UserRoute>} />
      <Route path="/messages" element={<UserRoute><MessagesPage /></UserRoute>} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
      <Route path="/admin/vehicles" element={<AdminRoute><AdminVehiclesPage /></AdminRoute>} />
      <Route path="/admin/reservations" element={<AdminRoute><AdminReservationsPage /></AdminRoute>} />
      <Route path="/admin/users" element={<AdminRoute><AdminUsersPage /></AdminRoute>} />
      <Route path="/admin/settings" element={<AdminRoute><AdminSettingsPage /></AdminRoute>} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  )
}
