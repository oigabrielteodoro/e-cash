import { renderHook } from '@testing-library/react-hooks'
import Faker from '@faker-js/faker'
import nock from 'nock'

import { baseURL } from 'config'

import { unMask } from 'lib'

import { accountFactory } from '__factories__/account'
import { bankingInstitutionFactory } from '__factories__'
import { ReactQueryWrapper } from '__helpers__/app-tests'

import { useUpdateAccount } from '.'

describe('useUpdateAccount', () => {
  it('should be able create account successfully', async () => {
    const onSuccess = jest.fn()

    const accountId = Faker.datatype.uuid()
    const bankingInstitution = bankingInstitutionFactory.build()

    const account = accountFactory.build({
      id: accountId,
      bankingInstitutionId: bankingInstitution.id,
      bankingInstitution,
    })

    const params = {
      name: 'Account',
      category: 'Money',
      includeSumOnDashboard: true,
      balance: unMask(account.balance),
      bankingInstitutionId: account.bankingInstitutionId,
      agencyNumber: account.agencyNumber,
      accountNumber: account.accountNumber,
    }

    const updateAccountMock = nock(baseURL)
      .put(`/accounts/${accountId}`, params)
      .reply(200, account)

    const { result, waitFor } = renderHook(
      () => useUpdateAccount({ onSuccess }),
      {
        wrapper: ReactQueryWrapper,
      },
    )

    result.current.updateAccount({ accountId, ...params })

    await waitFor(() => expect(updateAccountMock).mockToBeDone())

    await waitFor(() => expect(onSuccess).toHaveBeenCalled())
  })

  it('should not be able create account when request is fails', async () => {
    const onError = jest.fn()

    const accountId = Faker.datatype.uuid()
    const bankingInstitution = bankingInstitutionFactory.build()

    const account = accountFactory.build({
      id: accountId,
      bankingInstitutionId: bankingInstitution.id,
      bankingInstitution,
    })

    const params = {
      name: 'Account',
      category: 'Money',
      includeSumOnDashboard: true,
      balance: unMask(account.balance),
      bankingInstitutionId: account.bankingInstitutionId,
      agencyNumber: account.agencyNumber,
      accountNumber: account.accountNumber,
    }

    const updateAccountMock = nock(baseURL)
      .put(`/accounts/${accountId}`, params)
      .reply(404)

    const { result, waitFor } = renderHook(() => useUpdateAccount(), {
      wrapper: ReactQueryWrapper,
    })

    result.current.updateAccount(
      { accountId, ...params },
      {
        onError,
      },
    )

    await waitFor(() => expect(updateAccountMock).mockToBeDone())

    await waitFor(() => expect(onError).toHaveBeenCalled())
  })
})
