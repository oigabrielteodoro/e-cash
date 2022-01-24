import React, { ElementType, ComponentType } from 'react'
import type { IconBaseProps } from 'react-icons'

import * as S from './NavItem.styled'

type Props = {
  as?: ElementType
  children: string
  icon: ComponentType<IconBaseProps>
}

export function NavItem({ as, children, icon: Icon }: Props) {
  return (
    <S.Container as={as}>
      <Icon size={24} />
      <span>{children}</span>
    </S.Container>
  )
}
