import React, { ReactNode, ElementType } from 'react'

import * as S from './Tooltip.styled'

export type TooltipProps = {
  message: string
  as?: ElementType
  children: ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  isDisabled?: boolean
}

export function Tooltip({
  as,
  message,
  children,
  isDisabled = false,
  position = 'right',
}: TooltipProps) {
  return (
    <S.BaseElement as={as}>
      {!isDisabled && (
        <S.Wrapper>
          <S.Container position={position}>{message}</S.Container>
          <S.Indicator position={position} />
        </S.Wrapper>
      )}
      {children}
    </S.BaseElement>
  )
}
