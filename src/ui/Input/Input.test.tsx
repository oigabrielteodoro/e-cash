import React from 'react'
import { useForm } from 'react-hook-form'
import { FiTag } from 'react-icons/fi'

import { render, screen, userEvent } from '__helpers__/app-tests'

import { Input } from './Input'

type Props = {
  error?: string
}

function WithForm({ error }: Props) {
  const { register } = useForm()

  return <Input label='Name' error={error} icon={FiTag} {...register('name')} />
}

describe('Input', () => {
  it('should be able render correctly', () => {
    render(<WithForm />)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('should be able type text correctly', async () => {
    render(<WithForm />)

    const input = screen.getByRole('textbox')

    expect(input).toBeInTheDocument()

    userEvent.type(input, 'John Doe')

    expect(await screen.findByRole('textbox')).toHaveValue('John Doe')
  })

  it('should be able render error message', async () => {
    render(<WithForm error='Name is required' />)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByText('Name is required')).toBeInTheDocument()
  })
})
