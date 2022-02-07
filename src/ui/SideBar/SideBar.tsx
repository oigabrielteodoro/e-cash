import React from 'react'
import {
  AiOutlineUnorderedList,
  AiOutlineBank,
  AiOutlineBarChart,
  AiOutlineSetting,
  AiOutlineUsergroupAdd,
  AiOutlineAppstoreAdd,
  AiOutlineSliders,
} from 'react-icons/ai'
import { FiChevronRight } from 'react-icons/fi'
import { AnimatePresence } from 'framer-motion'

import { Logo } from 'ui'
import { theme } from 'config'

import { NavItem } from './NavItem'
import { AccountUser } from './AccountUser'
import { CreatePopover } from './CreatePopover'

import { useIsOpen, setState } from './useSideBar'

import * as S from './SideBar.styled'

export function SideBar() {
  const isOpen = useIsOpen()

  function handleOnClick() {
    setState(!isOpen)
  }

  return (
    <S.Container aria-label='sidebar' isOpen={isOpen}>
      <S.Content isOpen={isOpen}>
        <S.LogoContainer>
          <Logo />
          <AnimatePresence>
            {isOpen && <S.LogoTitle>E-cash</S.LogoTitle>}
          </AnimatePresence>
        </S.LogoContainer>
        <S.SideBarButton
          isOpen={isOpen}
          onClick={handleOnClick}
          aria-label='toggle sidebar'
        >
          <FiChevronRight size={16} color={theme.colors.neutral[500]} />
        </S.SideBarButton>
        <CreatePopover />
        <S.Navigation>
          <ul>
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
            <NavItem to='/investiments' icon={AiOutlineSliders}>
              Investiments
            </NavItem>
            <NavItem to='/planning' icon={AiOutlineAppstoreAdd}>
              Planning
            </NavItem>
            <NavItem to='/settings' icon={AiOutlineSetting}>
              Settings
            </NavItem>
          </ul>
        </S.Navigation>
        <AccountUser />
      </S.Content>
    </S.Container>
  )
}
