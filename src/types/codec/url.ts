import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

import { isValidUrl } from 'lib'

type UrlBrand = {
  readonly Url: unique symbol
}

export const urlCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, UrlBrand> => isValidUrl(value),
    'Url',
  ),
  () => 'Invalid URL',
)

export type Url = t.TypeOf<typeof urlCodec>
