import React from 'react'

import { render, screen } from '__helpers__/app-tests'

import { EmptyState } from '.'

function MockedComponent() {
  return (
    <EmptyState title='Title' description='Description'>
      Content
    </EmptyState>
  )
}

describe('EmptyState', () => {
  it('should be able match snapshot', () => {
    const { container } = render(<MockedComponent />)

    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()

    expect(container).toMatchSnapshot()
  })

  it('should be able render correctly', () => {
    render(<MockedComponent />)

    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })
})
