import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../i18n/LanguageContext'
import { SITE } from '../../lib/config'
import { Separator } from '@/components/ui/separator'

export function Footer() {
  const { t } = useLanguage()
  const { isAuthenticated } = useAuth()
  const year = new Date().getFullYear()

  return (
    <footer className="mt-8 border-t border-border bg-sidebar/60">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-4 md:px-8 md:py-20">
        <div className="md:pr-6">
          <Link to="/" className="text-xl font-semibold tracking-tight text-foreground">{SITE.name}</Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">{t('footer.tagline')}</p>
        </div>
        <div>
          <h3 className="mb-5 text-xs font-medium uppercase tracking-[0.16em] text-foreground">{t('footer.navigation')}</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link className="transition-colors hover:text-foreground" to="/">{t('nav.home')}</Link></li>
            <li><Link className="transition-colors hover:text-foreground" to="/vehicles">{t('nav.vehicles')}</Link></li>
            <li><Link className="transition-colors hover:text-foreground" to="/vehicles/new">{t('nav.new')}</Link></li>
            <li><Link className="transition-colors hover:text-foreground" to="/vehicles/used">{t('nav.used')}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-5 text-xs font-medium uppercase tracking-[0.16em] text-foreground">{t('footer.company')}</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link className="transition-colors hover:text-foreground" to="/about">{t('nav.about')}</Link></li>
            <li><Link className="transition-colors hover:text-foreground" to="/faq">{t('nav.faq')}</Link></li>
            <li><Link className="transition-colors hover:text-foreground" to="/contact">{t('nav.contact')}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="mb-5 text-xs font-medium uppercase tracking-[0.16em] text-foreground">{t('footer.account')}</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {isAuthenticated ? (
              <>
                <li><Link className="transition-colors hover:text-foreground" to="/dashboard">{t('user.mySpace')}</Link></li>
                <li><Link className="transition-colors hover:text-foreground" to="/reservations">{t('nav.reservations')}</Link></li>
                <li><Link className="transition-colors hover:text-foreground" to="/favorites">{t('nav.favorites')}</Link></li>
              </>
            ) : (
              <>
                <li><Link className="transition-colors hover:text-foreground" to="/login">{t('nav.login')}</Link></li>
                <li><Link className="transition-colors hover:text-foreground" to="/register">{t('nav.createAccount')}</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-5 pb-10 md:px-8">
        <Separator className="mb-6" />
        <p className="text-xs text-muted-foreground">
          © {year} {SITE.name}. {t('footer.rights')}
        </p>
      </div>
    </footer>
  )
}
