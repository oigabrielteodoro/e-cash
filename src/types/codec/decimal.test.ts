import { pipe } from 'fp-ts/function'
import { fromEither } from 'fp-ts/TaskEither'

import { getErrorMessage, mapAll } from '__helpers__/app-tests'

import { decimalCodec } from '.'

describe('decimal', () => {
  it('should validate decimal correctly', async () => {
    const decimal = '100.13232'

    return pipe(
      decimal,
      decimalCodec.decode,
      fromEither,
      mapAll((result) => expect(result).toBe(decimal)),
    )()
  })

  it('should return error when decimal is invalid', async () => {
    return pipe(
      'wrong-decimal',
      decimalCodec.decode,
      fromEither,
      mapAll((errors) =>
        expect(getErrorMessage(errors)).toBe('Invalid decimal'),
      ),
    )()
  })
})
