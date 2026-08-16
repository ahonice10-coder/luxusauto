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
      <h1 className="text-4xl font-black text-foreground">{t('admin.vehicleManagement')}</h1>
      <p className="mt-2 text-muted-foreground">{t('admin.addEditRemoveVehicles')}</p>

      <div className="flex items-center justify-between mt-8">
        <h2 className="mb-6 text-2xl font-bold text-foreground">{t('admin.published')} ({vehicles.length})</h2>
        <Link to="/admin/vehicles/new" className="rounded-xl bg-primary px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary-foreground">{t('admin.addNewVehicle')}</Link>
      </div>

      <div className="mt-6">
        {vehicles.length === 0 ? (
          <EmptyState title={t('admin.emptyVehicles')} />
        ) : (
          <div className="grid gap-4">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="rounded-2xl border border-border bg-card/60 p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex flex-1 gap-4">
                    <SafeImage src={vehicle.image} alt={vehicle.name} className="h-32 w-40 rounded-xl object-cover" />
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-2">
                        <p className="text-2xl font-bold text-foreground">{vehicle.name}</p>
                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${vehicle.category === 'new' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>
                          {vehicle.category === 'new' ? t('admin.newVehicles') : t('admin.usedVehicles')}
                        </span>
                      </div>
                      <p className="mb-2 text-muted-foreground">{vehicle.brand} • {vehicle.year}</p>
                      <p className="mb-2 text-lg font-semibold text-primary">{formatPrice(vehicle.price, locale)}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 md:flex-col">
                    <Link to={`/admin/vehicles/${vehicle.id}/edit`} className="rounded-xl border border-border px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground hover:text-primary">{t('common.edit')}</Link>
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
