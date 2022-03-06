import { toPattern } from 'vanilla-masker'

import { constFalse, pipe } from 'fp-ts/function'
import { fromNullable, fold } from 'fp-ts/Option'

export function toMask(value: string | null, patterns: string[]) {
  return pipe(
    value,
    fromNullable,
    fold(
      () => '',
      (value) => toPattern(value, setMask(value, patterns)),
    ),
  )
}

export function setMask(value: string, patterns: string[]) {
  return patterns.reduce((memo: string, pattern: string) => {
    return value.length <= unMask(memo).length ? memo : pattern
  }, patterns[0])
}

export function unMask(value: string | null) {
  return pipe(
    value,
    fromNullable,
    fold(
      () => '',
      (value) => value.replace(/\W/g, ''),
    ),
  )
}

export function isResolvedMask(value: string | null, patterns: string[]) {
  return pipe(
    value,
    fromNullable,
    fold(constFalse, (value) => {
      const patternLength = Math.max(
        ...patterns.map((pattern) => pattern.length),
      )

      return value.length > patternLength
    }),
  )
}
