import {
  ActivityEvent,
  BlockEvents,
  DirectMessageEvents,
  DirectMessageIndicateTypingEvents,
  DirectMessageMarkReadEvents,
  FavoriteEvents,
  FollowEvents,
  MuteEvent,
  TweetCreateEvents,
  TweetDeleteEvents,
  UserEvent,
} from '../types/ActivityEvent'

/**
 * ActivityEmitCallback type.
 */
export type ActivityEmitCallback<T extends ActivityEvent> = (event: T) => Promise<void>

/**
 * ActivityEmittable type.
 */
export interface ActivityEmittable {
  /**
   * emit activity event.
   *
   * @param event activity event.
   */
  emitEvent(event: ActivityEvent): Promise<void>

  /**
   * add a callback for all activity events.
   *
   * @param callback event callback.
   */
  onEvent(callback: ActivityEmitCallback<ActivityEvent>): void

  /**
   * add a callback for tweet create event.
   *
   * @param callback event callback.
   */
  onTweetCreate(callback: ActivityEmitCallback<TweetCreateEvents>): void

  /**
   * add a callback for favorite event.
   *
   * @param callback event callback.
   */
  onFavorite(callback: ActivityEmitCallback<FavoriteEvents>): void

  /**
   * add a callback for follow event.
   *
   * @param callback event callback.
   */
  onFollow(callback: ActivityEmitCallback<FollowEvents>): void

  /**
   * add a callback for block event.
   *
   * @param callback event callback.
   */
  onBlock(callback: ActivityEmitCallback<BlockEvents>): void

  /**
   * add a callback for mute event.
   *
   * @param callback event callback.
   */
  onMute(callback: ActivityEmitCallback<MuteEvent>): void

  /**
   * add a callback for user event.
   *
   * @param callback event callback.
   */
  onUser(callback: ActivityEmitCallback<UserEvent>): void

  /**
   * add a callback for direct message event.
   *
   * @param callback event callback.
   */
  onDirectMessage(callback: ActivityEmitCallback<DirectMessageEvents>): void

  /**
   * add a callback for direct message indicate typing event.
   *
   * @param callback event callback.
   */
  onDirectMessageIndicateTyping(
    callback: ActivityEmitCallback<DirectMessageIndicateTypingEvents>
  ): void

  /**
   * add a callback for direct message mark read event.
   *
   * @param callback event callback.
   */
  onDirectMessageMarkRead(
    callback: ActivityEmitCallback<DirectMessageMarkReadEvents>
  ): void

  /**
   * add a callback for tweet delete event.
   *
   * @param callback event callback.
   */
  onTweetDelete(callback: ActivityEmitCallback<TweetDeleteEvents>): void
}
