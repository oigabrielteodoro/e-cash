import React from 'react'
import { Button, Result } from 'ui'

type Props = {
  isLoading: boolean
  onTryAgain: () => void
}

export function Failure({ isLoading, onTryAgain }: Props) {
  return (
    <Result
      status='error'
      title='An error has occurred'
      description="We couldn't find your bank accounts, please try again!"
    >
      <Button full={false} loading={isLoading} onClick={onTryAgain}>
        Try again
      </Button>
    </Result>
  )
}
