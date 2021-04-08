import { Webhook } from './Webhook'

/**
 * Environment type.
 */
export type Environment = {
  /**
   * environment name.
   */
  environment_name: string

  /**
   * webhook array.
   */
  webhooks: Webhook[]
}
