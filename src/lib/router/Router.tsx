import React, { ReactElement } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

<<<<<<< HEAD
import { BankAccounts, CreateAccount, Dashboard, SignIn } from 'pages'
=======
import { Accounts, CreateAccount, Dashboard, SignIn } from 'pages'
>>>>>>> 0803f31072a817b8a9f829396c56f8be1ed420e3
import { ACCOUNTS, CREATE_ACCOUNT, DASHBOARD, SIGN_IN } from 'lib'

import { WithAuthentication } from './WithAuthentication'
import { WithNotAuthentication } from './WithNotAuthentication'

type Props = {
  isPrivate?: boolean
  children: ReactElement
}

function AppRoute({ isPrivate = false, children }: Props) {
  if (isPrivate) {
    return <WithAuthentication>{children}</WithAuthentication>
  }

  return <WithNotAuthentication>{children}</WithNotAuthentication>
}

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={SIGN_IN}
          element={
            <AppRoute>
              <SignIn />
            </AppRoute>
          }
        />
        <Route
          path={CREATE_ACCOUNT}
          element={
            <AppRoute>
              <CreateAccount />
            </AppRoute>
          }
        />
        <Route
          path={DASHBOARD}
          element={
            <AppRoute isPrivate>
              <Dashboard />
            </AppRoute>
          }
        />
        <Route
          path={ACCOUNTS}
          element={
            <AppRoute isPrivate>
<<<<<<< HEAD
              <BankAccounts />
=======
              <Accounts />
>>>>>>> 0803f31072a817b8a9f829396c56f8be1ed420e3
            </AppRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
