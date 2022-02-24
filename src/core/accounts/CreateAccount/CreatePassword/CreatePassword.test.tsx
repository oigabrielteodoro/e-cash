import React, { useEffect } from 'react'

import { clearState, setState } from 'core/accounts'
import {
  render,
  screen,
  userEvent,
  waitFor,
  fireEvent,
} from '__helpers__/app-tests'

import { CreatePassword } from '.'

type Params = {
  password: string
}

function MockedComponent(params: Params) {
  useEffect(() => {
    setState(params)
  }, [params])

  return <CreatePassword onSubmit={jest.fn()} />
}

describe('CreatePassword', () => {
  beforeEach(() => {
    clearState()
  })

  it('should be able render correctly', () => {
    render(<CreatePassword onSubmit={jest.fn()} />)

    expect(
      screen.getByRole('textbox', {
        name: 'password',
      }),
    ).toBeInTheDocument()
  })

  it('should be able render correctly with initial values', async () => {
    const password = 'Abc123@'

    render(<MockedComponent password={password} />)

    expect(
      await screen.findByRole('textbox', {
        name: 'password',
      }),
    ).toHaveValue(password)
  })

  it('should be able call onSubmit successfully', async () => {
    const onSubmit = jest.fn()
    const password = 'Abc123@'

    render(<CreatePassword onSubmit={onSubmit} />)

    userEvent.type(
      await screen.findByRole('textbox', {
        name: 'password',
      }),
      password,
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

    await waitFor(() => expect(onSubmit).toBeCalled())
  })

  it('should be able render errors when form is invalid', async () => {
    render(<CreatePassword onSubmit={jest.fn()} />)

    userEvent.type(
      await screen.findByRole('textbox', {
        name: 'password',
      }),
      'wrong-password',
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

    fireEvent.change(
      await screen.findByRole('textbox', {
        name: 'password',
      }),
      {
        target: { value: '' },
      },
    )

    expect(
      await screen.findByText('Password is a required field'),
    ).toBeInTheDocument()

    userEvent.type(
      await screen.findByRole('textbox', {
        name: 'password',
      }),
      'ab',
    )

    expect(await screen.findByText('Weak')).toBeInTheDocument()

    userEvent.type(
      await screen.findByRole('textbox', {
        name: 'password',
      }),
      'ab12',
    )

    expect(await screen.findByText('Average')).toBeInTheDocument()

    userEvent.type(
      await screen.findByRole('textbox', {
        name: 'password',
      }),
      'Abc123@',
    )

    expect(await screen.findByText('Strong')).toBeInTheDocument()
  })
})
