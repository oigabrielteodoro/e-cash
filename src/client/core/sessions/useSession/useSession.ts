import create from 'zustand'
import { persist } from 'zustand/middleware'

import { useMutation } from 'react-query'
import { useNavigate } from 'react-router'

import { of } from 'fp-ts/Task'
import { pipe } from 'fp-ts/function'
import { toError } from 'fp-ts/Either'
import { tryCatch, fold } from 'fp-ts/TaskEither'

import { DASHBOARD } from 'lib'
import { api, decode } from 'client'

import { StoreState, SessionData, Session, sessionCodec } from '../types'

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

export function setSessionId(sessionId: string) {
  return useStore.setState({
    sessionId,
  })
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

async function createSessionAuthenticate(params: SessionData) {
  const url = '/sessions'

  const data = await api
    .post<Session>(url, params)
    .then((response) => response.data)

  if (!data) return null

  return await pipe(
    tryCatch(() => decode(data, sessionCodec), toError),
    fold(
      () => of(null),
      () => of(data),
    ),
  )()
}

export function useSession() {
  const navigate = useNavigate()

  const { mutate: createSession, ...rest } = useMutation({
    mutationFn: createSessionAuthenticate,
    onSuccess: (session) => {
      if (!session) return

      const { userId, token, sessionId } = session

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
