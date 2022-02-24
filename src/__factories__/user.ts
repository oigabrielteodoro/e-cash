import { Factory } from 'fishery'
import Faker from '@faker-js/faker'

import type { User } from 'client/useMe/types'

export const userFactory = Factory.define<User>(() => ({
  full_name: Faker.name.findName(),
  like_be_called: Faker.name.firstName(),
  avatar_url: Faker.image.avatar(),
  email: Faker.internet.email(),
}))
