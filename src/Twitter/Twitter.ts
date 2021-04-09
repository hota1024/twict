import request from 'request-promise'
import { Auth } from '@/types/Auth'
import { TwitterClient } from './interfaces/TwitterClient'
import { RequestData } from './types/RequestData'
import { joinURL } from 'ufo'
import { UserCredentials } from '@/types/UserCredentials'
import { TwitterErrorMessage } from './types/TwitterErrorMessage'

/**
 * Twitter class.
 */
export class Twitter implements TwitterClient {
  /**
   * auth.
   */
  private readonly auth: Auth

  /**
   * base url.
   */
  private readonly baseUrl: string

  /**
   * Twitter constructor.
   *
   * @param auth auth.
   * @param baseUrl base url.
   */
  constructor(auth: Auth, baseUrl = 'https://api.twitter.com/1.1') {
    this.auth = auth
    this.baseUrl = baseUrl
  }

  async get<T = void>(
    url: string,
    query?: RequestData,
    auth?: UserCredentials,
    options?: Partial<request.Options>
  ): Promise<T> {
    return request.get({
      ...this.withOAuth(url, auth),
      qs: query,
      ...options,
    })
  }

  async post<T = void>(
    url: string,
    data?: RequestData,
    auth?: UserCredentials,
    options?: Partial<request.Options>
  ): Promise<T> {
    return request.post({
      ...this.withOAuth(url, auth),
      json: data,
      ...options,
    })
  }

  async put<T = void>(
    url: string,
    data?: RequestData,
    auth?: UserCredentials,
    options?: Partial<request.Options>
  ): Promise<T> {
    return request.put({
      ...this.withOAuth(url, auth),
      json: data,
      ...options,
    })
  }

  async delete<T = void>(
    url: string,
    auth?: UserCredentials,
    options?: Partial<request.Options>
  ): Promise<T> {
    return request.delete({ ...this.withOAuth(url, auth), ...options })
  }

  /**
   * returns request options with url and oauth.
   *
   * @param url url.
   * @param auth user credentials.
   */
  private withOAuth(url: string, auth?: UserCredentials): request.Options {
    return {
      url: joinURL(this.baseUrl, url),
      oauth: {
        consumer_key: this.auth.consumerKey,
        consumer_secret: this.auth.consumerSecret,
        token: auth?.token ?? this.auth.token,
        token_secret: auth?.secret ?? this.auth.tokenSecret,
      },
      resolveWithFullResponse: true,
      transform(body, res) {
        const isJson =
          typeof body === 'object' ||
          (typeof body === 'string' &&
            res.headers['content-type']?.includes('json'))
        const isError = res.statusCode < 200 || res.statusCode >= 300

        const data = isJson
          ? typeof body === 'object'
            ? body
            : JSON.parse(body)
          : body

        if (isError) {
          if (isJson) {
            const errors: TwitterErrorMessage = data

            throw new Error(
              `Twitter error: An error occurred during the request.\nMethod: ${
                res.request.method
              }\nURL: ${res.request.uri.href}\nStatus code: ${
                res.statusCode
              }\nErrors:\n${errors.errors
                .map(({ code, message }) => `  ${code}: ${message}`)
                .join('\n')}`
            )
          }

          console.log(res.body)
          throw new Error(
            `Twitter error: An error occurred during the request. (HTTP Status: ${res.statusCode})`
          )
        }

        return data
      },
    }
  }
}
