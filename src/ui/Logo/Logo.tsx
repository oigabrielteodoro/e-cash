import React from 'react'
import { IoCashOutline } from 'react-icons/io5'

import { theme } from 'config'

import * as S from './Logo.styled'

export function Logo() {
  return (
    <S.Container>
      <IoCashOutline size={28} color={theme.colors.white} />
    </S.Container>
  )
}
