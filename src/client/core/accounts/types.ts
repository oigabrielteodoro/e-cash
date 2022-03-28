import * as t from 'io-ts'
import { decimalCodec, idCodec } from 'types'

import { bankingInstitution } from 'client/core/institutions'

export const account = t.type({
  id: idCodec,
  name: t.string,
  bankingInstitutionId: t.string,
  balance: decimalCodec,
  category: t.string,
  agencyNumber: t.string,
  accountNumber: t.string,
  includeSumOnDashboard: t.boolean,
  bankingInstitution: t.union([t.undefined, bankingInstitution]),
})

export const accountsCodec = t.array(account)

export type Account = t.TypeOf<typeof account>

export type AccountFormParams = {
  balance: string
} & Pick<
  Account,
  | 'name'
  | 'bankingInstitutionId'
  | 'category'
  | 'agencyNumber'
  | 'accountNumber'
  | 'includeSumOnDashboard'
>

export type UpdateAccountFormParams = {
  accountId: string
} & AccountFormParams
