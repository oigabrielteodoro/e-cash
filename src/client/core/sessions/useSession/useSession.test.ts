import nock from 'nock'
import { renderHook } from '@testing-library/react-hooks'
import Faker from '@faker-js/faker'

import { baseURL } from 'config'
import { sessionFactory } from '__factories__'
import { ReactHookWrapper } from '__helpers__/app-tests'

import { DASHBOARD } from 'lib'
import { useSession } from '.'

describe('useSession', () => {
  it('should be able create session successfully', async () => {
    const onSuccess = jest.fn()

    const session = sessionFactory.build()

    const params = {
      email: Faker.internet.email(),
      password: '@Strongpassword123',
    }

    const createSessionMock = nock(baseURL)
      .post('/sessions', params)
      .reply(200, session)

    const { result, waitFor } = renderHook(() => useSession(), {
      wrapper: ReactHookWrapper,
      initialProps: {
        authenticated: false,
        routePaths: [DASHBOARD],
      },
    })

    result.current.createSession(params, {
      onSuccess,
    })

    await waitFor(() => expect(createSessionMock).mockToBeDone())

    await waitFor(() => expect(onSuccess).toHaveBeenCalled())
  })

  it('should not be able create session when request is fails', async () => {
    const onError = jest.fn()

    const params = {
      email: Faker.internet.email(),
      password: '@Strongpassword123',
    }

    const createSessionMock = nock(baseURL).post('/sessions', params).reply(404)

    const { result, waitFor } = renderHook(() => useSession(), {
      wrapper: ReactHookWrapper,
      initialProps: {
        authenticated: false,
        routePaths: [DASHBOARD],
      },
    })

    result.current.createSession(params, {
      onError,
    })

    await waitFor(() => expect(createSessionMock).mockToBeDone())

    await waitFor(() => expect(onError).toHaveBeenCalled())
  })
})
