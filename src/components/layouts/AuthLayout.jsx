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
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-5 md:h-[72px] md:px-8">
          <Link to="/" className="min-w-0 truncate text-lg font-semibold tracking-tight text-foreground sm:text-xl">{SITE.name}</Link>
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
