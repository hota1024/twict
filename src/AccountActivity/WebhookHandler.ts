import { getCrcResponseToken } from '@/helpers/getCrcResponseToken'
import { Auth } from '@/types/Auth'
import { ActivityEmittable } from './interfaces/ActivityEmittable'
import { CrcResponse, WebhookHandlable } from './interfaces/WebhookHandlable'
import { ActivityEvent } from './types/ActivityEvent'

/**
 * WebhookHandler class.
 */
export class WebhookHandler implements WebhookHandlable {
  /**
   * auth.
   */
  private readonly auth: Auth

  /**
   * emitter.
   */
  private readonly emitter: ActivityEmittable

  /**
   * WebhookHandler constructor.
   *
   * @param auth auth.
   * @param emitter activity emitter.
   */
  constructor(auth: Auth, emitter: ActivityEmittable) {
    this.auth = auth
    this.emitter = emitter
  }

  crc(crcToken: string): CrcResponse {
    return {
      response_token: getCrcResponseToken(crcToken, this.auth),
    }
  }

  async handle_post(body: ActivityEvent): Promise<void> {
    await this.emitter.emitEvent(body)
  }

  handle_crc(crc_token: string | undefined): CrcResponse | string {
    return typeof crc_token === 'string'
      ? this.crc(crc_token)
      : 'crc_token missing from request.'
  }
}
