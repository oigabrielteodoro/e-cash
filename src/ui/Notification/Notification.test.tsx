import React from 'react'
import { render, screen, userEvent } from '__helpers__/app-tests'

import { notification } from './Notification'
import { NotificationContainer } from './NotificationContainer'

import type { NotificationType } from './types'

type MockedComponentProps = {
  type?: NotificationType
}

function MockedComponent({ type = 'info' }: MockedComponentProps) {
  return (
    <>
      <button onClick={() => notification[type]('Notification')}>
        Send notification
      </button>
      <NotificationContainer />
    </>
  )
}

describe('Notification', () => {
  it('should be able render correctly', async () => {
    render(<MockedComponent />)

    userEvent.click(screen.getByRole('button'))

    expect(await screen.findByText('Notification')).toBeInTheDocument()
  })

  it('should be able render correctly when type is error', async () => {
    render(<MockedComponent type='error' />)

    userEvent.click(screen.getByRole('button'))

    expect(await screen.findByText('Notification')).toBeInTheDocument()
  })

  it('should be able render correctly when type is warning', async () => {
    render(<MockedComponent type='warning' />)

    userEvent.click(screen.getByRole('button'))

    expect(await screen.findByText('Notification')).toBeInTheDocument()
  })

  it('should be able render correctly when type is info', async () => {
    render(<MockedComponent type='info' />)

    userEvent.click(screen.getByRole('button'))

    expect(await screen.findByText('Notification')).toBeInTheDocument()
  })
})
