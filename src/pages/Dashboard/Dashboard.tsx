import React from 'react'

import { AppLayout } from 'ui'

import { Calendar } from './Calendar'

export function Dashboard() {
  return (
    <AppLayout>
      <AppLayout.Header title='Dashboard'>
        <Calendar />
      </AppLayout.Header>
      <AppLayout.Content></AppLayout.Content>
    </AppLayout>
  )
}
