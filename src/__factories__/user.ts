import { Factory } from 'fishery'
import { faker } from '@faker-js/faker'

import type { User } from 'client/useMe/types'

export const userFactory = Factory.define<User>(() => ({
  full_name: faker.name.findName(),
  like_be_called: faker.name.firstName(),
  avatar_url: faker.image.avatar(),
  email: faker.internet.email(),
}))
