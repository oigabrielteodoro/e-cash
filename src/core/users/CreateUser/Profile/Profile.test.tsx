import React, { useEffect } from 'react'

import { toDecimal } from 'lib'
import { clearState, setState } from 'core/users'
import { render, screen, userEvent } from '__helpers__/app-tests'

import { Profile } from '.'

type Params = {
  likeBeCalled: string
  monthlyIncome: string
  financialObjective: string
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
        name: 'likeBeCalled',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('textbox', {
        name: 'monthlyIncome',
      }),
    ).toBeInTheDocument()

    expect(
      screen.getByRole('combobox', {
        name: 'financialObjective',
      }),
    ).toBeInTheDocument()
  })

  it('should be able render correctly with initial values', async () => {
    const params = {
      likeBeCalled: 'Example',
      monthlyIncome: '10000',
      financialObjective: 'make_extra_income',
    }

    render(<MockedComponent {...params} />)

    expect(
      await screen.findByRole('textbox', {
        name: 'likeBeCalled',
      }),
    ).toHaveValue(params.likeBeCalled)

    expect(
      await screen.findByRole('textbox', {
        name: 'monthlyIncome',
      }),
    ).toHaveValue(toDecimal(params.monthlyIncome))

    expect(
      await screen.findByRole('combobox', {
        name: 'financialObjective',
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
