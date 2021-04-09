import { Auth } from '@/types/Auth'
import crypto from 'crypto'

/**
 * returns challenge-response-check response token.
 */
export const getCrcResponseToken = (token: string, auth: Auth): string => {
  return `sha256=${crypto
    .createHmac('sha256', auth.consumerSecret)
    .update(token)
    .digest('base64')}`
}
