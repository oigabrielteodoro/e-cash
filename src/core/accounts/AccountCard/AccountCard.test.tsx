import React from 'react'
import { accountFactory } from '__factories__/account'

import { render, screen } from '__helpers__/app-tests'

import { AccountCard } from '.'

const account = accountFactory.build()

describe('AccountCard', () => {
  it('should be able render correctly', async () => {
    render(<AccountCard account={account} />)

    expect(
      await screen.findByText(account.bankingInstitution?.institutionName!),
    ).toBeInTheDocument()
  })
})
