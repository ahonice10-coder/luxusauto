import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Sparkles, CarFront, User, Heart, MessageCircle, CreditCard, Package, ChevronDown, Star } from 'lucide-react'
import { useState } from 'react'
import { useVehicles } from '../../context/VehicleContext'
import { useLanguage } from '../../i18n/LanguageContext'
import { VehicleCard } from '../../components/vehicle/VehicleCard'

export default function HomePage() {
  const { vehicles } = useVehicles()
  const { t } = useLanguage()
  const featured = vehicles.filter((vehicle) => vehicle.featured).slice(0, 3)
  const [openFAQ, setOpenFAQ] = useState(null)

  const testimonials = [
    {
      id: 1,
      name: 'Marvin Mckinner',
      title: 'Entrepreneur',
      rating: 5,
      text: 'Ero scettico sull\'idea di acquistare la mia auto tramite un\'applicazione, ma il processo K-Prestige è stato incredibilmente fluido. La prenotazione è stata un gioco da ragazzi e il passaggio al contatto WhatsApp con il mio consulente è stato immediato...',
      date: 'Lun 30 Avr 2025',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop'
    },
    {
      id: 2,
      name: 'Sophie Laurent',
      title: 'Direttrice del Marketing',
      rating: 5,
      text: 'Esperienza eccellente dall\'inizio alla fine! Il team era molto professionale e reattivo. Ho ricevuto la mia auto nei tempi previsti con tutti i documenti in ordine. Consiglio vivamente LuxusAuto a tutti i miei amici...',
      date: 'Mer 25 Juin 2025',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop'
    },
    {
      id: 3,
      name: 'Thomas Dupont',
      title: 'Ingegnere Automobilistico',
      rating: 5,
      text: 'Impressionato dalla qualità della selezione e dall\'attenzione ai dettagli. Ogni veicolo è impeccabilmente preparato. Il supporto clienti disponibile 24/7 mi ha rassicurato durante tutto il processo di acquisto...',
      date: 'Ven 15 Mai 2025',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop'
    }
  ]

  const faqs = [
    {
      id: 1,
      question: t('faq.q1'),
      answer: t('faq.a1')
    },
    {
      id: 2,
      question: t('faq.q2'),
      answer: t('faq.a2')
    },
    {
      id: 3,
      question: t('faq.q3'),
      answer: t('faq.a3')
    },
    {
      id: 4,
      question: t('faq.q4'),
      answer: t('faq.a4')
    },
    {
      id: 5,
      question: t('faq.q5'),
      answer: t('faq.a5')
    }
  ]

  return (
    <div className="pb-20">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80')" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="relative mx-auto max-w-7xl px-4 py-28 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-primary">LuxusAuto</p>
            <h1 className="text-5xl font-black tracking-tight text-white md:text-7xl">ENGINEERED FOR EXCELLENCE</h1>
            <p className="mt-6 text-lg text-text-soft">Découvrez une sélection premium de véhicules neufs et d’occasion, soigneusement sélectionnés pour offrir performance, élégance et confiance.</p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link to="/vehicles" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#001452] shadow-glow">
                Voir les véhicules <ArrowRight size={16} />
              </Link>
              <Link to="/vehicles/new" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-text-soft">
                Véhicules neufs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-black text-text md:text-5xl">Simplicité, sérénité, confiance !</h2>
          <p className="mt-3 text-lg text-text-soft">Votre véhicule au quotidien</p>
        </div>

        <div className="mb-16 grid gap-8 md:grid-cols-5">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-primary-strong/20 p-4">
              <User className="text-primary-strong" size={32} />
            </div>
            <p className="font-semibold text-text">Chauffeur-valet de luxe</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-primary-strong/20 p-4">
              <Heart className="text-primary-strong" size={32} />
            </div>
            <p className="font-semibold text-text">Stockez vos modèles favoris</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-primary-strong/20 p-4">
              <MessageCircle className="text-primary-strong" size={32} />
            </div>
            <p className="font-semibold text-text">Contact WhatsApp direct</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-primary-strong/20 p-4">
              <CreditCard className="text-primary-strong" size={32} />
            </div>
            <p className="font-semibold text-text">Finalisez l'achat en ligne</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-primary-strong/20 p-4">
              <Package className="text-primary-strong" size={32} />
            </div>
            <p className="font-semibold text-text">Récupérez votre auto</p>
          </div>
        </div>

        <div className="mb-16 grid gap-6 md:grid-cols-3">
          <div className="glass-panel rounded-2xl p-6">
            <div className="mb-4 h-32 overflow-hidden rounded-xl">
              <img src="src/image 3.jpg" alt="Inspection véhicule" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg font-bold text-text">Chaque véhicule du groupe Stitch est minutieusement inspecté</h3>
            <p className="mt-3 text-sm text-text-soft">Techniciens agréés, contrôles poussés, documentation complète et historique de service examinés.</p>
          </div>
          <div className="glass-panel rounded-2xl p-6">
            <div className="mb-4 h-32 overflow-hidden rounded-xl">
              <img src="src/image fond.jpg" alt="Garantie" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg font-bold text-text">Garantie du fabricant ou extension possible</h3>
            <p className="mt-3 text-sm text-text-soft">Couverture maximale, assistance routière, intervention rapide et prise en charge sérieuse de toutes les avaries.</p>
          </div>
          <div className="glass-panel rounded-2xl p-6">
            <div className="mb-4 h-32 overflow-hidden rounded-xl">
              <img src="src/image2.jpg" alt="Livraison rapide" className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg font-bold text-text">Les délais de livraison minimisés au maximum</h3>
            <p className="mt-3 text-sm text-text-soft">Préparation rapide, transport assuré, finalisation en moins de 48h, documents certifiés et garantie de légalité.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="mb-8 flex items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">Notre sélection</p>
            <h2 className="mt-2 text-4xl font-bold text-text">Véhicules d’exception</h2>
          </div>
          <Link to="/vehicles" className="hidden text-xs font-bold uppercase tracking-[0.2em] text-text-soft hover:text-primary md:inline-flex">Voir tout</Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-black text-text md:text-5xl">Ils nous ont fais Confiance</h2>
          <p className="mt-3 text-lg text-text-soft">Découvrez les avis de nos clients satisfaits</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-text">{testimonial.name}</p>
                  <p className="text-sm text-text-soft">{testimonial.title}</p>
                </div>
              </div>
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-primary-strong text-primary-strong" />
                ))}
              </div>
              
              <p className="text-sm text-text-soft flex-1 mb-4">{testimonial.text}</p>
              
              <p className="text-xs text-text-soft/60">{testimonial.date}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-black text-text md:text-5xl">Questions fréquemment posées</h2>
          <p className="mt-3 text-lg text-text-soft">Trouvez les réponses à vos questions</p>
        </div>

        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="glass-panel rounded-2xl overflow-hidden border border-white/10">
              <button
                onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                className="flex w-full items-center justify-between px-6 py-4 text-left transition hover:bg-white/5"
              >
                <h3 className="text-lg font-semibold text-text pr-4">{faq.question}</h3>
                <ChevronDown
                  size={20}
                  className={`flex-shrink-0 text-primary transition-transform ${
                    openFAQ === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openFAQ === faq.id && (
                <div className="border-t border-white/10 px-6 py-4">
                  <p className="text-text-soft">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 md:grid-cols-3 md:px-8">
        <div className="glass-panel rounded-2xl p-6">
          <CarFront className="mb-4 text-primary" />
          <h3 className="text-2xl font-bold text-text">Performance</h3>
          <p className="mt-3 text-text-soft">Des modèles conçus pour offrir des sensations fortes, une précision de conduite et un confort de haut niveau.</p>
        </div>
        <div className="glass-panel rounded-2xl p-6">
          <ShieldCheck className="mb-4 text-primary" />
          <h3 className="text-2xl font-bold text-text">Confiance</h3>
          <p className="mt-3 text-text-soft">Chaque véhicule est soigneusement vérifié et chaque réservation est suivie par notre équipe premium.</p>
        </div>
        <div className="glass-panel rounded-2xl p-6">
          <Sparkles className="mb-4 text-primary" />
          <h3 className="text-2xl font-bold text-text">Premium</h3>
          <p className="mt-3 text-text-soft">Une expérience digitale premium pensée pour fluidifier l’achat, la réservation et l’accès aux services.</p>
        </div>
      </section>
    </div>
  )
}
