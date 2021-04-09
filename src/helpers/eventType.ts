import {
  ActivityEvent,
  ActivityEventMap,
  ActivityEventType,
} from '@/AccountActivity/types/ActivityEvent'

const EVENT_TYPES: ActivityEventType[] = [
  'tweet_create_events',
  'favorite_events',
  'follow_events',
  'block_events',
  'mute_events',
  'user_event',
  'direct_message_events',
  'direct_message_indicate_typing_events',
  'irect_message_mark_rea_events',
  'tweet_delete_events',
]

/**
 * returns whether event type is expect type.
 */
export const isExpectEventType = <T extends ActivityEventType>(
  event: ActivityEvent,
  type: T
): event is ActivityEventMap[T] => {
  return typeof event[type as keyof ActivityEvent] !== 'undefined'
}

/**
 * returns activity event type of event object.
 */
export const getEventType = (event: ActivityEvent): ActivityEventType => {
  for (const type of EVENT_TYPES) {
    if (isExpectEventType(event, type)) {
      return type
    }
  }

  throw new Error(`getEventType error: unknown event type.`)
}
