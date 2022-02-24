import React, { ReactNode } from 'react'

import { AuthLayout, QuoteIcon } from 'ui'

import * as S from './Layout.styled'

type Props = {
  children: ReactNode
}

export function Layout({ children }: Props) {
  return (
    <S.Wrapper>
      {children}
      <AuthLayout.Container>
        <QuoteIcon />
        <AuthLayout.Title>Make your Dream.</AuthLayout.Title>
        <AuthLayout.QuoteText>
          ”Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna.”
        </AuthLayout.QuoteText>
        <AuthLayout.Account />
      </AuthLayout.Container>
    </S.Wrapper>
  )
}
