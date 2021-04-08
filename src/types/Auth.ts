/**
 * Twitter Auth data type.
 */
export type Auth = {
  /**
   * consumer key(API Key).
   */
  consumer_key: string

  /**
   * consumer secret(API Key Secret).
   */
  consumer_secret: string

  /**
   * token(Access Token).
   */
  token: string

  /**
   * token secret(Access Token Secret).
   */
  token_secret: string

  /**
   * bearer token.
   */
  bearer_token?: string
}
