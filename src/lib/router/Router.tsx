import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { CreateAccount, Dashboard } from 'pages'
import { CREATE_ACCOUNT, DASHBOARD, SIGN_IN } from 'lib'

import { WithAuthentication } from './WithAuthentication'
import { WithNotAuthentication } from './WithNotAuthentication'

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={SIGN_IN} element={<WithNotAuthentication />} />

        <Route
          path={CREATE_ACCOUNT}
          element={
            <WithNotAuthentication>
              <CreateAccount />
            </WithNotAuthentication>
          }
        />

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
