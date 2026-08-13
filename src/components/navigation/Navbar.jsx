import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { LogOut, User, Bell, CarFront, LayoutDashboard, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useLanguage } from '../../i18n/LanguageContext'
import { LanguageSwitcher } from '../LanguageSwitcher'

export function Navbar() {
  const { isAuthenticated, logout, user } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isAdmin = user?.role === 'admin'

  const handleReservationLink = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } })
      return
    }
    navigate('/reservations')
  }

  const navLinkClass = ({ isActive }) =>
    `text-xs font-semibold uppercase tracking-[0.18em] transition ${
      isActive ? 'text-primary' : 'text-text-soft hover:text-primary'
    }`

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-full border border-white/10 p-2 text-text-soft transition hover:border-primary hover:text-primary md:hidden"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <Link to="/" className="text-xl font-black tracking-tight text-primary">LuxusAuto</Link>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={navLinkClass}>{t('nav.home')}</NavLink>
          <NavLink to="/vehicles/new" className={navLinkClass}>{t('nav.new')}</NavLink>
          <NavLink to="/vehicles/used" className={navLinkClass}>{t('nav.used')}</NavLink>
          <button type="button" onClick={handleReservationLink} className="text-xs font-semibold uppercase tracking-[0.18em] text-text-soft transition hover:text-primary">
            {t('nav.reservations')}
          </button>
          <NavLink to="/notifications" className={navLinkClass}>{t('nav.notifications')}</NavLink>
          <NavLink to="/profile" className={navLinkClass}>{t('nav.profile')}</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="hidden rounded border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-text-soft hover:border-primary hover:text-primary sm:inline-flex">
                {t('nav.login')}
              </Link>
              <Link to="/register" className="inline-flex rounded bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#001452] shadow-glow transition hover:brightness-110">
                {t('nav.createAccount')}
              </Link>
            </>
          ) : (
            <>
              {isAdmin ? (
                <>
                  <NavLink to="/admin/vehicles" className="hidden items-center gap-2 rounded border border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-text-soft hover:border-primary hover:text-primary sm:inline-flex">
                    <CarFront size={14} /> {t('nav.management')}
                  </NavLink>
                  <NavLink to="/admin/reservations" className="hidden items-center gap-2 rounded border border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-text-soft hover:border-primary hover:text-primary sm:inline-flex">
                    <Bell size={14} /> {t('nav.reservations')}
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/profile" className="hidden items-center gap-2 rounded border border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-text-soft hover:border-primary hover:text-primary sm:inline-flex">
                    <User size={14} /> {t('nav.profile')}
                  </NavLink>
                  <NavLink to="/favorites" className="hidden items-center gap-2 rounded border border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-text-soft hover:border-primary hover:text-primary sm:inline-flex">
                    <Bell size={14} /> {t('nav.notifications')}
                  </NavLink>
                </>
              )}
              <button
                type="button"
                onClick={() => { logout(); navigate('/login') }}
                className="inline-flex items-center gap-2 rounded border border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-text-soft hover:border-primary hover:text-primary"
              >
                <LogOut size={14} /> {t('nav.logout')}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-background/95 backdrop-blur-xl md:hidden">
          <nav className="mx-auto max-w-7xl space-y-3 px-4 py-4">
            <div className="pb-4">
              <LanguageSwitcher />
            </div>
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-soft hover:text-primary transition"
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/vehicles/new"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-soft hover:text-primary transition"
            >
              {t('nav.new')}
            </Link>
            <Link
              to="/vehicles/used"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-soft hover:text-primary transition"
            >
              {t('nav.used')}
            </Link>
            <button
              type="button"
              onClick={() => {
                handleReservationLink()
                setMobileMenuOpen(false)
              }}
              className="block w-full py-2 text-left text-xs font-semibold uppercase tracking-[0.18em] text-text-soft hover:text-primary transition"
            >
              {t('nav.reservations')}
            </button>
            <Link
              to="/notifications"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-soft hover:text-primary transition"
            >
              {t('nav.notifications')}
            </Link>
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-soft hover:text-primary transition"
            >
              {t('nav.profile')}
            </Link>

            {isAuthenticated && isAdmin && (
              <>
                <Link
                  to="/admin/vehicles"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary font-bold"
                >
                  {t('nav.management')}
                </Link>
                <Link
                  to="/admin/reservations"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-soft hover:text-primary transition"
                >
                  {t('nav.reservations')}
                </Link>
              </>
            )}

            <div className="border-t border-white/10 pt-4">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-soft hover:text-primary transition"
                  >
                    {t('nav.login')}
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="mt-2 block rounded bg-primary px-4 py-2 text-center text-xs font-semibold uppercase tracking-[0.16em] text-[#001452] transition hover:brightness-110"
                  >
                    {t('nav.createAccount')}
                  </Link>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    logout()
                    setMobileMenuOpen(false)
                    navigate('/login')
                  }}
                  className="flex items-center gap-2 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-text-soft hover:text-primary transition"
                >
                  <LogOut size={14} /> {t('nav.logout')}
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
