import { pipe } from 'fp-ts/function'
import { fromEither } from 'fp-ts/TaskEither'

import { getErrorMessage, mapAll } from '__helpers__/app-tests'

import { emailCodec } from 'types'

describe('email', () => {
  it('should validate email correctly', async () => {
    const email = 'example@email.com'

    return pipe(
      email,
      emailCodec.decode,
      fromEither,
      mapAll((result) => expect(result).toBe(email)),
    )()
  })

  it('should return error when email is invalid', async () => {
    return pipe(
      'wrong-email',
      emailCodec.decode,
      fromEither,
      mapAll((errors) => expect(getErrorMessage(errors)).toBe('Invalid email')),
    )()
  })
})
