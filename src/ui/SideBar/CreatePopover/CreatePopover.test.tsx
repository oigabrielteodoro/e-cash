import React from 'react'

import { render, screen, userEvent, waitFor } from '__helpers__/app-tests'

import { CreatePopover } from '.'

describe('CreatePopover', () => {
  it('should be able render correctly', () => {
    render(<CreatePopover />)

    expect(screen.getByLabelText('create')).toBeInTheDocument()
  })

  it('should be able open popover when button is clicked', async () => {
    render(<CreatePopover />)

    const button = screen.getByLabelText('create')

    expect(button).toBeInTheDocument()

    userEvent.click(button)

    expect(await screen.findByLabelText('popover')).toBeInTheDocument()
    expect(await screen.findByLabelText('income')).toBeInTheDocument()
    expect(await screen.findByLabelText('expense')).toBeInTheDocument()
    expect(await screen.findByLabelText('credit card')).toBeInTheDocument()
    expect(await screen.findByLabelText('transaction')).toBeInTheDocument()
  })

  it('should be able open popover when button is clicked after close', async () => {
    render(<CreatePopover />)

    const button = screen.getByLabelText('create')

    expect(button).toBeInTheDocument()

    userEvent.click(button)

    expect(await screen.findByLabelText('popover')).toBeInTheDocument()
    expect(await screen.findByLabelText('income')).toBeInTheDocument()
    expect(await screen.findByLabelText('expense')).toBeInTheDocument()
    expect(await screen.findByLabelText('credit card')).toBeInTheDocument()
    expect(await screen.findByLabelText('transaction')).toBeInTheDocument()

    userEvent.click(button)

    await waitFor(() =>
      expect(screen.queryByLabelText('popover')).not.toBeInTheDocument(),
    )
  })
})
