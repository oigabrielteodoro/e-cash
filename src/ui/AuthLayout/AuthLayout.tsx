import React, { ReactNode } from 'react'

import { Logo } from 'ui'

import * as S from './AuthLayout.styled'

type Props = {
  children: ReactNode
}

function Account() {
  return (
    <S.AccountContainer>
      <img
        src='https://github.com/oigabrielteodoro.png'
        alt='Gabriel Teodoro'
      />
      <S.AccountContent>
        <strong>Gabriel T.</strong>
        <span>Product Developer</span>
      </S.AccountContent>
    </S.AccountContainer>
  )
}

export function AuthLayout({ children }: Props) {
  return children
}

AuthLayout.Logo = function AppLogo() {
  return (
    <S.LogoContainer>
      <Logo />
      <S.LogoTypography>
        <h1>E-cash</h1>
        <span>Make your dream.</span>
      </S.LogoTypography>
    </S.LogoContainer>
  )
}

AuthLayout.Title = S.Title

AuthLayout.QuoteText = S.QuoteText

AuthLayout.Container = S.Container

AuthLayout.Account = Account
