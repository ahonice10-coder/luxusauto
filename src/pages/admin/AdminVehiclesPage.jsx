import { useState } from 'react'
import { useVehicles } from '../../context/VehicleContext'
import { useToast } from '../../context/ToastContext'
import { useLanguage } from '../../i18n/LanguageContext'
import { formatPrice } from '../../lib/config'
import { Seo } from '../../components/Seo'
import { ConfirmDialog } from '../../components/ConfirmDialog'
import { EmptyState } from '../../components/EmptyState'
import { SafeImage } from '../../components/SafeImage'
import { Link } from 'react-router-dom'

export default function AdminVehiclesPage() {
  const { vehicles, deleteVehicle, updateVehicle } = useVehicles()
  const { toast } = useToast()
  const { t, language } = useLanguage()
  const locale = language === 'en' ? 'en-GB' : `${language}-${language.toUpperCase()}`
  const [pendingDelete, setPendingDelete] = useState(null)

  return (
    <div data-reveal>
      <Seo title={t('admin.vehicleManagement')} />
      <h1 className="text-2xl font-black text-foreground sm:text-3xl md:text-4xl">{t('admin.vehicleManagement')}</h1>
      <p className="mt-2 text-muted-foreground">{t('admin.addEditRemoveVehicles')}</p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">{t('admin.published')} ({vehicles.length})</h2>
        <Link to="/admin/vehicles/new" className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2 text-center text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground">{t('admin.addNewVehicle')}</Link>
      </div>

      <div className="mt-6">
        {vehicles.length === 0 ? (
          <EmptyState title={t('admin.emptyVehicles')} />
        ) : (
          <div className="grid gap-4">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="rounded-2xl border border-border bg-card/60 p-4 sm:p-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row">
                    <SafeImage src={vehicle.image} alt={vehicle.name} className="h-40 w-full shrink-0 rounded-xl object-cover sm:h-32 sm:w-40" />
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <p className="text-xl font-bold text-foreground sm:text-2xl">{vehicle.name}</p>
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${vehicle.category === 'new' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>
                          {vehicle.category === 'new' ? t('admin.newVehicles') : t('admin.usedVehicles')}
                        </span>
                      </div>
                      <p className="mb-2 text-muted-foreground">{vehicle.brand} • {vehicle.year}</p>
                      <p className="mb-2 text-lg font-semibold text-primary">{formatPrice(vehicle.price, locale)}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
                    <Link to={`/admin/vehicles/${vehicle.id}/edit`} className="rounded-xl border border-border px-4 py-2 text-center text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground hover:text-primary">{t('common.edit')}</Link>
                    <button
                      type="button"
                      onClick={async () => {
                        const result = await updateVehicle(vehicle.id, { ...vehicle, featured: !vehicle.featured })
                        if (result && result.ok === false) toast(t('common.error'), 'danger')
                      }}
                      className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] ${vehicle.featured ? 'border border-primary bg-primary/20 text-primary' : 'border border-border text-muted-foreground'}`}
                    >
                      {vehicle.featured ? t('admin.featured') : t('admin.makeFeatured')}
                    </button>
                    <button type="button" onClick={() => setPendingDelete(vehicle)} className="rounded-xl border border-red-500/50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-red-300 hover:bg-red-500/10">
                      {t('admin.remove')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title={t('admin.confirmDelete')}
        onCancel={() => setPendingDelete(null)}
        onConfirm={async () => {
          const result = await deleteVehicle(pendingDelete.id)
          if (result && result.ok === false) {
            toast(t('common.error'), 'danger')
            return
          }
          toast(t('admin.deleted'), 'success')
          setPendingDelete(null)
        }}
      />
    </div>
  )
}
