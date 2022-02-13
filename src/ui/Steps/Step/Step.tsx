import React, { ReactNode } from 'react'

import * as S from './Step.styled'

export type Props = {
  children: ReactNode
  stepIndex?: number
  isActive?: boolean
  isDisabled?: boolean
  status?: 'error' | 'success' | 'info'
  onStepClick?: () => void
}

export function Step({
  stepIndex = 1,
  status = 'info',
  isActive = false,
  isDisabled = false,
  onStepClick,
}: Props) {
  function handleOnClick() {
    if (isDisabled) return

    onStepClick && onStepClick()
  }

  return (
    <S.Wrapper isDisabled={isDisabled} onClick={handleOnClick}>
      <S.Container isActive={isActive} isDisabled={isDisabled} status={status}>
        {stepIndex}
      </S.Container>
    </S.Wrapper>
  )
}
