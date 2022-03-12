import { pipe } from 'fp-ts/function'
import { fromEither } from 'fp-ts/TaskEither'

import { getErrorMessage, mapAll } from '__helpers__/app-tests'

import { positiveCodec } from '.'

describe('positive', () => {
  it('should validate if number is positve', async () => {
    return pipe(
      1,
      positiveCodec.decode,
      fromEither,
      mapAll((result) => expect(result).toBe(1)),
    )()
  })

  it('should return error when number is negative', async () => {
    return pipe(
      -1,
      positiveCodec.decode,
      fromEither,
      mapAll((errors) =>
        expect(getErrorMessage(errors)).toBe('Please use positive numbers'),
      ),
    )()
  })
})
