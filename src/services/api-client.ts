type QueryParams = Record<string, string | number | boolean | null | undefined>

type ApiRequestOptions = RequestInit & {
  token?: string
  params?: QueryParams
}

export class ApiError extends Error {
  status: number
  details: unknown

  constructor(message: string, status: number, details?: unknown) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.details = details
  }
}

function buildUrl(baseUrl: string, path: string, params?: QueryParams) {
  const normalizedBaseUrl = baseUrl.replace(/\/$/, "")
  const normalizedPath = path.startsWith("/") ? path : `/${path}`

  const url = new URL(`${normalizedBaseUrl}${normalizedPath}`, window.location.origin)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.set(key, String(value))
      }
    })
  }

  return url.toString()
}

export class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async request<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
    const { token, params, headers, body, ...rest } = options

    const response = await fetch(buildUrl(this.baseUrl, path, params), {
      ...rest,
      body,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    })

    const contentType = response.headers.get("content-type")
    const isJson = contentType?.includes("application/json")

    const data = isJson ? await response.json() : await response.text()

    if (!response.ok) {
      throw new ApiError(
        typeof data === "object" && data && "message" in data
          ? String(data.message)
          : "Something went wrong",
        response.status,
        data,
      )
    }

    return data as T
  }

  get<T>(path: string, options?: ApiRequestOptions) {
    return this.request<T>(path, {
      ...options,
      method: "GET",
    })
  }

  post<T>(path: string, data?: unknown, options?: ApiRequestOptions) {
    return this.request<T>(path, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  put<T>(path: string, data?: unknown, options?: ApiRequestOptions) {
    return this.request<T>(path, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  patch<T>(path: string, data?: unknown, options?: ApiRequestOptions) {
    return this.request<T>(path, {
      ...options,
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  delete<T>(path: string, options?: ApiRequestOptions) {
    return this.request<T>(path, {
      ...options,
      method: "DELETE",
    })
  }
}

export const apiClient = new ApiClient(import.meta.env.VITE_API_BASE_URL ?? "")