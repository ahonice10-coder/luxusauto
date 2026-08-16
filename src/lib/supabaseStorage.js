import supabase from './supabaseClient'

// Upload file to Supabase storage bucket 'vehicles' and return public URL
export async function uploadVehicleImage(file, opts = {}) {
  if (!supabase) throw new Error('Supabase client not configured')
  const bucket = opts.bucket || 'vehicles'
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2,8)}.${fileExt}`
  const path = `public/${fileName}`

  const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type,
  })
  if (error) throw error

  // make public URL (if bucket is public)
  const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(path)
  return publicData.publicUrl
}

export default { uploadVehicleImage }
