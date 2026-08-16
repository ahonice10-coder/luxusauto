export function getVehicleImages(vehicle) {
  if (!vehicle) return []
  const fromGallery = Array.isArray(vehicle.images) ? vehicle.images : []
  const list = [vehicle.image, ...fromGallery]
    .map((item) => String(item || '').trim())
    .filter(Boolean)
  return [...new Set(list)]
}
