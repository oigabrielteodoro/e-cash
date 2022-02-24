import React, { ReactNode } from 'react'
import Lottie from 'react-lottie'

import { SUCCESS_LOTTIE } from 'assets'

import * as S from './Result.styled'

type Props = {
  title: string
  children: ReactNode
  description: string
  status: 'success'
}

export function Result({ children, title, description }: Props) {
  return (
    <S.Container>
      <Lottie
        height={180}
        width={180}
        options={{ loop: false, autoplay: true, animationData: SUCCESS_LOTTIE }}
      />
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
    </S.Container>
  )
}
