import React, { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { SIGN_IN } from 'lib'
import { useIsAuthenticated } from 'client'

type Props = {
  children: ReactNode
}

export function WithAuthentication({ children }: Props) {
  const isAuthenticated = useIsAuthenticated()

  if (!isAuthenticated) {
    return <Navigate to={SIGN_IN} />
  }

  return <>{children}</>
}
