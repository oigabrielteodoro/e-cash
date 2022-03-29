import React from 'react'

import { accountFactory } from '__factories__'
import { render, screen } from '__helpers__/app-tests'

import { EditBalanceAccountModal } from '.'

describe('EditBalanceAccountModal', () => {
  it('should be able render correctly', async () => {
    const account = accountFactory.build()

    render(
      <EditBalanceAccountModal isOpen account={account} onClose={jest.fn()} />,
    )

    expect(
      screen.getByText(
        'When changing balance from account, will be created a new transaction to register this change',
      ),
    ).toBeInTheDocument()
  })
})
