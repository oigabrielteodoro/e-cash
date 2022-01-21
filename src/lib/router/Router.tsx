import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Dashboard } from 'pages'
import { DASHBOARD, SIGN_IN } from 'lib'

import { WithAuthentication } from './WithAuthentication'
import { WithNotAuthentication } from './WithNotAuthentication'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={SIGN_IN} element={<WithNotAuthentication />} />

        <Route
          path={DASHBOARD}
          element={
            <WithAuthentication>
              <Dashboard />
            </WithAuthentication>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
