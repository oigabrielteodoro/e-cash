import styled, { css } from 'styled-components'

import { theme } from 'config'

import type { ButtonIconBadgeProps } from './IconBadge'

type ContainerProps = Required<
  Pick<ButtonIconBadgeProps, 'variant' | 'size' | 'full'>
>

type IconBadgeProps = Required<Pick<ButtonIconBadgeProps, 'variant'>>

const sizes = {
  sm: css`
    padding: 0.8rem;
    font-size: ${theme.font.sizes.small};
  `,
  md: css`
    padding: 1.2rem;
  `,
  lg: css`
    padding: 1.8rem;
  `,
}

const variants = {
  success: css`
    background: ${theme.colors.blue[500]};
  `,
  danger: css`
    background: ${theme.colors.red[400]};
  `,
}

export const IconBadge = styled.div<IconBadgeProps>`
  height: 3rem;
  width: 3rem;
  border-radius: 0.5rem;
  display: grid;
  place-items: center;
  color: ${theme.colors.white};

  ${({ variant }) => variants[variant]}
`

export const Container = styled.button<ContainerProps>`
  border-radius: 0.5rem;
  border: 0.1rem solid ${theme.colors.neutral[300]};
  background: transparent;
  display: flex;
  align-items: center;
  font-size: ${theme.font.sizes.small};
  font-weight: 500;
  color: ${theme.colors.neutral[600]};
  text-align: center;
  transition: 300ms;

  span {
    flex: 1;
    margin-left: -1.5rem;
  }

  ${({ size }) => sizes[size]};

  ${({ full }) =>
    full &&
    css`
      width: 100%;
    `}

  &:hover {
    background: ${theme.colors.neutral[100]};
  }
`
