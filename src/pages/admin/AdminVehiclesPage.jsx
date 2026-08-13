import { useState } from 'react'
import { useVehicles } from '../../context/VehicleContext'
import { Upload, X } from 'lucide-react'

export default function AdminVehiclesPage() {
  const { vehicles, addVehicle, deleteVehicle, updateVehicle } = useVehicles()
  const [form, setForm] = useState({
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
    video: '',
    description: '',
    specs: [],
    mileage: 0,
  })
  const [specInput, setSpecInput] = useState('')
  const [imagePreview, setImagePreview] = useState('')
  const [videoPreview, setVideoPreview] = useState('')
  const [mediaType, setMediaType] = useState('image') // 'image' ou 'video'

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const base64 = e.target?.result
        setForm((current) => ({ ...current, image: base64 }))
        setImagePreview(base64)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleVideoChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const base64 = e.target?.result
        setForm((current) => ({ ...current, video: base64 }))
        setVideoPreview(base64)
      }
      reader.readAsDataURL(file)
    }
  }

  const addSpec = () => {
    if (specInput.trim()) {
      setForm((current) => ({
        ...current,
        specs: [...current.specs, specInput.trim()],
      }))
      setSpecInput('')
    }
  }

  const removeSpec = (index) => {
    setForm((current) => ({
      ...current,
      specs: current.specs.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.name || !form.brand || !form.price || (!form.image && !form.video)) {
      alert('Veuillez remplir tous les champs obligatoires et ajouter au moins une photo ou une vidéo')
      return
    }
    addVehicle({
      ...form,
      price: Number(form.price),
      mileage: Number(form.mileage) || 0,
      status: form.category,
      featured: false,
    })
    setForm({
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
      video: '',
      description: '',
      specs: [],
      mileage: 0,
    })
    setImagePreview('')
    setVideoPreview('')
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
      <h1 className="text-4xl font-black text-text">Gestion des véhicules</h1>
      <p className="mt-2 text-text-soft">Ajouter, modifier ou supprimer des véhicules</p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-surface/60 p-8">
        <h2 className="text-2xl font-bold text-text mb-6">Ajouter un nouveau véhicule</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Upload Image ou Video */}
          <div>
            <label className="block text-sm font-semibold text-text mb-3">Média du véhicule (Photo ou Vidéo) *</label>
            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => setMediaType('image')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  mediaType === 'image'
                    ? 'bg-primary text-[#001452]'
                    : 'bg-surface border border-white/10 text-text-soft'
                }`}
              >
                📷 Photo
              </button>
              <button
                type="button"
                onClick={() => setMediaType('video')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                  mediaType === 'video'
                    ? 'bg-primary text-[#001452]'
                    : 'bg-surface border border-white/10 text-text-soft'
                }`}
              >
                🎥 Vidéo
              </button>
            </div>

            <div className="flex gap-4">
              {mediaType === 'image' ? (
                <>
                  <label className="flex-1 flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/50 bg-primary/5 px-6 py-8 cursor-pointer hover:bg-primary/10 transition">
                    <Upload size={20} className="text-primary" />
                    <span className="text-sm text-text-soft">Cliquez pour télécharger une photo</span>
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                  {imagePreview && (
                    <div className="relative w-32">
                      <img src={imagePreview} alt="Aperçu photo" className="w-32 h-32 rounded-xl object-cover" />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview('')
                          setForm((current) => ({ ...current, image: '' }))
                        }}
                        className="absolute top-1 right-1 bg-red-500 p-1 rounded-full"
                      >
                        <X size={14} className="text-white" />
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <label className="flex-1 flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-primary/50 bg-primary/5 px-6 py-8 cursor-pointer hover:bg-primary/10 transition">
                    <Upload size={20} className="text-primary" />
                    <span className="text-sm text-text-soft">Cliquez pour télécharger une vidéo</span>
                    <input type="file" accept="video/*" onChange={handleVideoChange} className="hidden" />
                  </label>
                  {videoPreview && (
                    <div className="relative w-32">
                      <video src={videoPreview} className="w-32 h-32 rounded-xl object-cover bg-black" controls={false} />
                      <button
                        type="button"
                        onClick={() => {
                          setVideoPreview('')
                          setForm((current) => ({ ...current, video: '' }))
                        }}
                        className="absolute top-1 right-1 bg-red-500 p-1 rounded-full"
                      >
                        <X size={14} className="text-white" />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Informations de base - 2 colonnes */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-text mb-2">Nom du véhicule *</label>
              <input 
                name="name" 
                value={form.name} 
                onChange={handleChange} 
                className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-text placeholder-text-soft" 
                placeholder="Ex: Porsche 911 GT3 RS"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text mb-2">Marque *</label>
              <input 
                name="brand" 
                value={form.brand} 
                onChange={handleChange} 
                className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-text placeholder-text-soft" 
                placeholder="Ex: Porsche"
                required
              />
            </div>
          </div>

          {/* Catégorie et Prix */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-text mb-2">Catégorie *</label>
              <select 
                name="category" 
                value={form.category} 
                onChange={handleChange} 
                className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-text"
              >
                <option value="new">Neuf</option>
                <option value="used">Occasion</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-text mb-2">Prix (€) *</label>
              <input 
                name="price" 
                type="number"
                value={form.price} 
                onChange={handleChange} 
                className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-text placeholder-text-soft" 
                placeholder="0"
                required
              />
            </div>
          </div>

          {/* Année et Kilométrage */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-text mb-2">Année</label>
              <input 
                name="year" 
                type="number"
                value={form.year} 
                onChange={handleChange} 
                className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-text" 
                placeholder="2025"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text mb-2">Kilométrage (km)</label>
              <input 
                name="mileage" 
                type="number"
                value={form.mileage} 
                onChange={handleChange} 
                className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-text" 
                placeholder="0"
              />
            </div>
          </div>

          {/* Caractéristiques techniques */}
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="block text-sm font-semibold text-text mb-2">Moteur</label>
              <input 
                name="engine" 
                value={form.engine} 
                onChange={handleChange} 
                className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-text placeholder-text-soft" 
                placeholder="Ex: V8 4.0L"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text mb-2">Transmission</label>
              <input 
                name="transmission" 
                value={form.transmission} 
                onChange={handleChange} 
                className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-text placeholder-text-soft" 
                placeholder="Ex: Automatique"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text mb-2">Puissance</label>
              <input 
                name="power" 
                value={form.power} 
                onChange={handleChange} 
                className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-text placeholder-text-soft" 
                placeholder="Ex: 577 ch"
              />
            </div>
          </div>

          {/* Localisation */}
          <div>
            <label className="block text-sm font-semibold text-text mb-2">Localisation</label>
            <input 
              name="location" 
              value={form.location} 
              onChange={handleChange} 
              className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-text placeholder-text-soft" 
              placeholder="Ex: Paris"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-text mb-2">Description</label>
            <textarea 
              name="description" 
              value={form.description} 
              onChange={handleChange} 
              className="w-full rounded-xl border border-white/10 bg-background px-4 py-3 text-text placeholder-text-soft" 
              placeholder="Décrivez le véhicule en détail..."
              rows={4}
            />
          </div>

          {/* Spécifications */}
          <div>
            <label className="block text-sm font-semibold text-text mb-2">Spécifications additionnelles</label>
            <div className="flex gap-2 mb-3">
              <input 
                value={specInput} 
                onChange={(e) => setSpecInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addSpec()
                  }
                }}
                className="flex-1 rounded-xl border border-white/10 bg-background px-4 py-3 text-text placeholder-text-soft" 
                placeholder="Ex: 0-100: 3.6s, Cliquez Entrée pour ajouter"
              />
              <button 
                type="button"
                onClick={addSpec}
                className="rounded-xl bg-primary px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#001452]"
              >
                Ajouter
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.specs.map((spec, index) => (
                <div key={index} className="flex items-center gap-2 rounded-lg bg-primary/20 px-3 py-2">
                  <span className="text-sm text-text">{spec}</span>
                  <button 
                    type="button"
                    onClick={() => removeSpec(index)}
                    className="text-text-soft hover:text-text"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Bouton Submit */}
          <button 
            type="submit" 
            className="w-full rounded-xl bg-primary px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#001452] hover:bg-primary/90 transition"
          >
            Publier le véhicule
          </button>
        </form>
      </div>

      {/* Liste des véhicules */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-text mb-6">Véhicules publiés ({vehicles.length})</h2>
        <div className="grid gap-4">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="rounded-2xl border border-white/10 bg-surface/60 p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="flex gap-4 flex-1">
                  <img src={vehicle.image} alt={vehicle.name} className="h-32 w-40 rounded-xl object-cover" />
                  <div className="flex-1">
                    <div className="flex gap-2 items-center mb-2">
                      <p className="text-2xl font-bold text-text">{vehicle.name}</p>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                        vehicle.category === 'new' 
                          ? 'bg-success/20 text-success' 
                          : 'bg-warning/20 text-warning'
                      }`}>
                        {vehicle.category === 'new' ? 'Neuf' : 'Occasion'}
                      </span>
                    </div>
                    <p className="text-text-soft mb-2">{vehicle.brand} • {vehicle.year}</p>
                    <p className="text-primary font-semibold text-lg mb-2">{vehicle.price.toLocaleString()} €</p>
                    {vehicle.description && (
                      <p className="text-sm text-text-soft line-clamp-2">{vehicle.description}</p>
                    )}
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {vehicle.engine && <span className="text-xs bg-surface px-2 py-1 rounded text-text-soft">{vehicle.engine}</span>}
                      {vehicle.power && <span className="text-xs bg-surface px-2 py-1 rounded text-text-soft">{vehicle.power}</span>}
                      {vehicle.transmission && <span className="text-xs bg-surface px-2 py-1 rounded text-text-soft">{vehicle.transmission}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 md:flex-col">
                  <button 
                    onClick={() => updateVehicle(vehicle.id, { ...vehicle, featured: !vehicle.featured })} 
                    className={`rounded-xl px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] transition ${
                      vehicle.featured 
                        ? 'bg-primary/20 text-primary border border-primary' 
                        : 'border border-white/10 text-text-soft hover:text-primary'
                    }`}
                  >
                    {vehicle.featured ? '★ À la une' : 'Mettre à la une'}
                  </button>
                  <button 
                    onClick={() => deleteVehicle(vehicle.id)} 
                    className="rounded-xl border border-red-500/50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-red-300 hover:bg-red-500/10 transition"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
