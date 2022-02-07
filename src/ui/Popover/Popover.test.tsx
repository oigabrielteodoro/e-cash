import React from 'react'

import { Popover } from 'ui'
import { render, screen, userEvent, waitFor } from '__helpers__/app-tests'

function MockedComponent() {
  return (
    <Popover position='top' innerContent={<h1>Popover content</h1>}>
      Open popover
    </Popover>
  )
}

describe('Popover', () => {
  it('should be able render correctly', () => {
    render(<MockedComponent />)

    expect(
      screen.getByRole('button', {
        name: 'Open popover',
      }),
    ).toBeInTheDocument()
  })

  it('should be able open and close popover', async () => {
    render(<MockedComponent />)

    const button = screen.getByRole('button', {
      name: 'Open popover',
    })

    expect(button).toBeInTheDocument()

    userEvent.click(button)

    expect(await screen.findByText('Popover content')).toBeInTheDocument()

    userEvent.click(button)

    await waitFor(() =>
      expect(screen.queryByText('Popover content')).toBeInTheDocument(),
    )
  })
})
