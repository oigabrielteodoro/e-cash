export type SessionData = {
  email: string
  password: string
}

export type StoreState = {
  user_id: string | null
  session_id: string | null
  accessToken: string | null
  isAuthenticated: boolean
}

export type SessionPayload = {
  token: string
  user_id: string
  session_id: string
}
