import type { AxiosError } from 'axios'

export type ApiError = AxiosError<{
  status: string
  message: string
}>
