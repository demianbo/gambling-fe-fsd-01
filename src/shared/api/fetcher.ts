import { ApiError } from './errors'
import type { FetcherConfig, FetcherInstance, NextRequestInit } from './types'

export const BASE_URL = process.env['NEXT_PUBLIC_API_URL'] ?? ''

async function applyRequestInterceptors(
  init: NextRequestInit,
  interceptors: FetcherConfig['requestInterceptors']
): Promise<NextRequestInit> {
  let current = init
  for (const interceptor of interceptors) {
    current = await interceptor(current)
  }
  return current
}

async function applyResponseInterceptors(
  response: Response,
  interceptors: FetcherConfig['responseInterceptors']
): Promise<Response> {
  let current = response
  for (const interceptor of interceptors) {
    current = await interceptor(current)
  }
  return current
}

async function coreFetch<T>(
  path: string,
  init: NextRequestInit,
  config: FetcherConfig
): Promise<T> {
  const url = `${config.baseUrl}${path}`
  const processedInit = await applyRequestInterceptors(init, config.requestInterceptors)

  let response: Response
  try {
    response = await fetch(url, processedInit)
  } catch (networkError: unknown) {
    const message = networkError instanceof Error ? networkError.message : 'Network error'
    throw new ApiError(0, message, url)
  }

  const processedResponse = await applyResponseInterceptors(response, config.responseInterceptors)

  if (!processedResponse.ok) {
    throw await ApiError.fromResponse(processedResponse)
  }

  if (processedResponse.status === 204) {
    return undefined as T
  }

  const data: unknown = await processedResponse.json()
  return data as T
}

function buildBodyInit(body: unknown, init: NextRequestInit = {}): NextRequestInit {
  return {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init.headers },
    body: JSON.stringify(body),
  }
}

export function createFetcherInstance(config: FetcherConfig): FetcherInstance {
  return {
    get: <T>(path: string, init: NextRequestInit = {}) =>
      coreFetch<T>(path, { ...init, method: 'GET' }, config),
    post: <T>(path: string, body: unknown, init?: NextRequestInit) =>
      coreFetch<T>(path, { ...buildBodyInit(body, init), method: 'POST' }, config),
    put: <T>(path: string, body: unknown, init?: NextRequestInit) =>
      coreFetch<T>(path, { ...buildBodyInit(body, init), method: 'PUT' }, config),
    patch: <T>(path: string, body: unknown, init?: NextRequestInit) =>
      coreFetch<T>(path, { ...buildBodyInit(body, init), method: 'PATCH' }, config),
    delete: <T>(path: string, init: NextRequestInit = {}) =>
      coreFetch<T>(path, { ...init, method: 'DELETE' }, config),
  }
}
