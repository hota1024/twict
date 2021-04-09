import { Tweet } from './Tweet'
import { User } from './User'

/**
 * FavoriteEvent type.
 */
export type FavoriteEvent = {
  id: string
  created_at: string
  timestamp_ms: string
  favorited_status: Tweet
  user: User
}
