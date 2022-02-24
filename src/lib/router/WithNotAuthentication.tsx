import React, { ReactElement } from 'react'
import { Navigate } from 'react-router'

import { SignIn } from 'pages'
import { DASHBOARD } from 'lib'
import { useIsAuthenticated } from 'client'

type Props = {
  children?: ReactElement
}

export function WithNotAuthentication({ children = <SignIn /> }: Props) {
  const isAuthenticated = useIsAuthenticated()

  if (isAuthenticated) {
    return <Navigate to={DASHBOARD} />
  }

  return children
}
