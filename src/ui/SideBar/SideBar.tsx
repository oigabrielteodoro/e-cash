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

import { Avatar, Button, Logo, Tooltip } from 'ui'

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
      <S.Content isOpen={isOpen}>
        <Logo />
        <S.SideBarButton isOpen={isOpen} onClick={handleOnClick}>
          <FiChevronRight size={16} color={theme.colors.neutral[500]} />
        </S.SideBarButton>
        <nav>
          <ul>
            <Tooltip as='li' isDisabled={isOpen} message='Create'>
              <S.NewButtonContainer isOpen={isOpen}>
                <Button size='sm' variant='icon'>
                  <AiOutlinePlus size={24} />
                  {isOpen && <S.NewButtonText>Create</S.NewButtonText>}
                </Button>
              </S.NewButtonContainer>
            </Tooltip>
            <NavItem to='/dashboard' icon={AiOutlineBarChart}>
              Dashboard
            </NavItem>
            <NavItem to='/transactions' icon={AiOutlineUnorderedList}>
              Transactions
            </NavItem>
            <NavItem to='/accounts' icon={AiOutlineBank}>
              Accounts
            </NavItem>
            <NavItem to='/budgets' icon={AiOutlineUsergroupAdd}>
              Budgets
            </NavItem>
            <NavItem to='/settings' icon={AiOutlineSetting}>
              Settings
            </NavItem>
          </ul>
        </nav>
        <Avatar src='unknown' alt='Unknown' />
      </S.Content>
    </S.Container>
  )
}
