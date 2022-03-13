import { pipe } from 'fp-ts/function'
import { fromEither } from 'fp-ts/TaskEither'

import { getErrorMessage, mapAll } from '__helpers__/app-tests'

import { passwordConfirmationCodec } from './password'
import { passwordCodec } from '.'

describe('password', () => {
  it('should be able return true when password is correctly', async () => {
    const password = 'Abc123$'

    return pipe(
      password,
      passwordCodec.decode,
      fromEither,
      mapAll((result) => expect(result).toBe(password)),
    )()
  })

  it('should be able not accept a password less than 6 characters long', async () => {
    return pipe(
      '123',
      passwordCodec.decode,
      fromEither,
      mapAll((errors) =>
        expect(getErrorMessage(errors)).toBe(
          'Your password must be at least 6 characters long',
        ),
      ),
    )()
  })

  it('should be able not accept a password without a special character', async () => {
    return pipe(
      'Abc123',
      passwordCodec.decode,
      fromEither,
      mapAll((errors) =>
        expect(getErrorMessage(errors)).toBe(
          'Your password must have at least one special character',
        ),
      ),
    )()
  })

  it('should be able not accept a password without a text lower case', async () => {
    return pipe(
      'ABCDEF',
      passwordCodec.decode,
      fromEither,
      mapAll((errors) =>
        expect(getErrorMessage(errors)).toBe(
          'Your password must have at least one text with lower case',
        ),
      ),
    )()
  })

  it('should be able not accept a password without a text upper case', async () => {
    return pipe(
      'abcdef',
      passwordCodec.decode,
      fromEither,
      mapAll((errors) =>
        expect(getErrorMessage(errors)).toBe(
          'Your password must have at least one text with upper case',
        ),
      ),
    )()
  })
})

describe('passwordConfirmationCodec', () => {
  it('should be able not accept different passwords', async () => {
    return pipe(
      ['123', '123456'],
      passwordConfirmationCodec.decode,
      fromEither,
      mapAll((errors) =>
        expect(getErrorMessage(errors)).toBe('Passwords must match exactly'),
      ),
    )()
  })
})
