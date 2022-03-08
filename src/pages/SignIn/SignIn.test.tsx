import React from 'react'
import Faker from '@faker-js/faker'
import nock from 'nock'

import { SignIn } from 'pages'
import { baseURL } from 'config'
import { DASHBOARD, SIGN_IN } from 'lib'
import { render, screen, userEvent, waitFor } from '__helpers__/app-tests'

describe('SignIn', () => {
  it('should be able render correctly', () => {
    render(<SignIn />, {
      authenticated: false,
    })

    expect(
      screen.getByRole('textbox', {
        name: 'email',
      }),
    ).toBeInTheDocument()

    expect(screen.getByLabelText('password')).toBeInTheDocument()
  })

  it('should be able sign in with successfully', async () => {
    const params = {
      email: 'example@example.com',
      password: '123456',
    }

    const requestMock = nock(baseURL).post('/sessions', params).reply(200, {
      userId: Faker.datatype.uuid(),
      sessionId: Faker.datatype.uuid(),
      token: Faker.datatype.uuid(),
    })

    render(<SignIn />, {
      authenticated: false,
      routePaths: [DASHBOARD],
    })

    const inputEmail = screen.getByRole('textbox', {
      name: 'email',
    })

    const inputPassword = screen.getByLabelText('password')

    const button = screen.getByRole('button', {
      name: 'Join in account',
    })

    expect(inputEmail).toBeInTheDocument()
    expect(inputPassword).toBeInTheDocument()

    userEvent.type(inputEmail, params.email)
    userEvent.type(inputPassword, params.password)

    userEvent.click(button)

    await waitFor(() => expect(requestMock).mockToBeDone())
  })

  it('should not be able sign in when credentials is invalid', async () => {
    const params = {
      email: 'example@example.com',
      password: '123456',
    }

    const requestMock = nock(baseURL).post('/sessions', params).reply(401, {
      message: 'Invalid email/password',
    })

    render(<SignIn />, {
      authenticated: false,
      routePaths: [DASHBOARD],
    })

    const inputEmail = screen.getByRole('textbox', {
      name: 'email',
    })

    const inputPassword = screen.getByLabelText('password')

    const button = screen.getByRole('button', {
      name: 'Join in account',
    })

    expect(inputEmail).toBeInTheDocument()
    expect(inputPassword).toBeInTheDocument()

    userEvent.type(inputEmail, params.email)
    userEvent.type(inputPassword, params.password)

    userEvent.click(button)

    await waitFor(() => expect(requestMock).mockToBeDone())

    expect(
      await screen.findByText('Invalid email/password'),
    ).toBeInTheDocument()
  })

  it('should be able render field errors when form is empty', async () => {
    render(<SignIn />, {
      authenticated: false,
      initialRoute: SIGN_IN,
      initialRoutePath: SIGN_IN,
    })

    const button = screen.getByRole('button', {
      name: 'Join in account',
    })

    userEvent.click(button)

    expect(
      await screen.findByText('Email is a required field'),
    ).toBeInTheDocument()
    expect(
      await screen.findByText('Password is a required field'),
    ).toBeInTheDocument()
  })

  it('should be able render field errors when form is invalid', async () => {
    render(<SignIn />, {
      authenticated: false,
      initialRoute: SIGN_IN,
      initialRoutePath: SIGN_IN,
    })

    const inputEmail = screen.getByRole('textbox', {
      name: 'email',
    })

    const button = screen.getByRole('button', {
      name: 'Join in account',
    })

    userEvent.type(inputEmail, 'wrong-email')

    userEvent.click(button)

    expect(
      await screen.findByText('Email must be a valid email'),
    ).toBeInTheDocument()
  })
})
