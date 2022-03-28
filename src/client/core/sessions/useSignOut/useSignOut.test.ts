import nock from 'nock'
import { renderHook } from '@testing-library/react-hooks'
import Faker from '@faker-js/faker'

import { DASHBOARD } from 'lib'
import { baseURL } from 'config'
import { ReactHookWrapper } from '__helpers__/app-tests'

import { setSessionId } from '../useSession'

import { useSignOut } from '.'

describe('useSignOut', () => {
  it('should be able sign out session successfully', async () => {
    const sessionId = Faker.datatype.uuid()

    setSessionId(sessionId)

    const signOutSessionMock = nock(baseURL)
      .delete(`/sessions/${sessionId}`)
      .reply(204)

    const { result, waitFor } = renderHook(() => useSignOut(), {
      wrapper: ReactHookWrapper,
      initialProps: {
        authenticated: false,
        routePaths: [DASHBOARD],
      },
    })

    result.current.signOut()

    await waitFor(() => expect(signOutSessionMock).mockToBeDone())

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy())
  })

  it('should not be able sign out session when request is fails', async () => {
    const sessionId = Faker.datatype.uuid()

    setSessionId(sessionId)

    const signOutSessionMock = nock(baseURL)
      .delete(`/sessions/${sessionId}`)
      .reply(404)

    const { result, waitFor } = renderHook(() => useSignOut(), {
      wrapper: ReactHookWrapper,
      initialProps: {
        authenticated: false,
        routePaths: [DASHBOARD],
      },
    })

    result.current.signOut()

    await waitFor(() => expect(signOutSessionMock).mockToBeDone())

    await waitFor(() => expect(result.current.isError).toBeTruthy())
  })
})
