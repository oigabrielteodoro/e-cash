import { renderHook } from '@testing-library/react-hooks'
import nock from 'nock'

import { baseURL } from 'config'

import { accountFactory } from '__factories__/account'
import { bankingInstitutionFactory } from '__factories__'
import { ReactQueryWrapper } from '__helpers__/app-tests'

import { unMask } from 'lib'

import { useCreateAccount } from '.'

describe('useCreateAccount', () => {
  it('should be able create account successfully', async () => {
    const onSuccess = jest.fn()

    const bankingInstitution = bankingInstitutionFactory.build()

    const account = accountFactory.build({
      bankingInstitutionId: bankingInstitution.id,
      bankingInstitution,
    })

    const params = {
      name: account.name,
      category: account.category,
      balance: unMask(account.balance),
      bankingInstitutionId: account.bankingInstitutionId,
      agencyNumber: account.agencyNumber,
      accountNumber: account.accountNumber,
      includeSumOnDashboard: false,
    }

    const createAccountsMock = nock(baseURL)
      .post('/accounts', params)
      .reply(200)

    const { result, waitFor } = renderHook(
      () => useCreateAccount({ onSuccess }),
      {
        wrapper: ReactQueryWrapper,
      },
    )

    result.current.createAccount(params)

    await waitFor(() => expect(createAccountsMock).mockToBeDone())

    await waitFor(() => expect(onSuccess).toHaveBeenCalled())
  })

  it('should not be able create account when request is fails', async () => {
    const onError = jest.fn()

    const bankingInstitution = bankingInstitutionFactory.build()

    const account = accountFactory.build({
      bankingInstitutionId: bankingInstitution.id,
      bankingInstitution,
    })

    const params = {
      name: account.name,
      category: account.category,
      balance: unMask(account.balance),
      bankingInstitutionId: account.bankingInstitutionId,
      agencyNumber: account.agencyNumber,
      accountNumber: account.accountNumber,
      includeSumOnDashboard: false,
    }

    const createAccountsMock = nock(baseURL)
      .post('/accounts', params)
      .reply(404)

    const { result, waitFor } = renderHook(() => useCreateAccount(), {
      wrapper: ReactQueryWrapper,
    })

    result.current.createAccount(params, {
      onError,
    })

    await waitFor(() => expect(createAccountsMock).mockToBeDone())

    await waitFor(() => expect(onError).toHaveBeenCalled())
  })
})
