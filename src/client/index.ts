import axios, { AxiosError } from 'axios'

import { baseURL } from 'config'
import {
  getSession,
  setToken,
  getToken,
  ApiError,
  FailedRequestQueue,
} from 'client'

let isRefreshing = false
let failedRequestQueue: FailedRequestQueue[] = []

export const queryDefaultOptions = {
  retry: false,
  refetchOnWindowFocus: false,
}

export const api = axios.create({
  baseURL,
  headers: {
    authorization: `Bearer ${getToken()}`,
  },
})

api.interceptors.response.use(
  (response) => response,
  (error: ApiError) => {
    const { user_id, session_id } = getSession()

    const originalConfig = error.config

    if (
      error.response?.status === 401 &&
      error.response.data.status === 'token.expired'
    ) {
      if (!isRefreshing) {
        isRefreshing = true

        api
          .put('/refresh', {
            user_id,
            session_id,
          })
          .then((response) => {
            const { token } = response.data

            api.defaults.headers.common.authorization = `Bearer ${token}`
            setToken(token)

            failedRequestQueue.forEach((request) => request.onSuccess(token))
            failedRequestQueue = []
          })
          .catch((err) => {
            failedRequestQueue.forEach((request) => request.onFailure(err))
            failedRequestQueue = []
          })
          .finally(() => {
            isRefreshing = false
          })
      }

      return new Promise((resolve, reject) => {
        failedRequestQueue.push({
          onSuccess: (token: string) => {
            if (originalConfig.headers) {
              originalConfig.headers.authorization = `Bearer ${token}`
              setToken(token)

              resolve(api(originalConfig))
            }
          },
          onFailure: (err: AxiosError) => {
            reject(err)
          },
        })
      })
    } else {
      return Promise.reject(error)
    }
  },
)

export * from './types'
export * from './useMe'
export * from './useSession'
