import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-surface/60">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4 md:px-8">
        <div>
          <Link to="/" className="text-2xl font-black tracking-tight text-primary">LuxusAuto</Link>
          <p className="mt-4 text-sm text-text-soft">Marketplace premium de véhicules haut de gamme.</p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-primary">Navigation</h3>
          <ul className="space-y-2 text-sm text-text-soft">
            <li><Link to="/" className="hover:text-primary">Accueil</Link></li>
            <li><Link to="/vehicles" className="hover:text-primary">Véhicules</Link></li>
            <li><Link to="/vehicles/new" className="hover:text-primary">Véhicules neufs</Link></li>
            <li><Link to="/vehicles/used" className="hover:text-primary">Véhicules d’occasion</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-primary">Entreprise</h3>
          <ul className="space-y-2 text-sm text-text-soft">
            <li><Link to="/about" className="hover:text-primary">À propos</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-primary">Compte</h3>
          <ul className="space-y-2 text-sm text-text-soft">
            <li><Link to="/login" className="hover:text-primary">Connexion</Link></li>
            <li><Link to="/register" className="hover:text-primary">Créer un compte</Link></li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
        <div className="flex items-center justify-between border-t border-white/10 pt-6">
          <p className="text-xs text-text-soft/50">© 2024 LuxusAuto. Tous droits réservés.</p>
          <Link to="/admin/login" className="text-xs text-text-soft/30 hover:text-text-soft/60 transition">Admin</Link>
        </div>
      </div>
    </footer>
  )
}
