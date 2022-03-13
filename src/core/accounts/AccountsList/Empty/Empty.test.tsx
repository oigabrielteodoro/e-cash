import React from 'react'
import { render, screen, userEvent, waitFor } from '__helpers__/app-tests'

import { Empty } from './Empty'

describe('Empty', () => {
  it('should be able match snapshot', () => {
    const { container } = render(
      <Empty onOpenCreateAccountDrawer={jest.fn()} />,
    )

    expect(container).toMatchSnapshot()
  })

  it('should be able open create account drawer', async () => {
    const onOpenCreateAccountDrawer = jest.fn()

    render(<Empty onOpenCreateAccountDrawer={onOpenCreateAccountDrawer} />)

    userEvent.click(
      screen.getByRole('button', {
        name: 'Add bank account',
      }),
    )

    await waitFor(() => expect(onOpenCreateAccountDrawer).toHaveBeenCalled())
  })
})
