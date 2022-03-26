import * as t from 'io-ts'
import { idCodec } from 'types'

export const sessionCodec = t.type({
  token: t.string,
  userId: idCodec,
  sessionId: idCodec,
})

export type Session = t.TypeOf<typeof sessionCodec>

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
