import React from 'react'
import { screen, render, userEvent, waitFor } from '__helpers__/app-tests'

import { Tooltip } from '.'

describe('Tooltip', () => {
  it('should be able match snapshot', async () => {
    const { container } = render(
      <Tooltip message='Tooltip' position='top'>
        <button>Hover me</button>
      </Tooltip>,
    )

    expect(
      screen.getByRole('button', {
        name: /hover me/i,
      }),
    ).toBeInTheDocument()

    const button = screen.getByRole('button', {
      name: /hover me/i,
    })

    userEvent.hover(button)

    await waitFor(() => expect(container).toMatchSnapshot())
  })

  it('should render on top position', async () => {
    render(
      <Tooltip message='Tooltip' position='top'>
        <button>Hover me</button>
      </Tooltip>,
    )

    expect(
      screen.getByRole('button', {
        name: /hover me/i,
      }),
    ).toBeInTheDocument()

    const button = screen.getByRole('button', {
      name: /hover me/i,
    })

    userEvent.hover(button)

    expect(await screen.findByText(/tooltip/i)).toBeInTheDocument()
  })

  it('should render on right position', async () => {
    render(
      <Tooltip message='Tooltip'>
        <button>Hover me</button>
      </Tooltip>,
    )

    expect(
      screen.getByRole('button', {
        name: /hover me/i,
      }),
    ).toBeInTheDocument()

    const button = screen.getByRole('button', {
      name: /hover me/i,
    })

    userEvent.hover(button)

    expect(await screen.findByText(/tooltip/i)).toBeInTheDocument()
  })

  it('should render on left position', async () => {
    render(
      <Tooltip message='Tooltip'>
        <button>Hover me</button>
      </Tooltip>,
    )

    expect(
      screen.getByRole('button', {
        name: /hover me/i,
      }),
    ).toBeInTheDocument()

    const button = screen.getByRole('button', {
      name: /hover me/i,
    })

    userEvent.hover(button)

    expect(await screen.findByText(/tooltip/i)).toBeInTheDocument()
  })

  it('should render on bottom position', async () => {
    render(
      <Tooltip message='Tooltip'>
        <button>Hover me</button>
      </Tooltip>,
    )

    expect(
      screen.getByRole('button', {
        name: /hover me/i,
      }),
    ).toBeInTheDocument()

    const button = screen.getByRole('button', {
      name: /hover me/i,
    })

    userEvent.hover(button)

    expect(await screen.findByText(/tooltip/i)).toBeInTheDocument()
  })
})
