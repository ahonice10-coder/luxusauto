import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AdminVehicleForm from './AdminVehicleForm'
import { useVehicles } from '../../context/VehicleContext'

export default function AdminVehicleEdit() {
  const { id } = useParams()
  const { vehicles } = useVehicles()
  const navigate = useNavigate()

  const vehicle = vehicles.find((v) => v.id === id) || null

  useEffect(() => {
    if (!vehicle) {
      // if vehicle not found, navigate back to list
      navigate('/admin/vehicles')
    }
  }, [vehicle, navigate])

  if (!vehicle) return null

  return <AdminVehicleForm initialData={vehicle} editingId={vehicle.id} onSaved={() => navigate('/admin/vehicles')} />
}
