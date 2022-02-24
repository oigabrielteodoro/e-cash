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

  it('should be able create account successfully', async () => {
    const params = {
      full_name: 'Example',
      email: 'example@mail.com',
      password: 'Abc123@',
      like_be_called: 'Example',
      monthly_income: '10000',
      financial_objective: 'Make extra income',
    }

    const createAccountMock = nock(baseURL).post('/users').reply(200, {
      id: Faker.datatype.uuid(),
      email: params.email,
    })

    render(<CreateAccount />)

    userEvent.type(
      screen.getByRole('textbox', {
        name: 'full_name',
      }),
      params.full_name,
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
        name: 'like_be_called',
      }),
      params.like_be_called,
    )

    userEvent.type(
      screen.getByRole('textbox', {
        name: 'monthly_income',
      }),
      params.monthly_income,
    )

    userEvent.click(
      screen.getByRole('combobox', {
        name: 'financial_objective',
      }),
    )

    userEvent.click(await screen.findByText(params.financial_objective))

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
})
