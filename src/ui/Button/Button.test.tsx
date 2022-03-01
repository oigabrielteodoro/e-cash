import React from 'react'
import { render, screen, userEvent } from '__helpers__/app-tests'

import { Button } from 'ui'

describe('Button', () => {
  it('should be able match snapshot', () => {
    const { container } = render(<Button>Click me</Button>)

    expect(container).toMatchSnapshot()
  })

  it('should be able render correctly', () => {
    render(<Button>Click me</Button>)

    expect(
      screen.getByRole('button', {
        name: /Click me/i,
      }),
    ).toBeInTheDocument()
  })

  it('should be able render correctly when is loading', async () => {
    render(<Button loading>Click me</Button>)

    expect(
      screen.queryByRole('button', {
        name: /Click me/i,
      }),
    ).not.toBeInTheDocument()

    expect(await screen.findByLabelText('loading')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should be able called onClick when user click', async () => {
    const onClick = jest.fn()

    render(<Button onClick={onClick}>Click me</Button>)

    const button = screen.getByRole('button', {
      name: /Click me/i,
    })

    expect(button).toBeInTheDocument()

    userEvent.click(button)

    expect(onClick).toHaveBeenCalled()
  })
})
