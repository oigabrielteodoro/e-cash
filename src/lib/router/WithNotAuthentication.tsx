import React from 'react'
import { Navigate } from 'react-router'

import { SignIn } from 'pages'
import { DASHBOARD } from 'lib'
import { useIsAuthenticated } from 'client'

export function WithNotAuthentication() {
  const isAuthenticated = useIsAuthenticated()

  if (isAuthenticated) {
    return <Navigate to={DASHBOARD} />
  }

  return <SignIn />
}
