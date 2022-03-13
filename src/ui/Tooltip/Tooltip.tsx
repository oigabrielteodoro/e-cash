import React, { ReactNode, ElementType } from 'react'
import { CSSProperties } from 'styled-components'

import * as S from './Tooltip.styled'

export type TooltipProps = {
  message: string
  as?: ElementType
  children: ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  disabled?: boolean
  style?: CSSProperties
  alwaysOnTop?: boolean
}

export function Tooltip({
  as,
  message,
  children,
  disabled = false,
  position = 'right',
  alwaysOnTop = false,
  style,
}: TooltipProps) {
  return (
    <S.BaseElement as={as} style={style}>
      {!disabled && (
        <S.Wrapper>
          <S.Container alwaysOnTop={alwaysOnTop} position={position}>
            {message}
          </S.Container>
          <S.Indicator alwaysOnTop={alwaysOnTop} position={position} />
        </S.Wrapper>
      )}
      {children}
    </S.BaseElement>
  )
}
