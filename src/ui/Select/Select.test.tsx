import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'

import { render, screen, userEvent } from '__helpers__/app-tests'

import { Select } from './Select'

type Props = {
  error?: string
  defaultValue?: string
}

function MockedComponent({ error, defaultValue }: Props) {
  const form = useForm({
    defaultValues: {
      option: defaultValue,
    },
  })

  return (
    <FormProvider {...form}>
      <Select
        name='option'
        label='Option'
        error={error}
        defaultValue={defaultValue}
      >
        <Select.Option value='option_1'>Option 1</Select.Option>
        <Select.Option value='option_2'>Option 2</Select.Option>
        <Select.Option value='option_3'>Option 3</Select.Option>
      </Select>
    </FormProvider>
  )
}

describe('Select', () => {
  it('should be able match snapshot', () => {
    const { container } = render(<MockedComponent />)

    expect(container).toMatchSnapshot()
  })

  it('should be able render correctly', () => {
    render(<MockedComponent />)

    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('should be able render with initial values', async () => {
    const valueToType = 'Option 1'

    render(<MockedComponent defaultValue={valueToType} />)

    expect(await screen.findByRole('combobox')).toHaveValue(valueToType)
  })

  it('should be able open/close successfully', async () => {
    render(<MockedComponent />)

    const input = screen.getByRole('combobox')

    expect(input).toBeInTheDocument()

    userEvent.click(input)

    expect(
      await screen.findByRole('option', {
        name: 'Option 1',
      }),
    ).toBeInTheDocument()
    expect(
      await screen.findByRole('option', {
        name: 'Option 2',
      }),
    ).toBeInTheDocument()
    expect(
      await screen.findByRole('option', {
        name: 'Option 3',
      }),
    ).toBeInTheDocument()
  })

  it('should be able show options based on what user has typed', async () => {
    render(<MockedComponent />)

    const input = screen.getByRole('combobox')

    expect(input).toBeInTheDocument()

    userEvent.click(input)
    userEvent.type(input, 'Option 1')

    expect(
      await screen.findByRole('option', {
        name: 'Option 1',
      }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('option', {
        name: 'Option 2',
      }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('option', {
        name: 'Option 3',
      }),
    ).not.toBeInTheDocument()
  })

  it('should be able render error message', async () => {
    render(<MockedComponent error='Value is required' />)

    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByText('Value is required')).toBeInTheDocument()
  })
})
