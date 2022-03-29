import React from 'react'
import nock from 'nock'

import { baseURL } from 'config'

import { unMask } from 'lib'

import { accountFactory } from '__factories__/account'
import { bankingInstitutionFactory } from '__factories__'
import { render, screen, waitFor, userEvent } from '__helpers__/app-tests'

import { EditAccountDrawer } from './EditAccountDrawer'

const bankingInstitutions = bankingInstitutionFactory.buildList(1)

describe('EditAccountDrawer', () => {
  it('should be able render correctly', async () => {
    const bankingInstitution = bankingInstitutions[0]

    const bankingInstitutionsMock = nock(baseURL)
      .get('/banking_institutions')
      .reply(200, bankingInstitutions)

    const account = accountFactory.build({
      bankingInstitutionId: bankingInstitution.id,
      bankingInstitution,
    })

    render(<EditAccountDrawer isOpen account={account} onClose={jest.fn()} />)

    await waitFor(() => expect(bankingInstitutionsMock).mockToBeDone())

    expect(screen.getByText('Edit bank account')).toBeInTheDocument()

    expect(
      await screen.findByRole('textbox', {
        name: 'name',
      }),
    ).toBeInTheDocument()

    expect(
      await screen.findByRole('combobox', {
        name: 'bankingInstitutionId',
      }),
    ).toBeDisabled()

    expect(
      await screen.findByRole('textbox', {
        name: 'balance',
      }),
    ).toBeDisabled()

    expect(await screen.findByLabelText('Category')).toBeInTheDocument()

    expect(
      await screen.findByRole('textbox', {
        name: 'agencyNumber',
      }),
    ).toBeDisabled()

    expect(
      await screen.findByRole('textbox', {
        name: 'accountNumber',
      }),
    ).toBeDisabled()

    expect(
      await screen.findByLabelText('includeSumOnDashboard'),
    ).toBeInTheDocument()
  })

  it('should be able edit account successfully', async () => {
    const bankingInstitution = bankingInstitutions[0]

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

    const bankingInstitutionsMock = nock(baseURL)
      .get('/banking_institutions')
      .reply(200, bankingInstitutions)

    const updateAccountMock = nock(baseURL)
      .put(`/accounts/${account.id}`)
      .reply(200, account)

    render(<EditAccountDrawer isOpen account={account} onClose={jest.fn()} />)

    await waitFor(() => expect(bankingInstitutionsMock).mockToBeDone())

    expect(await screen.findByLabelText('submit')).toBeInTheDocument()

    userEvent.type(
      await screen.findByRole('textbox', {
        name: 'name',
      }),
      params.name,
    )

    userEvent.click(await screen.findByLabelText('Category'))

    userEvent.click(await screen.findByText('Investments'))

    userEvent.click(
      await screen.findByRole('button', {
        name: 'To save',
      }),
    )

    await waitFor(() => expect(updateAccountMock).mockToBeDone())

    expect(
      await screen.findByText('Congratulations! Your account been edited.'),
    ).toBeInTheDocument()
  })

  it('should not be able edit account when request is fails', async () => {
    const bankingInstitution = bankingInstitutions[0]

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

    const bankingInstitutionsMock = nock(baseURL)
      .get('/banking_institutions')
      .reply(200, bankingInstitutions)

    const updateAccountMock = nock(baseURL)
      .put(`/accounts/${account.id}`)
      .reply(404, {
        message: 'Already exists bank account with name.',
      })

    render(<EditAccountDrawer isOpen account={account} onClose={jest.fn()} />)

    await waitFor(() => expect(bankingInstitutionsMock).mockToBeDone())

    expect(await screen.findByLabelText('submit')).toBeInTheDocument()

    userEvent.type(
      await screen.findByRole('textbox', {
        name: 'name',
      }),
      params.name,
    )

    userEvent.click(await screen.findByLabelText('Category'))

    userEvent.click(await screen.findByText('Investments'))

    userEvent.click(
      await screen.findByRole('button', {
        name: 'To save',
      }),
    )

    await waitFor(() => expect(updateAccountMock).mockToBeDone())

    expect(
      await screen.findByText('Already exists bank account with name.'),
    ).toBeInTheDocument()
  })
})
