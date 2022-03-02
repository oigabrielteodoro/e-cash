import React from 'react'
import { screen, render, userEvent, waitFor } from '__helpers__/app-tests'

import { Tooltip } from '.'

function MockedComponent() {
  return (
    <>
      <Tooltip message='Tooltip' position='top'>
        <button>Hover me Top</button>
      </Tooltip>
      <Tooltip message='Tooltip' position='bottom'>
        <button>Hover me Bottom</button>
      </Tooltip>
      <Tooltip message='Tooltip' position='right'>
        <button>Hover me Right</button>
      </Tooltip>
      <Tooltip message='Tooltip' position='left'>
        <button>Hover me Left</button>
      </Tooltip>
    </>
  )
}

describe('Tooltip', () => {
  it('should be able match snapshot', async () => {
    const { container } = render(<MockedComponent />)

    expect(
      screen.getByRole('button', {
        name: /hover me top/i,
      }),
    ).toBeInTheDocument()

    const button = screen.getByRole('button', {
      name: /hover me top/i,
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
