import supabase from './supabaseClient'
import { createId, readStorage, STORAGE_KEYS, writeStorage } from './storage'

export function mapReservation(row) {
  if (!row) return null
  return {
    id: row.id,
    userId: row.user_id,
    vehicleId: row.vehicle_id,
    vehicleName: row.vehicle_name,
    customer: row.customer,
    customerEmail: row.customer_email,
    date: row.date,
    amount: Number(row.amount || 0),
    status: row.status,
    createdAt: row.created_at,
  }
}

export function mapNotification(row) {
  if (!row) return null
  return {
    id: row.id,
    userId: row.user_id,
    type: row.type,
    title: row.title,
    body: row.body,
    vehicleId: row.vehicle_id,
    reservationId: row.reservation_id,
    read: Boolean(row.read),
    createdAt: row.created_at,
  }
}

export function mapProfile(row) {
  if (!row) return null
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    role: row.role || 'user',
  }
}

export async function upsertProfile({ id, email, name }) {
  if (!supabase || !id) return { ok: false }
  const { data, error } = await supabase
    .from('profiles')
    .upsert({ id, email, name: name || null }, { onConflict: 'id' })
    .select()
    .maybeSingle()
  if (error) return { ok: false, error }
  return { ok: true, data: mapProfile(data) }
}

export async function getProfile(id) {
  if (!supabase || !id) return { ok: false, data: null }
  const { data, error } = await supabase.from('profiles').select('*').eq('id', id).maybeSingle()
  if (error) return { ok: false, error, data: null }
  return { ok: true, data: mapProfile(data) }
}

export async function listProfiles() {
  if (!supabase) {
    return { ok: true, data: readStorage(STORAGE_KEYS.users, []).map((item) => ({
      id: item.id,
      email: item.email,
      name: item.name,
      role: item.role || 'user',
    })) }
  }
  const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false })
  if (error) return { ok: false, error, data: [] }
  return { ok: true, data: (data || []).map(mapProfile) }
}

export async function listReservations() {
  if (!supabase) {
    const data = readStorage(STORAGE_KEYS.reservations, [])
    return { ok: true, data: Array.isArray(data) ? data : [], remote: false }
  }
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) return { ok: false, error, data: [], remote: true }
  return { ok: true, data: (data || []).map(mapReservation), remote: true }
}

export async function createReservation(payload) {
  if (supabase) {
    const { data, error } = await supabase
      .from('reservations')
      .insert([{
        user_id: payload.userId,
        vehicle_id: payload.vehicleId,
        vehicle_name: payload.vehicleName || null,
        customer: payload.customer || null,
        customer_email: payload.customerEmail || null,
        date: payload.date,
        amount: payload.amount || 0,
        status: payload.status || 'confirmed',
      }])
      .select()
      .single()
    if (error) return { ok: false, error, remote: true }
    return { ok: true, data: mapReservation(data), remote: true }
  }

  const all = readStorage(STORAGE_KEYS.reservations, [])
  const record = {
    status: 'confirmed',
    ...payload,
    id: payload.id || createId('r'),
  }
  writeStorage(STORAGE_KEYS.reservations, [record, ...all])
  return { ok: true, data: record, remote: false }
}

export async function updateReservationStatus(id, status, userId) {
  if (supabase) {
    let query = supabase.from('reservations').update({ status }).eq('id', id)
    if (userId) query = query.eq('user_id', userId)
    const { data, error } = await query.select().maybeSingle()
    if (error) return { ok: false, error, remote: true }
    return { ok: true, data: mapReservation(data), remote: true }
  }

  const all = readStorage(STORAGE_KEYS.reservations, [])
  const next = all.map((item) => (item.id === id ? { ...item, status } : item))
  writeStorage(STORAGE_KEYS.reservations, next)
  return { ok: true, data: next.find((item) => item.id === id), remote: false }
}

export async function listNotifications(userId) {
  if (!userId) return { ok: true, data: [] }
  if (supabase) {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (error) return { ok: false, error, data: [] }
    return { ok: true, data: (data || []).map(mapNotification), remote: true }
  }
  const saved = readStorage(STORAGE_KEYS.notifications(userId), [])
  return { ok: true, data: Array.isArray(saved) ? saved : [], remote: false }
}

export async function createNotification(payload) {
  if (supabase && payload.userId) {
    const { data, error } = await supabase
      .from('notifications')
      .insert([{
        user_id: payload.userId,
        type: payload.type || null,
        title: payload.title,
        body: payload.body || null,
        vehicle_id: payload.vehicleId || null,
        reservation_id: payload.reservationId || null,
        read: Boolean(payload.read),
      }])
      .select()
      .single()
    if (error) return { ok: false, error, remote: true }
    return { ok: true, data: mapNotification(data), remote: true }
  }
  const record = { read: false, ...payload, id: payload.id || createId('n') }
  if (payload.userId) {
    const all = readStorage(STORAGE_KEYS.notifications(payload.userId), [])
    writeStorage(STORAGE_KEYS.notifications(payload.userId), [record, ...all])
  }
  return { ok: true, data: record, remote: false }
}

export async function markNotificationRead(id, userId) {
  if (supabase) {
    const { error } = await supabase.from('notifications').update({ read: true }).eq('id', id)
    if (error) return { ok: false, error }
    return { ok: true }
  }
  if (userId) {
    const all = readStorage(STORAGE_KEYS.notifications(userId), [])
    writeStorage(
      STORAGE_KEYS.notifications(userId),
      all.map((item) => (item.id === id ? { ...item, read: true } : item)),
    )
  }
  return { ok: true }
}

export function mapVehicle(row) {
  if (!row) return null
  const images = Array.isArray(row.images) ? row.images.filter(Boolean) : []
  const image = row.image || images[0] || ''
  return {
    id: row.id,
    name: row.name,
    brand: row.brand,
    category: row.category,
    price: Number(row.price || 0),
    year: Number(row.year || 0),
    mileage: Number(row.mileage || 0),
    engine: row.engine,
    transmission: row.transmission,
    power: row.power,
    location: row.location,
    status: row.status,
    image,
    images: images.length ? images : (image ? [image] : []),
    video: row.video || '',
    featured: Boolean(row.featured),
    specs: Array.isArray(row.specs) ? row.specs : [],
    description: row.description || '',
  }
}

function vehicleRow(vehicle) {
  return {
    id: vehicle.id,
    name: vehicle.name,
    brand: vehicle.brand,
    category: vehicle.category,
    price: Number(vehicle.price || 0),
    year: Number(vehicle.year || 0),
    mileage: Number(vehicle.mileage || 0),
    engine: vehicle.engine || null,
    transmission: vehicle.transmission || null,
    power: vehicle.power || null,
    location: vehicle.location || null,
    status: vehicle.status || vehicle.category || null,
    image: vehicle.image || (Array.isArray(vehicle.images) ? vehicle.images[0] : null) || null,
    images: Array.isArray(vehicle.images) && vehicle.images.length
      ? vehicle.images
      : (vehicle.image ? [vehicle.image] : []),
    video: vehicle.video || null,
    featured: Boolean(vehicle.featured),
    specs: vehicle.specs || [],
    description: vehicle.description || null,
  }
}

export async function listVehicles() {
  if (!supabase) {
    const data = readStorage(STORAGE_KEYS.vehicles, [])
    return { ok: true, data: Array.isArray(data) ? data : [], remote: false }
  }
  const { data, error } = await supabase.from('vehicles').select('*').order('created_at', { ascending: true })
  if (error) return { ok: false, error, data: [], remote: true }
  return { ok: true, data: (data || []).map(mapVehicle), remote: true }
}

export async function insertVehicle(vehicle) {
  if (!supabase) {
    return { ok: true, data: vehicle, remote: false }
  }
  const { data, error } = await supabase.from('vehicles').insert([vehicleRow(vehicle)]).select().single()
  if (error) return { ok: false, error, remote: true }
  return { ok: true, data: mapVehicle(data), remote: true }
}

export async function patchVehicle(id, vehicle) {
  if (!supabase) {
    return { ok: true, data: { ...vehicle, id }, remote: false }
  }
  const { data, error } = await supabase.from('vehicles').update(vehicleRow({ ...vehicle, id })).eq('id', id).select().single()
  if (error) return { ok: false, error, remote: true }
  return { ok: true, data: mapVehicle(data), remote: true }
}

export async function removeVehicle(id) {
  if (!supabase) return { ok: true, remote: false }
  const { error } = await supabase.from('vehicles').delete().eq('id', id)
  if (error) return { ok: false, error, remote: true }
  return { ok: true, remote: true }
}

export async function listFavoriteIds(userId) {
  if (!userId) return { ok: true, data: [] }
  if (!supabase) {
    const saved = readStorage(STORAGE_KEYS.favorites(userId), [])
    return { ok: true, data: Array.isArray(saved) ? saved : [], remote: false }
  }
  const { data, error } = await supabase.from('favorites').select('vehicle_id').eq('user_id', userId)
  if (error) return { ok: false, error, data: [], remote: true }
  return { ok: true, data: (data || []).map((row) => row.vehicle_id), remote: true }
}

export async function addFavorite(userId, vehicleId) {
  if (!supabase) return { ok: true, remote: false }
  const { error } = await supabase.from('favorites').insert([{ user_id: userId, vehicle_id: vehicleId }])
  if (error && error.code !== '23505') return { ok: false, error, remote: true }
  return { ok: true, remote: true }
}

export async function removeFavoriteRow(userId, vehicleId) {
  if (!supabase) return { ok: true, remote: false }
  const { error } = await supabase.from('favorites').delete().eq('user_id', userId).eq('vehicle_id', vehicleId)
  if (error) return { ok: false, error, remote: true }
  return { ok: true, remote: true }
}

export async function createContact({ name, email, message }) {
  if (!supabase) {
    const contacts = readStorage(STORAGE_KEYS.contacts, [])
    writeStorage(STORAGE_KEYS.contacts, [{ id: createId('c'), name, email, message, date: new Date().toISOString() }, ...contacts])
    return { ok: true, remote: false }
  }
  const { error } = await supabase.from('contacts').insert([{ name, email, message }])
  if (error) return { ok: false, error, remote: true }
  return { ok: true, remote: true }
}
