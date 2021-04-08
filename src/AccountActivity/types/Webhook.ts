/**
 * Webhook type.
 */
export type Webhook = {
  /**
   * id.
   */
  id: string

  /**
   * webhook url.
   */
  url: string

  /**
   * whether is valid.
   */
  valid: boolean

  /**
   * created timestamp string(ex: `2021-01-01 0:00:00 +0000`).
   */
  created_timestamp: string
}
