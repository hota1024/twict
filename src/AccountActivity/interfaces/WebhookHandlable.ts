import { ActivityEvent } from '../types/ActivityEvent'

/**
 * CrcResponse type.
 */
export type CrcResponse = {
  response_token: string
}

/**
 * WebhookHandlable interface.
 */
export interface WebhookHandlable {
  /**
   * returns crc response token.
   *
   * @param crcToken crc token.
   */
  crc(crcToken: string): CrcResponse

  /**
   * handle event.
   *
   * @param body event body.
   */
  handle_post(body: ActivityEvent): void

  /**
   * returns a CrcResponse or error message.
   *
   * @param crc_token string.
   */
  handle_crc(crc_token: string | undefined): CrcResponse | string
}
