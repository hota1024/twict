import { Subscription } from './Subscription'

/**
 * SubscriptionList type.
 */
export type SubscriptionList = {
  /**
   * environment.
   */
  environment: string

  /**
   * application id.
   */
  application_id: string

  /**
   * subscription array.
   */
  subscriptions: Subscription[]
}
