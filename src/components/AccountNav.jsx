import { NavLink } from 'react-router-dom'
import { useLanguage } from '../i18n/LanguageContext'
import { cn } from '@/lib/utils'

export function AccountNav() {
  const { t } = useLanguage()

  const links = [
    { to: '/dashboard', label: t('user.dashboard') },
    { to: '/reservations', label: t('nav.reservations') },
    { to: '/favorites', label: t('nav.favorites') },
    { to: '/notifications', label: t('nav.notifications') },
    { to: '/messages', label: t('nav.messages') },
    { to: '/profile', label: t('nav.profile') },
  ]

  return (
    <nav className="scrollbar-none mb-8 flex gap-1 overflow-x-auto overscroll-x-contain border-b border-border sm:mb-10" aria-label={t('user.mySpace')}>
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            cn(
              'whitespace-nowrap px-4 py-3 text-sm font-medium transition-colors',
              isActive
                ? 'border-b-2 border-foreground text-foreground'
                : 'border-b-2 border-transparent text-muted-foreground hover:text-foreground',
            )
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}
