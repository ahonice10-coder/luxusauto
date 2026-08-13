import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">404</p>
      <h1 className="text-5xl font-black tracking-tight text-text md:text-6xl">Page introuvable</h1>
      <p className="mt-4 max-w-xl text-lg text-text-soft">La page recherchée n’existe pas ou a été déplacée.</p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link to="/" className="rounded-xl bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#001452]">
          Retour à l’accueil
        </Link>
        <Link to="/vehicles" className="rounded-xl border border-white/10 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-text-soft">
          Voir les véhicules
        </Link>
      </div>
    </div>
  )
}
