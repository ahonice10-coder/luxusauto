import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
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

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated, user } = useAuth()
  const { t } = useLanguage()
  const { toast } = useToast()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [lockAutofill, setLockAutofill] = useState(true)

  if (isAuthenticated) {
    const fallback = user?.role === 'admin' ? '/admin' : '/dashboard'
    return <Navigate to={location.state?.from || fallback} replace />
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    const result = await login(form)
    if (!result.ok) {
      setError(t(`auth.${result.error}`))
      return
    }
    toast(t('auth.signedIn'), 'success')
    const fallback = result.user.role === 'admin' ? '/admin' : '/dashboard'
    navigate(location.state?.from || fallback, { replace: true })
  }

  const unlock = () => setLockAutofill(false)

  return (
    <div className="flex min-h-[80dvh] items-center justify-center px-4 py-10 sm:px-5 sm:py-16">
      <Seo title={t('seo.login')} />
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">LuxusAuto</p>
          <CardTitle className="mt-2 text-2xl sm:text-3xl">{t('nav.login')}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} autoComplete="off" className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="login-email">{t('auth.email')}</Label>
              <Input
                id="login-email"
                required
                name="email"
                value={form.email}
                onChange={handleChange}
                onFocus={unlock}
                type="text"
                inputMode="email"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck="false"
                readOnly={lockAutofill}
                data-lpignore="true"
                data-1p-ignore="true"
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">{t('auth.password')}</Label>
              <Input
                id="login-password"
                required
                name="password"
                value={form.password}
                onChange={handleChange}
                onFocus={unlock}
                type="password"
                autoComplete="new-password"
                readOnly={lockAutofill}
                data-lpignore="true"
                data-1p-ignore="true"
                className="h-11"
              />
            </div>
            {error ? (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}
            <Button type="submit" className="w-full" size="lg">{t('auth.signin')}</Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t('auth.noAccount')}{' '}
            <Link to="/register" className="font-medium text-foreground underline-offset-4 hover:underline">
              {t('auth.createAccount')}
            </Link>
          </p>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            <Link to="/admin/login" className="hover:text-foreground">{t('auth.adminSpace')}</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
