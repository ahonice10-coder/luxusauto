export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20 md:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Contact</p>
      <h1 className="mt-3 text-5xl font-black text-text">Parlons de votre prochain véhicule</h1>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div className="glass-panel rounded-2xl p-6">
          <h3 className="text-2xl font-bold text-text">Coordonnées</h3>
          <ul className="mt-5 space-y-3 text-text-soft">
            <li>• Email : contact@luxusauto.fr</li>
            <li>• Téléphone : +33 1 84 00 00 00</li>
            <li>• Adresse : 18 Avenue des Champs, Paris</li>
          </ul>
        </div>
        <form className="glass-panel rounded-2xl p-6">
          <div className="space-y-4">
            <input className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-text outline-none" placeholder="Nom" />
            <input className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-text outline-none" placeholder="Email" />
            <textarea className="h-32 w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-text outline-none" placeholder="Votre message" />
            <button type="button" className="rounded-xl bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#001452]">Envoyer</button>
          </div>
        </form>
      </div>
    </div>
  )
}
