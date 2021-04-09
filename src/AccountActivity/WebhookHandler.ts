import { Express } from 'express'
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

  handle(body: ActivityEvent): void {
    this.emitter.emitEvent(body)
  }

  installTo(app: Express, path: string): void {
    app.get(path, (req, res) => {
      const crcToken = req.query.crc_token

      if (typeof crcToken === 'string') {
        res.send(this.crc(crcToken))
      } else {
        res.status(400).send('crc_token missing from request.')
      }
    })

    app.post(path, ({ body }) => this.handle(body))
  }
}
