import { Ngrok } from 'ngrok'

/**
 * OnDataCallback type.
 */
export type OnDataCallback = (data: unknown) => void

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
   * add on data callback.
   *
   * @param callback callback function.
   */
  onData(callback: OnDataCallback): void
}
