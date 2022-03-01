/* eslint-disable react/display-name */
import React from 'react'
import { AiOutlineDashboard, AiOutlineUser } from 'react-icons/ai'

import { render, screen, userEvent } from '__helpers__/app-tests'
import { theme } from 'config'
import { sidebarStore } from 'lib'

import { NavItem } from '.'

function MockedComponent() {
  return (
    <>
      <NavItem to='/dashboard' icon={AiOutlineDashboard}>
        Dashboard
      </NavItem>
      <NavItem to='/transactions' icon={AiOutlineUser}>
        Transactions
      </NavItem>
    </>
  )
}

describe('NavItem', () => {
  it('should be able match snapshot', () => {
    const { container } = render(
      <NavItem to='/' icon={AiOutlineDashboard}>
        Link
      </NavItem>,
    )

    expect(container).toMatchSnapshot()
  })

  it('should be able render correctly', async () => {
    render(
      <NavItem to='/' icon={AiOutlineDashboard}>
        Link
      </NavItem>,
    )

    expect(screen.getByLabelText('link')).toBeInTheDocument()
  })

  it('should be able render with active state', async () => {
    render(
      <NavItem to='/' icon={AiOutlineDashboard}>
        Dashboard
      </NavItem>,
    )

    expect(screen.getByLabelText('dashboard')).toBeInTheDocument()
    expect(screen.getByLabelText('dashboard icon')).toHaveStyle(
      `background: ${theme.colors.white}`,
    )
  })

  it('should be able render with active and open state', async () => {
    sidebarStore.setState({
      isOpen: true,
    })

    render(
      <NavItem to='/' icon={AiOutlineDashboard}>
        Dashboard
      </NavItem>,
    )

    expect(screen.getByLabelText('dashboard')).toBeInTheDocument()
    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByLabelText('dashboard icon')).toHaveStyle(
      `background: ${theme.colors.white}`,
    )
  })

  it('should not be able render with active state when his is not active', async () => {
    render(
      <NavItem to='/wrong-url-to-active-state' icon={AiOutlineDashboard}>
        Dashboard
      </NavItem>,
    )

    expect(screen.getByLabelText('dashboard')).toBeInTheDocument()
    expect(screen.getByLabelText('dashboard icon')).not.toHaveStyle(
      `background: ${theme.colors.white}`,
    )
  })

  it('should be able navigate to transactions page', async () => {
    render(<MockedComponent />, {
      initialRoute: '/dashboard',
      initialRoutePath: '/dashboard',
      routePaths: ['/transactions'],
    })

    expect(screen.getByLabelText('dashboard')).toBeInTheDocument()
    expect(screen.getByLabelText('transactions')).toBeInTheDocument()

    expect(screen.getByLabelText('dashboard icon')).toHaveStyle(
      `background: ${theme.colors.white}`,
    )

    const link = screen.getByLabelText('transactions')

    userEvent.click(link)

    expect(await screen.findByLabelText('dashboard')).toBeInTheDocument()
    expect(await screen.findByLabelText('transactions')).toBeInTheDocument()

    expect(await screen.findByLabelText('dashboard icon')).not.toHaveStyle(
      `background: ${theme.colors.white}`,
    )
    expect(await screen.findByLabelText('transactions icon')).toHaveStyle(
      `background: ${theme.colors.white}`,
    )
  })
})
