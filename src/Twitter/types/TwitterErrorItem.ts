type Item<C extends number, M extends string> = {
  /**
   * error code.
   */
  code: C

  /**
   * error message.
   */
  message: M
}

/**
 * TwitterErrorItem type.
 */
export type TwitterErrorItem =
  | Item<32, 'Could not authenticate you.'>
  | Item<
      34,
      'Webhook does not exist or is associated with a different twitter application.'
    >
  | Item<99, 'You don’t have access to this resource.'>
  | Item<
      214,
      | 'Webhook URL does not meet the requirements.'
      | 'Too many resources already created.'
      | 'Webhook URL does not meet the requirements. Invalid CRC token or json response format.'
      | 'High latency on CRC GET request. Your webhook should respond in less than 3 seconds.'
      | 'Non-200 response code during CRC GET request (i.e. 404, 500, etc).'
    >
  | Item<
      348,
      `Client application is not permitted to access this user's webhook subscriptions.`
    >
  | Item<
      404,
      'Sorry, that page does not exist. - This often occurs when the specified user id is not actually subscribed.'
    >
