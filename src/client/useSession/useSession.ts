import create from 'zustand'
import { persist } from 'zustand/middleware'

import { useMutation } from 'react-query'
import { useNavigate } from 'react-router'

import { toast } from 'ui'
import { DASHBOARD, SIGN_IN } from 'lib'
import { ApiError, api } from 'client'

import type { StoreState, SessionData, SessionPayload } from './types'

const initialState: StoreState = {
  user_id: null,
  session_id: null,
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

export function setUserId(user_id: string) {
  return useStore.setState({
    user_id,
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
    onSuccess: ({ user_id, token, session_id }) => {
      useStore.setState({
        token: token,
        isAuthenticated: true,
        user_id,
        session_id,
      })

      api.defaults.headers.common.authorization = `Bearer ${token}`

      navigate(DASHBOARD)
    },
    onError: (error) => {
      if (error.response?.data) {
        toast.error(error.response?.data?.message)
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

export function useLogOut() {
  const navigate = useNavigate()
  const { session_id } = useSessionStoraged()

  const { mutateAsync: logOut, ...rest } = useMutation<
    SessionPayload,
    ApiError
  >({
    mutationFn: () => api.delete(`/sessions/${session_id}`),
    onSuccess: () => {
      delete api.defaults.headers.common.authorization

      useStore.setState(() => initialState)

      navigate(SIGN_IN)
    },
    onError: (error) => {
      if (error.response?.data) {
        toast.error(error.response?.data?.message)
      } else {
        toast.error(error.message)
      }
    },
  })

  return {
    logOut,
    ...rest,
  }
}

export { useStore as sessionStore }
