import { Ngrok } from 'ngrok'
import { ActivityEvent } from '../types/ActivityEvent'

/**
 * OnEventCallback type.
 */
export type OnEventCallback = (event: ActivityEvent) => void

/**
 * ActivityListenable interface.
 */
export interface ActivityListenable {
  /**
   * start server.
   *
   * @param port port.
   * @param ngrokOptions if this argument is specified, make ngrok use this argument as an option.
   */
  start(port: number, ngrokOptions?: Ngrok.Options): Promise<string>

  /**
   * start server.
   *
   * @param port port.
   * @param useNgrok whether use ngrok.
   */
  start(port: number, useNgrok?: boolean): Promise<string>

  /**
   * add on event callback.
   *
   * @param callback callback function.
   */
  onEvent(callback: OnEventCallback): void
}
