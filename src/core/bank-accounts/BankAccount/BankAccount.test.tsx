import React from 'react'

import { NUBANK } from 'assets'
import { render, screen } from '__helpers__/app-tests'

import { BankAccount } from '.'

describe('BankAccount', () => {
  it('should be able render correctly', async () => {
    const name = 'Conta Nubank'
    const bankName = 'NU PAGAMENTOS S.A'

    render(<BankAccount name={name} bankName={bankName} flag={NUBANK} />)

    expect(await screen.findByText(name)).toBeInTheDocument()
    expect(await screen.findByText(bankName)).toBeInTheDocument()
  })
})
