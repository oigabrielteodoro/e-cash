import type { ApiError } from 'client'

export type FailedRequestQueue = {
  onSuccess: (token: string) => void
  onFailure: (error: ApiError) => void
}
