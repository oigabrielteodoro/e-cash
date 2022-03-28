import { renderHook } from '@testing-library/react-hooks'
import nock from 'nock'

import { baseURL } from 'config'

import { accountFactory } from '__factories__/account'
import { ReactQueryWrapper } from '__helpers__/app-tests'

import { useAccounts } from '.'

describe('useAccounts', () => {
  it('should be able return accounts successfully', async () => {
    const accounts = accountFactory.buildList(10)

    const accountsMock = nock(baseURL).get('/accounts').reply(200, accounts)

    const { result, waitFor } = renderHook(() => useAccounts(), {
      wrapper: ReactQueryWrapper,
    })

    await waitFor(() => expect(accountsMock).mockToBeDone())

    expect(result.current.accounts).toStrictEqual(accounts)
  })

  it('should be able return error when request is fails', async () => {
    const accountsMock = nock(baseURL).get('/accounts').reply(404)

    const { result, waitFor } = renderHook(() => useAccounts(), {
      wrapper: ReactQueryWrapper,
    })

    await waitFor(() => expect(accountsMock).mockToBeDone())

    expect(result.current.isError).toBeTruthy()
  })
})
