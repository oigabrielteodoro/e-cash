import React from 'react'
import { render, screen, userEvent } from '__helpers__/app-tests'

import { Button } from 'ui'

describe('Button', () => {
  it('should be able match snapshot', () => {
    const { container } = render(<Button.IconBadge>Click me</Button.IconBadge>)

    expect(container).toMatchSnapshot()
  })

  it('should be able render correctly', () => {
    render(<Button.IconBadge>Click me</Button.IconBadge>)

    expect(
      screen.getByRole('button', {
        name: /Click me/i,
      }),
    ).toBeInTheDocument()
  })

  it('should be able render correctly with danger variant', () => {
    render(<Button.IconBadge variant='danger'>Click me</Button.IconBadge>)

    expect(
      screen.getByRole('button', {
        name: /Click me/i,
      }),
    ).toBeInTheDocument()
  })

  it('should be able called onClick when user click', async () => {
    const onClick = jest.fn()

    render(<Button.IconBadge onClick={onClick}>Click me</Button.IconBadge>)

    const button = screen.getByRole('button', {
      name: /Click me/i,
    })

    expect(button).toBeInTheDocument()

    userEvent.click(button)

    expect(onClick).toHaveBeenCalled()
  })
})
