import { pipe } from 'fp-ts/function'
import { tryCatch, toError, fold as foldEither } from 'fp-ts/Either'
import { fromNullable, fold, isSome } from 'fp-ts/Option'
import Big from 'big.js'

export const decimalFromInt = (
  value?: number | null,
  options?: Intl.NumberFormatOptions,
) =>
  pipe(
    value,
    fromNullable,
    fold(
      () => '-',
      (value) =>
        new Intl.NumberFormat('pt-BR', {
          minimumFractionDigits: value >= 1e6 ? 0 : 2,
          style: 'currency',
          currency: 'BRL',
          ...options,
        }).format(value),
    ),
  )

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

  return decimalFromInt(toFloat(amount), {
    style: 'decimal',
    currency: 'BRL',
    minimumFractionDigits: 2,
  })
}

export function toFloat(value?: string | number | null) {
  return toNumber(value) / 100
}
