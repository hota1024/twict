import { Contributor } from './Contributor'
import { Entities } from './Entities'
import { Place } from './Place'
import { Point } from './Point'
import { User } from './User'

/**
 * FilterLevel type.
 */
export type FilterLevel = 'medium' | 'none' | 'low'

/**
 * Tweet type.
 */
export type Tweet = {
  created_at: string
  id: number
  id_str: string
  text: string
  source: string
  truncated: boolean
  in_reply_to_status_id?: number | null
  in_reply_to_status_id_str?: string | null
  in_reply_to_user_id?: number | null
  in_reply_to_user_id_str?: string | null
  in_reply_to_screen_name?: string | null
  user: User
  geo?: Point | null
  coordinates?: Point | null
  place?: Place | null
  contributors?: Contributor[] | null
  is_quote_status: boolean
  quote_count: number
  reply_count: number
  retweet_count: number
  favorite_count: number
  entities: Entities
  favorited: boolean
  retweeted: boolean
  filter_level: FilterLevel
  lang: string
  timestamp_ms: string
}
