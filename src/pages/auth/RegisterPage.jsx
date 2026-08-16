import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../i18n/LanguageContext'
import { useToast } from '../../context/ToastContext'
import { useState } from 'react'
import { Seo } from '../../components/Seo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register, isAuthenticated, user } = useAuth()
  const { t } = useLanguage()
  const { toast } = useToast()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (isAuthenticated) {
    return (
      <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} replace />
    )
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (submitting) return
    setError('')
    if (form.password.length < 8) {
      setError(t('auth.passwordMin'))
      return
    }
    if (form.password !== form.confirmPassword) {
      setError(t('auth.passwordMismatch'))
      return
    }
    setSubmitting(true)
    const result = await register(form)
    setSubmitting(false)
    if (!result.ok) {
      const label = t(`auth.${result.error}`)
      setError(
        result.detail && result.error === 'serverError'
          ? `${label} ${result.detail}`
          : label === `auth.${result.error}` && result.detail
            ? result.detail
            : label,
      )
      return
    }
    toast(t('auth.accountCreated'), 'success')
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="flex min-h-[80dvh] items-center justify-center px-4 py-10 sm:px-5 sm:py-16">
      <Seo title={t('seo.register')} />
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">LuxusAuto</p>
          <CardTitle className="mt-2 text-2xl sm:text-3xl">{t('auth.createAccount')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="register-name">{t('auth.fullName')}</Label>
              <Input id="register-name" required name="name" value={form.name} onChange={handleChange} type="text" autoComplete="name" className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-email">{t('auth.email')}</Label>
              <Input id="register-email" required name="email" value={form.email} onChange={handleChange} type="email" autoComplete="email" className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-password">{t('auth.password')}</Label>
              <Input id="register-password" required name="password" value={form.password} onChange={handleChange} type="password" autoComplete="new-password" minLength={8} className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="register-confirm">{t('auth.confirmPassword')}</Label>
              <Input id="register-confirm" required name="confirmPassword" value={form.confirmPassword} onChange={handleChange} type="password" autoComplete="new-password" minLength={8} className="h-11" />
            </div>
            {error ? (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}
            <Button type="submit" className="w-full" size="lg" disabled={submitting}>
              {submitting ? t('common.loading') : t('auth.signup')}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t('auth.alreadyHave')}{' '}
            <Link to="/login" className="font-medium text-foreground underline-offset-4 hover:underline">
              {t('nav.login')}
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
