import { Link, useLocation } from 'react-router-dom'
import { Calendar, CarFront, Home, LogIn, User } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../i18n/LanguageContext'
import { cn } from '@/lib/utils'

export function BottomNavbar() {
  const location = useLocation()
  const { isAuthenticated } = useAuth()
  const { t } = useLanguage()

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname === path || location.pathname.startsWith(`${path}/`)
  }

  const navItems = isAuthenticated
    ? [
        { path: '/', icon: Home, label: t('nav.home') },
        { path: '/vehicles', icon: CarFront, label: t('nav.vehicles') },
        { path: '/reservations', icon: Calendar, label: t('nav.reservations') },
        { path: '/dashboard', icon: User, label: t('user.mySpace') },
      ]
    : [
        { path: '/', icon: Home, label: t('nav.home') },
        { path: '/vehicles', icon: CarFront, label: t('nav.vehicles') },
        { path: '/login', icon: LogIn, label: t('nav.login') },
      ]

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
      aria-label="Mobile"
    >
      <div className="flex items-stretch justify-around px-1">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={cn(
              'flex min-h-14 min-w-0 flex-1 flex-col items-center justify-center gap-1 px-1 py-2 text-[11px] font-medium transition-colors',
              isActive(path) ? 'text-foreground' : 'text-muted-foreground',
            )}
            aria-label={label}
            aria-current={isActive(path) ? 'page' : undefined}
          >
            <Icon size={22} />
            <span className="max-w-full truncate">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
