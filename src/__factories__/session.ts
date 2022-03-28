import { Factory } from 'fishery'
import Faker from '@faker-js/faker'

import { unsafe } from '__helpers__/app-tests'
import type { Session } from 'client'

export const sessionFactory = Factory.define<Session>(() => ({
  token: Faker.datatype.uuid(),
  userId: unsafe(Faker.datatype.uuid()),
  sessionId: unsafe(Faker.datatype.uuid()),
}))
