import { renderHook } from '@testing-library/react-hooks'
import Faker from '@faker-js/faker'
import nock from 'nock'

import { baseURL } from 'config'

import { ReactQueryWrapper } from '__helpers__/app-tests'

import { useDeleteAccount } from '.'

describe('useDeleteAccount', () => {
  it('should be able delete account successfully', async () => {
    const onSuccess = jest.fn()

    const accountId = Faker.datatype.uuid()

    const deleteAccountMock = nock(baseURL)
      .delete(`/accounts/${accountId}`)
      .reply(200)

    const { result, waitFor } = renderHook(
      () => useDeleteAccount({ onSuccess }),
      {
        wrapper: ReactQueryWrapper,
      },
    )

    result.current.deleteAccount(accountId)

    await waitFor(() => expect(deleteAccountMock).mockToBeDone())

    await waitFor(() => expect(onSuccess).toHaveBeenCalled())
  })

  it('should not be able delete account when request is fails', async () => {
    const onError = jest.fn()

    const accountId = Faker.datatype.uuid()

    const deleteAccountMock = nock(baseURL)
      .delete(`/accounts/${accountId}`)
      .reply(404)

    const { result, waitFor } = renderHook(() => useDeleteAccount(), {
      wrapper: ReactQueryWrapper,
    })

    result.current.deleteAccount(accountId, {
      onError,
    })

    await waitFor(() => expect(deleteAccountMock).mockToBeDone())

    await waitFor(() => expect(onError).toHaveBeenCalled())
  })
})
