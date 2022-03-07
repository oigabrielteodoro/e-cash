import React from 'react'
import { AccountsSummary } from 'core/accounts'

import { AppLayout, Row, Calendar } from 'ui'

import { Search } from './Search'

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
        <Row gutter={[24, 0]}>
          <AccountsSummary />
        </Row>
      </AppLayout.Content>
    </AppLayout>
  )
}
