import * as t from 'io-ts'

import { of } from 'fp-ts/Task'
import { pipe } from 'fp-ts/function'
import { toError } from 'fp-ts/Either'
import { tryCatch, fold } from 'fp-ts/TaskEither'

import { decode } from '.'

export const decoder = t.string

describe('decode', () => {
  it('should be able decode successfully when data is valid', async () => {
    const params = 'valid'

    const result = await pipe(
      tryCatch(() => decode(params, decoder), toError),
      fold(
        () => of(null),
        () => of(params),
      ),
    )()

    expect(result).toBe(params)
  })

  it('should not be able decode successfully when data is wrong', async () => {
    const params = null

    const result = await pipe(
      tryCatch(() => decode(params, decoder), toError),
      fold(
        () => of(null),
        () => of(params),
      ),
    )()

    expect(result).toBe(params)
  })
})
