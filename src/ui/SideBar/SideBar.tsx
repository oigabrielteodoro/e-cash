import React from 'react'
import {
  AiOutlinePlus,
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

import { Button, Logo, Tooltip } from 'ui'
import { theme } from 'config'

import { NavItem } from './NavItem'
import { AccountUser } from './AccountUser'
import { TextWithAnimation } from './WithAnimation'

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
        <S.LogoContainer>
          <Logo />
          <AnimatePresence>
            {isOpen && <S.LogoTitle>E-cash</S.LogoTitle>}
          </AnimatePresence>
        </S.LogoContainer>
        <S.SideBarButton isOpen={isOpen} onClick={handleOnClick}>
          <FiChevronRight size={16} color={theme.colors.neutral[500]} />
        </S.SideBarButton>
        <nav>
          <ul>
            <Tooltip as='li' isDisabled={isOpen} message='Create'>
              <S.NewButtonContainer isOpen={isOpen}>
                <Button size='sm' variant='icon'>
                  <AiOutlinePlus size={24} />
                  {isOpen && <TextWithAnimation>Create</TextWithAnimation>}
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
        </nav>
        <AccountUser />
      </S.Content>
    </S.Container>
  )
}
