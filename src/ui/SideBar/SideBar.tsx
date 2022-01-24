import React from 'react'
import {
  AiOutlinePlus,
  AiOutlineUnorderedList,
  AiOutlineBank,
  AiOutlineBarChart,
  AiOutlineSetting,
  AiOutlineUsergroupAdd,
} from 'react-icons/ai'
import { FiChevronRight } from 'react-icons/fi'

import { Button, Logo } from 'ui'

import { theme } from 'config'
import { NavItem } from './NavItem'
import { useIsOpen, setState } from './useSideBar'

import * as S from './SideBar.styled'

export function SideBar() {
  const isOpen = useIsOpen()

  function handleOnClick() {
    setState(!isOpen)
  }

  return (
    <S.Container isOpen={isOpen}>
      <S.Content>
        <Logo />
        <S.SideBarButton isOpen={isOpen} onClick={handleOnClick}>
          <FiChevronRight size={16} color={theme.colors.neutral[500]} />
        </S.SideBarButton>
        <nav>
          <ul>
            <li>
              <Button size='sm' variant='icon'>
                <AiOutlinePlus size={24} />
              </Button>
            </li>
            <NavItem icon={AiOutlineBarChart}>Home</NavItem>
            <NavItem icon={AiOutlineUnorderedList}>Transactions</NavItem>
            <NavItem icon={AiOutlineBank}>Accounts</NavItem>
            <NavItem icon={AiOutlineUsergroupAdd}>Budgets</NavItem>
            <NavItem icon={AiOutlineSetting}>Configurações</NavItem>
          </ul>
        </nav>
        <S.Avatar
          src='https://github.com/oigabrielteodoro.png'
          alt='Gabriel Teodoro'
        />
      </S.Content>
    </S.Container>
  )
}
