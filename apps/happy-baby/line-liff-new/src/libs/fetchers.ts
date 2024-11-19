type ModifiedResponse<T = Record<string, unknown>> = {
  statusCode: number
  message?: string
  data?: T
}

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  FAILED_TO_FETCH: 0,
}

export const ENDPOINT =
  process.env.NEXT_PUBLIC_ENDPOINT || 'http://127.0.0.1:4000'

export const Get = async <T = Record<string, unknown>>(
  url: string,
  options?: { token?: string },
): Promise<ModifiedResponse<T>> => {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          options && options.token ? `Bearer ${options.token}` : '',
      },
    })

    return await handleResponse(res)
  } catch (e) {
    return (await handleError(e)) as ModifiedResponse<T>
  }
}

export const Post = async <T = Record<string, unknown>>(
  url: string,
  options?: { data?: object; token?: string },
): Promise<ModifiedResponse<T>> => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(options && options.token
          ? { Authorization: `Bearer ${options.token}` }
          : {}),
      },
      body: JSON.stringify(options && options.data ? options.data : {}),
    })

    return await handleResponse(res)
  } catch (e) {
    return (await handleError(e)) as ModifiedResponse<T>
  }
}

export const Patch = async <T = Record<string, unknown>>(
  url: string,
  options?: { data?: object; token?: string },
): Promise<ModifiedResponse<T>> => {
  try {
    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(options && options.token
          ? { Authorization: `Bearer ${options.token}` }
          : {}),
      },
      body: JSON.stringify(options && options.data ? options.data : {}),
    })

    return await handleResponse(res)
  } catch (e) {
    return (await handleError(e)) as ModifiedResponse<T>
  }
}

export const Delete = async <T = Record<string, unknown>>(
  url: string,
  options?: { token?: string },
): Promise<ModifiedResponse<T>> => {
  try {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(options && options.token
          ? { Authorization: `Bearer ${options.token}` }
          : {}),
      },
    })

    return await handleResponse(res)
  } catch (e) {
    return (await handleError(e)) as ModifiedResponse<T>
  }
}

const handleResponse = async <T = Record<string, unknown>>(
  response: Response,
): Promise<ModifiedResponse<T>> => {
  if (response.ok) {
    try {
      const result = await response.json()

      return {
        statusCode: result.statusCode,
        message: result.message,
        data: result.data,
      }
    } catch {
      return { statusCode: 0, message: '' }
    }
  } else {
    throw response
  }
}

const handleError = async (error: unknown): Promise<ModifiedResponse> => {
  if (error instanceof Response) {
    const errorResponse = await error.json()
    try {
      return {
        statusCode: errorResponse.statusCode,
        data: errorResponse.data,
        message: errorResponse.message,
      }
    } catch {
      return { statusCode: error.status, message: '' }
    }
  } else {
    return { statusCode: 0, message: 'ไม่สามารถดึงข้อมูลได้' }
  }
}