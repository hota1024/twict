import { ToggleEvent } from './ToggleEvent'

/**
 * MuteType type.
 */
export type MuteType = 'mute' | 'unmute'

/**
 * MuteEvent type.
 */
export type MuteEvent = ToggleEvent<MuteType>
