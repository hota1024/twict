import { Point } from './Point'

/**
 * ProfileGeo type.
 */
export type ProfileGeo = {
  country: string
  country_code: string
  locality: string
  region: string
  sub_region: string
  full_name: string
  geo: Point
}

/**
 * UserDerived type.
 */
export type UserDerived = {
  locations: ProfileGeo[]
}

/**
 * User type.
 */
export type User = {
  id: number
  id_str: string
  name: string
  screen_name: string
  location: string
  derived: UserDerived
  url: string
  description: string
  protected: boolean
  verified: boolean
  followers_count: number
  friends_count: number
  listed_count: number
  favourites_count: number
  statuses_count: number
  created_at: string
  profile_banner_url: string
  profile_image_url_https: string
  default_profile: boolean
  default_profile_image: boolean
  withheld_in_countries: string[]
  withheld_scope: string
}
