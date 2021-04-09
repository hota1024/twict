import express, { Express } from 'express'
import { ActivityListenable } from './interfaces/ActivityListenable'
import { WebhookHandler } from './WebhookHandler'

/**
 * ActivityListener class.
 */
export class ActivityListener implements ActivityListenable {
  /**
   * express app.
   */
  private readonly app: Express

  /**
   * ActivityListener constructor.
   *
   * @param handler webhook handler.
   */
  constructor(handler: WebhookHandler) {
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    handler.installTo(app, '/')

    this.app = app
  }

  start(port: number): Promise<void> {
    return new Promise((resolve) => this.app.listen(port, () => resolve()))
  }
}
