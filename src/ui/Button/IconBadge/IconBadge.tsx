import React, { ButtonHTMLAttributes, ComponentType } from 'react'
import { FiCheck, FiX } from 'react-icons/fi'
import type { IconBaseProps } from 'react-icons'

import * as S from './IconBadge.styled'

export type ButtonIconBadgeProps = {
  children: string
  full?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'success' | 'danger'
  icon?: ComponentType<IconBaseProps>
} & ButtonHTMLAttributes<HTMLButtonElement>

export function IconBadge({
  children,
  full = false,
  variant = 'success',
  size = 'md',
  icon: Icon = variant === 'success' ? FiCheck : FiX,
  ...rest
}: ButtonIconBadgeProps) {
  return (
    <S.Container full={full} size={size} variant={variant} {...rest}>
      <S.IconBadge variant={variant}>
        <Icon />
      </S.IconBadge>
      <span>{children}</span>
    </S.Container>
  )
}
