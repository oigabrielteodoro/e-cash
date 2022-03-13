import React from 'react'
import nock from 'nock'
import Faker from '@faker-js/faker'

import { CreateAccount } from 'pages'

import { baseURL } from 'config'
import { render, screen, userEvent, waitFor } from '__helpers__/app-tests'

describe('CreateAccount', () => {
  it('should be able render correctly', () => {
    render(<CreateAccount />)

    expect(screen.getByText('Boost your life with we.')).toBeInTheDocument()
    expect(screen.getByText('Your information')).toBeInTheDocument()
  })

  it('should be able populate form when has initial values', async () => {
    const params = {
      fullName: 'Example',
      email: 'example@mail.com',
      password: 'Abc123@',
      likeBeCalled: 'Example',
      monthlyIncome: '10000',
      financialObjective: 'Make extra income',
    }

    render(<CreateAccount />)

    userEvent.type(
      screen.getByRole('textbox', {
        name: 'fullName',
      }),
      params.fullName,
    )

    userEvent.type(
      screen.getByRole('textbox', {
        name: 'email',
      }),
      params.email,
    )

    expect(
      await screen.findByRole('button', {
        name: 'Confirm your information',
      }),
    ).toBeEnabled()

    userEvent.click(
      await screen.findByRole('button', {
        name: 'Confirm your information',
      }),
    )

    expect(await screen.findByText('Create password')).toBeInTheDocument()

    userEvent.type(
      screen.getByRole('textbox', {
        name: 'password',
      }),
      params.password,
    )

    expect(
      await screen.findByRole('button', {
        name: 'Create your password',
      }),
    ).toBeEnabled()

    userEvent.click(
      await screen.findByRole('button', {
        name: 'Create your password',
      }),
    )

    userEvent.click(
      screen.getByRole('button', {
        name: 'Step Control 1',
      }),
    )

    expect(
      await screen.findByRole('textbox', {
        name: 'password',
      }),
    ).toHaveValue(params.password)
  })

  it('should be able create account successfully', async () => {
    const params = {
      fullName: 'Example',
      email: 'example@mail.com',
      password: 'Abc123@',
      likeBeCalled: 'Example',
      monthlyIncome: '10000',
      financialObjective: 'Make extra income',
    }

    const createAccountMock = nock(baseURL).post('/users').reply(200, {
      id: Faker.datatype.uuid(),
      email: params.email,
    })

    render(<CreateAccount />)

    userEvent.type(
      screen.getByRole('textbox', {
        name: 'fullName',
      }),
      params.fullName,
    )

    userEvent.type(
      screen.getByRole('textbox', {
        name: 'email',
      }),
      params.email,
    )

    expect(
      await screen.findByRole('button', {
        name: 'Confirm your information',
      }),
    ).toBeEnabled()

    userEvent.click(
      await screen.findByRole('button', {
        name: 'Confirm your information',
      }),
    )

    expect(await screen.findByText('Create password')).toBeInTheDocument()

    userEvent.type(
      screen.getByRole('textbox', {
        name: 'password',
      }),
      params.password,
    )

    expect(
      await screen.findByRole('button', {
        name: 'Create your password',
      }),
    ).toBeEnabled()

    userEvent.click(
      await screen.findByRole('button', {
        name: 'Create your password',
      }),
    )

    expect(
      await screen.findByText('A little more about you...'),
    ).toBeInTheDocument()

    userEvent.type(
      screen.getByRole('textbox', {
        name: 'likeBeCalled',
      }),
      params.likeBeCalled,
    )

    userEvent.type(
      screen.getByRole('textbox', {
        name: 'monthlyIncome',
      }),
      params.monthlyIncome,
    )

    userEvent.click(
      screen.getByRole('combobox', {
        name: 'financialObjective',
      }),
    )

    userEvent.click(await screen.findByText(params.financialObjective))

    expect(
      await screen.findByRole('button', {
        name: 'Create your account',
      }),
    ).toBeEnabled()

    userEvent.click(
      await screen.findByRole('button', {
        name: 'Create your account',
      }),
    )

    await waitFor(() => expect(createAccountMock).mockToBeDone())

    expect(
      await screen.findByText('Your account is created!'),
    ).toBeInTheDocument()
  })

  it('should not be able create account when response is an error', async () => {
    const params = {
      fullName: 'Example',
      email: 'example@mail.com',
      password: 'Abc123@',
      likeBeCalled: 'Example',
      monthlyIncome: '10000',
      financialObjective: 'Make extra income',
    }

    const createAccountMock = nock(baseURL).post('/users').reply(404, {
      message: 'Already exists user with email',
    })

    render(<CreateAccount />)

    userEvent.type(
      screen.getByRole('textbox', {
        name: 'fullName',
      }),
      params.fullName,
    )

    userEvent.type(
      screen.getByRole('textbox', {
        name: 'email',
      }),
      params.email,
    )

    expect(
      await screen.findByRole('button', {
        name: 'Confirm your information',
      }),
    ).toBeEnabled()

    userEvent.click(
      await screen.findByRole('button', {
        name: 'Confirm your information',
      }),
    )

    expect(await screen.findByText('Create password')).toBeInTheDocument()

    userEvent.type(
      screen.getByRole('textbox', {
        name: 'password',
      }),
      params.password,
    )

    expect(
      await screen.findByRole('button', {
        name: 'Create your password',
      }),
    ).toBeEnabled()

    userEvent.click(
      await screen.findByRole('button', {
        name: 'Create your password',
      }),
    )

    expect(
      await screen.findByText('A little more about you...'),
    ).toBeInTheDocument()

    userEvent.type(
      screen.getByRole('textbox', {
        name: 'likeBeCalled',
      }),
      params.likeBeCalled,
    )

    userEvent.type(
      screen.getByRole('textbox', {
        name: 'monthlyIncome',
      }),
      params.monthlyIncome,
    )

    userEvent.click(
      screen.getByRole('combobox', {
        name: 'financialObjective',
      }),
    )

    userEvent.click(await screen.findByText(params.financialObjective))

    expect(
      await screen.findByRole('button', {
        name: 'Create your account',
      }),
    ).toBeEnabled()

    userEvent.click(
      await screen.findByRole('button', {
        name: 'Create your account',
      }),
    )

    await waitFor(() => expect(createAccountMock).mockToBeDone())

    expect(
      await screen.findByText('Already exists user with email'),
    ).toBeInTheDocument()
  })
})
