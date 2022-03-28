import React from 'react'
import Faker from '@faker-js/faker'
import nock from 'nock'

import { baseURL } from 'config'
import { render, screen, waitFor, userEvent } from '__helpers__/app-tests'

import { ConfirmDeleteAccountModal } from './ConfirmDeleteAccountModal'

const accountId = Faker.datatype.uuid()

describe('ConfirmDeleteAccountModal', () => {
  it('should be able render correctly', () => {
    render(
      <ConfirmDeleteAccountModal
        isOpen
        accountId={accountId}
        onClose={jest.fn()}
      />,
    )

    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('should be able close modal', async () => {
    const onClose = jest.fn()

    render(
      <ConfirmDeleteAccountModal
        isOpen
        accountId={accountId}
        onClose={onClose}
      />,
    )

    userEvent.click(
      screen.getByRole('button', {
        name: 'No, please',
      }),
    )

    await waitFor(() => expect(onClose).toHaveBeenCalled())
  })

  it('should be able delete account successfully', async () => {
    const onClose = jest.fn()

    const requestMock = nock(baseURL)
      .delete(`/accounts/${accountId}`)
      .reply(204)

    render(
      <ConfirmDeleteAccountModal
        isOpen
        accountId={accountId}
        onClose={onClose}
      />,
    )

    userEvent.click(
      screen.getByRole('button', {
        name: 'Yes, delete!',
      }),
    )

    await waitFor(() => expect(requestMock).mockToBeDone())
    await waitFor(() => expect(onClose).toHaveBeenCalled())
  })

  it('should not be able delete account when request is fails', async () => {
    const requestMock = nock(baseURL)
      .delete(`/accounts/${accountId}`)
      .reply(404)

    render(
      <ConfirmDeleteAccountModal
        isOpen
        accountId={accountId}
        onClose={jest.fn()}
      />,
    )

    userEvent.click(
      screen.getByRole('button', {
        name: 'Yes, delete!',
      }),
    )

    await waitFor(() => expect(requestMock).mockToBeDone())

    expect(
      await screen.findByText(
        'Hmm... There was an error trying to delete your account!',
      ),
    ).toBeInTheDocument()
  })
})
