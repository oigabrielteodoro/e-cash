import create from 'zustand'
import { persist } from 'zustand/middleware'

import { useMutation } from 'react-query'
import { useNavigate } from 'react-router'

import { ApiError, api } from 'client'
import { DASHBOARD } from 'lib'

import type { StoreState, SessionData, Session } from '../types'

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
  useStore.setState(() => initialState)
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

export function useSessionId() {
  return useStore((state) => state.sessionId)
}

export function useSession() {
  const navigate = useNavigate()

  const { mutate: createSession, ...rest } = useMutation<
    Session,
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

export { useStore as sessionStore }
