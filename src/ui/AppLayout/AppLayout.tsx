import React, { ReactNode } from 'react'
import { SideBar } from 'ui'
import { useIsOpen } from 'ui/SideBar/useSideBar'

import * as S from './AppLayout.styled'

type Props = {
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
