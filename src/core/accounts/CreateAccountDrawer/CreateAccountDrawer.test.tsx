import React from 'react'
import nock from 'nock'

import { baseURL } from 'config'

import { unMask } from 'lib'

import { accountFactory } from '__factories__/account'
import { bankingInstitutionFactory } from '__factories__'
import { render, screen, waitFor, userEvent } from '__helpers__/app-tests'

import { CreateAccountDrawer } from './CreateAccountDrawer'

const bankingInstitutions = bankingInstitutionFactory.buildList(1)

describe('CreateAccountDrawer', () => {
  it('should be able render correctly', async () => {
    const bankingInstitutionsMock = nock(baseURL)
      .get('/banking_institutions')
      .reply(200, bankingInstitutions)

    render(<CreateAccountDrawer isOpen onClose={jest.fn()} />)

    await waitFor(() => expect(bankingInstitutionsMock).mockToBeDone())

    expect(screen.getByText('Add bank account')).toBeInTheDocument()

    expect(
      await screen.findByRole('textbox', {
        name: 'name',
      }),
    ).toBeInTheDocument()

    expect(
      await screen.findByRole('combobox', {
        name: 'bankingInstitutionId',
      }),
    ).toBeInTheDocument()

    expect(
      await screen.findByRole('textbox', {
        name: 'balance',
      }),
    ).toBeInTheDocument()

    expect(
      await screen.findByRole('combobox', {
        name: 'category',
      }),
    ).toBeInTheDocument()

    expect(
      await screen.findByRole('textbox', {
        name: 'agencyNumber',
      }),
    ).toBeInTheDocument()

    expect(
      await screen.findByRole('textbox', {
        name: 'accountNumber',
      }),
    ).toBeInTheDocument()

    expect(
      await screen.findByLabelText('includeSumOnDashboard'),
    ).toBeInTheDocument()
  })

  it('should be able create account successfully', async () => {
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

    const createAccountMock = nock(baseURL)
      .post('/accounts', params)
      .reply(200, account)

    render(<CreateAccountDrawer isOpen onClose={jest.fn()} />)

    await waitFor(() => expect(bankingInstitutionsMock).mockToBeDone())

    expect(await screen.findByLabelText('submit')).toBeInTheDocument()

    userEvent.type(
      await screen.findByRole('textbox', {
        name: 'name',
      }),
      params.name,
    )

    userEvent.click(
      await screen.findByRole('combobox', {
        name: 'bankingInstitutionId',
      }),
    )

    userEvent.click(await screen.findByLabelText(bankingInstitutions[0].name))

    userEvent.type(
      await screen.findByRole('textbox', {
        name: 'balance',
      }),
      params.balance,
    )

    userEvent.click(
      await screen.findByRole('combobox', {
        name: 'category',
      }),
    )

    userEvent.click(await screen.findByText('Money'))

    userEvent.type(
      await screen.findByRole('textbox', {
        name: 'agencyNumber',
      }),
      params.agencyNumber,
    )

    userEvent.type(
      await screen.findByRole('textbox', {
        name: 'accountNumber',
      }),
      params.accountNumber,
    )

    userEvent.click(
      await screen.findByRole('button', {
        name: 'To send',
      }),
    )

    await waitFor(() => expect(createAccountMock).mockToBeDone())

    expect(
      await screen.findByText('Congratulations! Your account been added.'),
    ).toBeInTheDocument()
  })

  it('should not be able create account when request is fails', async () => {
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

    const createAccountMock = nock(baseURL)
      .post('/accounts', params)
      .reply(404, {
        message: 'Already exists bank account with name.',
      })

    render(<CreateAccountDrawer isOpen onClose={jest.fn()} />)

    await waitFor(() => expect(bankingInstitutionsMock).mockToBeDone())

    expect(await screen.findByLabelText('submit')).toBeInTheDocument()

    userEvent.type(
      await screen.findByRole('textbox', {
        name: 'name',
      }),
      params.name,
    )

    userEvent.click(
      await screen.findByRole('combobox', {
        name: 'bankingInstitutionId',
      }),
    )

    userEvent.click(await screen.findByLabelText(bankingInstitutions[0].name))

    userEvent.type(
      await screen.findByRole('textbox', {
        name: 'balance',
      }),
      params.balance,
    )

    userEvent.click(
      await screen.findByRole('combobox', {
        name: 'category',
      }),
    )

    userEvent.click(await screen.findByText('Money'))

    userEvent.type(
      await screen.findByRole('textbox', {
        name: 'agencyNumber',
      }),
      params.agencyNumber,
    )

    userEvent.type(
      await screen.findByRole('textbox', {
        name: 'accountNumber',
      }),
      params.accountNumber,
    )

    userEvent.click(
      await screen.findByRole('button', {
        name: 'To send',
      }),
    )

    await waitFor(() => expect(createAccountMock).mockToBeDone())

    expect(
      await screen.findByText('Already exists bank account with name.'),
    ).toBeInTheDocument()
  })
})
