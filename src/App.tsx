import React from 'react'

import {
  QueryClientProvider,
  QueryClient,
  DefaultOptions,
  QueryCache,
} from 'react-query'

import { Style, NotificationContainer } from 'ui'
import { Router } from 'lib'
import { queryConfigDefault } from 'client'

export const queryClient = new QueryClient({
  defaultOptions: queryConfigDefault as DefaultOptions,
  queryCache: new QueryCache(),
})

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Style />
      <Router />
      <NotificationContainer />
    </QueryClientProvider>
  )
}
