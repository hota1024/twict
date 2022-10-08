import { getEventType } from '@/helpers/eventType'
import {
  ActivityEmitCallback,
  ActivityEmittable,
} from './interfaces/ActivityEmittable'
import {
  ActivityEvent,
  ActivityEventType,
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
} from './types/ActivityEvent'

type TypeCallback = {
  type: ActivityEventType
  callback: ActivityEmitCallback<ActivityEvent>
}

/**
 * ActivityEmitter class.
 */
export class ActivityEmitter implements ActivityEmittable {
  /**
   * callbacks.
   */
  private readonly callbacks: TypeCallback[] = []

  /**
   * event callbacks.
   */
  private readonly eventCallbacks: ActivityEmitCallback<ActivityEvent>[] = []

  async emitEvent(event: ActivityEvent): Promise<void> {
    await Promise.all(
      this.callbacks
        .filter((callback) => callback.type === getEventType(event))
        .map(async (callback) => await callback.callback(event))
    )

    await Promise.all(this.eventCallbacks.map(async(fn) => await fn(event)))
  }

  onEvent(callback: ActivityEmitCallback<ActivityEvent>): void {
    this.eventCallbacks.push(callback)
  }

  onTweetCreate(callback: ActivityEmitCallback<TweetCreateEvents>): void {
    this.addTypeCallback('tweet_create_events', callback)
  }

  onFavorite(callback: ActivityEmitCallback<FavoriteEvents>): void {
    this.addTypeCallback('favorite_events', callback)
  }

  onFollow(callback: ActivityEmitCallback<FollowEvents>): void {
    this.addTypeCallback('follow_events', callback)
  }

  onBlock(callback: ActivityEmitCallback<BlockEvents>): void {
    this.addTypeCallback('block_events', callback)
  }

  onMute(callback: ActivityEmitCallback<MuteEvent>): void {
    this.addTypeCallback('mute_events', callback)
  }

  onUser(callback: ActivityEmitCallback<UserEvent>): void {
    this.addTypeCallback('user_event', callback)
  }

  onDirectMessage(callback: ActivityEmitCallback<DirectMessageEvents>): void {
    this.addTypeCallback('direct_message_events', callback)
  }

  onDirectMessageIndicateTyping(
    callback: ActivityEmitCallback<DirectMessageIndicateTypingEvents>
  ): void {
    this.addTypeCallback('direct_message_indicate_typing_events', callback)
  }

  onDirectMessageMarkRead(
    callback: ActivityEmitCallback<DirectMessageMarkReadEvents>
  ): void {
    this.addTypeCallback('direct_message_mark_read_events', callback)
  }

  onTweetDelete(callback: ActivityEmitCallback<TweetDeleteEvents>): void {
    this.addTypeCallback('tweet_delete_events', callback)
  }

  /**
   * add type callback.
   *
   * @param type event type.
   * @param callback callback function.
   */
  private addTypeCallback<T extends ActivityEvent>(
    type: ActivityEventType,
    callback: ActivityEmitCallback<T>
  ): void {
    this.callbacks.push({
      type,
      callback: callback as ActivityEmitCallback<ActivityEvent>,
    })
  }
}
