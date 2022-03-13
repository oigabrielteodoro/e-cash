import React from 'react'
import { AiOutlineExclamationCircle } from 'react-icons/ai'

import * as S from './InfoBox.styled'

type Props = {
  message: string
}

export function InfoBox({ message }: Props) {
  return (
    <S.Container>
      <S.IconContainer>
        <AiOutlineExclamationCircle size={24} />
      </S.IconContainer>
      <p>{message}</p>
    </S.Container>
  )
}
