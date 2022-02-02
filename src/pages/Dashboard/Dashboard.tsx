import React from 'react'

import { AppLayout } from 'ui'

import { Search } from './Search'
import { Calendar } from './Calendar'

import * as S from './Dashboard.styled'

export function Dashboard() {
  return (
    <AppLayout>
      <AppLayout.Header title='Dashboard'>
        <S.Row as='section'>
          <Calendar />
          <Search />
        </S.Row>
      </AppLayout.Header>
      <AppLayout.Content></AppLayout.Content>
    </AppLayout>
  )
}
