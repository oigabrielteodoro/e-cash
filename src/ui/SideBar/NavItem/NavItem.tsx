import { AnimatePresence } from 'framer-motion'
import React, { ComponentType } from 'react'
import type { IconBaseProps } from 'react-icons'
import { useMatch, useResolvedPath } from 'react-router'

import { Tooltip } from 'ui'
import { useIsOpen } from '../useSideBar'

import * as S from './NavItem.styled'

type Props = {
  to: string
  children: string
  icon: ComponentType<IconBaseProps>
}

export function NavItem({ to, children, icon: Icon }: Props) {
  const resolvedPath = useResolvedPath(to)
  const pathMatched = useMatch({ path: resolvedPath.pathname, end: true })

  const isOpen = useIsOpen()
  const isActive = !!pathMatched

  return (
    <Tooltip as='li' position='right' message={children} isDisabled={isOpen}>
      <S.Container to={to} $isVisible={isOpen} $isActive={isActive}>
        <S.NavItemIcon $isActive={isActive}>
          <Icon size={24} />
        </S.NavItemIcon>
        <AnimatePresence>
          {isOpen && <S.NavItemText>{children}</S.NavItemText>}
        </AnimatePresence>
      </S.Container>
    </Tooltip>
  )
}
