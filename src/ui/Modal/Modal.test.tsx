import React from 'react'

import { render, screen, waitFor, userEvent } from '__helpers__/app-tests'

import { Modal } from 'ui'

describe('Modal', () => {
  it('should be able render correctly', () => {
    const onClose = jest.fn()

    render(
      <Modal isOpen={true} onClose={onClose}>
        <h1>Modal</h1>
      </Modal>,
    )

    expect(screen.getByText(/Modal/i)).toBeInTheDocument()
  })

  it('should close Modal when close button is clicked', async () => {
    const onClose = jest.fn()

    render(
      <Modal isOpen={true} onClose={onClose}>
        <h1>Modal</h1>
      </Modal>,
    )

    const closeButton = screen.getByLabelText('close button')

    await waitFor(() => {
      expect(onClose).not.toHaveBeenCalled()
    })

    userEvent.click(closeButton)

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })

  it('should close Modal when Escape is pressed', async () => {
    const onClose = jest.fn()

    render(
      <Modal isOpen={true} onClose={onClose}>
        <h1>Modal</h1>
      </Modal>,
    )

    await waitFor(() => {
      expect(onClose).not.toHaveBeenCalled()
    })

    userEvent.keyboard('{Escape}')

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })
})
