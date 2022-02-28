import React from 'react'

import { render } from '__helpers__/app-tests'

import { LoadIcon } from '.'

describe('LoadIcon', () => {
  it('should be able match snapshot', () => {
    const { container } = render(<LoadIcon />)

    expect(container).toMatchSnapshot()
  })
})
