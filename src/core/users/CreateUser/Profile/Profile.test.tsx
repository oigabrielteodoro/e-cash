import React, { useEffect } from 'react'

import { toDecimal } from 'lib'
import { clearState, setState } from 'core/users'
import { render, screen, userEvent } from '__helpers__/app-tests'

import { Profile } from '.'

type Params = {
  like_be_called: string
  monthly_income: string
  financial_objective: string
}

function MockedComponent(params: Params) {
  useEffect(() => {
    setState(params)
  }, [params])

  return <Profile />
}

describe('Profile', () => {
  beforeEach(() => {
    clearState()
  })

  it('should be able render correctly', () => {
    render(<Profile />)

    expect(
      screen.getByRole('textbox', {
        name: 'like_be_called',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('textbox', {
        name: 'monthly_income',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('combobox', {
        name: 'financial_objective',
      }),
    ).toBeInTheDocument()
  })

  it('should be able render correctly with initial values', async () => {
    const params = {
      like_be_called: 'Example',
      monthly_income: '10000',
      financial_objective: 'make_extra_income',
    }

    render(<MockedComponent {...params} />)

    expect(
      await screen.findByRole('textbox', {
        name: 'like_be_called',
      }),
    ).toHaveValue(params.like_be_called)

    expect(
      await screen.findByRole('textbox', {
        name: 'monthly_income',
      }),
    ).toHaveValue(toDecimal(params.monthly_income))

    expect(
      await screen.findByRole('combobox', {
        name: 'financial_objective',
      }),
    ).toHaveValue('Make extra income')
  })

  it('should be able render errors when form is invalid', async () => {
    render(<Profile />)

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

    expect(
      await screen.findByText('Like be called is a required field'),
    ).toBeInTheDocument()
    expect(
      await screen.findByText('Monthly income is a required field'),
    ).toBeInTheDocument()
    expect(
      await screen.findByText('Financial objective is a required field'),
    ).toBeInTheDocument()
  })
})
