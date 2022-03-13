import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

import { theme } from 'config'

import type { ButtonProps } from '.'

type ContainerProps = {
  $full: boolean
  disabled?: boolean
  $buttonType?: 'icon' | 'text'
} & Required<Pick<ButtonProps, 'size' | 'variant'>>

const types = {
  icon: css`
    min-width: 4.2rem;
    height: 4.2rem;
    padding: 0;
  `,
  text: css`
    background: transparent;
    border: 0;
    box-shadow: 0;
    padding: 0;

    &:hover {
      opacity: 1;
      box-shadow: none;
    }
  `,
}

const sizes = {
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
  secondary: css`
    color: ${theme.colors.blue[500]};
    background: ${theme.colors.blue[100]};
    border: 0.1rem solid ${theme.colors.blue[500]};

    &:hover {
      opacity: 1;
      box-shadow: none;
    }
  `,
  outline: css`
    background: transparent;
    color: ${theme.colors.neutral[500]};
    border: 0.1rem solid ${theme.colors.neutral[500]};

    &:hover {
      opacity: 1;
      box-shadow: none;
      filter: brightness(0.6);
    }
  `,
}

const button = ({ $full, size, variant, $buttonType }: ContainerProps) => css`
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

  &:hover {
    opacity: 0.9;
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

  ${$full &&
  css`
    width: 100%;
  `};

  ${sizes[size]};
  ${variants[variant]};
  ${$buttonType && types[$buttonType]};
`

export const Container = styled.button<ContainerProps>`
  ${({ $full, size, variant, $buttonType }) =>
    button({ $full, $buttonType, size, variant })}
`

export const LinkWrapper = styled(Link)<ContainerProps>`
  text-decoration: none;

  ${({ $full, size, variant, $buttonType }) =>
    button({ $full, $buttonType, size, variant })}
`
