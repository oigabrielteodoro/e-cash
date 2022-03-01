import React, { ReactNode } from 'react'

import { Row, SideBar } from 'ui'
import { useIsOpen } from 'lib'

import * as S from './AppLayout.styled'

type Props = {
  children: ReactNode
}

type HeaderProps = {
  title: string
  children: ReactNode
}

export function AppLayout({ children }: Props) {
  const isOpen = useIsOpen()

  return (
    <>
      <SideBar />
      <S.Container isOpen={isOpen}>{children}</S.Container>
    </>
  )
}

AppLayout.Header = function Header({ title, children }: HeaderProps) {
  return (
    <Row
      as='header'
      alignItems='center'
      justifyContent='space-between'
      marginBottom='4rem'
    >
      <section>
        <S.Title>{title}</S.Title>
      </section>

      {children}
    </Row>
  )
}

AppLayout.Content = S.Content
