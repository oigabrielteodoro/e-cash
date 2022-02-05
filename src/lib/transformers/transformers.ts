import { pipe } from 'fp-ts/function'
import { fromNullable, fold } from 'fp-ts/Option'

type Options = {
  isRounded?: boolean
  hasSuffix?: boolean
}

export function percentFromInt(
  value: number,
  baseValue: number,
  { hasSuffix = false, isRounded = false }: Options = {},
) {
  return pipe(
    value,
    fromNullable,
    fold(
      () => '0',
      (value) => {
        const percentWithDecimal = (value / baseValue) * 100
        const isInt = Number.isInteger(percentWithDecimal)
        const suffix = hasSuffix && percentWithDecimal > 0 ? '+' : ''

        return `${suffix}${percentWithDecimal.toFixed(
          isInt || isRounded ? 0 : 2,
        )}%`
      },
    ),
  )
}
