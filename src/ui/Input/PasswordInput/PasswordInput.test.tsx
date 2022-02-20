import React from 'react'
import { useForm } from 'react-hook-form'

import { Input } from 'ui'
import { render, screen, userEvent } from '__helpers__/app-tests'

function MockedComponent() {
  const { register } = useForm()

  return <Input.Password label='Password' {...register('password')} />
}

describe('PasswordInput', () => {
  it('should be able render correctly', async () => {
    render(<MockedComponent />)

    expect(screen.getByLabelText('password')).toBeInTheDocument()
  })

  it('should be able show and hide password', async () => {
    render(<MockedComponent />)

    const input = screen.getByLabelText('password')
    const button = screen.getByRole('button', {
      name: /ControlPasswordType/i,
    })

    expect(input).toBeInTheDocument()
    expect(button).toBeInTheDocument()

    userEvent.type(input, 'John Doe')

    expect(input).toHaveValue('John Doe')

    userEvent.click(button)

    expect(await screen.findByLabelText('password')).toHaveProperty(
      'type',
      'text',
    )

    userEvent.click(
      screen.getByRole('button', {
        name: /ControlPasswordType/i,
      }),
    )

    expect(await screen.findByLabelText('password')).toHaveProperty(
      'type',
      'password',
    )
  })
})
