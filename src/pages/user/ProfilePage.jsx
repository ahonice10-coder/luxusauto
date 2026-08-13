import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function ProfilePage() {
  const { user, logout } = useAuth()

  return (
    <div className="mx-auto max-w-4xl px-4 py-20 md:px-8">
      <div className="glass-panel rounded-3xl p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Profil</p>
            <h1 className="mt-2 text-4xl font-black text-text">{user?.name || 'Utilisateur'}</h1>
          </div>
          <button onClick={logout} className="rounded-xl border border-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-text-soft hover:text-primary">Déconnexion</button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-background/50 p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-text-soft">Email</p>
            <p className="mt-2 text-lg font-semibold text-text">{user?.email}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-background/50 p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-text-soft">Status</p>
            <p className="mt-2 text-lg font-semibold text-text">Premium Member</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link to="/dashboard" className="rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-semibold text-text-soft hover:text-primary">Retour Dashboard</Link>
          <Link to="/reservations" className="rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-semibold text-text-soft hover:text-primary">Voir mes réservations</Link>
          <Link to="/favorites" className="rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-semibold text-text-soft hover:text-primary">Mes favoris</Link>
          <Link to="/notifications" className="rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-semibold text-text-soft hover:text-primary">Notifications</Link>
        </div>
      </div>
    </div>
  )
}
