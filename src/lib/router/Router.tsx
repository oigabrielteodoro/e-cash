import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { SignIn } from 'pages'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}
