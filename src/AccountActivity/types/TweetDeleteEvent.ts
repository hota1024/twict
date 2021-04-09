/**
 * TweetDeleteEvent type.
 */
export type TweetDeleteEvent = {
  status: {
    id: string
    user_id: string
  }
  timestamp_ms: string
}
