import React from 'react'
import { useForm } from 'react-hook-form'

import { render, screen, userEvent } from '__helpers__/app-tests'

import { TextAreaInput } from './TextAreaInput'

type Props = {
  error?: string
}

function MockedComponent({ error }: Props) {
  const { register } = useForm()

  return <TextAreaInput label='Name' error={error} {...register('name')} />
}

describe('TextAreaInput', () => {
  it('should be able match snapshot', () => {
    const { container } = render(<MockedComponent />)

    expect(container).toMatchSnapshot()
  })

  it('should be able render correctly', () => {
    render(<MockedComponent />)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should be able type text correctly', async () => {
    render(<MockedComponent />)

    const input = screen.getByRole('textbox')

    expect(input).toBeInTheDocument()

    userEvent.type(input, 'John Doe')

    expect(await screen.findByRole('textbox')).toHaveValue('John Doe')
  })

  it('should be able render error message', async () => {
    render(<MockedComponent error='Name is required' />)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByText('Name is required')).toBeInTheDocument()
  })
})
