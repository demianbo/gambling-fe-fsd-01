export class ApiError extends Error {
  readonly status: number
  readonly url: string

  constructor(status: number, message: string, url: string) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype)
    this.name = 'ApiError'
    this.status = status
    this.url = url
  }

  static isApiError(value: unknown): value is ApiError {
    return value instanceof ApiError
  }

  static async fromResponse(response: Response): Promise<ApiError> {
    let message: string
    try {
      const text = await response.text()
      const parsed: unknown = JSON.parse(text)
      if (
        parsed !== null &&
        typeof parsed === 'object' &&
        'message' in parsed &&
        typeof (parsed as Record<string, unknown>)['message'] === 'string'
      ) {
        message = (parsed as Record<string, unknown>)['message'] as string
      } else {
        message = text.slice(0, 500)
      }
    } catch {
      message = `HTTP ${response.status}`
    }
    return new ApiError(response.status, message, response.url)
  }
}
