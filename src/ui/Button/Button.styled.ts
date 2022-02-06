import styled, { css } from 'styled-components'

import { theme } from 'config'

import { ButtonProps } from '.'

type ContainerProps = Required<Pick<ButtonProps, 'size' | 'variant' | 'full'>>

const modifiers = {
  sm: css`
    padding: 0.8rem 1.6rem;
    font-size: ${theme.font.sizes.small};
  `,
  md: css`
    padding: 1.2rem 2.4rem;
  `,
  lg: css`
    padding: 1.8rem 3.2rem;
  `,
}

const variants = {
  primary: css`
    background: ${theme.colors.blue[500]};
  `,
  secondary: css``,
  outline: css``,
  icon: css`
    min-width: 4.2rem;
    height: 4.2rem;
    background: ${theme.colors.blue[500]};
    padding: 0;
  `,
}

export const Container = styled.button<ContainerProps>`
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.white};
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: ${theme.font.sizes.paragraph};
  transition: 300ms;
  width: 100%;

  ${({ size }) => modifiers[size]}
  ${({ variant }) => variants[variant]}

  &:disabled {
    opacity: 0.8;
  }

  &:hover {
    filter: brightness(0.9);
    transform: scale(0.99);
    box-shadow: 0 0 0 0.4rem ${theme.shadow.blue[300]};
  }
`
