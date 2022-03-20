import axios, { AxiosError } from 'axios'
import type { DefaultOptions } from 'react-query'

import { baseURL } from 'config'
import { notification } from 'ui'

import { getSession, setToken, getToken } from './core'
import type { ApiError, FailedRequestQueue } from './types'

let isRefreshing = false
let failedRequestQueue: FailedRequestQueue[] = []

export const api = axios.create({
  baseURL,
  headers: {
    authorization: `Bearer ${getToken()}`,
    'Content-Type': 'application/json',
    'Accept-Language': 'pt_BR',
  },
})

export const queryConfigDefault: DefaultOptions<ApiError> = {
  queries: {
    retry: false,
    refetchOnWindowFocus: false,
  },
  mutations: {
    retry: false,
    onError,
  },
}

function onError(error: ApiError) {
  if (error.response?.data) {
    notification.error(error.response?.data?.message)
  } else {
    notification.error(error.message)
  }
}

api.interceptors.response.use(
  (response) => response,
  (error: ApiError) => {
    const { userId, sessionId } = getSession()

    const originalConfig = error.config

    if (
      error.response?.status === 401 &&
      error.response.data.status === 'token.expired'
    ) {
      if (!isRefreshing) {
        isRefreshing = true

        api
          .put('/refresh', {
            userId,
            sessionId,
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

api.interceptors.response.use(
  (response) => response,
  (error: ApiError) => {
    const responseStatus = error?.response?.status ?? 0

    if (responseStatus >= 500) {
      notification.error('There was an error communicating with our server')
    }

    return Promise.reject(error)
  },
)
