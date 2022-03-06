import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { FiTag } from 'react-icons/fi'
import Faker from '@faker-js/faker'

import { render, screen, userEvent } from '__helpers__/app-tests'

import { toMask } from 'lib'
import { MaskedInput } from './MaskedInput'

type Props = {
  error?: string
  defaultValue?: string
}

const mask = ['9999']

function MockedComponent({ error, defaultValue }: Props) {
  const form = useForm({
    defaultValues: {
      mask: defaultValue,
    },
  })

  return (
    <FormProvider {...form}>
      <MaskedInput
        mask={mask}
        name='mask'
        label='Mask'
        icon={FiTag}
        error={error}
      />
    </FormProvider>
  )
}

describe('AmountInput', () => {
  it('should be able match snapshot', () => {
    const { container } = render(<MockedComponent />)

    expect(container).toMatchSnapshot()
  })

  it('should be able render correctly', () => {
    render(<MockedComponent />)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should be able render with initial values', async () => {
    const valueToType = Faker.datatype.number().toString()

    render(<MockedComponent defaultValue={valueToType} />)

    expect(await screen.findByRole('textbox')).toHaveValue(
      toMask(valueToType, mask),
    )
  })

  it('should be able type text correctly', async () => {
    const valueToType = Faker.datatype.number().toString()

    render(<MockedComponent />)

    const input = await screen.findByRole('textbox')

    expect(input).toBeInTheDocument()

    userEvent.type(input, valueToType)

    expect(await screen.findByRole('textbox')).toHaveValue(
      toMask(valueToType, mask),
    )
  })

  it('should be able render error message', async () => {
    render(<MockedComponent error='Value is required' />)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByText('Value is required')).toBeInTheDocument()
  })
})
