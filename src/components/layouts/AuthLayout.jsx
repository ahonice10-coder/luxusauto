import { Link, Outlet } from 'react-router-dom'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { PageTransition } from '../PageTransition'
import { SITE } from '../../lib/config'
import { useLanguage } from '../../i18n/LanguageContext'

export function AuthLayout() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-[72px] md:px-8">
          <Link to="/" className="text-xl font-semibold tracking-tight text-foreground">{SITE.name}</Link>
          <LanguageSwitcher id="language-switcher-auth" />
        </div>
      </header>
      <main id="main-content">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <p className="py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {SITE.name}. {t('footer.rights')}
      </p>
    </div>
  )
}
