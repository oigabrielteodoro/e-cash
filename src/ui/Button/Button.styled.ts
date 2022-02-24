import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

import { theme } from 'config'

import type { ButtonProps } from '.'

type ContainerProps = {
  $full: boolean
  disabled?: boolean
} & Required<Pick<ButtonProps, 'size' | 'variant'>>

const modifiers = {
  sm: css`
    padding: 0.8rem 1.6rem;
    font-size: ${theme.font.sizes.small};
  `,
  md: css`
    padding: 1.2rem 3.2rem;
  `,
  lg: css`
    padding: 1.8rem 4.2rem;
  `,
}

const variants = {
  primary: css`
    background: ${theme.colors.blue[500]};
  `,
  secondary: css``,
  outline: css`
    background: transparent;
    color: ${theme.colors.blue[500]};
    border: 0.2rem solid ${theme.colors.blue[300]};
  `,
  icon: css`
    min-width: 4.2rem;
    height: 4.2rem;
    background: ${theme.colors.blue[500]};
    padding: 0;
  `,
}

const button = ({ $full, size, variant }: ContainerProps) => css`
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: ${theme.font.sizes.paragraph};
  transition: 300ms;
  border: 0.1rem solid transparent;

  ${$full &&
  css`
    width: 100%;
  `}

  ${modifiers[size]}
  ${variants[variant]}

  &:hover {
    opacity: 0.9;
    transform: scale(0.99);
    box-shadow: 0 0 0 0.4rem ${theme.shadow.blue[300]};
  }

  &:disabled {
    cursor: no-drop;
    color: ${theme.colors.neutral[500]};
    background: ${theme.colors.neutral[200]};
    border-color: ${theme.colors.neutral[300]};

    &:hover {
      box-shadow: 0 0 0 0.4rem ${theme.shadow.neutral[500]};
    }
  }
`

export const Container = styled.button<ContainerProps>`
  ${({ $full, size, variant }) => button({ $full, size, variant })}
`

export const LinkWrapper = styled(Link)<ContainerProps>`
  text-decoration: none;

  ${({ $full, size, variant }) => button({ $full, size, variant })}
`
