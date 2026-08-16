import { useMemo, useState } from 'react'
import { Upload, X } from 'lucide-react'
import { useVehicles } from '../../context/VehicleContext'
import { useToast } from '../../context/ToastContext'
import { useLanguage } from '../../i18n/LanguageContext'
import { MEDIA_LIMITS } from '../../lib/config'
import { getVehicleImages } from '../../lib/vehicleMedia'
import { Seo } from '../../components/Seo'
import { Button } from '@/components/ui/button'

const MAX_IMAGES = 12

const emptyForm = {
  name: '',
  brand: '',
  category: 'new',
  price: '',
  year: new Date().getFullYear(),
  engine: '',
  transmission: '',
  power: '',
  location: 'Paris',
  image: '',
  images: [],
  video: '',
  description: '',
  specs: [],
  mileage: 0,
  featured: false,
}

export default function AdminVehicleForm({ initialData = null, editingId: propEditingId = null, onSaved = null }) {
  const { addVehicle, updateVehicle } = useVehicles()
  const { toast } = useToast()
  const { t } = useLanguage()
  const [form, setForm] = useState(() => {
    if (!initialData) return emptyForm
    const images = getVehicleImages(initialData)
    return { ...emptyForm, ...initialData, images, image: images[0] || '' }
  })
  const [specInput, setSpecInput] = useState('')
  const [videoPreview, setVideoPreview] = useState('')
  const [mediaType, setMediaType] = useState('image')
  const [editingId, setEditingId] = useState(propEditingId)
  const [uploading, setUploading] = useState(false)

  const gallery = getVehicleImages(form)

  const fieldClass = 'w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder-text-soft'
  const labelClass = 'mb-2 block text-sm font-semibold text-foreground'

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    const val = type === 'checkbox' ? checked : value
    setForm((current) => ({ ...current, [name]: val }))
  }

  const addImageUrl = (url) => {
    setForm((current) => {
      const images = [...getVehicleImages(current), url].slice(0, MAX_IMAGES)
      return { ...current, images, image: images[0] || '' }
    })
  }

  const removeImage = (index) => {
    setForm((current) => {
      const images = getVehicleImages(current).filter((_, itemIndex) => itemIndex !== index)
      return { ...current, images, image: images[0] || '' }
    })
  }

  const resolveImageUrl = async (file) => {
    if (file.size > MEDIA_LIMITS.imageBytes) {
      toast(t('admin.mediaTooLarge'), 'danger')
      return null
    }
    try {
      const { default: supabaseClient } = await import('../../lib/supabaseClient')
      if (supabaseClient) {
        const { uploadVehicleImage } = await import('../../lib/supabaseStorage')
        return await uploadVehicleImage(file)
      }
    } catch {
      // fallback to base64
    }
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (event) => resolve(event.target?.result || null)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const readFile = async (file, kind) => {
    if (kind === 'image') {
      const url = await resolveImageUrl(file)
      if (url) addImageUrl(url)
      return
    }
    if (file.size > MEDIA_LIMITS.videoBytes) {
      toast(t('admin.mediaTooLarge'), 'danger')
      return
    }
    const result = await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (event) => resolve(event.target?.result)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
    setForm((current) => ({ ...current, video: result }))
    setVideoPreview(result)
  }

  const handleImageFiles = async (fileList) => {
    const files = Array.from(fileList || [])
    if (!files.length) return
    const remaining = MAX_IMAGES - gallery.length
    if (remaining <= 0) {
      toast(t('admin.maxPhotos'), 'danger')
      return
    }
    setUploading(true)
    try {
      const urls = []
      for (const file of files.slice(0, remaining)) {
        const url = await resolveImageUrl(file)
        if (url) urls.push(url)
      }
      setForm((current) => {
        const images = [...getVehicleImages(current), ...urls].slice(0, MAX_IMAGES)
        return { ...current, images, image: images[0] || '' }
      })
    } finally {
      setUploading(false)
    }
  }

  const addSpec = () => {
    if (!specInput.trim()) return
    setForm((current) => ({ ...current, specs: [...current.specs, specInput.trim()] }))
    setSpecInput('')
  }

  const resetForm = () => {
    setForm(emptyForm)
    setVideoPreview('')
    setEditingId(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const images = getVehicleImages(form)
    if (!form.name || !form.brand || !form.price || (!images.length && !form.video)) {
      toast(t('admin.fillRequired'), 'danger')
      return
    }
    const payload = {
      ...form,
      images,
      image: images[0] || '',
      price: Number(form.price),
      mileage: Number(form.mileage) || 0,
      status: form.category,
      featured: form.featured || false,
    }
    if (editingId) {
      const result = await updateVehicle(editingId, payload)
      if (result && result.ok === false) {
        toast(t('common.error'), 'danger')
        return
      }
    } else {
      const result = await addVehicle({ ...payload, featured: false })
      if (result && result.ok === false) {
        toast(t('common.error'), 'danger')
        return
      }
    }
    toast(t('admin.saved'), 'success')
    if (typeof onSaved === 'function') onSaved()
    resetForm()
  }

  const inputId = useMemo(() => ({ name: 'admin-vehicle-name', brand: 'admin-vehicle-brand' }), [])

  return (
    <div data-reveal>
      <Seo title={t('admin.addNewVehicle')} />
      <div className="mt-4 rounded-2xl border border-border bg-card/60 p-4 sm:mt-8 sm:p-6 md:p-8">
        <h2 className="mb-6 text-xl font-bold text-foreground sm:text-2xl">{editingId ? t('admin.editVehicle') : t('admin.addNewVehicle')}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <p className="mb-3 text-sm font-semibold text-foreground">{t('admin.vehicleMedia')} *</p>
            <div className="mb-4 flex gap-2">
              <button type="button" onClick={() => setMediaType('image')} className={`rounded-lg px-4 py-2 text-sm font-semibold ${mediaType === 'image' ? 'bg-primary text-primary-foreground' : 'border border-border bg-card text-muted-foreground'}`}>{t('admin.photo')}</button>
              <button type="button" onClick={() => setMediaType('video')} className={`rounded-lg px-4 py-2 text-sm font-semibold ${mediaType === 'video' ? 'bg-primary text-primary-foreground' : 'border border-border bg-card text-muted-foreground'}`}>{t('admin.video')}</button>
            </div>
            <div className="flex flex-col gap-4">
              {mediaType === 'image' ? (
                <div className="w-full space-y-4">
                  <p className="text-sm text-muted-foreground">{t('admin.photosHint')}</p>
                  <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/50 bg-primary/5 px-6 py-8 hover:bg-primary/10">
                    <Upload size={20} className="text-primary" />
                    <span className="text-sm text-muted-foreground">
                      {uploading ? t('common.loading') : t('admin.clickToUpload')}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      disabled={uploading}
                      onChange={(event) => {
                        handleImageFiles(event.target.files)
                        event.target.value = ''
                      }}
                      className="hidden"
                    />
                  </label>
                  {gallery.length ? (
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                      {gallery.map((src, index) => (
                        <div key={`${src}-${index}`} className="relative">
                          <img src={src} alt="" className="h-24 w-full rounded-xl object-cover" />
                          {index === 0 ? (
                            <span className="absolute bottom-1 left-1 rounded bg-background/80 px-1.5 py-0.5 text-[10px] font-medium">
                              {t('admin.coverPhoto')}
                            </span>
                          ) : null}
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon-xs"
                            className="absolute right-1 top-1"
                            onClick={() => removeImage(index)}
                            aria-label={t('common.remove')}
                          >
                            <X />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : (
                <>
                  <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/50 bg-primary/5 px-6 py-8 hover:bg-primary/10">
                    <Upload size={20} className="text-primary" />
                    <span className="text-sm text-muted-foreground">{t('admin.clickToUploadVideo')}</span>
                    <input type="file" accept="video/*" onChange={(event) => event.target.files?.[0] && readFile(event.target.files[0], 'video')} className="hidden" />
                  </label>
                  {videoPreview ? (
                    <div className="relative w-32">
                      <video src={videoPreview} className="h-32 w-32 rounded-xl bg-black object-cover" />
                      <button type="button" onClick={() => { setVideoPreview(''); setForm((current) => ({ ...current, video: '' })) }} className="absolute right-1 top-1 rounded-full bg-red-500 p-1">
                        <X size={14} className="text-white" />
                      </button>
                    </div>
                  ) : null}
                </>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor={inputId.name} className={labelClass}>{t('admin.vehicleName')} *</label>
              <input id={inputId.name} name="name" value={form.name} onChange={handleChange} className={fieldClass} required />
            </div>
            <div>
              <label htmlFor={inputId.brand} className={labelClass}>{t('admin.brand')} *</label>
              <input id={inputId.brand} name="brand" value={form.brand} onChange={handleChange} className={fieldClass} required />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="admin-category" className={labelClass}>{t('admin.category')} *</label>
              <select id="admin-category" name="category" value={form.category} onChange={handleChange} className={fieldClass}>
                <option value="new">{t('admin.newVehicles')}</option>
                <option value="used">{t('admin.usedVehicles')}</option>
              </select>
            </div>
            <div>
              <label htmlFor="admin-price" className={labelClass}>{t('admin.price')} (€) *</label>
              <input id="admin-price" name="price" type="number" value={form.price} onChange={handleChange} className={fieldClass} required />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="admin-year" className={labelClass}>{t('admin.year')}</label>
              <input id="admin-year" name="year" type="number" value={form.year} onChange={handleChange} className={fieldClass} />
            </div>
            <div>
              <label htmlFor="admin-mileage" className={labelClass}>{t('admin.mileage')}</label>
              <input id="admin-mileage" name="mileage" type="number" value={form.mileage} onChange={handleChange} className={fieldClass} />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label htmlFor="admin-engine" className={labelClass}>{t('admin.engine')}</label>
              <input id="admin-engine" name="engine" value={form.engine} onChange={handleChange} className={fieldClass} />
            </div>
            <div>
              <label htmlFor="admin-transmission" className={labelClass}>{t('admin.transmission')}</label>
              <input id="admin-transmission" name="transmission" value={form.transmission} onChange={handleChange} className={fieldClass} />
            </div>
            <div>
              <label htmlFor="admin-power" className={labelClass}>{t('admin.power')}</label>
              <input id="admin-power" name="power" value={form.power} onChange={handleChange} className={fieldClass} />
            </div>
          </div>

          <div>
            <label htmlFor="admin-location" className={labelClass}>{t('admin.location')}</label>
            <input id="admin-location" name="location" value={form.location} onChange={handleChange} className={fieldClass} />
          </div>
          <div>
            <label htmlFor="admin-description" className={labelClass}>{t('admin.description')}</label>
            <textarea id="admin-description" name="description" value={form.description} onChange={handleChange} className={fieldClass} rows={4} />
          </div>

          <div>
            <label htmlFor="admin-spec" className={labelClass}>{t('admin.specs')}</label>
            <div className="mb-3 flex flex-col gap-2 sm:flex-row">
              <input
                id="admin-spec"
                value={specInput}
                onChange={(event) => setSpecInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    addSpec()
                  }
                }}
                className={`flex-1 ${fieldClass}`}
              />
              <button type="button" onClick={addSpec} className="rounded-xl bg-primary px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground sm:shrink-0">{t('common.save')}</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.specs.map((spec, index) => (
                <div key={`${spec}-${index}`} className="flex items-center gap-2 rounded-lg bg-primary/20 px-3 py-2">
                  <span className="text-sm text-foreground">{spec}</span>
                  <button type="button" onClick={() => setForm((current) => ({ ...current, specs: current.specs.filter((_, i) => i !== index) }))} aria-label={t('common.remove')}>
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="submit" className="flex-1 rounded-xl bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground">
              {editingId ? t('admin.update') : t('admin.publish')}
            </button>
            {editingId ? (
              <button type="button" onClick={resetForm} className="rounded-xl border border-border px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                {t('common.cancel')}
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  )
}
