import React, { ReactNode } from 'react'

import { SideBar } from 'ui'
import { useIsOpen } from 'ui/SideBar/useSideBar'

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
    <S.Header>
      <S.Title>{title}</S.Title>
      {children}
    </S.Header>
  )
}

AppLayout.Content = S.Content
