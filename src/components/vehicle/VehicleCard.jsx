import { Heart, ArrowRight } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useFavorites } from '../../context/FavoritesContext'
import { useToast } from '../../context/ToastContext'
import { useLanguage } from '../../i18n/LanguageContext'
import { formatPrice } from '../../lib/config'
import { getVehicleImages } from '../../lib/vehicleMedia'
import { VehicleImageSlider } from './VehicleImageSlider'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export function VehicleCard({ vehicle }) {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { isFavorite, toggleFavorite } = useFavorites()
  const { toast } = useToast()
  const { t, language } = useLanguage()
  const locale = language === 'en' ? 'en-GB' : `${language}-${language.toUpperCase()}`
  const favorite = isFavorite(vehicle.id)
  const images = getVehicleImages(vehicle)

  const handleFavorite = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/vehicle/${vehicle.id}` } })
      return
    }
    toggleFavorite(vehicle.id)
    toast(favorite ? t('vehicle.removeFavorite') : t('vehicle.addFavorite'), 'success')
  }

  return (
    <Card className="card-hover gap-0 py-0">
      <div className="relative overflow-hidden">
        <Link to={`/vehicle/${vehicle.id}`} className="block">
          <VehicleImageSlider
            images={images}
            alt={vehicle.name}
            interval={3000}
            className="h-52 w-full sm:h-56 md:h-64"
          />
        </Link>
        <Button
          type="button"
          variant="secondary"
          size="icon-sm"
          onClick={handleFavorite}
          className="absolute right-3 top-3 z-20"
          aria-label={favorite ? t('vehicle.removeFavorite') : t('vehicle.addFavorite')}
          aria-pressed={favorite}
        >
          <Heart className={favorite ? 'fill-foreground' : ''} />
        </Button>
        {vehicle.featured ? (
          <Badge className="absolute left-3 top-3 z-20">{t('vehicle.featured')}</Badge>
        ) : null}
      </div>

      <CardHeader className="pt-5">
        <div className="flex min-w-0 items-start justify-between gap-3 sm:gap-4">
          <div className="min-w-0">
            <CardTitle className="text-base break-words sm:text-lg">
              <Link to={`/vehicle/${vehicle.id}`} className="hover:underline">{vehicle.name}</Link>
            </CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">{vehicle.engine} • {vehicle.year}</p>
          </div>
          <span className="shrink-0 text-sm font-semibold text-gold">{formatPrice(vehicle.price, locale)}</span>
        </div>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-x-4 gap-y-2 border-y py-4 text-xs text-muted-foreground">
        <span>{vehicle.power}</span>
        <span>{vehicle.transmission}</span>
        <span>{Number(vehicle.mileage || 0).toLocaleString(locale)} km</span>
        <span>{vehicle.location}</span>
      </CardContent>

      <CardFooter className="flex-col items-stretch gap-3 bg-transparent sm:flex-row sm:items-center sm:justify-between">
        <Button variant="link" className="justify-start px-0" asChild>
          <Link to={`/vehicle/${vehicle.id}`}>
            {t('vehicle.seeVehicle')} <ArrowRight />
          </Link>
        </Button>
        <Button size="sm" className="w-full sm:w-auto" asChild>
          <Link to={`/vehicle/${vehicle.id}`}>{t('vehicle.reserve')}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
