import { pipe } from 'fp-ts/function'
import { fromEither } from 'fp-ts/TaskEither'

import { getErrorMessage, mapAll } from '__helpers__/app-tests'

import { emailCodec } from '.'

describe('email', () => {
  it('should be able validate email correctly', async () => {
    return pipe(
      'example@email.com',
      emailCodec.decode,
      fromEither,
      mapAll((result) => expect(result).toBe('example@email.com')),
    )()
  })

  it('should be able return error when email is invalid', async () => {
    return pipe(
      'invalid-email',
      emailCodec.decode,
      fromEither,
      mapAll((errors) => expect(getErrorMessage(errors)).toBe('Invalid email')),
    )()
  })
})
