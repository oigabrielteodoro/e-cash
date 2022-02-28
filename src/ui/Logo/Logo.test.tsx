import React from 'react'

import { render } from '__helpers__/app-tests'

import { Logo } from '.'

describe('Logo', () => {
  it('should be able match snapshot', () => {
    const { container } = render(<Logo />)

    expect(container).toMatchSnapshot()
  })
})
