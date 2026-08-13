export default function MessagesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 md:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Messages</p>
      <h1 className="mt-2 text-4xl font-black text-text">Centre de messagerie</h1>
      <div className="mt-8 space-y-4">
        <div className="glass-panel rounded-2xl p-5">
          <p className="text-text-soft">Votre conseiller a confirmé votre demande pour le Porsche 911 GT3 RS.</p>
        </div>
        <div className="glass-panel rounded-2xl p-5">
          <p className="text-text-soft">Le dossier de réservation a été mis à jour et prêt pour validation.</p>
        </div>
      </div>
    </div>
  )
}
