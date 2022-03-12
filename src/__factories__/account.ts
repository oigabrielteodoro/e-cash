import { Factory } from 'fishery'
import Faker from '@faker-js/faker'

import { unsafe } from '__helpers__/app-tests'
import type { Account } from 'client'
import { bankingInstitutionFactory } from '.'

const bankingInstitution = bankingInstitutionFactory.build()

export const accountFactory = Factory.define<Account>(() => ({
  id: unsafe(Faker.datatype.uuid()),
  name: `Personal account ${Faker.datatype.number()}`,
  accountNumber: '012345678',
  agencyNumber: '0001',
  balance: unsafe(Faker.finance.amount()),
  bankingInstitutionId: bankingInstitution.id,
  bankingInstitution,
  category: 'checking_account',
  includeSumOnDashboard: true,
}))
