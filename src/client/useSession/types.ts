export type SessionData = {
  email: string
  password: string
}

export type StoreState = {
  token: string | null
  user_id: string | null
  session_id: string | null
  isAuthenticated: boolean
  isRefreshingToken: boolean
}

export type SessionPayload = {
  token: string
  user_id: string
  session_id: string
}
