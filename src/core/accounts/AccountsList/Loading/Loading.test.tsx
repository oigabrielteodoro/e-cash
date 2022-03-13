import React from 'react'
import { render } from '__helpers__/app-tests'

import { Loading } from './Loading'

describe('Loading', () => {
  it('should be able match snapshot', () => {
    const { container } = render(<Loading />)

    expect(container).toMatchSnapshot()
  })
})
