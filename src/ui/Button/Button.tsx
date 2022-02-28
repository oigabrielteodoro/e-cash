import React, { ButtonHTMLAttributes, ReactNode } from 'react'

import { LoadIcon } from 'ui'

import * as S from './Button.styled'

type NaviteProps = ButtonHTMLAttributes<HTMLButtonElement>

export type ButtonProps = {
  children: ReactNode
  loading?: boolean
  size?: 'sm' | 'md' | 'lg'
  type?: 'icon' | 'text'
  variant?: 'primary' | 'secondary' | 'outline'
  htmlType?: 'button' | 'submit' | 'reset'
  full?: boolean
  to?: string
} & Omit<NaviteProps, 'type'>

export function Button({
  children,
  loading = false,
  disabled = false,
  variant = 'primary',
  to,
  type,
  size = 'md',
  full = type !== 'icon',
  htmlType = 'button',
  ...rest
}: ButtonProps) {
  const isDisabled = loading || disabled

  if (to) {
    return (
      <S.LinkWrapper
        $full={full}
        $buttonType={type}
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
      type={htmlType}
      $full={full}
      disabled={isDisabled}
      variant={variant}
      size={size}
      $buttonType={type}
      {...rest}
    >
      {loading ? <LoadIcon /> : children}
    </S.Container>
  )
}
