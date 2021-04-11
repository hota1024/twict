import { ActivityEvent } from '../types/ActivityEvent'

/**
 * OnEventCallback type.
 */
export type OnEventCallback = (event: ActivityEvent) => void

/**
 * ActivityListenable interface.
 */
export interface ActivityListenable<T> {
  /**
   * start server.
   *
   * @param port port.
   */
  start(port: number): Promise<T>
}
