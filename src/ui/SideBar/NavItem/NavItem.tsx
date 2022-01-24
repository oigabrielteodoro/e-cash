import React, { ElementType, ComponentType } from 'react'
import type { IconBaseProps } from 'react-icons'

import { useIsOpen } from '../useSideBar'

import * as S from './NavItem.styled'

type Props = {
  as?: ElementType
  children: string
  icon: ComponentType<IconBaseProps>
}

export function NavItem({ as, children, icon: Icon }: Props) {
  const isOpen = useIsOpen()

  return (
    <S.Container as={as}>
      <Icon size={24} />
      {isOpen && <span>{children}</span>}
    </S.Container>
  )
}
