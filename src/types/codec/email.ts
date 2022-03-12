import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

import { isValidEmail } from 'lib'

type EmailBrand = {
  readonly Email: unique symbol
}

export const emailCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, EmailBrand> => isValidEmail(value),
    'Email',
  ),
  () => 'Invalid email',
)

export type Email = t.TypeOf<typeof emailCodec>
