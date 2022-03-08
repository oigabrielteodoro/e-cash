import React from 'react'
import Faker from '@faker-js/faker'

import { userFactory } from '__factories__'
import { render, screen, waitFor, nock, userEvent } from '__helpers__/app-tests'

import { baseURL } from 'config'
import { sessionStore } from 'client'

import { AccountUser } from '.'

const user = userFactory.build()

describe('AccountUser', () => {
  it('should be able render correctly', async () => {
    sessionStore.setState({
      token: 'jwt-valid-token',
      isAuthenticated: true,
      userId: Faker.datatype.uuid(),
      sessionId: Faker.datatype.uuid(),
    })

    const userMock = nock(baseURL).get('/profile').reply(200, { user })

    render(<AccountUser />)

    await waitFor(() => expect(userMock).mockToBeDone())

    expect(await screen.findByText(user.likeBeCalled)).toBeInTheDocument()

    expect(
      await screen.findByRole('img', {
        name: user.fullName,
      }),
    ).toBeInTheDocument()
  })

  it('should not be able render component when user is null', async () => {
    sessionStore.setState({
      token: null,
      isAuthenticated: false,
      userId: null,
      sessionId: null,
    })

    render(<AccountUser />)

    await waitFor(() =>
      expect(screen.queryByText(user.likeBeCalled)).not.toBeInTheDocument(),
    )
  })

  it('should be able open popover', async () => {
    sessionStore.setState({
      token: 'jwt-valid-token',
      isAuthenticated: true,
      userId: Faker.datatype.uuid(),
      sessionId: Faker.datatype.uuid(),
    })

    const userMock = nock(baseURL).get('/profile').reply(200, { user })

    render(<AccountUser />)

    await waitFor(() => expect(userMock).mockToBeDone())

    expect(await screen.findByText(user.likeBeCalled)).toBeInTheDocument()

    expect(
      await screen.findByRole('img', {
        name: user.fullName,
      }),
    ).toBeInTheDocument()

    const button = screen.getByRole('button', {
      name: user.likeBeCalled,
    })

    expect(button).toBeInTheDocument()

    userEvent.click(button)

    expect(await screen.findByLabelText(/popover/i)).toBeInTheDocument()

    expect(await screen.findByText(/profile/i)).toBeInTheDocument()
    expect(await screen.findByText(/progress/i)).toBeInTheDocument()
    expect(await screen.findByText(/sessions/i)).toBeInTheDocument()
    expect(await screen.findByText(/log out/i)).toBeInTheDocument()
  })
})
