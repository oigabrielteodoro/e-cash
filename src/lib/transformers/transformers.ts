import { pipe } from 'fp-ts/function'
import { fromNullable, fold } from 'fp-ts/Option'

export function percentFromInt(value: number, baseValue: number) {
  return pipe(
    value,
    fromNullable,
    fold(
      () => '0',
      (value) => {
        const percentWithDecimal = (value / baseValue) * 100
        const isInt = Number.isInteger(percentWithDecimal)

        return percentWithDecimal.toFixed(isInt ? 0 : 2)
      },
    ),
  )
}
