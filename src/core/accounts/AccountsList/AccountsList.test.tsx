import React from 'react'
import nock from 'nock'

import { baseURL } from 'config'

import { render, screen, waitFor } from '__helpers__/app-tests'
import { accountFactory } from '__factories__/account'

import { AccountsList } from '.'

const accounts = accountFactory.buildList(5)

describe('AccountList', () => {
  it('should be able render correctly', async () => {
    const accountsMock = nock(baseURL).get('/accounts').reply(200, accounts)

    render(<AccountsList onOpenCreateAccountDrawer={jest.fn()} />)

    await waitFor(() => expect(accountsMock).mockToBeDone())

    expect(await screen.findAllByText(accounts[0].name)).toHaveLength(2)
  })

  it('should be able render empty state when accounts length is zero', async () => {
    const accountsMock = nock(baseURL).get('/accounts').reply(200, [])

    render(<AccountsList onOpenCreateAccountDrawer={jest.fn()} />)

    await waitFor(() => expect(accountsMock).mockToBeDone())

    expect(
      await screen.findByRole('button', {
        name: 'Add bank account',
      }),
    ).toBeInTheDocument()
  })

  it('should be able render error when request is fails', async () => {
    const accountsMock = nock(baseURL).get('/accounts').reply(404)

    render(<AccountsList onOpenCreateAccountDrawer={jest.fn()} />)

    await waitFor(() => expect(accountsMock).mockToBeDone())

    expect(
      await screen.findByRole('button', {
        name: 'Try again',
      }),
    ).toBeInTheDocument()
  })
})
