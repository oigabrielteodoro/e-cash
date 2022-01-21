import type { AxiosError } from 'axios'

export type ApiError = AxiosError<{
  message: string
}>
