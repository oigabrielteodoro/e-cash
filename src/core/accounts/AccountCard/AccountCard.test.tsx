import React from 'react'

import { NUBANK } from 'assets'
import { render, screen } from '__helpers__/app-tests'

import { AccountCard } from '.'

describe('AccountCard', () => {
  it('should be able render correctly', async () => {
    const name = 'Conta Nubank'
    const bankName = 'NU PAGAMENTOS S.A'

    render(
      <AccountCard
        name={name}
        bankName={bankName}
        flag={NUBANK}
        agencyNumber='0001'
        accountNumber='000000001'
        balance='10000'
      />,
    )

    expect(await screen.findByText(name)).toBeInTheDocument()
    expect(await screen.findByText(bankName)).toBeInTheDocument()
  })
})
