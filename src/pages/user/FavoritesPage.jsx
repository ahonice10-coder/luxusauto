import { Link } from 'react-router-dom'
import { useVehicles } from '../../context/VehicleContext'
import { useFavorites } from '../../context/FavoritesContext'
import { useLanguage } from '../../i18n/LanguageContext'
import { Seo } from '../../components/Seo'
import { EmptyState } from '../../components/EmptyState'
import { VehicleCard } from '../../components/vehicle/VehicleCard'
import { PageHeader } from '../../components/PageHeader'
import { AccountNav } from '../../components/AccountNav'

export default function FavoritesPage() {
  const { vehicles } = useVehicles()
  const { ids } = useFavorites()
  const { t } = useLanguage()
  const favorites = vehicles.filter((vehicle) => ids.includes(vehicle.id))

  return (
    <div className="page-shell max-w-6xl">
      <Seo title={t('seo.favorites')} />
      <AccountNav />
      <PageHeader kicker={t('user.favoritesKicker')} title={t('user.favoritesTitle')} />

      {favorites.length === 0 ? (
        <EmptyState
          title={t('user.emptyFavorites')}
          action={<Link to="/vehicles" className="rounded bg-primary px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground">{t('home.browseVehicles')}</Link>}
        />
      ) : (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {favorites.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      )}
    </div>
  )
}
