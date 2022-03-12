import React, { ReactNode } from 'react'
import Lottie from 'react-lottie-player'

import { ERROR_LOTTIE, SUCCESS_LOTTIE } from 'assets'

import * as S from './Result.styled'

type Props = {
  title: string
  children: ReactNode
  description: string
  status: 'success' | 'error'
}

const animations = {
  error: ERROR_LOTTIE,
  success: SUCCESS_LOTTIE,
}

export function Result({ children, status, title, description }: Props) {
  return (
    <S.Container>
      <Lottie
        loop={status === 'error'}
        play
        animationData={animations[status]}
        style={{ width: 180, height: 180 }}
      />
      <h1>{title}</h1>
      <p>{description}</p>
      {children}
    </S.Container>
  )
}
