import React, { ReactNode } from 'react'

import { QuoteIcon, AuthLayout } from 'ui'
import { ROCKET } from 'assets'

import * as S from './Layout.styled'

type Props = {
  children: ReactNode
}

export function Layout({ children }: Props) {
  return (
    <S.Wrapper>
      <S.Container>
        <AuthLayout.Logo />
        <S.Box>
          <QuoteIcon />
          <AuthLayout.Title>Boost your life with we.</AuthLayout.Title>
          <AuthLayout.QuoteText>
            ”Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna.”
          </AuthLayout.QuoteText>
          <AuthLayout.Account />
        </S.Box>
        <S.RocketImg src={ROCKET} alt='Rocket' />
      </S.Container>
      {children}
    </S.Wrapper>
  )
}
