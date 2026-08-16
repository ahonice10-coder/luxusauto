import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { ArrowLeft, Calendar, Gauge, MapPin, ShieldCheck, Star, MessageCircle } from 'lucide-react'
import { useVehicles } from '../../context/VehicleContext'
import { useAuth } from '../../context/AuthContext'
import { useReservations } from '../../context/ReservationContext'
import { useNotifications } from '../../context/NotificationContext'
import { useToast } from '../../context/ToastContext'
import { useLanguage } from '../../i18n/LanguageContext'
import { DEPOSIT_RATE, formatPrice, whatsappUrl } from '../../lib/config'
import { getVehicleImages } from '../../lib/vehicleMedia'
import { Seo } from '../../components/Seo'
import { VehicleImageSlider } from '../../components/vehicle/VehicleImageSlider'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

export default function VehicleDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { getVehicleById } = useVehicles()
  const { isAuthenticated, user } = useAuth()
  const { addReservation } = useReservations()
  const { addNotification } = useNotifications()
  const { toast } = useToast()
  const { t, language } = useLanguage()
  const locale = language === 'en' ? 'en-GB' : `${language}-${language.toUpperCase()}`
  const vehicle = getVehicleById(id)

  if (!vehicle) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center text-muted-foreground">
        <Seo title={t('vehicle.notFound')} />
        {t('vehicle.notFound')}
      </div>
    )
  }

  const deposit = Math.round(vehicle.price * DEPOSIT_RATE)

  const requireAuth = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } })
      return false
    }
    return true
  }

  const handleReserve = async () => {
    if (!requireAuth()) return

    const result = await addReservation({
      vehicleId: vehicle.id,
      vehicleName: vehicle.name,
      status: 'confirmed',
      date: new Date().toISOString().slice(0, 10),
      customer: user.name,
      customerEmail: user.email,
      userId: user.id,
      amount: deposit,
    })
    if (!result?.ok) {
      toast(t('common.error'), 'danger')
      return
    }
    if (!result.remote) {
      addNotification({
        type: 'reservation',
        title: t('user.reservationsTitle'),
        body: `${vehicle.name} · ${formatPrice(deposit, locale)}`,
        vehicleId: vehicle.id,
        read: false,
      })
    }
    toast(t('user.reservationsTitle'), 'success')
    navigate('/reservations')
  }

  const handleOrder = () => {
    if (!requireAuth()) return

    const message = `Bonjour, j'aimerais commander le véhicule: ${vehicle.name} (${vehicle.brand}) - ${formatPrice(vehicle.price, 'fr-FR')}`
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')

    addNotification({
      type: 'order',
      title: t('vehicle.order'),
      body: `${vehicle.name} (${vehicle.brand})`,
      vehicleId: vehicle.id,
      read: false,
    })
    toast(t('vehicle.order'), 'success')
  }

  return (
    <div className="page-shell">
      <Seo title={vehicle.name} description={vehicle.description} />
      <Button type="button" variant="ghost" className="mb-8 px-0" onClick={() => navigate(-1)}>
        <ArrowLeft /> {t('common.back')}
      </Button>

      <Card className="gap-0 overflow-hidden py-0">
        <VehicleImageSlider
          images={getVehicleImages(vehicle)}
          alt={vehicle.name}
          interval={3000}
          className="h-[380px] w-full md:h-[480px]"
        />
      </Card>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary">
              {vehicle.category === 'new' ? t('vehicle.newBadge') : t('vehicle.usedBadge')}
            </Badge>
            <span className="text-sm text-muted-foreground">{vehicle.brand}</span>
          </div>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-foreground md:text-5xl">{vehicle.name}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{vehicle.description}</p>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <Card className="p-5">
              <Gauge className="mb-3" size={20} />
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{t('vehicle.power')}</p>
              <p className="mt-2 text-lg font-semibold">{vehicle.power}</p>
            </Card>
            <Card className="p-5">
              <Calendar className="mb-3" size={20} />
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{t('vehicle.year')}</p>
              <p className="mt-2 text-lg font-semibold">{vehicle.year}</p>
            </Card>
            <Card className="p-5">
              <MapPin className="mb-3" size={20} />
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{t('vehicle.location')}</p>
              <p className="mt-2 text-lg font-semibold">{vehicle.location}</p>
            </Card>
          </div>

          <Card className="mt-10 p-6 md:p-8">
            <h2 className="mb-5 text-xl font-semibold">{t('vehicle.specifications')}</h2>
            <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li>{t('vehicle.engine')} — {vehicle.engine}</li>
              <li>{t('vehicle.transmission')} — {vehicle.transmission}</li>
              <li>{t('vehicle.mileage')} — {Number(vehicle.mileage || 0).toLocaleString(locale)} km</li>
              <li>{t('vehicle.condition')} — {vehicle.status === 'new' ? t('vehicle.newBadge') : t('vehicle.certifiedUsed')}</li>
            </ul>
          </Card>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-28">
          <Card className="p-7">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{t('vehicles.price')}</p>
            <p className="mt-3 text-3xl font-semibold text-gold">{formatPrice(vehicle.price, locale)}</p>
            <p className="mt-2 text-sm text-muted-foreground">{t('vehicle.deposit')} : {formatPrice(deposit, locale)}</p>
            <Button type="button" onClick={handleOrder} className="mt-8 w-full" size="lg">
              <MessageCircle /> {t('vehicle.order')}
            </Button>
            <Button type="button" variant="outline" onClick={handleReserve} className="mt-3 w-full">
              {t('vehicle.reserve')}
            </Button>
            <Button type="button" variant="ghost" onClick={() => navigate('/vehicles')} className="mt-3 w-full">
              {t('vehicle.seeOthers')}
            </Button>
          </Card>

          <Card className="p-7">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} /> <span className="text-xs font-medium uppercase tracking-[0.16em]">{t('vehicle.clientReview')}</span>
            </div>
            <div className="mt-4 flex items-center gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, idx) => <Star key={idx} size={14} fill="currentColor" />)}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">“{t('vehicle.reviewQuote')}”</p>
          </Card>
        </aside>
      </div>
    </div>
  )
}
