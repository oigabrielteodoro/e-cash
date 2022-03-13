import React from 'react'
import { Col, Row } from 'ui'

import { AccountCard } from 'core/accounts/AccountCard'

export function Loading() {
  return (
    <Row gutter={[24, 24]}>
      <Col md={24} lg={12} xlg={8}>
        <AccountCard.Skeleton />
      </Col>
      <Col md={24} lg={12} xlg={8}>
        <AccountCard.Skeleton />
      </Col>
      <Col md={24} lg={12} xlg={8}>
        <AccountCard.Skeleton />
      </Col>
      <Col md={24} lg={12} xlg={8}>
        <AccountCard.Skeleton />
      </Col>
    </Row>
  )
}
