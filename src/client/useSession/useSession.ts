import create from 'zustand'
import { persist } from 'zustand/middleware'

import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router'

import { ApiError, api } from 'client'
import { DASHBOARD, SIGN_IN } from 'lib'

import type { StoreState, SessionData, SessionPayload } from './types'

const initialState: StoreState = {
  userId: null,
  sessionId: null,
  token: null,
  isAuthenticated: false,
}

const useStore = create<StoreState>(
  persist((_, __) => initialState, {
    name: '@e-cash:session',
  }),
)

export function setToken(token: string) {
  return useStore.setState({
    token: token,
    isAuthenticated: true,
  })
}

export function setUserId(userId: string) {
  return useStore.setState({
    userId,
  })
}

export function clearToken() {
  useStore.setState({
    token: null,
    isAuthenticated: false,
  })
}

export function getToken() {
  return useStore.getState().token
}

export function getSession() {
  return useStore.getState()
}

export function useIsAuthenticated() {
  return useStore((state) => state.isAuthenticated)
}

export function useSessionStoraged() {
  return useStore((state) => state)
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
    onSuccess: ({ userId, token, sessionId }) => {
      useStore.setState({
        token: token,
        isAuthenticated: true,
        userId,
        sessionId,
      })

      api.defaults.headers.common.authorization = `Bearer ${token}`

      navigate(DASHBOARD)
    },
  })

  return {
    createSession,
    ...rest,
  }
}

export function useSignOut() {
  const navigate = useNavigate()
  const { sessionId } = useSessionStoraged()

  const queryClient = useQueryClient()

  const { mutateAsync: signOut, ...rest } = useMutation<
    SessionPayload,
    ApiError
  >({
    mutationFn: () => api.delete(`/sessions/${sessionId}`),
    onSuccess: async () => {
      delete api.defaults.headers.common.authorization
      useStore.setState(() => initialState)

      navigate(SIGN_IN)

      await queryClient.invalidateQueries()
    },
  })

  return {
    signOut,
    ...rest,
  }
}

export { useStore as sessionStore }
