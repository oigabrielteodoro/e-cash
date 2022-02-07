import React from 'react'

import { QueryClientProvider, QueryClient, DefaultOptions } from 'react-query'

import { Style, ToastContainer } from 'ui'
import { Router } from 'lib'
import { queryConfigDefault } from 'client'

const queryClient = new QueryClient({
  defaultOptions: queryConfigDefault as DefaultOptions,
})

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Style />
      <Router />
      <ToastContainer />
    </QueryClientProvider>
  )
}
