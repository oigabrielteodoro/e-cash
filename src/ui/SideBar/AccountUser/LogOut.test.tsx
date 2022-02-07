import React, { useState } from 'react'
import Faker from '@faker-js/faker'

import { SIGN_IN } from 'lib'
import { baseURL } from 'config'
import { sessionStore } from 'client'
import { render, screen, userEvent, waitFor, nock } from '__helpers__/app-tests'

import { LogOut } from './LogOut'

function MockedComponent() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Log out</button>
      <LogOut isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

describe('LogOut', () => {
  it('should be able render correctly', async () => {
    render(<MockedComponent />)

    expect(
      screen.getByRole('button', {
        name: 'Log out',
      }),
    ).toBeInTheDocument()

    const button = screen.getByRole('button', {
      name: 'Log out',
    })

    userEvent.click(button)

    expect(
      await screen.findByText(
        /When you exit the application, the data is still saved/i,
      ),
    ).toBeInTheDocument()
  })

  it('should be able open and close modal', async () => {
    render(<MockedComponent />)

    expect(
      screen.getByRole('button', {
        name: 'Log out',
      }),
    ).toBeInTheDocument()

    const button = screen.getByRole('button', {
      name: 'Log out',
    })

    userEvent.click(button)

    expect(
      await screen.findByText(
        'When you exit the application, the data is still saved',
      ),
    ).toBeInTheDocument()

    const cancelButton = screen.getByLabelText('cancel')

    userEvent.click(cancelButton)

    await waitFor(() =>
      expect(
        screen.queryByText(
          'When you exit the application, the data is still saved',
        ),
      ).not.toBeInTheDocument(),
    )
  })

  it('should be able log out user with successfully', async () => {
    const session_id = Faker.datatype.uuid()

    sessionStore.setState({
      session_id,
    })

    const requestMock = nock(baseURL)
      .delete(`/sessions/${session_id}`)
      .reply(200)

    render(<MockedComponent />, {
      routePaths: [SIGN_IN],
    })

    expect(
      screen.getByRole('button', {
        name: 'Log out',
      }),
    ).toBeInTheDocument()

    const button = screen.getByRole('button', {
      name: 'Log out',
    })

    userEvent.click(button)

    expect(
      await screen.findByText(
        /When you exit the application, the data is still saved/i,
      ),
    ).toBeInTheDocument()

    const logOutButton = screen.getByLabelText('confirm log out')

    userEvent.click(logOutButton)

    await waitFor(() => expect(requestMock).mockToBeDone())

    await waitFor(() =>
      expect(
        screen.queryByText(
          /When you exit the application, the data is still saved/i,
        ),
      ).not.toBeInTheDocument(),
    )
  })

  // it('should be able render error when request is failure', async () => {
  //   const session_id = Faker.datatype.uuid()

  //   sessionStore.setState({
  //     session_id,
  //   })

  //   const requestMock = nock(baseURL)
  //     .delete(`/sessions/${session_id}`)
  //     .reply(401, {
  //       message: 'Invalid session',
  //     })

  //   render(<MockedComponent />, {
  //     routePaths: [SIGN_IN],
  //   })

  //   expect(
  //     screen.getByRole('button', {
  //       name: 'Log out',
  //     }),
  //   ).toBeInTheDocument()

  //   const button = screen.getByRole('button', {
  //     name: 'Log out',
  //   })

  //   userEvent.click(button)

  //   expect(
  //     await screen.findByText(
  //       /When you exit the application, the data is still saved/i,
  //     ),
  //   ).toBeInTheDocument()

  //   const logOutButton = screen.getByLabelText('confirm log out')

  //   userEvent.click(logOutButton)

  // Wait for request
  //   await waitFor(() => expect(requestMock).mockToBeDone())

  // expect(await screen.findByText('Invalid session')).toBeInTheDocument()
  // })
})
