import React from 'react'
import { faker } from '@faker-js/faker'

import { userFactory } from '__factories__'
import { render, screen, waitFor, nock } from '__helpers__/app-tests'

import { baseURL } from 'config'
import { useSessionStore } from 'client'

import { AccountUser } from '.'

const user = userFactory.build()

describe('AccountUser', () => {
  it('should be able render correctly', async () => {
    useSessionStore.setState({
      token: 'jwt-valid-token',
      isAuthenticated: true,
      user_id: faker.datatype.uuid(),
      session_id: faker.datatype.uuid(),
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
})
