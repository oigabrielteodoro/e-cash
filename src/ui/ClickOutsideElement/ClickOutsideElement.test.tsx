import React, { useState } from 'react'

import { render, screen, userEvent } from '__helpers__/app-tests'

import { ClickOutsideElement } from './ClickOutsideElement'

function MockedComponent() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <ClickOutsideElement isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <h1>{isOpen ? 'Open' : 'Close'}</h1>
    </ClickOutsideElement>
  )
}

describe('ClickOutsideElement', () => {
  it('should be able close when user click outside', async () => {
    render(<MockedComponent />)

    expect(screen.getByText('Open')).toBeInTheDocument()

    userEvent.click(document.body)

    expect(await screen.findByText('Close')).toBeInTheDocument()
  })

  it('should be able call onClose when user click outside', async () => {
    const onClose = jest.fn()

    render(
      <ClickOutsideElement isOpen onClose={onClose}>
        <h1>Children</h1>
      </ClickOutsideElement>,
    )

    userEvent.click(document.body)

    expect(onClose).toHaveBeenCalled()
  })
})
