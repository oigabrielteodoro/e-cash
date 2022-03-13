import React from 'react'

import { render, screen, waitFor, userEvent } from '__helpers__/app-tests'

import { Drawer } from 'ui'

const onClose = jest.fn()

function MockedComponent() {
  return (
    <Drawer
      isOpen
      onClose={onClose}
      header={<h1>Header</h1>}
      footer={<h1>Footer</h1>}
    >
      <h1>Drawer</h1>
    </Drawer>
  )
}

describe('Drawer', () => {
  beforeEach(() => {
    onClose.mockClear()
  })

  it('should be able match snapshot', () => {
    const { container } = render(<MockedComponent />)

    expect(container).toMatchSnapshot()
  })

  it('should be able render correctly', () => {
    render(<MockedComponent />)

    expect(screen.getByText(/Drawer/i)).toBeInTheDocument()
  })

  it('should close drawer when close button is clicked', async () => {
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

  it('should close drawer when escape is pressed', async () => {
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
