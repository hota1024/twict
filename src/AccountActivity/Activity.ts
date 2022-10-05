import { TwitterClient } from '@/Twitter/interfaces/TwitterClient'
import { Twitter } from '@/Twitter/Twitter'
import { Auth } from '@/types/Auth'
import { UserCredentials } from '@/types/UserCredentials'
import { ActivityEmitter } from './ActivityEmitter'
import { WebhookHandlable } from './interfaces'
import { ActivityControllable } from './interfaces/ActivityControllable'
import { SubscriptionCount } from './types/SubscriptionCount'
import { SubscriptionList } from './types/SubscriptionList'
import { Webhook } from './types/Webhook'
import { WebhookList } from './types/WebhookList'
import { WebhookHandler } from './WebhookHandler'

/**
 * Activity class.
 */
export class Activity extends ActivityEmitter implements ActivityControllable {
  /**
   * env.
   */
  private readonly env: string

  /**
   * auth.
   */
  private readonly auth: Auth

  /**
   * twitter client.
   */
  private readonly twitter: TwitterClient

  /**
   * webhook handler.
   */
  private readonly handler: WebhookHandler

  /**
   * Activity constructor.
   *
   * @param env env.
   * @param auth auth.
   */
  constructor(env: string, auth: Auth) {
    super()
    this.env = env
    this.auth = auth
    this.twitter = new Twitter(
      auth,
      'https://api.twitter.com/1.1/account_activity'
    )

    const handler = new WebhookHandler(auth, this)
    this.handler = handler
  }

  /**
   * returns webhook handler.
   */
  getHandler(): WebhookHandlable {
    return this.handler
  }

  async registerWebhook(url: string): Promise<Webhook> {
    return this.twitter.post(
      `all/${this.env}/webhooks.json`,
      undefined,
      undefined,
      {
        qs: {
          url,
        },
      }
    )
  }

  async listWebhooks(): Promise<WebhookList> {
    return this.twitter.get('all/webhooks.json')
  }

  async requestCrc(id: string): Promise<void> {
    await this.twitter.put(`all/${this.env}/webhooks/${id}.json`)
  }

  async subscribe(auth?: UserCredentials): Promise<void> {
    await this.twitter.post(`all/${this.env}/subscriptions.json`, auth)
  }

  async subscriptionCount(): Promise<SubscriptionCount> {
    return this.twitter.get('all/subscriptions/count.json')
  }

  async checkSubscribed(auth?: UserCredentials): Promise<boolean> {
    return this.twitter.get(`all/${this.env}/subscriptions.json`, {}, auth)
  }

  async subscriptions(): Promise<SubscriptionList> {
    return this.twitter.get(`all/${this.env}/subscriptions/list.json`)
  }

  async deleteWebhook(id: string): Promise<void> {
    await this.twitter.delete(`all/${this.env}/webhooks/${id}.json`)
  }

  async deleteAllWebhooks(): Promise<number> {
    const list = await this.listWebhooks()
    const promises: Promise<void>[] = []
    let numberOfDeleted = 0

    for (const env of list.environments) {
      for (const webhook of env.webhooks) {
        promises.push(
          this.deleteWebhook(webhook.id).then(() => {
            ++numberOfDeleted
          })
        )
      }
    }

    await Promise.all(promises)

    return numberOfDeleted
  }

  async unsubscribe(id: string): Promise<void> {
    await this.twitter.delete(`all/${this.env}/subscriptions/${id}.json`)
  }
}
