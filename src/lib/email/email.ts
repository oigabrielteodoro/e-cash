import { constFalse, pipe } from 'fp-ts/function'
import { fold, fromNullable } from 'fp-ts/Option'

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export function isValidEmail(value: string | null) {
  return pipe(
    value,
    fromNullable,
    fold(constFalse, (value) => emailRegex.test(value)),
  )
}
