import { Link, useLocation } from 'react-router-dom'
import { Home, CarFront, Bell, User } from 'lucide-react'

export function BottomNavbar() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const navItems = [
    { path: '/', icon: Home, label: 'Accueil' },
    { path: '/vehicles', icon: CarFront, label: 'Véhicules' },
    { path: '/notifications', icon: Bell, label: 'Notifications' },
    { path: '/profile', icon: User, label: 'Profil' },
  ]

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-background/95 backdrop-blur-xl md:hidden">
      <div className="flex items-center justify-around px-4 py-3">
        {navItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center gap-1 px-3 py-2 transition ${
              isActive(path) ? 'text-primary' : 'text-text-soft hover:text-primary'
            }`}
            aria-label={label}
          >
            <Icon size={24} />
            <span className="text-xs font-semibold">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
