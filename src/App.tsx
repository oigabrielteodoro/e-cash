import React from 'react'

import {
  QueryClientProvider,
  QueryClient,
  DefaultOptions,
  QueryCache,
} from 'react-query'

import { Style, NotificationContainer } from 'ui'
import { Router } from 'lib'
import { queryConfigDefault, useIsAuthenticated } from 'client'

export const queryClient = new QueryClient({
  defaultOptions: queryConfigDefault as DefaultOptions,
  queryCache: new QueryCache(),
})

export function App() {
  const isAuthenticated = useIsAuthenticated()

  return (
    <QueryClientProvider client={queryClient}>
      <Style isAuthenticated={isAuthenticated} />
      <Router />
      <NotificationContainer />
    </QueryClientProvider>
  )
}
