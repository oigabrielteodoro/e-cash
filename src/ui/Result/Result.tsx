import React, { ReactNode } from 'react'
import Lottie from 'react-lottie-player'

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
        loop={false}
        play
        animationData={SUCCESS_LOTTIE}
        style={{ width: 180, height: 180 }}
      />
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
    </S.Container>
  )
}
