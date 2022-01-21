import create from 'zustand'
import { persist } from 'zustand/middleware'

import { useMutation } from 'react-query'
import { useNavigate } from 'react-router'

import { toast } from 'ui'
import { api, ApiError } from 'client'

import type { StoreState, SessionData, SessionPayload } from './types'

const initialState = {
  user_id: null,
  session_id: null,
  accessToken: null,
  isAuthenticated: false,
}

const useStore = create<StoreState>(
  persist((_, __) => initialState, {
    name: '@e-cash:session',
  }),
)

export function setToken(token: string) {
  return useStore.setState({
    accessToken: token,
    isAuthenticated: true,
  })
}

export function clearToken() {
  useStore.setState({
    accessToken: null,
    isAuthenticated: false,
  })
}

export function getToken() {
  return useStore.getState().accessToken
}

export function getUserId() {
  return useStore.getState().user_id
}

export function useIsAuthenticated() {
  return useStore((state) => state.isAuthenticated)
}

export function useSession() {
  const navigate = useNavigate()

  const { mutateAsync: createSession, ...rest } = useMutation<
    SessionPayload,
    ApiError,
    SessionData
  >({
    mutationFn: (data) =>
      api.post('sessions', data).then((response) => response.data),
    onSuccess: ({ user_id, token, session_id }) => {
      useStore.setState({
        accessToken: token,
        isAuthenticated: true,
        user_id,
        session_id,
      })

      navigate('/dashboard')
    },
    onError: (error) => {
      if (error.response?.data) {
        toast.error(error.response.data.message)
      } else {
        toast.error(error.message)
      }
    },
  })

  return {
    createSession,
    ...rest,
  }
}
