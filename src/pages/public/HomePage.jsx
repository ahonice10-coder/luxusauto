import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Sparkles, CarFront, User, Heart, MessageCircle, CreditCard, Package, Star } from 'lucide-react'
import { useVehicles } from '../../context/VehicleContext'
import { useLanguage } from '../../i18n/LanguageContext'
import { VehicleCard } from '../../components/vehicle/VehicleCard'
import { Seo } from '../../components/Seo'
import { SafeImage } from '../../components/SafeImage'
import { SectionHeader } from '../../components/PageHeader'
import { SITE } from '../../lib/config'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const HOME_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1600&q=80',
  inspection: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80',
  warranty: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
  delivery: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80',
}

export default function HomePage() {
  const { vehicles } = useVehicles()
  const { t } = useLanguage()
  const featured = vehicles.filter((vehicle) => vehicle.featured).slice(0, 3)

  const testimonials = [1, 2, 3].map((id) => ({
    id,
    name: t(`home.review${id}Name`),
    title: t(`home.review${id}Title`),
    text: t(`home.review${id}Text`),
    date: t(`home.review${id}Date`),
    avatar: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop',
    ][id - 1],
  }))

  const steps = [
    [User, 'home.valet'],
    [Heart, 'home.favorites'],
    [MessageCircle, 'home.whatsapp'],
    [CreditCard, 'home.buyOnline'],
    [Package, 'home.pickup'],
  ]

  return (
    <div>
      <Seo title={t('seo.home')} description={t('seo.homeDesc')} />

      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24" data-reveal>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div>
            <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl md:leading-[1.05]">
              {SITE.name}
            </h1>
            <h3 className="mt-4 max-w-xl text-xl font-medium tracking-tight text-muted-foreground md:text-2xl">
              {t('home.title')}
            </h3>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
              {t('home.subtitle')}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link to="/vehicles">
                  {t('home.browseVehicles')} <ArrowRight />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/vehicles/new">{t('home.newVehicles')}</Link>
              </Button>
            </div>
          </div>
          <Card className="gap-0 overflow-hidden py-0 shadow-none">
            <SafeImage
              src={HOME_IMAGES.hero}
              alt={SITE.name}
              className="aspect-[4/5] w-full rounded-none object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
            />
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28" data-reveal>
        <div className="grid gap-8 md:grid-cols-3 md:gap-10">
          <div>
            <CarFront className="mb-5 text-foreground" size={28} />
            <h3 className="text-xl font-semibold">{t('home.performance')}</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">{t('home.performanceDesc')}</p>
          </div>
          <div>
            <ShieldCheck className="mb-5 text-foreground" size={28} />
            <h3 className="text-xl font-semibold">{t('home.trust')}</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">{t('home.trustDesc')}</p>
          </div>
          <div>
            <Sparkles className="mb-5 text-foreground" size={28} />
            <h3 className="text-xl font-semibold">{t('home.premium')}</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">{t('home.premiumDesc')}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12" data-reveal>
        <SectionHeader center title={t('home.dailyVehicle')} subtitle={t('home.simplicity')} />
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {steps.map(([Icon, key], index) => (
            <div key={key} className="flex flex-col items-center text-center">
              <span className="mb-4 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">0{index + 1}</span>
              <div className="mb-4 rounded-lg border bg-card p-3.5">
                <Icon size={22} />
              </div>
              <p className="max-w-[11rem] text-sm leading-snug">{t(key)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28" data-reveal>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            ['inspection', 'home.inspection', 'home.inspectionDesc', 'home.inspectionAlt'],
            ['warranty', 'home.warranty', 'home.warrantyDesc', 'home.warrantyAlt'],
            ['delivery', 'home.delivery', 'home.deliveryDesc', 'home.deliveryAlt'],
          ].map(([imageKey, titleKey, descKey, altKey]) => (
            <Card key={imageKey} className="gap-0 py-0">
              <SafeImage src={HOME_IMAGES[imageKey]} alt={t(altKey)} className="h-48 w-full rounded-none object-cover" />
              <CardHeader>
                <h3 className="text-lg font-semibold">{t(titleKey)}</h3>
              </CardHeader>
              <CardContent className="pb-5">
                <p className="text-sm leading-relaxed text-muted-foreground">{t(descKey)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12" data-reveal>
        <SectionHeader
          title={t('home.ourSelection')}
          subtitle={t('home.exceptional')}
          action={(
            <Button variant="ghost" className="hidden md:inline-flex" asChild>
              <Link to="/vehicles">{t('home.seeAll')}</Link>
            </Button>
          )}
        />
        <div className="grid gap-8 md:grid-cols-3">
          {featured.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
        <Button variant="ghost" className="mt-10 md:hidden" asChild>
          <Link to="/vehicles">{t('home.seeAll')}</Link>
        </Button>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28" data-reveal>
        <SectionHeader center title={t('home.testimonials')} subtitle={t('home.customerReviews')} />
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.slice(0, 1)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={14} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{testimonial.text}</p>
                <p className="text-xs text-muted-foreground">{testimonial.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 pt-8 md:px-8 md:pb-32" data-reveal>
        <Card className="flex flex-col items-start justify-between gap-8 p-6 md:flex-row md:items-center md:p-10">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{t('home.faq')}</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">{t('home.findAnswers')}</p>
          </div>
          <Button size="lg" asChild>
            <Link to="/faq">
              {t('home.seeFaq')} <ArrowRight />
            </Link>
          </Button>
        </Card>
      </section>
    </div>
  )
}
