import { ToggleEvent } from './ToggleEvent'

/**
 * BlockType type.
 */
export type BlockType = 'block' | 'unblock'

/**
 * BlockEvent type.
 */
export type BlockEvent = ToggleEvent<BlockType>
