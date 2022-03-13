import React from 'react'

import { render, screen, userEvent, waitFor } from '__helpers__/app-tests'

import { Failure } from './Failure'

describe('Failure', () => {
  it('should be able match snapshot', () => {
    const { container } = render(
      <Failure isLoading={false} onTryAgain={jest.fn()} />,
    )

    expect(container).toMatchSnapshot()
  })

  it('should be able try again', async () => {
    const onTryAgain = jest.fn()

    render(<Failure isLoading={false} onTryAgain={onTryAgain} />)

    userEvent.click(
      screen.getByRole('button', {
        name: 'Try again',
      }),
    )

    await waitFor(() => expect(onTryAgain).toHaveBeenCalled())
  })
})
