import { BoudingBox } from './BoudingBox'

/**
 * Place type.
 */
export type Place = {
  id: string
  url: string
  place_type: string
  name: string
  full_name: string
  country_code: string
  country: string
  bouding_box: BoudingBox
  attributes: unknown
}
