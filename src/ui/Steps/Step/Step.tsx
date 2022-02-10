import React, { ReactNode } from 'react'

import * as S from './Step.styled'

export type Props = {
  children: ReactNode
  stepIndex?: number
  isActive?: boolean
  status?: 'error' | 'success' | 'info'
  onStepClick?: (element: ReactNode) => void
}

export function Step({
  children,
  stepIndex = 1,
  status = 'info',
  isActive = false,
  onStepClick,
}: Props) {
  function handleOnClick() {
    onStepClick && onStepClick(children)
  }

  return (
    <S.Wrapper onClick={handleOnClick}>
      <S.Container isActive={isActive} status={status}>
        {stepIndex}
      </S.Container>
    </S.Wrapper>
  )
}
