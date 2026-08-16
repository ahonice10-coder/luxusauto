import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../i18n/LanguageContext'
import { useToast } from '../../context/ToastContext'
import { Seo } from '../../components/Seo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [lockAutofill, setLockAutofill] = useState(true)
  const { loginAdmin, isAuthenticated, user } = useAuth()
  const navigate = useNavigate()
  const { t } = useLanguage()
  const { toast } = useToast()

  if (isAuthenticated && user?.role === 'admin') {
    return <Navigate to="/admin" replace />
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    const result = await loginAdmin(email, password)
    if (result.ok && result.user.role === 'admin') {
      toast(t('auth.signedIn'), 'success')
      navigate('/admin')
      return
    }
    setError(t(`auth.${result.error || 'wrongCredentials'}`))
  }

  const unlock = () => setLockAutofill(false)

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-20">
      <Seo title={t('seo.admin')} />
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl">{t('auth.adminLogin')}</CardTitle>
          <CardDescription>{t('auth.accessDashboard')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-email">{t('auth.email')}</Label>
              <Input
                id="admin-email"
                type="text"
                inputMode="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                onFocus={unlock}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck="false"
                readOnly={lockAutofill}
                data-lpignore="true"
                data-1p-ignore="true"
                className="h-11"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-password">{t('auth.password')}</Label>
              <Input
                id="admin-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                onFocus={unlock}
                autoComplete="new-password"
                readOnly={lockAutofill}
                data-lpignore="true"
                data-1p-ignore="true"
                className="h-11"
                required
              />
            </div>
            {error ? (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}
            <Button type="submit" className="w-full" size="lg">{t('auth.signin')}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
