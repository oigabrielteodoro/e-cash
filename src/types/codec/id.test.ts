import { pipe } from 'fp-ts/function'
import { fromEither } from 'fp-ts/TaskEither'

import { generateId } from 'lib'
import { getErrorMessage, mapAll } from '__helpers__/app-tests'

import { idCodec } from '.'

describe('id', () => {
  it('should validate uuid correctly', async () => {
    const id = generateId()

    return pipe(
      id,
      idCodec.decode,
      fromEither,
      mapAll((result) => expect(result).toBe(id)),
    )()
  })

  it('should return error when uuid is invalid', async () => {
    return pipe(
      'invalid-uuid',
      idCodec.decode,
      fromEither,
      mapAll((errors) => expect(getErrorMessage(errors)).toBe('Invalid id')),
    )()
  })
})
