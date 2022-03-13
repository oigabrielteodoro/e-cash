import React from 'react'

import { render, screen, waitFor, userEvent } from '__helpers__/app-tests'

import { Modal } from 'ui'

const onClose = jest.fn()

function MockedComponent() {
  return (
    <Modal isOpen onClose={onClose}>
      <h1>Modal</h1>
    </Modal>
  )
}

describe('Modal', () => {
  beforeEach(() => {
    onClose.mockClear()
  })

  it('should be able match snapshot', () => {
    const { container } = render(<MockedComponent />)

    expect(container).toMatchSnapshot()
  })

  it('should be able render correctly', () => {
    render(<MockedComponent />)

    expect(screen.getByText(/Modal/i)).toBeInTheDocument()
  })

  it('should close modal when close button is clicked', async () => {
    render(<MockedComponent />)

    const closeButton = screen.getByLabelText('close button')

    await waitFor(() => {
      expect(onClose).not.toHaveBeenCalled()
    })

    userEvent.click(closeButton)

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })

  it('should close modal when escape is pressed', async () => {
    render(<MockedComponent />)

    await waitFor(() => {
      expect(onClose).not.toHaveBeenCalled()
    })

    userEvent.keyboard('{Escape}')

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })
})
