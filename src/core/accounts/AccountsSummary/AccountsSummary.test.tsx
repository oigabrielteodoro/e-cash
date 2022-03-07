import React from 'react'

import { render, screen } from '__helpers__/app-tests'

import { AccountsSummary } from '.'

describe('AccountsSummary', () => {
  it('should be able render correctly', async () => {
    render(<AccountsSummary />)

    expect(await screen.findByText('Current balance')).toBeInTheDocument()
    expect(await screen.findByText('Incomes')).toBeInTheDocument()
    expect(await screen.findByText('Expenses')).toBeInTheDocument()
    expect(await screen.findByText('Credit Card')).toBeInTheDocument()
  })
})
