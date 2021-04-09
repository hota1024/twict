import { ToggleEvent } from './ToggleEvent'

/**
 * MuteType type.
 */
export type MuteType = 'mute' | 'unmute'

/**
 * MuteEventPayload type.
 */
export type MuteEventPayload = ToggleEvent<MuteType>
