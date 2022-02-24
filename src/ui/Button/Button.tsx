import React, { ButtonHTMLAttributes, ReactNode } from 'react'

import { LoadIcon } from 'ui'

import * as S from './Button.styled'

type NaviteProps = ButtonHTMLAttributes<HTMLButtonElement>

export type ButtonProps = {
  children: ReactNode
  loading?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'outline' | 'icon'
  full?: boolean
  to?: string
} & NaviteProps

export function Button({
  children,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'md',
  full = variant !== 'icon',
  to,
  ...rest
}: ButtonProps) {
  const isDisabled = loading || disabled

  if (to) {
    return (
      <S.LinkWrapper
        $full={full}
        disabled={isDisabled}
        variant={variant}
        size={size}
        to={to}
      >
        {children}
      </S.LinkWrapper>
    )
  }

  return (
    <S.Container
      $full={full}
      disabled={isDisabled}
      variant={variant}
      size={size}
      {...rest}
    >
      {loading ? <LoadIcon /> : children}
    </S.Container>
  )
}
