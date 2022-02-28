import React from 'react'
import { AiOutlineCreditCard } from 'react-icons/ai'

import { render, screen } from '__helpers__/app-tests'

import { BankAccountBalanceCard } from '.'

describe('BankAccountBalanceCard', () => {
  it('should be able render correctly', async () => {
    render(
      <BankAccountBalanceCard
        title='Example'
        currentValue={150}
        previousValue={500}
        icon={AiOutlineCreditCard}
      />,
    )

    expect(await screen.findByText('Example')).toBeInTheDocument()
    expect(await screen.findByText('R$ 150,00')).toBeInTheDocument()
  })
})
