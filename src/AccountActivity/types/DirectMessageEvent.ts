import { Entities } from './Entities'

/**
 * DirectMessageEvent type.
 */
export type DirectMessageEvent = {
  type: 'message_create'
  id: string
  created_timestamp: string
  message_create: {
    target: {
      recipient_id: string
    }
    sender_id: string
    source_app_id: string
    message_data: {
      text: string
      entities: Entities
    }
  }
}
