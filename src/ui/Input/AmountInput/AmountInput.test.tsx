import React from 'react'
import { useForm } from 'react-hook-form'
import Faker from '@faker-js/faker'

import { render, screen, userEvent } from '__helpers__/app-tests'

import { toDecimal } from 'lib'
import { AmountInput } from './AmountInput'

type Props = {
  error?: string
}

function MockedComponent({ error }: Props) {
  const { register } = useForm()

  return <AmountInput label='Value' error={error} {...register('value')} />
}

describe('AmountInput', () => {
  it('should be able render correctly', () => {
    render(<MockedComponent />)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should be able type text correctly', async () => {
    const valueToType = Faker.datatype.number()

    render(<MockedComponent />)

    const input = screen.getByRole('textbox')

    expect(input).toBeInTheDocument()

    userEvent.type(input, valueToType.toString())

    expect(await screen.findByRole('textbox')).toHaveValue(
      toDecimal(valueToType),
    )
  })

  it('should be able render error message', async () => {
    render(<MockedComponent error='Value is required' />)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByText('Value is required')).toBeInTheDocument()
  })
})
