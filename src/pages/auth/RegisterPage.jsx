import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../i18n/LanguageContext'
import { useState } from 'react'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const { t } = useLanguage()
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    register(form)
    navigate('/')
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-20">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-surface/60 p-8 shadow-glow">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">LuxusAuto</p>
          <h1 className="mt-2 text-4xl font-black text-text">{t('auth.createAccount')}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-text-soft">Nom complet</label>
            <input required name="name" value={form.name} onChange={handleChange} type="text" className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-text outline-none focus:border-primary" placeholder="Alex Rossi" />
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-text-soft">Email</label>
            <input required name="email" value={form.email} onChange={handleChange} type="email" className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-text outline-none focus:border-primary" placeholder="nom@example.com" />
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-text-soft">Mot de passe</label>
            <input required name="password" value={form.password} onChange={handleChange} type="password" className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-text outline-none focus:border-primary" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full rounded-xl bg-primary px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#001452]">
            S’inscrire
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-soft">
          {t('auth.alreadyHave')} <Link to="/login" className="font-semibold text-primary">{t('nav.login')}</Link>
        </p>
      </div>
    </div>
  )
}
