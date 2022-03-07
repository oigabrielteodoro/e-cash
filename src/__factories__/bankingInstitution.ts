import { Factory } from 'fishery'
import Faker from '@faker-js/faker'

import type { BankingInstitution } from 'client/useBankingInstitutions/types'

export const bankingInstitutionFactory = Factory.define<BankingInstitution>(
  () => ({
    id: Faker.datatype.number(),
    imageUrl: Faker.image.imageUrl(),
    institutionName: Faker.company.companyName(),
    name: Faker.company.companySuffix(),
  }),
)
