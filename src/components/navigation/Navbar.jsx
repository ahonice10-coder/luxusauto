import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Bell, Heart, LogOut, Menu, User } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNotifications } from '../../context/NotificationContext'
import { useLanguage } from '../../i18n/LanguageContext'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { SITE } from '../../lib/config'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

export function Navbar() {
  const { isAuthenticated, logout, isAdmin, user } = useAuth()
  const { unreadCount } = useNotifications()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-2 px-4 sm:h-16 sm:gap-4 sm:px-5 md:h-[72px] md:px-8">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0 lg:hidden" aria-label="Menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[min(100%,20rem)]">
              <SheetHeader>
                <SheetTitle>{SITE.name}</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4" aria-label="Mobile">
                <Button variant="ghost" className="justify-start" asChild>
                  <Link to="/" onClick={() => setMobileMenuOpen(false)}>{t('nav.home')}</Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <Link to="/vehicles" onClick={() => setMobileMenuOpen(false)}>{t('nav.vehicles')}</Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <Link to="/about" onClick={() => setMobileMenuOpen(false)}>{t('nav.about')}</Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>{t('nav.contact')}</Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <Link to="/faq" onClick={() => setMobileMenuOpen(false)}>{t('nav.faq')}</Link>
                </Button>
                {isAuthenticated && !isAdmin ? (
                  <>
                    <Separator className="my-3" />
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>{t('user.mySpace')}</Link>
                    </Button>
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link to="/reservations" onClick={() => setMobileMenuOpen(false)}>{t('nav.reservations')}</Link>
                    </Button>
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link to="/favorites" onClick={() => setMobileMenuOpen(false)}>{t('nav.favorites')}</Link>
                    </Button>
                  </>
                ) : null}
                {isAdmin ? (
                  <Button variant="ghost" className="justify-start" asChild>
                    <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>{t('nav.management')}</Link>
                  </Button>
                ) : null}
                {!isAuthenticated ? (
                  <>
                    <Separator className="my-3" />
                    <Button variant="ghost" className="justify-start" asChild>
                      <Link to="/login" onClick={() => setMobileMenuOpen(false)}>{t('nav.login')}</Link>
                    </Button>
                    <Button className="mt-1" asChild>
                      <Link to="/register" onClick={() => setMobileMenuOpen(false)}>{t('nav.createAccount')}</Link>
                    </Button>
                  </>
                ) : null}
              </nav>
            </SheetContent>
          </Sheet>
          <Link to="/" className="min-w-0 truncate font-display text-base font-semibold tracking-tight text-foreground sm:text-lg md:text-xl">
            {SITE.name}
          </Link>
        </div>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Principal">
          <NavLink to="/" end className={navLinkClass}>{t('nav.home')}</NavLink>
          <NavLink
            to="/vehicles"
            className={({ isActive }) =>
              navLinkClass({ isActive: isActive || location.pathname.startsWith('/vehicle/') })
            }
          >
            {t('nav.vehicles')}
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>{t('nav.about')}</NavLink>
          <NavLink to="/contact" className={navLinkClass}>{t('nav.contact')}</NavLink>
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <LanguageSwitcher id="language-switcher-nav" compact />
          {!isAuthenticated ? (
            <>
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex" asChild>
                <Link to="/login">{t('nav.login')}</Link>
              </Button>
              <Button size="sm" className="hidden sm:inline-flex" asChild>
                <Link to="/register">{t('nav.createAccount')}</Link>
              </Button>
            </>
          ) : isAdmin ? (
            <>
              <Button variant="outline" size="sm" className="hidden sm:inline-flex" asChild>
                <NavLink to="/admin">{t('nav.management')}</NavLink>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={t('nav.logout')}
                onClick={() => { logout(); navigate('/login') }}
              >
                <LogOut />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="icon" className="hidden sm:inline-flex" asChild>
                <NavLink to="/favorites" aria-label={t('nav.favorites')}>
                  <Heart />
                </NavLink>
              </Button>
              <Button variant="ghost" size="icon" className="relative hidden sm:inline-flex" asChild>
                <NavLink to="/notifications" aria-label={t('nav.notifications')}>
                  <Bell />
                  {unreadCount > 0 ? (
                    <Badge className="absolute -right-0.5 -top-0.5 h-2 w-2 p-0" />
                  ) : null}
                </NavLink>
              </Button>
              <Button variant="ghost" size="icon" className="hidden sm:inline-flex" asChild>
                <NavLink to="/dashboard" aria-label={t('nav.profile')} title={user?.name}>
                  <User />
                </NavLink>
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={t('nav.logout')}
                onClick={() => { logout(); navigate('/login') }}
              >
                <LogOut />
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
