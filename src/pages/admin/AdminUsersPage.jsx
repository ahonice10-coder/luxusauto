export default function AdminUsersPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20 md:px-8">
      <h1 className="text-4xl font-black text-text">Utilisateurs</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="glass-panel rounded-2xl p-6"><p className="text-xl font-bold text-text">Alex Rossi</p><p className="mt-2 text-text-soft">Premium Member</p></div>
        <div className="glass-panel rounded-2xl p-6"><p className="text-xl font-bold text-text">Sophie Martin</p><p className="mt-2 text-text-soft">Client VIP</p></div>
      </div>
    </div>
  )
}
