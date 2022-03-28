import { renderHook } from '@testing-library/react-hooks'
import Faker from '@faker-js/faker'
import nock from 'nock'

import { baseURL } from 'config'

import { userFactory } from '__factories__'
import { ReactQueryWrapper } from '__helpers__/app-tests'

import { setToken, setUserId } from 'client/core/sessions'

import { useMe } from '.'

describe('useMe', () => {
  beforeEach(() => {
    const userId = Faker.datatype.uuid()
    const token = Faker.datatype.uuid()

    setUserId(userId)
    setToken(token)
  })

  it('should be able return accounts successfully', async () => {
    const user = userFactory.build()

    const accountsMock = nock(baseURL).get('/profile').reply(200, { user })

    const { result, waitFor } = renderHook(() => useMe(), {
      wrapper: ReactQueryWrapper,
    })

    await waitFor(() => expect(accountsMock).mockToBeDone())

    expect(result.current.user).toStrictEqual(user)
  })

  it('should be able return error when request is fails', async () => {
    const accountsMock = nock(baseURL).get('/profile').reply(404)

    const { result, waitFor } = renderHook(() => useMe(), {
      wrapper: ReactQueryWrapper,
    })

    await waitFor(() => expect(accountsMock).mockToBeDone())

    expect(result.current.isError).toBeTruthy()
  })
})
