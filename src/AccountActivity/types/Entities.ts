import { LiteralUnion } from 'prettier'

/**
 * Hashtag type.
 */
export type Hashtag = {
  indices: number[]
  text: string
}

/**
 * Size type.
 */
export type Size = {
  w: number
  h: number
  resize: string
}

/**
 * Media type.
 */
export type Media = {
  display_url: string
  expanded_url: string
  id: number
  id_str: string
  indices: number[]
  media_url: string
  media_url_https: string
  sizes: Size
  source_status_id: number
  source_status_id_str: string
  type: LiteralUnion<'photo' | 'video' | 'animated_gif', string>
  url: string
}

/**
 * Url type.
 */
export type Url = {
  display_url: string
  expanded_url: string
  indices: number[]
  url: string
}

/**
 * UserMention type.
 */
export type UserMention = {
  id: number
  id_str: string
  indices: number[]
  name: string
  screen_name: string
}

/**
 * DollarSymbol type.
 */
export type DollarSymbol = {
  indices: number[]
  text: string
}

/**
 * PollOption type.
 */
export type PollOption = {
  position: number
  text: string
}

/**
 * Poll type.
 */
export type Poll = {
  options: PollOption[]
  end_datetime: string
  duration_minutes: number
}

/**
 * Entities type.
 */
export type Entities = {
  hashtags: Hashtag[]
  media: Media[]
  urls: Url[]
  user_mentions: UserMention[]
  symbols: DollarSymbol[]
  pools: Poll[]
}
