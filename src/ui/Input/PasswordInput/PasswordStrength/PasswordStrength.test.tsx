import React from 'react'
import { render, screen } from '@testing-library/react'

import { PasswordStrength } from './PasswordStrength'

describe('PasswordStrength', () => {
  it('should render correctly', () => {
    render(<PasswordStrength value='' />)

    expect(screen.getByText('Password strength')).toBeInTheDocument()
  })

  it('should render low is correctly', () => {
    render(<PasswordStrength value='a' />)

    expect(screen.getByText('Password strength')).toBeInTheDocument()
    expect(screen.getByText('Weak')).toBeInTheDocument()
  })

  it('should render medium is correctly', () => {
    render(<PasswordStrength value='Ab12' />)

    expect(screen.getByText('Password strength')).toBeInTheDocument()
    expect(screen.getByText('Average')).toBeInTheDocument()
  })

  it('should render strong is correctly', () => {
    render(<PasswordStrength value='Abc123$' />)

    expect(screen.getByText('Password strength')).toBeInTheDocument()
    expect(screen.getByText('Strong')).toBeInTheDocument()
  })
})
