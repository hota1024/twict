import { UserCredentials } from '@/types/UserCredentials'
import { RequestData } from '../types/RequestData'
import request from 'request-promise'

/**
 * TwitterClient interface
 */
export interface TwitterClient {
  /**
   * get request.
   *
   * @param url url.
   * @param data data.
   * @param auth user credentials.
   * @param options request options.
   */
  get<T = void>(
    url: string,
    query?: RequestData,
    auth?: UserCredentials,
    options?: Partial<request.Options>
  ): Promise<T>

  /**
   * post request.
   *
   * @param url url.
   * @param data data.
   * @param auth user credentials.
   * @param options request options.
   */
  post<T = void>(
    url: string,
    data?: RequestData,
    auth?: UserCredentials,
    options?: Partial<request.Options>
  ): Promise<T>

  /**
   * put request.
   *
   * @param url url.
   * @param data data.
   * @param auth user credentials.
   * @param options request options.
   */
  put<T = void>(
    url: string,
    data?: RequestData,
    auth?: UserCredentials,
    options?: Partial<request.Options>
  ): Promise<T>

  /**
   * delete request.
   *
   * @param url url.
   * @param auth user credentials.
   * @param options request options.
   */
  delete<T = void>(
    url: string,
    auth?: UserCredentials,
    options?: Partial<request.Options>
  ): Promise<T>
}
