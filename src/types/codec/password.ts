import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

import {
  passwordHasLowerCaseRegex,
  passwordHasUpperCaseRegex,
  passwordHasSpecialCharactersRegex,
} from 'lib'

type PasswordBrand = {
  readonly Password: unique symbol
}

export const passwordRequiredCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, PasswordBrand> => !!value,
    'Password',
  ),
  () => 'Required password',
)

export const passwordMinLengthCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, PasswordBrand> => value.length >= 6,
    'Password',
  ),
  () => 'Your password must be at least 6 characters long',
)

export const passwordHasSpecialCharactersCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, PasswordBrand> =>
      passwordHasSpecialCharactersRegex.test(value),
    'Password',
  ),
  () => 'Your password must have at least one special character',
)

export const passwordHasLowerCaseCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, PasswordBrand> =>
      passwordHasLowerCaseRegex.test(value),
    'Password',
  ),
  () => 'Your password must have at least one text with lower case',
)

export const passwordHasUpperCaseCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, PasswordBrand> =>
      passwordHasUpperCaseRegex.test(value),
    'Password',
  ),
  () => 'Your password must have at least one text with upper case',
)

export const passwordConfirmationCodec = withMessage(
  t.brand(
    t.tuple([t.string, t.string]),
    (value): value is t.Branded<[string, string], PasswordBrand> =>
      value[0] === value[1],
    'Password',
  ),
  () => 'Passwords must match exactly',
)

export const passwordCodec = t.intersection([
  passwordRequiredCodec,
  passwordMinLengthCodec,
  passwordHasLowerCaseCodec,
  passwordHasUpperCaseCodec,
  passwordHasSpecialCharactersCodec,
])
