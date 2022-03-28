import React from 'react'

import { accountFactory } from '__factories__/account'
import { render, screen, userEvent, waitFor } from '__helpers__/app-tests'

import { accountNumberWithDigitMask, toMask } from 'lib'

import { AccountModal } from './AccountModal'

const account = accountFactory.build()

describe('AccountModal', () => {
  it('should be able render correctly', () => {
    render(<AccountModal isOpen account={account} onClose={jest.fn()} />)

    expect(screen.getByText('Account details')).toBeInTheDocument()
    expect(screen.getByText(account.name)).toBeInTheDocument()
    expect(
      screen.getByText(account.bankingInstitution?.institutionName!),
    ).toBeInTheDocument()
    expect(screen.getByText(account.agencyNumber)).toBeInTheDocument()
    expect(
      screen.getByText(
        toMask(account.accountNumber, [accountNumberWithDigitMask]),
      ),
    ).toBeInTheDocument()
  })

  it('should be able close modal successfully', async () => {
    const onClose = jest.fn()

    render(<AccountModal isOpen account={account} onClose={onClose} />)

    userEvent.click(
      screen.getByRole('button', {
        name: 'close button',
      }),
    )

    await waitFor(() => expect(onClose).toHaveBeenCalled())
  })
})
