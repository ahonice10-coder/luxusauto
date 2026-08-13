export default function AdminSettingsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20 md:px-8">
      <h1 className="text-4xl font-black text-text">Paramètres</h1>
      <div className="mt-8 space-y-4">
        <div className="glass-panel rounded-2xl p-5"><p className="text-text-soft">Réglages de l’interface & sécurité</p></div>
        <div className="glass-panel rounded-2xl p-5"><p className="text-text-soft">Notifications d’administration</p></div>
      </div>
    </div>
  )
}
