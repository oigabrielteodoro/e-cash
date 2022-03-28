import { Factory } from 'fishery'
import Faker from '@faker-js/faker'

import type { BankingInstitution } from 'client'
import { unsafe } from '__helpers__/app-tests'

export const bankingInstitutionFactory = Factory.define<BankingInstitution>(
  () => ({
    id: unsafe(Faker.datatype.number().toString()),
    imageUrl: unsafe(Faker.image.imageUrl()),
    institutionName: Faker.company.companyName(),
    name: Faker.company.companySuffix(),
    institutionUrl: unsafe(Faker.internet.url()),
  }),
)
