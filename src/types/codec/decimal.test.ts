import { pipe } from 'fp-ts/function'
import { fromEither } from 'fp-ts/TaskEither'

import { getErrorMessage, mapAll } from '__helpers__/app-tests'

import { decimalCodec } from '.'

describe('decimal', () => {
  it('should validate decimal correctly', async () => {
    return pipe(
      '100.13232',
      decimalCodec.decode,
      fromEither,
      mapAll((result) => expect(result).toBe('100.13232')),
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
