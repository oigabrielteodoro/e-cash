import React, { ButtonHTMLAttributes, ReactNode } from 'react'

import { LoadIcon } from 'ui'

import * as S from './Button.styled'

export type ButtonProps = {
  children: ReactNode
  loading?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'outline' | 'icon'
  full?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  children,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'md',
  full = variant !== 'icon',
  ...rest
}: ButtonProps) {
  const isDisabled = loading || disabled

  return (
    <S.Container
      full={full}
      disabled={isDisabled}
      variant={variant}
      size={size}
      {...rest}
    >
      {loading ? <LoadIcon /> : children}
    </S.Container>
  )
}
