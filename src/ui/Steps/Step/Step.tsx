import React, { ReactNode } from 'react'

import * as S from './Step.styled'

export type Props = {
  children: ReactNode
  stepIndex?: number
  active?: boolean
  disabled?: boolean
  status?: 'error' | 'success' | 'info'
  onStepClick?: () => void
}

export function Step({
  stepIndex = 1,
  status = 'info',
  active = false,
  disabled = false,
  onStepClick,
}: Props) {
  function handleOnClick() {
    if (disabled) return

    onStepClick && onStepClick()
  }

  return (
    <S.Wrapper
      aria-label={`Step Control ${stepIndex}`}
      disabled={disabled}
      onClick={handleOnClick}
    >
      <S.Container active={active} disabled={disabled} status={status}>
        {stepIndex}
      </S.Container>
    </S.Wrapper>
  )
}
