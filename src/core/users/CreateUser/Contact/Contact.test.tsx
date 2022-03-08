import React, { useEffect } from 'react'

import { clearState, setState } from 'core/users'
import {
  render,
  screen,
  userEvent,
  waitFor,
  fireEvent,
} from '__helpers__/app-tests'

import { Contact } from '.'

type Params = {
  fullName: string
  email: string
}

function MockedComponent(params: Params) {
  useEffect(() => {
    setState(params)
  }, [params])

  return <Contact onSubmit={jest.fn()} />
}

describe('Contact', () => {
  beforeEach(() => {
    clearState()
  })

  it('should be able render correctly', () => {
    render(<Contact onSubmit={jest.fn()} />)

    expect(
      screen.getByRole('textbox', {
        name: 'fullName',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('textbox', {
        name: 'email',
      }),
    ).toBeInTheDocument()
  })

  it('should be able render correctly with initial values', async () => {
    const params = {
      fullName: 'Example',
      email: 'example@mail.com',
    }

    render(<MockedComponent {...params} />)

    expect(
      await screen.findByRole('textbox', {
        name: 'fullName',
      }),
    ).toHaveValue(params.fullName)

    expect(
      await screen.findByRole('textbox', {
        name: 'email',
      }),
    ).toHaveValue(params.email)
  })

  it('should be able call onSubmit successfully', async () => {
    const onSubmit = jest.fn()

    const params = {
      fullName: 'Example',
      email: 'example@mail.com',
    }

    render(<Contact onSubmit={onSubmit} />)

    userEvent.type(
      await screen.findByRole('textbox', {
        name: 'fullName',
      }),
      params.fullName,
    )

    userEvent.type(
      await screen.findByRole('textbox', {
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

    await waitFor(() => expect(onSubmit).toBeCalled())
  })

  it('should be able render errors when form is invalid', async () => {
    render(<Contact onSubmit={jest.fn()} />)

    userEvent.type(
      await screen.findByRole('textbox', {
        name: 'fullName',
      }),
      'Example',
    )

    userEvent.type(
      await screen.findByRole('textbox', {
        name: 'email',
      }),
      'wrong-email',
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

    fireEvent.change(
      await screen.findByRole('textbox', {
        name: 'fullName',
      }),
      {
        target: { value: '' },
      },
    )

    expect(
      await screen.findByText('Full name is a required field'),
    ).toBeInTheDocument()
    expect(
      await screen.findByText('Email must be a valid email'),
    ).toBeInTheDocument()
  })
})
