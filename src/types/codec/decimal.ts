import * as t from 'io-ts'
import { withMessage } from 'io-ts-types'

type DecimalBrand = {
  readonly Decimal: unique symbol
}

export const decimalCodec = withMessage(
  t.brand(
    t.string,
    (value): value is t.Branded<string, DecimalBrand> => isDecimal(value),
    'Decimal',
  ),
  () => 'Invalid decimal',
)

export type Decimal = t.TypeOf<typeof decimalCodec>

function isDecimal(value: string) {
  return !isNaN(Number(value))
}
