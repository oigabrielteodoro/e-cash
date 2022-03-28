import * as t from 'io-ts'

import { urlCodec } from 'types'

export const bankingInstitution = t.type({
  id: t.string,
  name: t.string,
  imageUrl: urlCodec,
  institutionName: t.string,
  institutionUrl: urlCodec,
})

export type BankingInstitution = t.TypeOf<typeof bankingInstitution>

export const bankingInstitutionsCodec = t.array(bankingInstitution)
