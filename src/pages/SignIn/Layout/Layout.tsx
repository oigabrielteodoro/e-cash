import React, { ReactNode } from 'react'

import { QuoteIcon } from '../QuoteIcon'

import * as S from './Layout.styled'

type Props = {
  children: ReactNode
}

export function Layout({ children }: Props) {
  return (
    <S.Wrapper>
      {children}
      <S.Container>
        <QuoteIcon />
        <S.Title>Make your Dream.</S.Title>
        <S.QuoteText>
          ”Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna.”
        </S.QuoteText>
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
      </S.Container>
    </S.Wrapper>
  )
}
