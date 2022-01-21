import React from 'react'

import { QueryClientProvider, QueryClient } from 'react-query'
import { ToastContainer } from 'react-toastify'

import { Style } from 'ui'
import { Router } from 'lib'

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Style />
      <Router />

      <ToastContainer
        position='bottom-left'
        autoClose={3000}
        hideProgressBar
        closeOnClick
        draggable
        pauseOnHover
      />
    </QueryClientProvider>
  )
}
