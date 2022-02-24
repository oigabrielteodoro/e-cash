import React, { ReactNode, ElementType } from 'react'

import * as S from './Tooltip.styled'

export type TooltipProps = {
  message: string
  as?: ElementType
  children: ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  disabled?: boolean
}

export function Tooltip({
  as,
  message,
  children,
  disabled = false,
  position = 'right',
}: TooltipProps) {
  return (
    <S.BaseElement as={as}>
      {!disabled && (
        <S.Wrapper>
          <S.Container position={position}>{message}</S.Container>
          <S.Indicator position={position} />
        </S.Wrapper>
      )}
      {children}
    </S.BaseElement>
  )
}
