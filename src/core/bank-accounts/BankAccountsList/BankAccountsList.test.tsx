import React from 'react'

import { render, screen } from '__helpers__/app-tests'

import { BankAccountsList } from '.'

describe('BankAccountsList', () => {
  it('should be able render correctly', async () => {
    render(<BankAccountsList />)

    // Account name + Tooltip
    expect(await screen.findAllByText('Conta Nubank')).toHaveLength(8)
  })
})
