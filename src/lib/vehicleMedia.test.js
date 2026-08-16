import { describe, expect, it } from 'vitest'
import { getVehicleImages } from './vehicleMedia'

describe('getVehicleImages', () => {
  it('merges cover and gallery without duplicates', () => {
    expect(getVehicleImages({
      image: 'a.jpg',
      images: ['a.jpg', 'b.jpg', ''],
    })).toEqual(['a.jpg', 'b.jpg'])
  })

  it('falls back to the cover image', () => {
    expect(getVehicleImages({ image: 'cover.jpg' })).toEqual(['cover.jpg'])
  })
})
