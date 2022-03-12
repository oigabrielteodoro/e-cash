import * as t from 'io-ts'
import { decimalCodec, idCodec } from 'types'

import { bankingInstitution } from 'client/useBankingInstitutions/types'

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

export type AccountFormParams = Pick<
  Account,
  | 'name'
  | 'bankingInstitutionId'
  | 'balance'
  | 'category'
  | 'agencyNumber'
  | 'accountNumber'
  | 'includeSumOnDashboard'
>
