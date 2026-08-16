import { Navigate, Route, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { AdminRoute } from '../components/AdminRoute'
import { UserRoute } from '../components/UserRoute'
import { PublicLayout } from '../components/layouts/PublicLayout'
import { AuthLayout } from '../components/layouts/AuthLayout'
import { AdminLayout } from '../components/layouts/AdminLayout'
import { PageLoader } from '../components/PageLoader'

const HomePage = lazy(() => import('../pages/public/HomePage'))
const VehiclesPage = lazy(() => import('../pages/public/VehiclesPage'))
const VehicleDetailPage = lazy(() => import('../pages/public/VehicleDetailPage'))
const AboutPage = lazy(() => import('../pages/public/AboutPage'))
const ContactPage = lazy(() => import('../pages/public/ContactPage'))
const FaqPage = lazy(() => import('../pages/public/FaqPage'))
const LoginPage = lazy(() => import('../pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'))
const DashboardPage = lazy(() => import('../pages/user/DashboardPage'))
const ProfilePage = lazy(() => import('../pages/user/ProfilePage'))
const FavoritesPage = lazy(() => import('../pages/user/FavoritesPage'))
const ReservationsPage = lazy(() => import('../pages/user/ReservationsPage'))
const NotificationsPage = lazy(() => import('../pages/user/NotificationsPage'))
const MessagesPage = lazy(() => import('../pages/user/MessagesPage'))
const AdminLoginPage = lazy(() => import('../pages/admin/AdminLoginPage'))
const AdminPage = lazy(() => import('../pages/admin/AdminPage'))
const AdminVehiclesPage = lazy(() => import('../pages/admin/AdminVehiclesPage'))
const AdminVehicleForm = lazy(() => import('../pages/admin/AdminVehicleForm'))
const AdminVehicleEdit = lazy(() => import('../pages/admin/AdminVehicleEdit'))
const AdminReservationsPage = lazy(() => import('../pages/admin/AdminReservationsPage'))
const AdminUsersPage = lazy(() => import('../pages/admin/AdminUsersPage'))
const AdminSettingsPage = lazy(() => import('../pages/admin/AdminSettingsPage'))
const NotFound = lazy(() => import('../pages/NotFound'))

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/vehicles/new" element={<VehiclesPage />} />
          <Route path="/vehicles/used" element={<VehiclesPage />} />
          <Route path="/vehicle/:id" element={<VehicleDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/404" element={<NotFound />} />
          <Route element={<UserRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/reservations" element={<ReservationsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/messages" element={<MessagesPage />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin/vehicles" element={<AdminVehiclesPage />} />
            <Route path="/admin/vehicles/new" element={<AdminVehicleForm />} />
            <Route path="/admin/vehicles/:id/edit" element={<AdminVehicleEdit />} />
            <Route path="/admin/reservations" element={<AdminReservationsPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/settings" element={<AdminSettingsPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  )
}
