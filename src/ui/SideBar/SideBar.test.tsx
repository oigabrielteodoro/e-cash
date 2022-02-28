import React from 'react'

import { SideBar } from 'ui'
import { theme } from 'config'
import { sidebarStore } from 'lib'
import { render, screen, userEvent } from '__helpers__/app-tests'

describe('SideBar', () => {
  beforeEach(() => {
    sidebarStore.setState({
      isOpen: false,
    })
  })

  it('should be able render correctly', () => {
    render(<SideBar />)

    expect(screen.getByLabelText('sidebar')).toBeInTheDocument()
  })

  it('should be able open with successfully', async () => {
    render(<SideBar />)

    expect(screen.getByLabelText('sidebar')).toBeInTheDocument()

    const button = screen.getByLabelText('toggle sidebar')

    expect(button).toBeInTheDocument()

    expect(screen.getByLabelText('sidebar')).toHaveStyle(
      `width: ${theme.grid.sideBar.closed}`,
    )

    userEvent.click(button)

    expect(await screen.findByLabelText('sidebar')).toHaveStyle(
      `width: ${theme.grid.sideBar.open}`,
    )
  })

  it('should be able open and after close with successfully', async () => {
    render(<SideBar />)

    expect(screen.getByLabelText('sidebar')).toBeInTheDocument()

    const button = screen.getByLabelText('toggle sidebar')

    expect(button).toBeInTheDocument()

    expect(screen.getByLabelText('sidebar')).toHaveStyle(
      `width: ${theme.grid.sideBar.closed}`,
    )

    userEvent.click(button)

    expect(await screen.findByLabelText('sidebar')).toHaveStyle(
      `width: ${theme.grid.sideBar.open}`,
    )

    userEvent.click(button)

    expect(await screen.findByLabelText('sidebar')).toHaveStyle(
      `width: ${theme.grid.sideBar.closed}`,
    )
  })
})
