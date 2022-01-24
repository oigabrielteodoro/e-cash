import React from 'react'
import { AiOutlineHome } from 'react-icons/ai'

import { Logo } from 'ui'

import { NavItem } from './NavItem'
import { useIsOpen, setState } from './useSideBar'

import * as S from './SideBar.styled'

export function SideBar() {
  const isOpen = useIsOpen()

  return (
    <S.Container isOpen={isOpen}>
      <Logo />
      <nav>
        <ul>
          <NavItem icon={AiOutlineHome}>Home</NavItem>
        </ul>
      </nav>
      <button onClick={() => setState(!isOpen)}>Change</button>
    </S.Container>
  )
}
