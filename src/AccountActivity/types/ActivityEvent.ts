import { MuteEventPayload } from './MuteEvent'
import { BlockEvent } from './BlockEvent'
import { DirectMessageEvent } from './DirectMessageEvent'
import { FavoriteEvent } from './FavoriteEvent'
import { FollowEvent } from './FollowEvent'
import { Tweet } from './Tweet'
import { TweetDeleteEvent } from './TweetDeleteEvent'
import { UserEventPayload } from './UserEventPayload'

/**
 * TweetCreateEvents type.
 *
 * Tweet status payload when any of the following actions are taken by or to the subscription user: Tweets, Retweets, Replies, @mentions, QuoteTweets, Retweet of Quote Tweets.
 */
export type TweetCreateEvents = {
  for_user_id: string
  user_has_blocked?: boolean
  tweet_create_events: Tweet[]
}

/**
 * FavoriteEvents type.
 */
export type FavoriteEvents = {
  for_user_id: string
  favorite_events: FavoriteEvent[]
}

/**
 * FollowEvents (UnfollowEvents) type.
 */
export type FollowEvents = {
  for_user_id: string
  follow_events: FollowEvent[]
}

/**
 * BlockEvents (UnblockEvents) type.
 */
export type BlockEvents = {
  for_user_id: string
  block_events: BlockEvent[]
}

/**
 * MuteEvent (UnmuteEvent) type.
 */
export type MuteEvent = {
  for_user_id: string
  mute_events: MuteEventPayload[]
}

/**
 * UserEvent type.
 */
export type UserEvent = {
  user_event: UserEventPayload
}

/**
 * DirectMessageEvents type.
 */
export type DirectMessageEvents = {
  or_user_id: string
  direct_message_events: DirectMessageEvent[]
}

/**
 * DirectMessageIndicateTypingEvents type.
 */
export type DirectMessageIndicateTypingEvents = Record<string, unknown>

/**
 * DirectMessageMarkReadEvents type.
 */
export type DirectMessageMarkReadEvents = Record<string, unknown>

/**
 * TweetDeleteEvents type.
 */
export type TweetDeleteEvents = {
  for_user_id: string
  tweet_delete_events: TweetDeleteEvent[]
}

/**
 * ActivityEvent type.
 */
export type ActivityEvent =
  | TweetCreateEvents
  | FavoriteEvents
  | FollowEvents
  | BlockEvents
  | MuteEvent
  | UserEvent
  | DirectMessageEvents
  | DirectMessageIndicateTypingEvents
  | DirectMessageMarkReadEvents
  | TweetDeleteEvents

/**
 * ActivityEventMap type.
 */
export type ActivityEventMap = {
  tweet_create_events: TweetCreateEvents
  favorite_events: FavoriteEvents
  follow_events: FollowEvents
  block_events: BlockEvents
  mute_events: MuteEvent
  user_event: UserEvent
  direct_message_events: DirectMessageEvents
  direct_message_indicate_typing_events: DirectMessageIndicateTypingEvents
  irect_message_mark_rea_events: DirectMessageMarkReadEvents
  tweet_delete_events: TweetDeleteEvents
}

/**
 * ActivityEventType type.
 */
export type ActivityEventType = keyof ActivityEventMap
