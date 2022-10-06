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
  handle(body: ActivityEvent): Promise<void>

  /**
   * install handler to express app.
   *
   * @param app express app.
   * @param path path.
   */
  installTo(app: Express.Application, path: string): void
}
