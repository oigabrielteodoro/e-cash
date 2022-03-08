import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { render, screen, userEvent } from '__helpers__/app-tests'

import { CategoriesSelect } from './CategoriesSelect'

function MockedComponent() {
  const form = useForm()

  return (
    <FormProvider {...form}>
      <CategoriesSelect name='category' label='Category' />
    </FormProvider>
  )
}

describe('CategoriesSelect', () => {
  it('should be able match snapshot', () => {
    const { container } = render(<MockedComponent />)

    expect(container).toMatchSnapshot()
  })

  it('should be able render correctly', async () => {
    render(<MockedComponent />)

    userEvent.click(
      screen.getByRole('combobox', {
        name: 'category',
      }),
    )

    expect(await screen.findByLabelText('Investments')).toBeInTheDocument()
    expect(await screen.findByLabelText('Savings')).toBeInTheDocument()
    expect(await screen.findByLabelText('Money')).toBeInTheDocument()
    expect(await screen.findByLabelText('Checking Account')).toBeInTheDocument()
    expect(await screen.findByLabelText('Payment Account')).toBeInTheDocument()
  })
})
