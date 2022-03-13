import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { render, screen, userEvent } from '__helpers__/app-tests'

import { Switch } from '.'

function MockedComponent() {
  const form = useForm({
    defaultValues: {
      example: false,
    },
  })

  return (
    <FormProvider {...form}>
      <Switch name='example' label='Example' />
    </FormProvider>
  )
}

describe('Switch', () => {
  it('should be able match snapshot', () => {
    const { container } = render(<MockedComponent />)

    expect(container).toMatchSnapshot()
  })

  it('should be able render correctly', () => {
    render(<MockedComponent />)

    expect(
      screen.getByRole('switch', {
        name: 'example',
      }),
    ).toBeInTheDocument()
  })

  it('should be able render active state when is true', async () => {
    render(<MockedComponent />)

    expect(
      await screen.findByRole('switch', {
        name: 'example',
      }),
    ).toHaveProperty('checked', false)

    userEvent.click(
      screen.getByRole('switch', {
        name: 'example',
      }),
    )

    expect(
      await screen.findByRole('switch', {
        name: 'example',
      }),
    ).toHaveProperty('checked', true)
  })
})
