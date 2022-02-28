import React from 'react'
import { render, screen } from '__helpers__/app-tests'

import { ShimmerEffect } from '.'

describe('ShimmerEffect', () => {
  it('should be able match snapshot', () => {
    const { container } = render(<ShimmerEffect isLoading />)

    expect(container).toMatchSnapshot()
  })

  it('should be able render correctly', () => {
    render(<ShimmerEffect isLoading />)

    expect(screen.getByTestId('ShimmerEffect')).toBeInTheDocument()
  })

  it('should be able render element when loading is false', () => {
    render(<ShimmerEffect isLoading={false}>Example</ShimmerEffect>)

    expect(screen.getByText(/example/i)).toBeInTheDocument()
  })
})
