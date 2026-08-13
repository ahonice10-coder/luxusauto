import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../i18n/LanguageContext'
import { useState } from 'react'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const { t } = useLanguage()
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    login(form)
    const from = location.state?.from || '/dashboard'
    navigate(from, { replace: true })
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-20">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-surface/60 p-8 shadow-glow">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">LuxusAuto</p>
          <h1 className="mt-2 text-4xl font-black text-text">{t('nav.login')}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-text-soft">{t('auth.email')}</label>
            <input required name="email" value={form.email} onChange={handleChange} type="email" className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-text outline-none focus:border-primary" placeholder="nom@example.com" />
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-text-soft">{t('auth.password')}</label>
            <input required name="password" value={form.password} onChange={handleChange} type="password" className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-text outline-none focus:border-primary" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full rounded-xl bg-primary px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#001452]">
            {t('auth.signin')}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-soft">
          {t('auth.noAccount')} <Link to="/register" className="font-semibold text-primary">{t('auth.createAccount')}</Link>
        </p>
      </div>
    </div>
  )
}
