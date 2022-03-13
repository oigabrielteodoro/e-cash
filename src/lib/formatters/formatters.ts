import { pipe } from 'fp-ts/function'
import { tryCatch, toError, fold as foldEither } from 'fp-ts/Either'
import { fromNullable, isSome } from 'fp-ts/Option'

import Big from 'big.js'

export function decimalFromInt(
  value?: number | string | null,
  options?: Intl.NumberFormatOptions,
) {
  const amount = toNumber(value)

  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: amount >= 1e6 ? 0 : 2,
    style: 'currency',
    currency: 'BRL',
    ...options,
  }).format(toFloat(amount))
}

export function toNumber(value?: string | number | null): number {
  const amount = fromNullable(value)

  if (isSome(amount)) {
    return pipe(
      tryCatch(() => new Big(amount.value).toNumber(), toError),
      foldEither(
        () => 0,
        (value) => value,
      ),
    )
  }

  return 0
}

export function toDecimal(value?: string | number | null): string {
  const amount = toNumber(value)

  return decimalFromInt(amount, {
    style: 'decimal',
    currency: 'BRL',
    minimumFractionDigits: 2,
  })
}

export function toFloat(value?: string | number | null) {
  return toNumber(value) / 100
}
