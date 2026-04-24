export interface NextRequestInit extends RequestInit {
  next?: {
    revalidate?: number | false
    tags?: string[]
  }
}

export type RequestInterceptor = (
  init: NextRequestInit
) => NextRequestInit | Promise<NextRequestInit>

export type ResponseInterceptor = (
  response: Response
) => Response | Promise<Response>

export interface FetcherConfig {
  baseUrl: string
  requestInterceptors: RequestInterceptor[]
  responseInterceptors: ResponseInterceptor[]
}

export interface FetcherInstance {
  get: <T>(path: string, init?: NextRequestInit) => Promise<T>
  post: <T>(path: string, body: unknown, init?: NextRequestInit) => Promise<T>
  put: <T>(path: string, body: unknown, init?: NextRequestInit) => Promise<T>
  patch: <T>(path: string, body: unknown, init?: NextRequestInit) => Promise<T>
  delete: <T>(path: string, init?: NextRequestInit) => Promise<T>
}

export interface ClientFetcherOptions extends Partial<FetcherConfig> {
  token?: string
}

export interface ServerFetcherOptions extends Partial<FetcherConfig> {}
