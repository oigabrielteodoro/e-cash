import React, { ReactNode } from 'react'
import Lottie from 'react-lottie-player'

import { EMPTY_STATE_LOTTIE } from 'assets'

import * as S from './EmptyState.styled'

export type EmptyStateProps = {
  title: string
  description: string
  children?: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 100,
  md: 150,
  lg: 200,
}

export function EmptyState({
  children,
  title,
  description,
  size = 'md',
}: EmptyStateProps) {
  return (
    <>
      <S.Container size={size}>
        <Lottie
          loop={false}
          play
          animationData={EMPTY_STATE_LOTTIE}
          style={{ width: sizes[size], height: sizes[size] }}
        />
        <strong>{title}</strong>
        <p>{description}</p>
      </S.Container>
      {children && <S.Content>{children}</S.Content>}
    </>
  )
}
