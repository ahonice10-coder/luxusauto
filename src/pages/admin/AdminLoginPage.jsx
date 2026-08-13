import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../i18n/LanguageContext'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('ahoglelenice@gmail.com')
  const [password, setPassword] = useState('200625')
  const [error, setError] = useState('')
  const { loginAdmin } = useAuth()
  const navigate = useNavigate()
  const { t } = useLanguage()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (loginAdmin(email, password)) {
      navigate('/admin/vehicles')
    } else {
      setError('Identifiants incorrects')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="glass-panel rounded-3xl p-8">
          <h1 className="text-3xl font-black text-text">{t('auth.adminLogin')}</h1>
          <p className="mt-2 text-text-soft">{t('auth.accessDashboard')}</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.18em] text-text-soft">{t('auth.email')}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-surface/50 px-4 py-3 text-text placeholder-text-soft/50 focus:border-primary focus:outline-none"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-[0.18em] text-text-soft">{t('auth.password')}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-surface/50 px-4 py-3 text-text placeholder-text-soft/50 focus:border-primary focus:outline-none"
                placeholder="••••••"
              />
            </div>

            {error && <div className="rounded-lg border border-danger/50 bg-danger/10 px-4 py-3 text-sm text-danger">{error}</div>}

            <button
              type="submit"
              className="mt-6 w-full rounded-xl bg-primary px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#001452] shadow-glow transition hover:brightness-110"
            >
              {t('auth.signin')}
            </button>
          </form>

          <div className="mt-8 rounded-lg border border-white/10 bg-surface/30 p-4 text-xs text-text-soft">
            <p className="font-semibold text-text">{t('auth.demoCredentials')}</p>
            <p className="mt-2">Email: ahoglelenice@gmail.com</p>
            <p>{t('auth.password')}: 200625</p>
          </div>
        </div>
      </div>
    </div>
  )
}
