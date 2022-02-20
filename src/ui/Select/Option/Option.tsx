import React from 'react'

import * as S from './Option.styled'

export type OptionProps = {
  children: string
  value?: string
  onClick?: (value?: string, children?: string) => void
}

export function Option({ children, value, onClick }: OptionProps) {
  function handleOnClick() {
    onClick && onClick(value, children)
  }

  return (
    <S.Container role='option' onClick={handleOnClick}>
      {children}
    </S.Container>
  )
}
