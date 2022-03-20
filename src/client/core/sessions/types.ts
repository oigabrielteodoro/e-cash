export type SessionData = {
  email: string
  password: string
}

export type StoreState = {
  token: string | null
  userId: string | null
  sessionId: string | null
  isAuthenticated: boolean
}

export type SessionPayload = {
  token: string
  userId: string
  sessionId: string
}
