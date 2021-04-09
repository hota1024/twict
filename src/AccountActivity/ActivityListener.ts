import { getCrcResponseToken } from '@/helpers/getCrcResponseToken'
import { Auth } from '@/types/Auth'
import ngrok, { Ngrok } from 'ngrok'
import express, { Express } from 'express'
import {
  ActivityListenable,
  OnDataCallback,
} from './interfaces/ActivityListenable'

/**
 * ActivityListener class.
 */
export class ActivityListener implements ActivityListenable {
  /**
   * express app.
   */
  private readonly app: Express

  /**
   * on data callbacks.
   */
  private readonly onDataCallbacks: OnDataCallback[] = []

  /**
   * ActivityListener constructor.
   *
   * @param auth auth.
   */
  constructor(auth: Auth) {
    const app = express()
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.get('/', (req, res) => {
      const crcToken = req.query.crc_token

      if (typeof crcToken === 'string') {
        res.send({
          response_token: getCrcResponseToken(crcToken, auth),
        })
      } else {
        res.status(400).send('crc_token missing from request.')
      }
    })

    app.post('/', (req, res) => {
      console.log(req.body)
      res.send()
    })

    this.app = app
  }

  async start(
    port: number,
    ngrokOptions?: Ngrok.Options | boolean
  ): Promise<string> {
    let url = `http://localhost:${port}`

    if (ngrokOptions) {
      const base: Ngrok.Options = {}

      if (ngrokOptions === true) {
        base.addr = port
        url = await ngrok.connect(base)
      } else if (!ngrokOptions.addr) {
        base.addr = port
        url = await ngrok.connect({
          ...base,
          ...ngrokOptions,
        })
      }
    }

    return new Promise((resolve) => this.app.listen(port, () => resolve(url)))
  }

  onData(callback: OnDataCallback): void {
    this.onDataCallbacks.push(callback)
  }
}
