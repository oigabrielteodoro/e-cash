import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

import { isValidId } from 'lib'

type IdBrand = {
  readonly Id: unique symbol
}

export const idCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, IdBrand> => isValidId(value),
    'Id',
  ),
  () => 'Invalid id',
)

export type Id = t.TypeOf<typeof idCodec>
