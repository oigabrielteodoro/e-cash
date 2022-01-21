import React from 'react'

import { QueryClientProvider, QueryClient } from 'react-query'

import { Style, ToastContainer } from 'ui'
import { Router } from 'lib'

import 'react-toastify/dist/ReactToastify.css'

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Style />
      <Router />
      <ToastContainer />
    </QueryClientProvider>
  )
}
