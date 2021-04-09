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
   */
  start(port: number): Promise<void>
}
