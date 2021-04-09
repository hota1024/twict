import { User } from './User'

/**
 * ToggleEvent type.
 */
export type ToggleEvent<T extends string> = {
  type: T
  created_timestamp: string
  source: User
  target: User
}
