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
      user_id: Faker.datatype.uuid(),
      session_id: Faker.datatype.uuid(),
    })

    const userMock = nock(baseURL).get('/profile').reply(200, { user })

    render(<AccountUser />)

    await waitFor(() => expect(userMock).mockToBeDone())

    expect(await screen.findByText(user.like_be_called)).toBeInTheDocument()

    expect(
      await screen.findByRole('img', {
        name: user.full_name,
      }),
    ).toBeInTheDocument()
  })

  it('should not be able render component when user is null', async () => {
    const userMock = nock(baseURL).get('/profile').reply(401)

    render(<AccountUser />)

    await waitFor(() => expect(userMock).mockToBeDone())

    await waitFor(() =>
      expect(screen.queryByText(user.like_be_called)).not.toBeInTheDocument(),
    )
  })

  it('should be able open popover', async () => {
    sessionStore.setState({
      token: 'jwt-valid-token',
      isAuthenticated: true,
      user_id: Faker.datatype.uuid(),
      session_id: Faker.datatype.uuid(),
    })

    const userMock = nock(baseURL).get('/profile').reply(200, { user })

    render(<AccountUser />)

    await waitFor(() => expect(userMock).mockToBeDone())

    expect(await screen.findByText(user.like_be_called)).toBeInTheDocument()

    expect(
      await screen.findByRole('img', {
        name: user.full_name,
      }),
    ).toBeInTheDocument()

    const button = screen.getByRole('button', {
      name: user.like_be_called,
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
