import { ToggleEvent } from './ToggleEvent'

/**
 * FollowType type.
 */
export type FollowType = 'follow' | 'unfollow'

/**
 * FollowEvent type.
 */
export type FollowEvent = ToggleEvent<FollowType>
