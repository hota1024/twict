/**
 * Twitter Auth data type.
 */
export type Auth = {
  /**
   * consumer key(API Key).
   */
  consumerKey: string

  /**
   * consumer secret(API Key Secret).
   */
  consumerSecret: string

  /**
   * token(Access Token).
   */
  token: string

  /**
   * token secret(Access Token Secret).
   */
  tokenSecret: string

  /**
   * bearer token.
   */
  bearerToken?: string
}
