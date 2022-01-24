import React, { ButtonHTMLAttributes, ReactNode } from 'react'

import * as S from './Button.styled'

export type ButtonProps = {
  children: ReactNode
  loading?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'outline' | 'icon'
} & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  children,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'md',
  ...rest
}: ButtonProps) {
  const isDisabled = loading || disabled

  return (
    <S.Container disabled={isDisabled} variant={variant} size={size} {...rest}>
      {loading ? <S.LoadIcon /> : children}
    </S.Container>
  )
}
