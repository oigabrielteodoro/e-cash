import { pipe } from 'fp-ts/function'
import { fromNullable, fold } from 'fp-ts/Option'

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
