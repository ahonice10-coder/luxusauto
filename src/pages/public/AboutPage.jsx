export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20 md:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">À propos</p>
      <h1 className="mt-3 text-5xl font-black text-text">L’excellence au service du plaisir de conduire</h1>
      <p className="mt-6 text-lg text-text-soft">LuxusAuto réunit des passionnés, des experts et des professionnels pour proposer une expérience de vente premium orientée sur la performance, la confiance et le service.</p>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="glass-panel rounded-2xl p-6"><h3 className="text-2xl font-bold text-text">Expertise</h3><p className="mt-3 text-text-soft">Des acheteurs et concessionnaires spécialisés dans les véhicules prestige.</p></div>
        <div className="glass-panel rounded-2xl p-6"><h3 className="text-2xl font-bold text-text">Sélection</h3><p className="mt-3 text-text-soft">Des modèles récents et certifiés, choisis selon des critères de qualité et de performance.</p></div>
        <div className="glass-panel rounded-2xl p-6"><h3 className="text-2xl font-bold text-text">Service</h3><p className="mt-3 text-text-soft">Une relation client premium, claire et personnalisée à chaque étape.</p></div>
      </div>
    </div>
  )
}
