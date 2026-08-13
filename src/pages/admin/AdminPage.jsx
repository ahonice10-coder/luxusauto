import { Link, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function AdminPage() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="mx-auto flex max-w-7xl gap-6 px-4 py-20 md:px-8">
      <aside className="hidden w-72 rounded-2xl border border-white/10 bg-surface/60 p-5 md:block">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Administration</p>
          <h2 className="mt-2 text-2xl font-black text-text">LuxusAuto</h2>
        </div>
        <nav className="space-y-2 text-sm text-text-soft">
          <Link to="/admin" className="block rounded-xl bg-primary/10 px-4 py-3 text-primary">Dashboard</Link>
          <Link to="/admin/vehicles" className="block rounded-xl px-4 py-3 hover:text-primary">Véhicules</Link>
          <Link to="/admin/reservations" className="block rounded-xl px-4 py-3 hover:text-primary">Réservations</Link>
          <Link to="/admin/users" className="block rounded-xl px-4 py-3 hover:text-primary">Utilisateurs</Link>
          <Link to="/admin/settings" className="block rounded-xl px-4 py-3 hover:text-primary">Paramètres</Link>
          <Link to="/" className="mt-6 block rounded-xl border border-white/10 px-4 py-3 hover:text-primary">Retour à LuxusAuto</Link>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-text-soft hover:border-danger hover:text-danger transition"
          >
            <LogOut size={16} /> Déconnexion
          </button>
        </nav>
      </aside>

      <div className="flex-1">
        <div className="glass-panel rounded-2xl p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Dashboard admin</p>
          <h1 className="mt-3 text-4xl font-black text-text">Vue générale</h1>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-background/50 p-5"><p className="text-text-soft">Véhicules</p><p className="mt-2 text-3xl font-black text-text">42</p></div>
            <div className="rounded-2xl border border-white/10 bg-background/50 p-5"><p className="text-text-soft">Réservations</p><p className="mt-2 text-3xl font-black text-text">18</p></div>
            <div className="rounded-2xl border border-white/10 bg-background/50 p-5"><p className="text-text-soft">Utilisateurs</p><p className="mt-2 text-3xl font-black text-text">1.2k</p></div>
          </div>
        </div>
      </div>
    </div>
  )
}
