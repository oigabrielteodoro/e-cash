import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'

import { toast, ToastContainer } from '.'

const props = {
  success: 'Success',
  error: 'Error',
  warning: 'Warning',
  info: 'Info',
}

describe('<Toast />', () => {
  const openToast = jest.fn()

  beforeEach(() => {
    render(
      <>
        <ToastContainer />
        <button onClick={openToast}>Show toast</button>
      </>,
    )
  })

  it('should render a success message', async () => {
    toast.success(props.success)
    const showButton = screen.getByRole('button', { name: /show toast/i })

    fireEvent.click(showButton)

    await waitFor(() => {
      expect(screen.getByText(/success/i)).toBeInTheDocument()
    })
  })

  it('should render an error message', async () => {
    toast.error(props.error)
    const showButton = screen.getByRole('button', { name: /show toast/i })

    fireEvent.click(showButton)

    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument()
    })
  })

  it('should render an warning message', async () => {
    toast.warning(props.warning)
    const showButton = screen.getByRole('button', { name: /show toast/i })

    fireEvent.click(showButton)

    await waitFor(() => {
      expect(screen.getByText(/warning/i)).toBeInTheDocument()
    })
  })

  it('should render an info message', async () => {
    toast.info(props.info)
    const showButton = screen.getByRole('button', { name: /show toast/i })

    fireEvent.click(showButton)

    await waitFor(() => {
      expect(screen.getByText(/info/i)).toBeInTheDocument()
    })
  })
})
