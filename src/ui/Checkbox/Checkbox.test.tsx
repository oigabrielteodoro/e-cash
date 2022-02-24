import React from 'react'

import { render, screen, userEvent } from '__helpers__/app-tests'

import { Checkbox } from '.'

describe('Checkbox', () => {
  it('should be able render correctly', () => {
    render(<Checkbox label='Checkbox' />)

    expect(
      screen.getByRole('checkbox', {
        name: 'Checkbox',
      }),
    ).toBeInTheDocument()
    expect(screen.getByText('Checkbox')).toBeInTheDocument()
  })

  it('should be able call onChange when status changes', async () => {
    const onChange = jest.fn()

    render(<Checkbox label='Checkbox' onChange={onChange} />)

    const checkbox = screen.getByRole('checkbox', {
      name: 'Checkbox',
    })

    expect(checkbox).toBeInTheDocument()
    expect(screen.getByText('Checkbox')).toBeInTheDocument()

    userEvent.click(checkbox)

    expect(onChange).toBeCalled()
    expect(
      await screen.findByRole('checkbox', {
        name: 'Checkbox',
      }),
    ).toBeChecked()
  })
})
