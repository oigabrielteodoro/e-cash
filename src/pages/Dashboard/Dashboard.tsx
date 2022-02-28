import React from 'react'
import { BankAccountsSummary } from 'core/bank-accounts'

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
          <BankAccountsSummary />
        </Row>
      </AppLayout.Content>
    </AppLayout>
  )
}
