import { pipe } from 'fp-ts/function'
import { fromEither } from 'fp-ts/TaskEither'

import { getErrorMessage, mapAll } from '__helpers__/app-tests'

import { urlCodec } from 'types'

describe('url', () => {
  it('should validate url correctly', async () => {
    const url = 'https://gabrielteodoro.com'

    return pipe(
      url,
      urlCodec.decode,
      fromEither,
      mapAll((result) => expect(result).toBe(url)),
    )()
  })

  it('should return error when url is invalid', async () => {
    return pipe(
      'wrong-url',
      urlCodec.decode,
      fromEither,
      mapAll((errors) => expect(getErrorMessage(errors)).toBe('Invalid URL')),
    )()
  })
})
