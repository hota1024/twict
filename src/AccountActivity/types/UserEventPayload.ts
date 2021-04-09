/**
 * UserEventRevokeTarget type.
 */
export type UserEventRevokeTarget = {
  app_id: string
}

/**
 * UserEventRevokeSource type.
 */
export type UserEventRevokeSource = {
  user_id: string
}

/**
 * UserEventRevoke type..
 */
export type UserEventRevoke = {
  date_time: string
  target: UserEventRevokeTarget
  source: UserEventRevokeSource
}

/**
 * UserEvent type.
 */
export type UserEventPayload = {
  revoke: UserEventRevoke
}
