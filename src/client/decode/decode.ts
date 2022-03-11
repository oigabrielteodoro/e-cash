import { pipe } from 'fp-ts/function'
import { toError } from 'fp-ts/Either'
import { tryCatch, mapLeft } from 'fp-ts/TaskEither'

import type { AnySchema } from 'yup'

import { notification } from 'ui'

export async function decode<T extends unknown>(value: T, schema: AnySchema) {
  return pipe(
    tryCatch(
      () =>
        schema.validate(value, {
          abortEarly: false,
        }),
      toError,
    ),
    mapLeft(() => {
      notification.error(
        'An error occurred while handling the data! Try again.',
      )

      throw new Error('An error occurred while handling the data! Try again.')
    }),
  )()
}
