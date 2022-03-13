import React, { ReactNode } from 'react'

import * as S from './Option.styled'

export type OptionProps = {
  children: ReactNode
  displayValue: string
  value?: string
  onClick?: (value?: string, children?: string) => void
}

export function Option({
  children,
  displayValue,
  value,
  onClick,
}: OptionProps) {
  function handleOnClick() {
    onClick && onClick(value, displayValue)
  }

  return (
    <S.Container
      role='option'
      aria-label={displayValue}
      onClick={handleOnClick}
    >
      {children}
    </S.Container>
  )
}
