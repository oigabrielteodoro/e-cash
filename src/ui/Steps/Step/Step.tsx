import React, { ReactNode } from 'react'
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai'
import { Tooltip } from 'ui'

import * as S from './Step.styled'

export type Props = {
  children: ReactNode
  stepIndex?: number
  active?: boolean
  disabled?: boolean
  title?: string
  status?: 'error' | 'success' | 'info'
  onStepClick?: () => void
}

export function Step({
  stepIndex = 1,
  status = 'info',
  active = false,
  disabled = false,
  title,
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
      <Tooltip position='top' disabled={!title} message={title ?? ''}>
        <S.Container active={active} disabled={disabled} status={status}>
          {status === 'info' && stepIndex}
          {status === 'error' && <AiOutlineClose size={16} />}
          {status === 'success' && <AiOutlineCheck size={16} />}
        </S.Container>
      </Tooltip>
    </S.Wrapper>
  )
}
