import React from 'react'

import { AppLayout, Row, Col } from 'ui'

import { Search } from './Search'
import { Calendar } from './Calendar'

import * as S from './Dashboard.styled'

export function Dashboard() {
  return (
    <AppLayout>
      <AppLayout.Header title='Dashboard'>
        <Row alignItems='center' gutter={[0, 0]} as='section'>
          <Calendar />
          <Search />
        </Row>
      </AppLayout.Header>
      <AppLayout.Content>
        <Row gutter={[24, 24]}>
          <Col span={8}>
            <S.Card>
              <h1>Teste</h1>
            </S.Card>
          </Col>
          <Col span={8}>
            <S.Card>
              <h1>Teste</h1>
            </S.Card>
          </Col>
          <Col span={8}>
            <S.Card>
              <h1>Teste</h1>
            </S.Card>
          </Col>
        </Row>
      </AppLayout.Content>
    </AppLayout>
  )
}
