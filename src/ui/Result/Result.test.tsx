import React from 'react'

import { render, screen } from '__helpers__/app-tests'

import { Result } from '.'

function MockedComponent() {
  return (
    <Result status='success' title='Title' description='Description'>
      <button>Click me</button>
    </Result>
  )
}

describe('Result', () => {
  it('should be able match snapshot', () => {
    const { container } = render(<MockedComponent />)

    expect(container).toMatchSnapshot()
  })

  it('should be able render correctly', () => {
    render(<MockedComponent />)

    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})
