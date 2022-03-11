import React, { useRef } from 'react'
import nock from 'nock'

import { baseURL } from 'config'
import { bankingInstitutionFactory } from '__factories__'
import { render, screen, waitFor, userEvent } from '__helpers__/app-tests'

import { AccountForm } from './AccountForm'

const bankingInstitutions = bankingInstitutionFactory.buildList(1)

const onSubmit = jest.fn()

function MockedComponent() {
  const formRef = useRef<HTMLButtonElement>(null)

  return (
    <div>
      <AccountForm formRef={formRef} onSubmit={onSubmit} />
      <button onClick={() => formRef.current?.click()}>Submit</button>
    </div>
  )
}

describe('AccountForm', () => {
  beforeEach(() => {
    onSubmit.mockClear()
  })

  it('should be able render correctly', async () => {
    const bankingInstitutionsMock = nock(baseURL)
      .get('/banking_institutions')
      .reply(200, bankingInstitutions)

    render(<MockedComponent />)

    await waitFor(() => expect(bankingInstitutionsMock).mockToBeDone())

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

  it('should be able render errors when fields is invalid', async () => {
    const bankingInstitutionsMock = nock(baseURL)
      .get('/banking_institutions')
      .reply(200, bankingInstitutions)

    render(<MockedComponent />)

    await waitFor(() => expect(bankingInstitutionsMock).mockToBeDone())

    expect(
      screen.queryByText('Name is a required field'),
    ).not.toBeInTheDocument()

    expect(
      screen.queryByText('Banking is a required field'),
    ).not.toBeInTheDocument()

    expect(
      screen.queryByText('Category is a required field'),
    ).not.toBeInTheDocument()

    expect(
      screen.queryByText('Balance is a required field'),
    ).not.toBeInTheDocument()

    expect(
      screen.queryByText('Category is a required field'),
    ).not.toBeInTheDocument()

    expect(
      screen.queryByText('Agency is a required field'),
    ).not.toBeInTheDocument()

    expect(
      screen.queryByText('Account is a required field'),
    ).not.toBeInTheDocument()

    userEvent.click(
      await screen.findByRole('button', {
        name: 'Submit',
      }),
    )

    expect(
      await screen.findByText('Name is a required field'),
    ).toBeInTheDocument()

    expect(
      await screen.findByText('Banking is a required field'),
    ).toBeInTheDocument()

    expect(
      await screen.findByText('Category is a required field'),
    ).toBeInTheDocument()

    expect(
      await screen.findByText('Balance is a required field'),
    ).toBeInTheDocument()

    expect(
      await screen.findByText('Category is a required field'),
    ).toBeInTheDocument()

    expect(
      await screen.findByText('Agency is a required field'),
    ).toBeInTheDocument()

    expect(
      await screen.findByText('Account is a required field'),
    ).toBeInTheDocument()
  })

  it('should be able submit with successfully', async () => {
    const params = {
      name: 'Personal account',
      bankingInstitution: bankingInstitutions[0].id.toString(),
      balance: '10000',
      category: 'money',
      agencyNumber: '0000',
      accountNumber: '0000001',
      includeSumOnDashboard: false,
    }

    const bankingInstitutionsMock = nock(baseURL)
      .get('/banking_institutions')
      .reply(200, bankingInstitutions)

    render(<MockedComponent />)

    await waitFor(() => expect(bankingInstitutionsMock).mockToBeDone())

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
        name: 'Submit',
      }),
    )

    await waitFor(() => expect(onSubmit).toBeCalled())
  })
})
