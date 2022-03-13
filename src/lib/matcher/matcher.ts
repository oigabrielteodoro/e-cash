import { constFalse, pipe } from 'fp-ts/function'
import { fold, fromNullable } from 'fp-ts/Option'

export const onlyNumbers = /[0-9]/

export function isOnlyNumbers(value: string | null) {
  return pipe(
    value,
    fromNullable,
    fold(constFalse, (value) => onlyNumbers.test(value)),
  )
}
