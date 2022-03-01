import React from 'react'
import { Space } from 'ui'
import { render } from '__helpers__/app-tests'

import { Grid, Row, Col } from '.'

describe('Grid', () => {
  it('should be able match snapshot', () => {
    const { container } = render(
      <Grid columns={3}>
        <h1>Column 1</h1>
        <h1>Column 2</h1>
        <h1>Column 3</h1>
      </Grid>,
    )

    expect(container).toMatchSnapshot()
  })
})

describe('Row', () => {
  it('should be able match snapshot', () => {
    const { container } = render(
      <Row gutter={[24, 24]}>
        <Col span={6}>
          <h1>Column 1</h1>
        </Col>
        <Col span={6}>
          <h1>Column 2</h1>
        </Col>
        <Col span={6}>
          <h1>Column 3</h1>
        </Col>
        <Col span={6}>
          <h1>Column 4</h1>
        </Col>
        <Col span={24}>
          <h1>Column 5</h1>
        </Col>
      </Row>,
    )

    expect(container).toMatchSnapshot()
  })
})

describe('Col', () => {
  it('should be able match snapshot', () => {
    const { container } = render(
      <Col>
        <h1>Column 1</h1>
      </Col>,
    )

    expect(container).toMatchSnapshot()
  })
})

describe('Space', () => {
  it('should be able match snapshot', () => {
    const { container } = render(
      <Space margin='10rem'>
        <h1>Children</h1>
      </Space>,
    )

    expect(container).toMatchSnapshot()
  })
})
