import React from 'react'

import { render } from '__helpers__/app-tests'

import { QuoteIcon } from '.'

describe('QuoteIcon', () => {
  it('should be able match snapshot', () => {
    const { container } = render(<QuoteIcon />)

    expect(container).toMatchSnapshot()
  })
})
