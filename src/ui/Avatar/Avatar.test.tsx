import React from 'react'
import Faker from '@faker-js/faker'

import { render, screen, waitFor, fireEvent } from '__helpers__/app-tests'

import { Avatar } from '.'

describe('Avatar', () => {
  it('should be able render correctly', async () => {
    const name = Faker.name.findName()
    const avatarUrl = Faker.internet.avatar()

    render(<Avatar src={avatarUrl} alt={name} />)

    expect(await screen.findByAltText(name)).toBeInTheDocument()
  })

  it('should be able render default avatar when url is unknown', async () => {
    const onError = jest.fn()

    render(<Avatar alt='Unknown' onError={onError} />)

    fireEvent.error(await screen.findByAltText('Unknown'))

    await waitFor(() => expect(onError).toHaveBeenCalled())
  })
})
