import { Express } from 'express'
import { UserCredentials } from '@/types/UserCredentials'
import { ActivityEmitter } from '../ActivityEmitter'
import { SubscriptionCount } from '../types/SubscriptionCount'
import { SubscriptionList } from '../types/SubscriptionList'
import { Webhook } from '../types/Webhook'
import { WebhookList } from '../types/WebhookList'

/**
 * ActivityControllable interface.
 */
export interface ActivityControllable extends ActivityEmitter {
  /**
   * start listener server and returns express application.
   *
   * @param port port.
   */
  listen(port: number): Promise<Express>

  /**
   * registers a webhook with given callback url and returns Webhook object.
   *
   * @param url callback url.
   */
  registerWebhook(url: string): Promise<Webhook>

  /**
   * returns all webhooks.
   */
  listWebhooks(): Promise<WebhookList>

  /**
   * triggers the challenge response check (CRC) for the webhook with given webhook id.
   *
   * @param id webhook id.
   */
  requestCrc(id: string): Promise<void>

  /**
   * subscribes the provided application to all events for the provided environment for all message types.
   *
   * @param auth credentials of the user to subscribe to.
   */
  subscribe(auth?: UserCredentials): Promise<void>

  /**
   * returns a count of currently active subscriptions.
   */
  subscriptionCount(): Promise<SubscriptionCount>

  /**
   * check to see if a webhook is subscribed to an account.
   *
   * @param auth user credentials to check if the user is subscribed.
   */
  checkSubscribed(auth?: UserCredentials): Promise<boolean>

  /**
   * returns a list of currently active subscriptions.
   */
  subscriptions(): Promise<SubscriptionList>

  /**
   * delete the webhook.
   *
   * @param id webhook id.
   */
  deleteWebhook(id: string): Promise<void>

  /**
   * delete all webhooks and returns number of webhooks deleted.
   */
  deleteAllWebhooks(): Promise<number>

  /**
   * deactivates a subscription using application-only OAuth.
   *
   * @param id user id.
   */
  unsubscribe(id: string): Promise<void>
}
