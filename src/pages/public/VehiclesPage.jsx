import { useMemo } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { useVehicles } from '../../context/VehicleContext'
import { VehicleCard } from '../../components/vehicle/VehicleCard'
import { useLanguage } from '../../i18n/LanguageContext'
import { Seo } from '../../components/Seo'
import { EmptyState } from '../../components/EmptyState'
import { PageHeader } from '../../components/PageHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

function categoryFromPath(pathname) {
  if (pathname.endsWith('/new')) return 'new'
  if (pathname.endsWith('/used')) return 'used'
  return 'all'
}

export default function VehiclesPage() {
  const { vehicles } = useVehicles()
  const { t } = useLanguage()
  const location = useLocation()
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()

  const selectedFilter = categoryFromPath(location.pathname)
  const query = params.get('q') || ''
  const sort = params.get('sort') || 'featured'

  const setFilter = (option) => {
    const search = params.toString()
    const suffix = search ? `?${search}` : ''
    if (option === 'all') navigate(`/vehicles${suffix}`)
    else navigate(`/vehicles/${option}${suffix}`)
  }

  const updateParam = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const filteredVehicles = useMemo(() => {
    const needle = query.trim().toLowerCase()
    let list = vehicles.filter((vehicle) => {
      const matchesCategory = selectedFilter === 'all' || vehicle.category === selectedFilter
      const haystack = `${vehicle.name} ${vehicle.brand} ${vehicle.location} ${vehicle.engine}`.toLowerCase()
      const matchesQuery = !needle || haystack.includes(needle)
      return matchesCategory && matchesQuery
    })

    list = [...list].sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'year-desc') return b.year - a.year
      return Number(b.featured) - Number(a.featured)
    })

    return list
  }, [selectedFilter, vehicles, query, sort])

  const title = selectedFilter === 'new' ? t('vehicles.newVehicles') : selectedFilter === 'used' ? t('vehicles.usedVehicles') : t('vehicles.allVehicles')

  return (
    <div className="page-shell">
      <Seo title={title} description={t('seo.homeDesc')} />
      <PageHeader
        kicker={t('vehicles.marketplace')}
        title={title}
        action={(
          <div className="flex flex-wrap gap-2">
            {['all', 'new', 'used'].map((option) => (
              <Button
                key={option}
                type="button"
                variant={selectedFilter === option ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(option)}
                aria-pressed={selectedFilter === option}
              >
                {option === 'all' ? t('vehicles.all') : option === 'new' ? t('vehicles.new') : t('vehicles.used')}
              </Button>
            ))}
          </div>
        )}
      />

      <div className="mb-10 grid gap-4 md:grid-cols-[1fr_14rem]">
        <div>
          <label htmlFor="vehicle-search" className="sr-only">{t('common.search')}</label>
          <Input
            id="vehicle-search"
            value={query}
            onChange={(event) => updateParam('q', event.target.value)}
            className="h-11"
            placeholder={t('vehicles.searchPlaceholder')}
            type="search"
          />
        </div>
        <div>
          <label htmlFor="vehicle-sort" className="sr-only">{t('vehicles.sortLabel')}</label>
          <Select value={sort} onValueChange={(value) => updateParam('sort', value)}>
            <SelectTrigger id="vehicle-sort" className="h-11 w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">{t('vehicles.sortFeatured')}</SelectItem>
              <SelectItem value="price-asc">{t('vehicles.sortPriceAsc')}</SelectItem>
              <SelectItem value="price-desc">{t('vehicles.sortPriceDesc')}</SelectItem>
              <SelectItem value="year-desc">{t('vehicles.sortYearDesc')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredVehicles.length === 0 ? (
        <EmptyState
          title={t('vehicles.empty')}
          hint={t('vehicles.emptyHint')}
          action={(
            <Button
              type="button"
              variant="outline"
              onClick={() => { setParams({}); navigate('/vehicles') }}
            >
              {t('vehicles.resetFilters')}
            </Button>
          )}
        />
      ) : (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      )}
    </div>
  )
}
