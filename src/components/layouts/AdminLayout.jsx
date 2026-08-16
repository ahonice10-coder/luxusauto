import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { CarFront, LayoutDashboard, CalendarCheck, Users, Settings, LogOut, ArrowUpRight } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../i18n/LanguageContext'
import { useNotifications } from '../../context/NotificationContext'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { PageTransition } from '../PageTransition'
import { SITE } from '../../lib/config'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const adminLinks = [
  { to: '/admin', labelKey: 'admin.dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/vehicles', labelKey: 'admin.vehicles', icon: CarFront },
  { to: '/admin/reservations', labelKey: 'admin.reservations', icon: CalendarCheck },
  { to: '/admin/users', labelKey: 'admin.users', icon: Users },
  { to: '/admin/settings', labelKey: 'admin.settings', icon: Settings },
]

export function AdminLayout() {
  const { logout, user } = useAuth()
  const { unreadReservations } = useNotifications()
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useLanguage()

  const current = adminLinks.find((link) => (link.end ? location.pathname === link.to : location.pathname.startsWith(link.to)))
  const title = current ? t(current.labelKey) : t('admin.kicker')

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border bg-sidebar md:flex">
        <div className="px-5 py-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{t('admin.kicker')}</p>
          <p className="mt-1 text-xl font-semibold tracking-tight">{SITE.name}</p>
        </div>
        <Separator />
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {adminLinks.map((link) => {
            const Icon = link.icon
            return (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-muted-foreground hover:bg-sidebar-accent hover:text-foreground',
                  )
                }
              >
                <Icon size={16} className="shrink-0" />
                {t(link.labelKey)}
                {link.to === '/admin/reservations' && unreadReservations > 0 ? (
                  <Badge className="ml-auto">{unreadReservations}</Badge>
                ) : null}
              </NavLink>
            )
          })}
        </nav>
        <Separator />
        <div className="p-3">
          <div className="mb-3 rounded-lg bg-muted px-3 py-2">
            <p className="truncate text-sm font-medium">{user?.name || 'Admin'}</p>
            <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <Button variant="ghost" className="mb-1 w-full justify-start" asChild>
            <NavLink to="/">
              <ArrowUpRight /> {t('admin.backToSite')}
            </NavLink>
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive"
            onClick={() => { logout(); navigate('/admin/login') }}
          >
            <LogOut /> {t('nav.logout')}
          </Button>
        </div>
      </aside>

      <div className="md:pl-64">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-border bg-background/95 px-4 py-3 backdrop-blur-md md:px-8">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">{t('admin.kicker')}</p>
            <h1 className="text-lg font-semibold">{title}</h1>
          </div>
          <LanguageSwitcher id="language-switcher-admin" />
        </header>

        <nav className="flex gap-2 overflow-x-auto border-b border-border px-4 py-3 md:hidden">
          {adminLinks.map((link) => (
            <Button
              key={link.to}
              variant={location.pathname === link.to || (!link.end && location.pathname.startsWith(link.to)) ? 'secondary' : 'outline'}
              size="sm"
              asChild
            >
              <NavLink to={link.to} end={link.end}>
                {t(link.labelKey)}
                {link.to === '/admin/reservations' && unreadReservations > 0 ? ` (${unreadReservations})` : ''}
              </NavLink>
            </Button>
          ))}
        </nav>

        <main id="main-content" className="px-4 py-8 md:px-8">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>
    </div>
  )
}
