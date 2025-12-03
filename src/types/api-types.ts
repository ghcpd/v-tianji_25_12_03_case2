export type ApiResponse<T> = {
  data: T
  status: number
  message?: string
}

export type ApiError = {
  message: string
  code?: string
  status?: number
}

