import Twitter from 'twitter'
import { SubscriptionCount } from '../types/SubscriptionCount'
import { SubscriptionList } from '../types/SubscriptionList'
import { Webhook } from '../types/Webhook'
import { WebhookList } from '../types/WebhookList'

/**
 * WebhookClient class.
 */
export class WebhookClient {
  /**
   * WebhookClient constructor.
   *
   * @param twitter twitter client.
   */
  constructor(private readonly twitter: Twitter) {}

  /**
   * registers a webhook URL / Generates a webhook_id.
   *
   * @param env environment label.
   * @param url webhook url.
   */
  async registerWebhook(env: string, url: string): Promise<Webhook> {
    return this.post<Webhook>(`account_activity/all/${env}/webhooks.json`, {
      url,
    })
  }

  /**
   * returns all webhook URLs and their statuses.
   */
  async listWebhooks(): Promise<WebhookList> {
    return this.get<WebhookList>(`account_activity/all/webhooks.json`)
  }

  /**
   * manually triggers a challenge response check.
   *
   * @param env environment label.
   * @param id webhook id.
   */
  async requestCRC(env: string, id: string): Promise<void> {
    return this.put<void>(`account_activity/all/${env}/webhooks/${id}.json`)
  }

  /**
   * subscribes an application to an account's events.
   *
   * @param env environment label.
   */
  async subscribe(env: string): Promise<void> {
    return this.post(`account_activity/all/${env}/subscriptions.json`)
  }

  /**
   * returns a count of currently active subscriptions.
   */
  async countSubscriptions(): Promise<SubscriptionCount> {
    return this.get<SubscriptionCount>(
      `account_activity/all/subscriptions/count.json`
    )
  }

  /**
   * check to see if a webhook is subscribed to an account.
   *
   * @param env environment label.
   */
  async checkSubscribed(env: string): Promise<void> {
    return this.get<void>(`account_activity/all/${env}/subscriptions.json`)
  }

  /**
   * returns a list of currently active subscriptions.
   *
   * @param env environment label.
   */
  async listSubscriptions(env: string): Promise<SubscriptionList> {
    return this.get<SubscriptionList>(
      `account_activity/all/${env}/subscriptions/list.json`
    )
  }

  /**
   * deletes the webhook.
   *
   * @param env environment label.
   * @param id webhook id.
   */
  async deleteWebhook(env: string, id: string): Promise<void> {
    return this.delete<void>(
      `https://api.twitter.com/1.1/account_activity/all/${env}/webhooks/${id}.json`
    )
  }

  /**
   * deactivates a subscription using application-only OAuth.
   *
   * @param env environment label.
   * @param id user id.
   */
  async unsubscribe(env: string, id: string): Promise<void> {
    return this.delete<void>(
      `account_activity/all/${env}/subscriptions/${id}.json`
    )
  }

  /**
   * get request to twitter api.
   *
   * @param url url.
   * @param params params.
   */
  protected async get<T>(
    url: string,
    params: Record<string, unknown> = {}
  ): Promise<T> {
    const data = await this.twitter.get(url, params)

    return data as T
  }

  /**
   * post request to twitter api.
   *
   * @param url url.
   * @param params params.
   */
  protected async post<T>(
    url: string,
    params: Record<string, unknown> = {}
  ): Promise<T> {
    const data = await this.twitter.post(url, params)

    return data as T
  }

  protected async put<T>(
    url: string,
    params: Record<string, unknown> = {}
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      this.twitter.request(
        url,
        {
          method: 'put',
          formData: params,
        },
        (error, _, data) => {
          if (error) {
            return reject(error)
          }

          try {
            resolve(JSON.parse(data ?? ''))
          } catch {
            reject(new Error(`can not parse response as json. ${data}`))
          }
        }
      )
    })
  }

  protected async delete<T>(
    url: string,
    params: Record<string, unknown> = {}
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      this.twitter.request(
        url,
        {
          method: 'delete',
          formData: params,
        },
        (error, _, data) => {
          if (error) {
            return reject(error)
          }

          try {
            resolve(JSON.parse(data ?? ''))
          } catch {
            reject(new Error(`can not parse response as json. ${data}`))
          }
        }
      )
    })
  }
}
