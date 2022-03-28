import { Factory } from 'fishery'
import Faker from '@faker-js/faker'

import type { User } from 'client'

export const userFactory = Factory.define<User>(() => ({
  fullName: Faker.name.findName(),
  likeBeCalled: Faker.name.firstName(),
  avatarUrl: Faker.image.avatar(),
  email: Faker.internet.email(),
}))
