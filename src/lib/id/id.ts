import crypto from 'crypto'

import { pipe, constFalse } from 'fp-ts/function'
import { fromNullable, fold } from 'fp-ts/Option'

export const uuidRegex =
  /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i

export function generateId() {
  return crypto.randomUUID()
}

export function isValidId(value: string | null) {
  return pipe(
    value,
    fromNullable,
    fold(
      constFalse,
      (value) => typeof value === 'string' && uuidRegex.test(value),
    ),
  )
}
