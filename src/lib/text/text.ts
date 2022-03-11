import { pipe } from 'fp-ts/function'
import { fromNullable, fold } from 'fp-ts/Option'

import truncate from 'lodash/truncate'

export function toTextWithEllipsis(value: string | null, { length = 15 } = {}) {
  return pipe(
    value,
    fromNullable,
    fold(
      () => '--',
      (value) =>
        truncate(value, {
          length,
        }),
    ),
  )
}
