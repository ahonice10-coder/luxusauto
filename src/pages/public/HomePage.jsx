import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { ArrowRight, ShieldCheck, Sparkles, CarFront, Heart, MessageCircle, CreditCard, KeyRound, Compass, ClipboardCheck, Timer, Star } from 'lucide-react'
import { useVehicles } from '../../context/VehicleContext'
import { useLanguage } from '../../i18n/LanguageContext'
import { VehicleCard } from '../../components/vehicle/VehicleCard'
import { Seo } from '../../components/Seo'
import { SafeImage } from '../../components/SafeImage'
import { SectionHeader } from '../../components/PageHeader'
import { FaqAccordion } from '../../components/FaqAccordion'
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
  const location = useLocation()
  const featured = vehicles.filter((vehicle) => vehicle.featured).slice(0, 3)

  useEffect(() => {
    if (location.hash !== '#faq') return
    document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [location.hash])

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

  const pillars = [
    { icon: CarFront, title: 'home.performance', desc: 'home.performanceDesc' },
    { icon: ClipboardCheck, title: 'home.trust', desc: 'home.trustDesc' },
    { icon: Sparkles, title: 'home.premium', desc: 'home.premiumDesc' },
  ]

  const steps = [
    { icon: Compass, title: 'home.valet', desc: 'home.valetDesc' },
    { icon: Heart, title: 'home.favorites', desc: 'home.favoritesDesc' },
    { icon: MessageCircle, title: 'home.whatsapp', desc: 'home.whatsappDesc' },
    { icon: CreditCard, title: 'home.buyOnline', desc: 'home.buyOnlineDesc' },
    { icon: KeyRound, title: 'home.pickup', desc: 'home.pickupDesc' },
  ]

  const promises = [
    { image: 'inspection', icon: ClipboardCheck, title: 'home.inspection', desc: 'home.inspectionDesc', alt: 'home.inspectionAlt' },
    { image: 'warranty', icon: ShieldCheck, title: 'home.warranty', desc: 'home.warrantyDesc', alt: 'home.warrantyAlt' },
    { image: 'delivery', icon: Timer, title: 'home.delivery', desc: 'home.deliveryDesc', alt: 'home.deliveryAlt' },
  ]

  return (
    <div>
      <Seo title={t('seo.home')} description={t('seo.homeDesc')} />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-5 sm:py-16 md:px-8 md:py-20 lg:py-24" data-reveal>
        <div className="grid items-center gap-8 md:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div className="min-w-0">
            <h1 className="max-w-xl text-[2.15rem] font-semibold leading-[1.08] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl lg:leading-[1.05]">
              {SITE.name}
            </h1>
            <h3 className="mt-3 max-w-xl text-lg font-medium tracking-tight text-muted-foreground sm:mt-4 sm:text-xl md:text-2xl">
              {t('home.title')}
            </h3>
            <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-muted-foreground sm:mt-5 sm:text-base md:text-lg">
              {t('home.subtitle')}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link to="/vehicles">
                  {t('home.browseVehicles')} <ArrowRight />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto" asChild>
                <Link to="/vehicles/new">{t('home.newVehicles')}</Link>
              </Button>
            </div>
          </div>
          <Card className="gap-0 overflow-hidden py-0 shadow-none">
            <SafeImage
              src={HOME_IMAGES.hero}
              alt={SITE.name}
              className="aspect-[16/10] w-full rounded-none object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
            />
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-20 md:px-8 md:py-28" data-reveal>
        <SectionHeader
          kicker={t('home.pillarsKicker')}
          title={t('home.pillarsTitle')}
          subtitle={t('home.pillarsSubtitle')}
        />
        <div className="grid gap-4 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, desc }, index) => (
            <Card key={title} className="relative overflow-hidden p-6 sm:p-8">
              <span className="pointer-events-none absolute right-4 top-3 font-display text-6xl font-semibold leading-none text-foreground/10">
                0{index + 1}
              </span>
              <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-full bg-muted">
                <Icon size={20} />
              </div>
              <h3 className="text-xl font-semibold tracking-tight">{t(title)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{t(desc)}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-5 md:px-8 md:py-16" data-reveal>
        <SectionHeader
          kicker={t('home.journeyKicker')}
          title={t('home.dailyVehicle')}
          subtitle={t('home.simplicity')}
        />
        <ol className="relative grid gap-8 md:grid-cols-5 md:gap-4">
          {steps.map(({ icon: Icon, title, desc }, index) => (
            <li key={title} className="relative flex gap-4 md:flex-col md:gap-0">
              {index < steps.length - 1 ? (
                <span className="absolute left-[15px] top-8 hidden h-[calc(100%+2rem)] w-px bg-border md:left-5 md:top-5 md:block md:h-px md:w-[calc(100%+1rem)]" aria-hidden="true" />
              ) : null}
              <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-[11px] font-semibold text-primary-foreground md:mb-5">
                {index + 1}
              </span>
              <div className="min-w-0 pt-0.5 md:pt-0">
                <div className="mb-3 hidden h-10 w-10 items-center justify-center rounded-lg bg-card md:flex">
                  <Icon size={18} />
                </div>
                <p className="font-semibold tracking-tight">{t(title)}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{t(desc)}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-5 md:px-8 md:py-12" data-reveal>
        <SectionHeader
          title={t('home.ourSelection')}
          subtitle={t('home.exceptional')}
          action={(
            <Button variant="ghost" className="hidden md:inline-flex" asChild>
              <Link to="/vehicles">{t('home.seeAll')}</Link>
            </Button>
          )}
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
          {featured.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
        <Button variant="ghost" className="mt-8 w-full sm:w-auto md:hidden" asChild>
          <Link to="/vehicles">{t('home.seeAll')}</Link>
        </Button>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-20 md:px-8 md:py-28" data-reveal>
        <SectionHeader
          kicker={t('home.promisesKicker')}
          title={t('home.promisesTitle')}
          subtitle={t('home.promisesSubtitle')}
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {promises.map(({ image, icon: Icon, title, desc, alt }, index) => (
            <article key={image} className={`relative min-h-[22rem] overflow-hidden rounded-xl sm:min-h-[26rem] ${index === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
              <SafeImage src={HOME_IMAGES[image]} alt={t(alt)} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.22_0.02_50_/_0.92)] via-[oklch(0.22_0.02_50_/_0.35)] to-transparent" />
              <div className="relative z-10 flex h-full min-h-[22rem] flex-col justify-end p-6 sm:min-h-[26rem] sm:p-7">
                <div className="mb-4 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70">
                  <Icon size={14} />
                  0{index + 1}
                </div>
                <h3 className="text-2xl font-semibold tracking-tight text-white">{t(title)}</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/80">{t(desc)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-5 sm:py-20 md:px-8 md:py-28" data-reveal>
        <SectionHeader center title={t('home.testimonials')} subtitle={t('home.customerReviews')} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
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

      <section id="faq" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-16 pt-8 sm:px-5 md:scroll-mt-28 md:px-8 md:pb-32" data-reveal>
        <SectionHeader center title={t('home.faq')} subtitle={t('home.findAnswers')} />
        <div className="mx-auto max-w-3xl">
          <FaqAccordion />
        </div>
      </section>
    </div>
  )
}
