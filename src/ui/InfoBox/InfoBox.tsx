import React, { CSSProperties } from 'react'
import { AiOutlineExclamationCircle } from 'react-icons/ai'

import * as S from './InfoBox.styled'

type Props = {
  message: string
  style?: CSSProperties
}

export function InfoBox({ message, style }: Props) {
  return (
    <S.Container style={style}>
      <S.IconContainer>
        <AiOutlineExclamationCircle size={24} />
      </S.IconContainer>
      <p>{message}</p>
    </S.Container>
  )
}
